import React, { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Redirect } from "react-router-dom";
import {
  singpassTokenApiUrl,
  clientId,
  clientSecret,
  singpassRedirectUrl,
} from "../../utils/authConst";
import Loader from "../common/loader";
import { useAuth } from "../../context/auth";
const axios = require("axios");

const SPCPAuthClient = require("@opengovsg/spcp-auth-client");

function ProcessLogin(props) {
  let { userRole, loggedIn, isOnboarded } = useAuth();

  useEffect(async () => {
    await processMyinfoData();
  }, []);

  const processMyinfoData = async () => {
    // await axios
    //   .get("http://localhost:5000/user/", { withCredentials: true })
    //   .then(function (response) {
    //     var isPresent = response.data.isPresent;
    //     var userDetails = response.data.userDetails;
    //     console.log("This");
    //     console.log(response.data);
    //     setUser(response.data.userName);
    //     if (isPresent && userDetails.isOnboarded) {
    //       setOnboarded(true);
    //     } else {
    //       setOnboarded(false);
    //     }
    //     console.log(JSON.stringify(response));
    //     setAuth(JSON.stringify(response.data));
    //   })
    //   .catch(function (error) {
    //     alert("Bye");
    //     alert("Login Failed.");
    //     alert(error);
    //     return <Redirect to="/" />;
    //   });
  };

  return (
    <main>
      <div className="w-100 d-flex justify-content-center">
        <Loader />
        {loggedIn && isOnboarded && (
          <Redirect to={{ pathname: "/dashboard" }} />
        )}
        {loggedIn && !isOnboarded && (
          <Redirect to={{ pathname: "/onboarding" }} />
        )}
        <Redirect to="/" />
      </div>
    </main>
  );
}

export default ProcessLogin;
