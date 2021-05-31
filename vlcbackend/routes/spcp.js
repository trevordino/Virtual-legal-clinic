const fs = require('fs')
const express = require('express');
const router = express.Router();
const client = require('../services/spcp')
const securityHelper = require('../lib/security/security');
const querystring = require("query-string");
const _ = require('lodash');
const restClient = require('superagent-bluebird-promise');
require('dotenv').config()
const env = process.env;

// ####################
// Setup Configuration
// ####################

// LOADED FRON ENV VARIABLE: public key from MyInfo Consent Platform given to you during onboarding for RSA digital signature
var _publicCertContent = env.MYINFO_SIGNATURE_CERT_PUBLIC_CERT;
// LOADED FRON ENV VARIABLE: your private key for RSA digital signature
var _privateKeyContent = env.DEMO_APP_SIGNATURE_CERT_PRIVATE_KEY;
// LOADED FRON ENV VARIABLE: your client_id provided to you during onboarding
var _clientId = env.MYINFO_APP_CLIENT_ID;
// LOADED FRON ENV VARIABLE: your client_secret provided to you during onboarding
var _clientSecret = env.MYINFO_APP_CLIENT_SECRET;


// URLs for MyInfo APIs
var _authLevel = env.AUTH_LEVEL;

var _authApiUrl = env.MYINFO_API_AUTHORISE;
var _tokenApiUrl = env.MYINFO_API_TOKEN;
var _personApiUrl = env.MYINFO_API_PERSON;

var _attributes = "uinfin,name,nationality,dob,regadd,housingtype,hdbtype,ownerprivate,occupation";


// const POST_LOGIN_PAGE = '/login/private'
router.get('/', (req, res) => {
  POST_LOGIN_PAGE = req.header('Referer') + "processlogin"
  const redirectURL = client.createRedirectURL(POST_LOGIN_PAGE)
  res.redirect(redirectURL)
  // res.cookie('connect.sid', '').redirect(redirectURL)
})

router.get('/singpass/assert', (req, res) => {
  const { SAMLart: samlArt, RelayState: relayState } = req.query
  client.getAttributes(samlArt, relayState, (err, data) => {
    if (err) {
      // Indicate that an error has occurred
      res.status(400).send(err.message)
    } else {
      // If all is well and login occurs, the attributes are given
      const { attributes, relayState } = data
      const { UserName: userName } = attributes

      // Embed a session cookie, a JWT based on user name
      const FOUR_HOURS = 4 * 60 * 60 * 1000
      const jwt = client.createJWT({ userName }, FOUR_HOURS)
      res.cookie('connect.sid', jwt)
      res.redirect(relayState)
    }
  })
})

const isAuthenticated = (req, res, next) => {
  console.log((req));
  client.verifyJWT(req.cookies['connect.sid'], (err, data) => {
    if (err) {
      res.status(401).send('Unauthorized')
    } else {
      req.userName = data.userName
      next()
    }
  })
}

router.get(
  '/private',
  isAuthenticated,
  (req, res) => {
    res.send(`Hello ${req.userName}!`)
  }
)

// function for frontend to call backend
router.post('/getPersonData', function(req, res, next) {
  // get variables from frontend
  var code = req.body.code;

  var data;
  var request;

  // **** CALL TOKEN API ****
  request = createTokenRequest(code);
  console.log(request);
  request
    .buffer(true)
    .end(function(callErr, callRes) {
      if (callErr) {
        // ERROR
        console.error("Token Call Error: ",callErr.status);
        console.error(callErr.response.req.res.text);
        res.jsonp({
          status: "ERROR",
          msg: callErr
        });
      } else {
        // SUCCESSFUL
        var data = {
          body: callRes.body,
          text: callRes.text
        };
        console.log("Response from Token API:".green);
        console.log(JSON.stringify(data.body));

        var accessToken = data.body.access_token;
        if (accessToken == undefined || accessToken == null) {
          res.jsonp({
            status: "ERROR",
            msg: "ACCESS TOKEN NOT FOUND"
          });
        }

        // everything ok, call person API
        callPersonAPI(accessToken, res);
      }
    });
});

