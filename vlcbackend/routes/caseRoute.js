const express = require("express");
const router = express.Router();
const caseService = require("../services/caseService");
const client = require("../services/spcp");

const isAuthenticated = (req, res, next) => {
  client.verifyJWT(req.cookies["connect.sid"], (err, data) => {
    if (err) {
      console.log(err);
      res.status(401).send("Unauthorized");
    } else {
      req.userName = data.userName;
      next();
    }
  });
};

/* GET all user's case. */
router.get("/getall/", isAuthenticated, async (req, res) => {
  console.log(req.applicantid);
  var caseDetails = await caseService.getAllCase(req.body.colName, req.body.colData)
  if (caseDetails.data.length == 0) {
    res.json({'isPresent': false, 'caseDetails': []});
    return;
  } else {
    res.json({  
      'isPresent': true,
      'caseId': req.caseid,
      'caseDetails': caseDetails
    });
  }
  console.log(caseDetails);
});

// get specific case
router.get("/:caseid", isAuthenticated, async (req, res) => {
    console.log(req.applicantid, req.caseid);
    var caseDetails = await user.getUser(req.userName)
    if (caseDetails.data.length == 0) {
      res.json({'isPresent': false, 'caseDetails': []});
      return;
    } else {
      res.json({  
        'isPresent': true,
        'caseId': req.caseid,
        'caseDetails': caseDetails
      });
    }
    console.log(caseDetails);
  });

// router.post("/", isAuthenticated, async (req, res) => {
router.post("/", async function (req, res, next) {
  try {
    console.log(req.body);
    let data = {
      'fields': ['applicantid', 'lawyerid', 'taxonomy', 'partyname', 'relationship', 'facts', 'questions'],
      'data': [req.body.applicantid, null, req.body.taxonomy, req.body.partyname, req.body.relationship, req.body.facts, req.body.questions]
    }
    console.log(data);
    res.json(await caseService.create(data));
  } catch (err) {
    console.error(`Error creating case`, err.message);
    next(err);
  }
});

router.put("/:caseid", async function (req, res, next) {
  try {
    console.log(req.body);
    let data = req.body;
    res.json(await caseService.update(req.params.caseid, data));
  } catch (err) {
    console.error(`Error updating case`, err.message);
    next(err);
  }
});

module.exports = router;
