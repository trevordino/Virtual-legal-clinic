import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "universal-cookie";

import { singpassAuthApiUrl, clientId, singpassRedirectUrl } from "../utils/authConst";
import { Redirect } from "react-router-dom";

const AuthContext = createContext({});
const cookies = new Cookies();
const axios = require("axios");


function AuthProvider(props) {
  let role = null;
  const [userid, setUserid] = useState(null);
  const [name, setName] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [expertise, setExpertise] = useState(null);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [onboardingStage, setOnboardingStage] = useState(0);
  const [dob, setDob] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [authToken, setAuthToken] = useState(JSON.stringify(cookies.get("connect.sid")));
  const [loggedIn, setLoggedIn] = useState(false);
  
  
  

  useEffect( async () => {
    // alert('rerender ')
    // getUser();
    await axios
      .get("http://localhost:5000/user/", { withCredentials: true })
      .then(function (response) {
        let data = response.data
        let userDetails = data.userDetails
        setUserid(data.userName);
        setName(userDetails.name)
        setUserRole(userDetails.role)
        setExpertise(userDetails.expertise)
        setOnboardingStage(userDetails.onboardingStage);
        setDob(userDetails.dob);
        setOccupation(userDetails.occupation);
        setIsOnboarded(userDetails.isOnboarded)
        setAuthToken(JSON.stringify(data));
        setLoggedIn(true)
        console.log(authToken);
      })
      .catch(function (error) {
        setLoggedIn(false)
        // alert("Not logged in");
        // return <Redirect to="/" />;
      });
  }, [authToken, loggedIn]);

  async function login() {
    var authoriseUrl = singpassAuthApiUrl
    window.location.href = authoriseUrl;
  }

  const logout = () => {
    cookies.remove("connect.sid");
    setUserid(null);
    setAuthToken(null);
    setLoggedIn(false);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider
      value={{
        loggedIn,
        userid,
        name,
        expertise,
        dob,
        occupation,
        authToken,
        userRole,
        isOnboarded,
        onboardingStage,
        login,
        logout,
        setUserRole,
      }}
      {...props}
    />
  );
}

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };
