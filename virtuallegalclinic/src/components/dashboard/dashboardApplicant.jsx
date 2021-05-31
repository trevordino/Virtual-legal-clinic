import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import Loader from "../common/loader";
import { Link } from "react-router-dom";
const moment = require("moment");

export default function DashboardApplicant(props) {
  const { userRole, userid } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isUpcomingLoaded, setIsUpcomingLoaded] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState(["a"]);
  const [isPastLoaded, setIsPastLoaded] = useState(false);
  const [pastMeetings, setPastMeetings] = useState(["a"]);

  useEffect(async () => {
    setLoading(false);
    await axios
      .get("http://localhost:5000/meeting/future/" + userRole + "/" + userid)
      .then(function (response) {
        let result = response.data;
        for (const aMeeting of result) {
          aMeeting.startTime = new Date(aMeeting.startTime).toString();
        }
        setUpcomingMeetings(result);
        setIsUpcomingLoaded(true);
      })
      .catch(function (error) {
        alert("Failed to obtain future meetings");
        alert(error);
      });
    await axios
      .get("http://localhost:5000/meeting/past/" + userRole + "/" + userid)
      .then(function (response) {
        let result = response.data;
        for (const aMeeting of result) {
          aMeeting.startTime = new Date(aMeeting.startTime).toString();
        }
        setPastMeetings(result);
        setIsPastLoaded(true);
      })
      .catch(function (error) {
        alert("Failed to obtain past meetings");
        alert(error);
      });
  }, [userRole]);

  return (
    <div>
      <div className="container col-md-8 my-5" style={{ height: "44px" }}>
        <h2 className="text-center">Upcoming Meeting</h2>
      </div>
      {!isUpcomingLoaded ? (
        <div className="w-100 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        [
          upcomingMeetings.length == 0 ? (
            <div id="upcomingAccordian" className="container col-md-8">
              <div className="card">
                <div className="card-header" id="headingOne" style={{ borderRightWidth: "38px", borderRadius: "0px", background: "#9F2943" }}>
                  <h5 className="mb-0" style={{ color: "white" }}>
                    You have no upcoming meetings.
                  </h5>
                </div>
                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#upcomingAccordian">
                  <div className="card-body">
                    <p className="card-text">You can set a new meeting below.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            [
              <div id="upcomingAccordian" className="container col-md-8">
                {upcomingMeetings.map((aMeeting, index) => (
                  <div className="card" key={index}>
                    <div className="card-header" id={"upcoming" + index} style={{ borderRightWidth: "38px", borderRadius: "0px", background: "#9F2943" }}>
                      <h5 className="mb-0">
                        <a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ color: "rgb(255,253,253)" }}>
                          {aMeeting.startTime} ({aMeeting.taxonomy})
                        </a>
                      </h5>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                      <div className="card-body">
                        <p className="card-text">
                          You have an upcoming meeting on {aMeeting.startTime}. Your meeting status is {aMeeting.status}. You can access the online meeting by clicking the button at the scheduled
                          time.
                        </p>
                        <div className="row d-flex justify-content-center">
                          <div className="col">
                            <Link
                              to={{
                                pathname: "/meeting",
                                state: { meetingLink: aMeeting.meetingLink },
                              }}
                            >
                              <button className="btn btn-primary mx-auto d-block" type="button">
                                Join Your Meeting
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>,
            ]
          ),
        ]
      )}
      <section className="features-boxed">
        <div className="container-fluid" style={{ width: "100%", margin: 0 }}>
          <div className="intro my-5">
            <h2 className="text-center">New Meeting</h2>
            <h6 className="text-center"> To set a new meeting, choose one of the options below.</h6>
          </div>
          <div className="col-10 container-fluid justify-content-center ">
            <div className="row features d-flex justify-content-center">
              <div className="col-sm-6 col-md-5 col-lg-4 item">
                <Link to="/scheduler">
                  <div className="box" style={{ height: "297px" }}>
                    <i className="fa fa-calendar icon" style={{ textShadow: "0px 0px" }} />
                    <h3 className="name">Set a meeting date</h3>
                    <p className="description">Schedule a video conferencing session with a pro bono lawyer.</p>
                  </div>
                </Link>
              </div>
              <div className="col-sm-6 col-md-5 col-lg-4 item">
                <a>
                  <div className="box" style={{ height: "297px" }}>
                    <i className="fa fa-exclamation-circle icon" />
                    <h3 className="name">Speak to a lawyer now</h3>
                    <p className="description">Check if any of our lawyers are online for an urgent consultation.</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="container col-md-8 my-5" style={{ height: "47px" }}>
        <h2 className="d-flex justify-content-center">Past Meeting</h2>
      </div>
      {!isPastLoaded ? (
        <div className="w-100 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        [
          pastMeetings.length == 0 ? (
            <div id="pastAccordian" className="container col-md-8">
              <div className="card">
                <div className="card-header" id="headingOne" style={{ borderRightWidth: "38px", borderRadius: "0px", background: "#9F2943" }}>
                  <h5 className="mb-0" style={{ color: "white" }}>
                    You have no past meetings.
                  </h5>{" "}
                </div>
                <div id="pastAccordian" className="container col-md-8" aria-labelledby="headingOne2" data-parent="#pastAccordian">
                  <div class="card-body">
                    <p class="class-text m-0"> Your past meeting records will be displayed here.</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            [
              <div id="pastAccordian" className="container col-md-8">
                {pastMeetings.map((aMeeting, index) => (
                  <div className="card" key={index}>
                    <div className="card-header" id={"upcoming" + index} style={{ borderRightWidth: "38px", borderRadius: "0px", background: "#9F2943" }}>
                      <h5 className="mb-0">
                        <a data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" style={{ color: "rgb(255,253,253)" }}>
                          {aMeeting.startTime} ({aMeeting.taxonomy})
                        </a>
                      </h5>
                    </div>
                    <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                      <div className="card-body">
                        <p className="card-text">Your meeting was on {aMeeting.startTime}. You can view any meeting information below.</p>
                        <div className="row d-flex justify-content-center">
                          <div className="col">
                            <button className="btn btn-primary mx-auto d-block" type="button">
                              View meeting info
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>,
            ]
          ),
        ]
      )}
    </div>
  );
}
