import React, { useState } from "react";
import { useEffect } from "react";
import Onboarding from "./onboarding";
import Loader from "../common/loader";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth";

export function OnboardingStageOne({ navigate }) {

  return (
    <div>
      <div className="pt-5">
          <div className="container-fluid">
            <div className="container-fluid row d-flex justify-content-center">
              <i className="far fa-smile" style={{ fontSize: "100px" }} />
            </div>
            <div className="container-fluid row d-flex justify-content-center">
              <h1>Welcome to the Virtual Legal Clinic!</h1>
            </div>
            <div className="container-fluid row d-flex justify-content-center p-5">
              <h3>Looks like it's your first time here.</h3>
            </div>
            <div className="container-fluid row d-flex justify-content-center">
              <h4>We will need to obtain some information before we start.</h4>
            </div>
            <div className="container-fluid row d-flex justify-content-center">
              <h4>
                Give us permission to get your personal details from MyInfo.
              </h4>
            </div>
            <div className="container-fluid row d-flex justify-content-center">
              <button className="btn btn-primary" onClick={navigate}>
                Go to MyInfo
              </button>
            </div>
          </div>
      </div>
    </div>
  );
}

export function OnboardingStageTwo({ navigate }) {
  const { name, occupation, dob } = useAuth();


  return (
    <div className="pt-5">
      <div className="container-fluid">
        <div className="container-fluid row d-flex justify-content-center">
          <h1>Here is the information we've obtained.</h1>
        </div>
        <div className="container-fluid row d-flex justify-content-center p-5">
          <div className="col-4">
            <div className="row container-fluid">
              <h5>Name</h5>
            </div>
            <div className="row container-fluid">
              <h6>{name}</h6>
            </div>
            <div className="row container-fluid">
              <h5>Occupation</h5>
            </div>
            <div className="row container-fluid">
              <h6>{occupation}</h6>
            </div>
            <div className="row container-fluid">
              <h5>Date of Birth</h5>
            </div>
            <div className="row container-fluid">
              <h6>{dob}</h6>
            </div>
          </div>
        </div>
        <div className="container-fluid row d-flex justify-content-center">
          <button className="btn btn-primary" onClick={navigate}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export function OnboardingStageThree({ navigate }) {
  return (
    <div className="pt-5">
      <div className="container-fluid">
        <div className="container-fluid row d-flex justify-content-center">
          <h1>We just have a few more questions.</h1>
        </div>
        <form action>
          <div className="container-fluid row d-flex justify-content-center p-5">
            <div className="col-4">
              <div className="row container-fluid">
                <h5>How many people live in the same house as you?</h5>
              </div>
              <div className="row container-fluid">
                <input type="text" className="form-control" required />
              </div>
              <div className="row container-fluid pt-3">
                <h5>
                  What is the estimated amount of savings that you have? (not
                  including CPF)
                </h5>
              </div>
              <div className="row container-fluid">
                <input type="text" className="form-control" required />
              </div>
              <div className="row container-fluid pt-5">
                <input
                  className="form-check-input"
                  type="checkbox"
                  defaultValue
                  id="declare"
                  required
                />
                <label className="form-check-label" htmlFor="defaultCheck1">
                  I declare that the above information is accurate.
                </label>
              </div>
            </div>
          </div>
          <div className="container-fluid row d-flex justify-content-center">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={navigate}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function OnboardingStageFour({ navigate }) {
  return (
    <div className="pt-5">
      <div className="container-fluid">
        <div className="container-fluid row d-flex justify-content-center">
          <h1>Thank you for verifying your information with us.</h1>
        </div>
        <div className="container-fluid row d-flex justify-content-center pt-5">
          <h4>
            We have determined that you are eligible for legal aid at the VLC.
          </h4>
        </div>
        <div className="container-fluid row d-flex justify-content-center pt-3">
          <button className="btn btn-primary" type="submit" onClick={navigate}>
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
