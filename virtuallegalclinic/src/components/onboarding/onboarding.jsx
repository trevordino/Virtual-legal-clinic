import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { OnboardingStageOne, OnboardingStageTwo, OnboardingStageThree, OnboardingStageFour } from "./onboardingStage";
import OnboardingLawyer from "./onboardingLawyer";

import { clientId, attributes, myinfoRedirectUrl, myinfoAuthApiUrl } from "../../utils/authConst";
import { useAuth } from "../../context/auth";
import axios from "axios";

function Onboarding(props) {
  const { userName, onboardingStage, userRole } = useAuth();
  const [currentStage, setCurrentStage] = useState(onboardingStage);
  const [renderOnboarding, setRenderOnboarding] = useState("Loading");

  if (props.currentStage != null) {
    currentStage = props.currentStage;
  }

  if (currentStage == null) {
    currentStage = 1;
  }

  return (
    <main>
      {/* <h5>Onboarding Stage {currentStage}</h5>
      <h5>Role: {userRole}</h5> */}
      <OnboardingStage currentStage={currentStage} userName={userName} />
    </main>
  );
}

function OnboardingStage(props) {
  const { userRole, userid } = useAuth();
  const [currStage, setcurrStage] = useState(props.currentStage);

  function navigateOne() {
    var purpose = "VLC";
    var state = "applicant";

    var authoriseUrl = myinfoAuthApiUrl + "?client_id=" + clientId + "&attributes=" + attributes + "&purpose=" + purpose + "&state=" + encodeURIComponent(state) + "&redirect_uri=" + myinfoRedirectUrl;

    window.location = authoriseUrl;
  }

  async function navigateTwo() {
    if (userRole == "LAWYER") {
      setcurrStage(13);
    } else {
      setcurrStage(3);
    }
    let data = {
      onboardingStage: userRole == "LAWYER" ? 13 : 3,
    };
    await axios
      .put("http://localhost:5000/user/" + userid, data)
      .then(function (response) {})
      .catch(function (error) {
        alert("put failed");
        alert(error);
      });
  }

  async function navigateThree() {
    let data = {
      onboardingStage: 4,
    };
    await axios
      .put("http://localhost:5000/user/" + userid, data)
      .then(function (response) {})
      .catch(function (error) {
        alert("put failed");
        alert(error);
      });
    setcurrStage(4);
  }

  async function navigateFour() {
    let data = {
      onboardingStage: 5,
      isOnboarded: true,
    };
    await axios
      .put("http://localhost:5000/user/" + userid, data)
      .then(function (response) {})
      .catch(function (error) {
        alert("put failed");
        alert(error);
      });
    window.location = "/dashboard";
  }

  useEffect(() => {
    switch (currStage) {
      case 13:
        return <OnboardingLawyer />;
      case 1:
        return <OnboardingStageOne navigate={navigateOne} />;
      case 2:
        return <OnboardingStageTwo navigate={navigateTwo} />;
      case 3:
        return <OnboardingStageThree navigate={navigateThree} />;
      case 4:
        return <OnboardingStageFour navigate={navigateFour} />;
    }
  });

  switch (currStage) {
    case 13:
      return <OnboardingLawyer />;
    case 1:
      return <OnboardingStageOne navigate={navigateOne} />;
    case 2:
      return <OnboardingStageTwo navigate={navigateTwo} />;
    case 3:
      return <OnboardingStageThree navigate={navigateThree} />;
    case 4:
      return <OnboardingStageFour navigate={navigateFour} />;
  }
}
export default Onboarding;
