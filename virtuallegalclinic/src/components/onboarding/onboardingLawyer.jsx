import React, { useState } from "react";
import "./../../assets/css/Scheduler/scheduler.css";
import "./../../assets/css/app_triage_page.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

export default function OnboardingLawyer({ navigate }) {
  const { userid } = useAuth();
  const { handleSubmit, register } = useForm();
  const onSubmit = async (data) => {
    // setDataSubmit(data);
    if (data.taxonomy.length == 0 && data.others == "") {
      alert("Selection of Taxonomy is required");
      return;
    }
    var taxonomyArray = []
    if (data.taxonomy.length != 0) {
      taxonomyArray = taxonomyArray.concat(data.taxonomy)
    }
    if (data.others != "") {
      taxonomyArray.push(data.others)
    }
    var data = {
      expertise: taxonomyArray.join(', '),
      isOnboarded: true,
      onboardingStage: 5
    }
    await axios
        .put("http://localhost:5000/user/" + userid, data)
        .then(function (response) {
          window.location = "/";
        })
        .catch(function (error) {
          alert("put failed");
          alert(error);
        });
  };

  return (
    <div className="col-md-10 mx-auto">
      <div className="container-fluid d-flex justify-content-center">
        <h1 className="py-5">Select Your Area of Expertise</h1>
      </div>

      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <div className="btn-toolbar justify-content-center">
              <div className="row w-100">
                <div className="col-xs-6 col-sm-4 chkbox-grid p-2">
                  <input type="checkbox" value="Family" name="taxonomy" id="family" ref={register} />
                  <label htmlFor="family">
                    <i
                      className="fas fa-home"
                      style={{
                        margin: "6px",
                        padding: "0px",
                        width: "-7px",
                        height: "23px",
                      }}
                    />
                    <strong
                      style={{
                        padding: "0px",
                        margin: "0px",
                        width: "-7px",
                        height: "23px",
                        fontSize: "16px",
                      }}
                    >
                      Family
                    </strong>
                    <div />
                    <div className="row justify-content-center pt-0">
                      <p>Areas including:</p>
                    </div>
                    <div>
                      <ul>
                        <li>Divorce</li>
                        <li>Adoption</li>
                        <li>Child Custody</li>
                        <li>Maintenance</li>
                        <li>Family Violence</li>
                      </ul>
                    </div>
                  </label>
                </div>
                <div className="col-xs-6 col-sm-4 chkbox-grid p-2">
                  <input type="checkbox" value="Criminal" name="taxonomy" id="criminal" ref={register} />
                  <label htmlFor="criminal">
                    <i
                      className="far fa-life-ring"
                      style={{
                        margin: "6px",
                        padding: "0px",
                        width: "-7px",
                        height: "23px",
                      }}
                    />
                    <strong
                      style={{
                        padding: "0px",
                        margin: "0px",
                        width: "-7px",
                        height: "23px",
                        fontSize: "16px",
                      }}
                    >
                      Criminal
                    </strong>
                    <div />
                    <div className="row justify-content-center pt-0">
                      <p>Areas including:</p>
                    </div>
                    <div>
                      <ul>
                        <li>Theft</li>
                        <li>Assault</li>
                        <li>Extortion</li>
                        <li>Sexual Crimes</li>
                        <li>Misuse of Drugs</li>
                      </ul>
                    </div>
                  </label>
                </div>
                <div className="col-xs-6 col-sm-4 chkbox-grid p-2">
                  <input type="checkbox" value="Contract" name="taxonomy" id="contract" ref={register} />
                  <label htmlFor="contract">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 24 24"
                      fill="none"
                      style={{
                        margin: "6px",
                        padding: "0px",
                        width: "-7px",
                        height: "23px",
                      }}
                    >
                      <path
                        d="M9 17V15M12 17V13M15 17V11M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L18.7071 8.70711C18.8946 8.89464 19 9.149 19 9.41421V19C19 20.1046 18.1046 21 17 21Z"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <strong
                      style={{
                        padding: "0px",
                        margin: "0px",
                        width: "-7px",
                        height: "23px",
                        fontSize: "16px",
                      }}
                    >
                      Contract
                    </strong>
                    <div />
                    <div className="row justify-content-center pt-0">
                      <p>Areas including:</p>
                    </div>
                    <div>
                      <ul>
                        <li>Loans</li>
                        <li>Personal Contracts</li>
                        <li>Excludes contracts relating to property</li>
                      </ul>
                    </div>
                  </label>
                </div>
                <div className="col-xs-6 col-sm-4 chkbox-grid p-2">
                  <input type="checkbox" value="Harassment" name="taxonomy" id="harrassment" ref={register} />
                  <label htmlFor="harrassment">
                    <i
                      className="far fa-angry"
                      style={{
                        margin: "6px",
                        padding: "0px",
                        width: "-7px",
                        height: "23p",
                      }}
                    />
                    <strong
                      style={{
                        padding: "0px",
                        margin: "0px",
                        width: "-7px",
                        height: "23px",
                        fontSize: "16px",
                      }}
                    >
                      Harassment
                    </strong>
                    <div />
                    <div className="row justify-content-center pt-2">
                      <p>Areas including:</p>
                    </div>
                    <div>
                      <ul>
                        <li>Workplace Harassment</li>
                        <li>Defamation</li>
                        <li>Online Bullying</li>
                        <li>Stalking</li>
                      </ul>
                    </div>
                  </label>
                </div>
                <div className="col-xs-6 col-sm-4 chkbox-grid p-2">
                  <input type="checkbox" value="Real Estate" name="taxonomy" id="realestate" ref={register} />
                  <label htmlFor="realestate">
                    <i
                      className="far fa-handshake"
                      style={{
                        margin: "6px",
                        padding: "0px",
                        width: "-7px",
                        height: "23px",
                      }}
                    />
                    <strong
                      style={{
                        padding: "0px",
                        margin: "0px",
                        width: "-7px",
                        height: "23px",
                        fontSize: "16px",
                      }}
                    >
                      Real Estate
                    </strong>
                    <div />
                    <div className="row justify-content-center pt-0">
                      <p>Areas including:</p>
                    </div>
                    <div>
                      <ul>
                        <li>Lease</li>
                        <li>Ownership</li>
                      </ul>
                    </div>
                  </label>
                </div>
                <div className="col-xs-6 col-sm-4 chkbox-grid p-2">
                  <input type="checkbox" name="taxonomy" value="Employment" id="employment" ref={register} />
                  <label htmlFor="employment">
                    <i
                      className="far fa-angry"
                      style={{
                        margin: "6px",
                        padding: "0px",
                        width: "-7px",
                        height: "23p",
                      }}
                    />
                    <strong
                      style={{
                        padding: "0px",
                        margin: "0px",
                        width: "-7px",
                        height: "23px",
                        fontSize: "15px",
                      }}
                    >
                      Employment
                    </strong>
                    <div />
                    <div className="row justify-content-center pt-2">
                      <p>Areas including:</p>
                    </div>
                    <div>
                      <ul>
                        <li>Employment Contract</li>
                        <li>Workplace Injury</li>
                      </ul>
                    </div>
                  </label>
                </div>
                <div className="col-xs-6 col-sm-4 chkbox-grid p-2">
                  <input type="checkbox" name="taxonomy" value="Personal Injury" id="personalinjury" ref={register} />
                  <label htmlFor="personalinjury">
                    <i
                      className="far fa-angry"
                      style={{
                        margin: "6px",
                        padding: "0px",
                        width: "-7px",
                        height: "23p",
                      }}
                    />
                    <strong
                      style={{
                        padding: "0px",
                        margin: "0px",
                        width: "-7px",
                        height: "23px",
                        fontSize: "16px",
                      }}
                    >
                      Personal Injury
                    </strong>
                    <div />
                    <div className="row justify-content-center pt-2">
                      <p>Areas including:</p>
                    </div>
                    <div>
                      <ul>
                        <li>Medical Negligence</li>
                      </ul>
                    </div>
                  </label>
                </div>
                <div className="col-xs-6 col-sm-4 chkbox-grid p-2">
                  <input type="checkbox" value="Personal Status" name="taxonomy" id="personalstatus" ref={register} />
                  <label htmlFor="personalstatus">
                    <i
                      className="far fa-angry"
                      style={{
                        margin: "6px",
                        padding: "0px",
                        width: "-7px",
                        height: "23p",
                      }}
                    />
                    <strong
                      style={{
                        padding: "0px",
                        margin: "0px",
                        width: "-7px",
                        height: "23px",
                        fontSize: "16px",
                      }}
                    >
                      Personal Status
                    </strong>
                    <div />
                    <div className="row justify-content-center pt-2">
                      <p>Areas including:</p>
                    </div>
                    <div>
                      <ul>
                        <li>Bankruptcy</li>
                      </ul>
                    </div>
                  </label>
                </div>
              </div>
              <p style={{ fontSize: "16px", paddingTop: "20px" }} >
                If others, please indicate them below:
              </p>
              <input className="form-control m-0 w-100" type="text" name="others" id="othersInput" ref={register} />
            </div>
          </div>
          <button className="btn btn-primary btn btn-primary mx-auto d-block" type="submit" style={{ background: "#9F2943", margin: "44px" }}>
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
