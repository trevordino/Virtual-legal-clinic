import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { v1 as uuidv1 } from "uuid";
import "../../assets/css/app_triage_page.css";
import "../../assets/css/Scheduler/scheduler.css";
import { useAuth } from "../../context/auth";
const axios = require("axios");

export default function Triage(props) {
  const { userid, name } = useAuth();
  const [nameInput, setNameInput] = useState("");
  const [relationshipInput, setRelationshipInput] = useState("");
  const [issueInput, setIssueInput] = useState("");
  const [questionInput, setQuestionInput] = useState("");
  const [selectedSlot, setselectedSlot] = useState(props.location.state.slot);
  const [taxonomy, setTaxonomy] = useState(null);
  const [slotStartTime, setSlotStartTime] = useState(props.location.state.slotStart);
  const [slotEndTime, setSlotEndTime] = useState(props.location.state.slotEnd);
  const [slotDate, setSlotDate] = useState(props.location.state.slotDate);
  const [completed, setCompleted] = useState(false);

  const handleForm = (event) => {
    event.preventDefault();
    if (taxonomy == null) {
      alert("Selection of Taxonomy is required");
      return;
    }

    var data = {
      slotDate: slotDate,
      meetingId: userid + "-" + slotStartTime.toJSON().slice(0, 10) + "-" + selectedSlot,
      meetingLink: uuidv1(),
      slotId: selectedSlot,
      startTime: slotStartTime,
      endTime: slotEndTime,
      applicantId: userid,
      applicantName: name,
      partyName: nameInput,
      relationship: relationshipInput,
      facts: issueInput,
      questions: questionInput,
      taxonomy: taxonomy,
    };

    axios
      .post("http://localhost:5000/meeting/", data)
      .then(function (response) {
        setCompleted(true);
      })
      .catch(function (response) {
        alert("Error: " + JSON.stringify(response.data));
      });
  };

  if (completed) {
    return (
      <Redirect
        to={{
          pathname: "/confirmation",
        }}
      />
    );
  }

  return (
    <div>
      <form onSubmit={handleForm} className="col-7 mx-auto">
        <div className="heading-container">
          <h1 className="heading pt-5">Step 2 of 2</h1>
        </div>
        <div className="form-group">
          <p style={{ fontSize: "16px" }}>1. Please select a button which best describes your issue.</p>
          <div className="btn-toolbar question-1">
            <div className="row">
              <div className="col-xs-6 col-sm-4 chkbox-grid">
                <input type="radio" name="taxonomy" id="family" onClick={(e) => setTaxonomy(e.target.id)} />
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
                    }}
                  >
                    Family
                  </strong>
                  <div />
                  <div className="row">
                    <span className="badge badge-primary mx-auto text-center">Examples</span>
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
              <div className="col-xs-6 col-sm-4 chkbox-grid">
                <input type="radio" name="taxonomy" id="criminal" onClick={(e) => setTaxonomy(e.target.id)} />
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
                    }}
                  >
                    Criminal
                  </strong>
                  <div />
                  <div className="row">
                    <span className="badge badge-primary mx-auto text-center">Examples</span>
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
              <div className="col-xs-6 col-sm-4 chkbox-grid">
                <input type="radio" name="taxonomy" id="contract" onClick={(e) => setTaxonomy(e.target.id)} />
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
                    }}
                  >
                    Contract
                  </strong>
                  <div />
                  <div className="row">
                    <span className="badge badge-primary mx-auto text-center">Examples</span>
                  </div>
                  <div>
                    <ul>
                      <li>Employment Contract</li>
                      <li>Bill Payments</li>
                      <li>Personal Loans</li>
                      <li>Lease and Property</li>
                      <li>Personal Goods</li>
                    </ul>
                  </div>
                </label>
              </div>
              <div className="col-xs-6 col-sm-4 chkbox-grid">
                <input type="radio" name="taxonomy" id="harrassment" onClick={(e) => setTaxonomy(e.target.id)} />
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
                    }}
                  >
                    Harassment
                  </strong>
                  <div />
                  <div className="row">
                    <span className="badge badge-primary mx-auto text-center">Examples</span>
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
              <div className="col-xs-6 col-sm-4 chkbox-grid">
                <input type="radio" name="taxonomy" id="others" onClick={(e) => setTaxonomy(e.target.id)} />
                <label htmlFor="others">
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
                    }}
                  >
                    Others
                  </strong>
                  <div />
                  <div className="row">
                    <span className="badge badge-primary mx-auto text-center">Examples</span>
                  </div>
                  <div>
                    <ul>
                      <li>Traffic Accidents</li>
                      <li>Medical Negligence</li>
                      <li>Bankruptcy</li>
                      <li>Citizen Status</li>
                    </ul>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <ul />
        </div>
        <div className="mx-auto">
          <p
            className="col-md-6"
            style={{
              fontSize: "16px",
            }}
          >
            2. Who is the other party?
          </p>
          <small className="form-text text-muted" style={{ margin: "16px", color: "var(--gray-dark)" }}>
            *This is to check for conflicts
          </small>
          <input
            type="text"
            id="nameInput"
            value={nameInput}
            onChange={(event) => setNameInput(event.target.value)}
            className="form-control"
            type="text"
            style={{ margin: "16px", padding: "0px" }}
            required
          />
          <p style={{ margin: "16px", fontSize: "16px" }}>3. Relationship with Other Party</p>
          <input
            type="text"
            id="relationshipInput"
            value={relationshipInput}
            onChange={(event) => setRelationshipInput(event.target.value)}
            className="form-control"
            type="text"
            style={{ margin: "16px", padding: "0px" }}
            required
          />
        </div>
        <div>
          <p
            style={{
              padding: "px",
              margin: "16px",
              fontSize: "16px",
              marginLeft: "30px",
            }}
          >
            4. Describe your legal issue.
          </p>
          <small className="form-text text-muted col-md-6" style={{ margin: "16px", color: "var(--gray-dark)" }}>
            Suggested format:
            <ul>
              <li>What is the legal issue?</li>
              <li>When did it happen?</li>
              <li>Where did it happen</li>
              <li>Why it happened?</li>
              <li>How did it happen?</li>
            </ul>
          </small>
          <textarea
            type="text"
            required
            id="issueInput"
            value={issueInput}
            onChange={(event) => setIssueInput(event.target.value)}
            className="form-control"
            rows="4"
            columns="50"
            maxlength="255"
            style={{
              margin: "16px",
              height: "500px",
            }}
            required
          />
        </div>
        <div>
          <p style={{ margin: "16px", fontSize: "16px" }}>5. What questions would you like to ask the lawyer?</p>
          <small
            className="form-text text-muted"
            style={{
              margin: "16px",
              color: "var(--gray-dark)",
            }}
          >
            *Please be specific
          </small>
          <textarea
            type="text"
            required
            id="questionInput"
            value={questionInput}
            onChange={(event) => setQuestionInput(event.target.value)}
            className="form-control"
            rows="4"
            columns="50"
            maxlength="255"
            style={{
              margin: "16px",
              height: "300px",
            }}
            placeholder="Example: What should I do after this?"
            required
          />
          <p style={{ padding: "px", margin: "16px", fontSize: "16px" }}>6. Please upload your supporting documents here (if any).</p>
          <div className="custom-file">
            <input type="file" className="custom-file-input" id="validatedCustomFile" />
            <label className="custom-file-label" htmlFor="validatedCustomFile">
              Choose file...
            </label>
            <div className="invalid-feedback">Example invalid custom file feedback</div>
          </div>
        </div>
        <div>
          <br />
          <div className="form-group ">
            <div className="form-check">
              <input className="form-check-input is-invalid" type="checkbox" defaultValue id="invalidCheck3" required />
              <label className="form-check-label" style={{ marginLeft: "15px" }} htmlFor="invalidCheck3">
                I agree to terms and conditions
              </label>
              <div className="invalid-feedback" style={{ marginLeft: "15px" }}>
                You must agree before submitting.
              </div>
            </div>
            <div class="btn-toolbar">
              <button
                className="btn btn-primary btn btn-primary mx-auto"
                type="submit"
                style={{
                  background: "#9F2943",
                  margin: "44px",
                  marginInline: "30px",
                }}
              >
                Submit Form
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