function callPersonAPI(accessToken, res) {

  console.log("AUTH_LEVEL:".green,_authLevel);

  // validate and decode token to get SUB
  var decoded = securityHelper.verifyJWS(accessToken, _publicCertContent);
  if (decoded == undefined || decoded == null) {
    res.jsonp({
      status: "ERROR",
      msg: "INVALID TOKEN"
    })
  }

  console.log("Decoded Access Token:".green);
  console.log(JSON.stringify(decoded));

  var sub = decoded.sub;
  if (sub == undefined || sub == null) {
    res.jsonp({
      status: "ERROR",
      msg: "SUB NOT FOUND"
    });
  }

  // **** CALL PERSON API ****
  var request = createPersonRequest(sub, accessToken);
  console.log("REQUEST");
  console.log(request);

  // Invoke asynchronous call
  request
    .buffer(true)
    .end(function(callErr, callRes) {
      if (callErr) {
        console.error("Person Call Error: ",callErr.status);
        console.error(callErr.response.req.res.text);
        res.jsonp({
          status: "ERROR",
          msg: callErr
        });
      } else {
        // SUCCESSFUL
        var data = {
          body: callRes.body,
          text: callRes.text
        };
        var personData = data.text;
        if (personData == undefined || personData == null) {
          res.jsonp({
            status: "ERROR",
            msg: "PERSON DATA NOT FOUND"
          });
        } else {

          if (_authLevel == "L0") {
            console.log("Person Data:".green);
            console.log(personData);
            personData = JSON.parse(personData);
            // personData = securityHelper.verifyJWS(personData, _publicCertContent);

            if (personData == undefined || personData == null) {
              res.jsonp({
                status: "ERROR",
                msg: "INVALID DATA OR SIGNATURE FOR PERSON DATA"
              });
            }
            
            // successful. return data back to frontend
            res.jsonp({
              status: "OK",
              text: personData
            });

          }
          else if(_authLevel == "L2"){
            console.log("Person Data (JWE):".green);
            console.log(personData);

            var jweParts = personData.split("."); // header.encryptedKey.iv.ciphertext.tag
            securityHelper.decryptJWE(jweParts[0], jweParts[1], jweParts[2], jweParts[3], jweParts[4], _privateKeyContent)
              .then(personDataJWS => {
                if (personDataJWS == undefined || personDataJWS == null) {
                  res.jsonp({
                    status: "ERROR",
                    msg: "INVALID DATA OR SIGNATURE FOR PERSON DATA"
                  });
                }
                console.log("Person Data (JWS):".green);
                console.log(JSON.stringify(personDataJWS));

                var decodedPersonData = securityHelper.verifyJWS(personDataJWS, _publicCertContent);
                if (decodedPersonData == undefined || decodedPersonData == null) {
                  res.jsonp({
                    status: "ERROR",
                    msg: "INVALID DATA OR SIGNATURE FOR PERSON DATA"
                  })
                }


                console.log("Person Data (Decoded):".green);
                console.log(JSON.stringify(decodedPersonData));
                // successful. return data back to frontend
                res.jsonp({
                  status: "OK",
                  text: decodedPersonData
                });

              })
              .catch(error => {
                console.error("Error with decrypting JWE: %s".red, error);
              })
          }
          else {
            throw new Error("Unknown Auth Level");
          }

        } // end else
      }
    }); //end asynchronous call
}

// function to prepare request for TOKEN API
function createTokenRequest(code) {
  var cacheCtl = "no-cache";
  var contentType = "application/x-www-form-urlencoded";
  var method = "POST";

  // assemble params for Token API
  var strParams = "grant_type=authorization_code" +
    "&code=" + code +
    "&redirect_uri=localhost:3001/processmyinfo" +
    "&client_id=VLC" +
    "&client_secret=44d953c796cccebcec9bdc826852857ab412fbe2";
  var params = querystring.parse(strParams);


  // assemble headers for Token API
  var strHeaders = "Content-Type=" + contentType + "&Cache-Control=" + cacheCtl;
  var headers = querystring.parse(strHeaders);

  // Add Authorisation headers for connecting to API Gateway
  var authHeaders = null;
  if (_authLevel == "L0") {
    // No headers
  } else if (_authLevel == "L2") {
    authHeaders = securityHelper.generateAuthorizationHeader(
      _tokenApiUrl,
      params,
      method,
      contentType,
      _authLevel,
      _clientId,
      _privateKeyContent,
      _clientSecret
    );
  } else {
    throw new Error("Unknown Auth Level");
  }

  if (!_.isEmpty(authHeaders)) {
    _.set(headers, "Authorization", authHeaders);
  }

  console.log("Request Header for Token API:".green);
  console.log(JSON.stringify(headers));

  var request = restClient.post(_tokenApiUrl);

  // Set headers
  if (!_.isUndefined(headers) && !_.isEmpty(headers))
    request.set(headers);

  // Set Params
  if (!_.isUndefined(params) && !_.isEmpty(params))
    request.send(params);

  return request;
}

// function to prepare request for PERSON API
function createPersonRequest(sub, validToken) {
  var url = _personApiUrl + "/" + sub + "/";
  var cacheCtl = "no-cache";
  var method = "GET";

  // assemble params for Person API
  var strParams = "client_id=" + _clientId +
    "&attributes=" + _attributes;

  var params = querystring.parse(strParams);

  // assemble headers for Person API
  var strHeaders = "Cache-Control=" + cacheCtl;
  var headers = querystring.parse(strHeaders);

  // Add Authorisation headers for connecting to API Gateway
  var authHeaders = securityHelper.generateAuthorizationHeader(
    url,
    params,
    method,
    "", // no content type needed for GET
    _authLevel,
    _clientId,
    _privateKeyContent,
    _clientSecret
  );

  // NOTE: include access token in Authorization header as "Bearer " (with space behind)
  if (!_.isEmpty(authHeaders)) {
    _.set(headers, "Authorization", authHeaders + ",Bearer " + validToken);
  } else {
    _.set(headers, "Authorization", "Bearer " + validToken);
  }

  console.log("Request Header for Person API:".green);
  console.log(JSON.stringify(headers));
  // invoke person API
  var request = restClient.get(url);

  // Set headers
  if (!_.isUndefined(headers) && !_.isEmpty(headers))
    request.set(headers);

  // Set Params
  if (!_.isUndefined(params) && !_.isEmpty(params))
    request.query(params);

  return request;
}

module.exports = router;