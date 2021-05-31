import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Loader from "../common/loader";
import { useAuth } from "../../context/auth";
import queryString from "query-string";
const axios = require("axios");

function ProcessMyinfo(props) {
  const { userid } = useAuth();
  const [isFirstRun, setFirstRun] = useState(true);
  const [success, setSuccess] = useState(false);
  // const [myInfoData, setMyInfoData] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [onboardingData, setOnboardingData] = useState(null);

  useEffect(async () => {
    if (isFirstRun && userid != null) {
      setFirstRun(false);
      let params = queryString.parse(props.location.search);
      let authCode = params.code;
      let myinfoData = {};
      axios.defaults.withCredentials = true;
      await axios
        .post("http://localhost:5000/login/getPersonData", {
          code: authCode,
        })
        .then(function (response) {
          myinfoData = response.data
          setSuccess(true);
        })
        .catch(function (error) {
          alert("failed");
          alert(error);
        });
        try {
          let data = {
            name: myinfoData.text.name.value,
            dob: myinfoData.text.dob.value,
            occupation: myinfoData.text.occupation.value,
            role: myinfoData.text.occupation.value.toLowerCase().includes("lawyer") ? "LAWYER" : "APPLICANT",
            onboardingStage: 2,
          };
          await axios
            .put("http://localhost:5000/user/" + userid, data)
            .then(function (response) {
              setLoading(false);
            })
            .catch(function (error) {
              alert("put failed");
              alert(error);
            });
        } catch(err) {
          alert(err)
        }
      
    }
  }, [userid]);

  return (
    <main>
      <div className="w-100 d-flex justify-content-center">
        {loading ? (
          <Loader />
        ) : (
          <Redirect
            to={{
              pathname: "/dashboard"
            }}
          />
        )}
      </div>
    </main>
  );
}

export default ProcessMyinfo;
