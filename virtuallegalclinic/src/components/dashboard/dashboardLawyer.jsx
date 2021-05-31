import React, { useState, useEffect } from "react";
import "../../assets/css/dashboard/dashboard.css";
import Loader from "../common/loader";
import { Accordion, Card, Button } from "react-bootstrap";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Link } from "react-router-dom";

function DashboarLawyer(props) {
  const { userRole, userid } = useAuth();
  const [isUpcomingLoaded, setIsUpcomingLoaded] = useState(false);
  const [upcomingMeetings, setUpcomingMeetings] = useState([]);

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/meeting/future/" + userRole + "/" + userid)
      .then(function (response) {
        setUpcomingMeetings(response.data);
        setIsUpcomingLoaded(true);
      })
      .catch(function (error) {
        alert("Failed to obtain meetings");
        alert(error);
      });
  }, [userRole, userid]);

  return (
    <main>
      <div>
        <section className="features-boxed">
          <div className="container-fluid" style={{ width: "100%", margin: 0 }}>
            <div className="intro my-5">
              <h2 className="text-center">New Meeting</h2>
              <h6 className="text-center"> To volunteer, choose one of the options below.</h6>
            </div>
            <div className="col-10 container-fluid justify-content-center ">
              <div className="row features d-flex justify-content-center">
                <div className="col-sm-6 col-md-5 col-lg-4 item">
                  <Link to="/scheduler">
                    <div className="box" style={{ height: "297px" }}>
                      <i className="fa fa-calendar icon" style={{ textShadow: "0px 0px" }} />
                      <h3 className="name">Volunteer for a sesssion</h3>
                      <p className="description" col-md-7>
                        Select a date for volunteering.
                      </p>
                    </div>
                  </Link>
                </div>
                <div className="col-sm-6 col-md-5 col-lg-4 item">
                  <a>
                    <div className="box" style={{ height: "297px" }}>
                      <i className="fa fa-exclamation-circle icon" />
                      <h3 className="name">Join unscheduled live meeting</h3>
                      <p className="description">Speak with an applicant now.</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className="container col-md-8 my-5" style={{ height: "47px" }}>
          <h2 className="d-flex justify-content-center">Upcoming Meetings</h2>
        </div>
      </div>
      {!isUpcomingLoaded ? (
        <div className="w-100 d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        [
          upcomingMeetings.length == 0 ? (
            <div>
              <div id="upcomingAccordian" className="container col-md-8">
                <div className="card">
                  <div className="card-header" id="headingOne" style={{ borderRightWidth: "38px", borderRadius: "0px", background: "#9F2943" }}>
                    <h5 className="mb-0" style={{ color: "white" }}>
                      You have no upcoming meetings.
                    </h5>
                  </div>
                  <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#upcomingAccordian">
                    <div className="card-body">
                      <p className="card-text">You can set a new meeting above.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            [
              <div>
                <Accordion defaultActiveKey="0">
                  {upcomingMeetings.map((aMeeting, index) => (
                    <Card key={index}>
                      <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={index + 1}>
                          {new Date(aMeeting.startTime).toString()}: {aMeeting.applicantName} ({aMeeting.taxonomy})
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey={index + 1}>
                        <Card.Body>
                          <Link
                            className="btn btn-primary buttonfacts"
                            to={{
                              pathname: "/facts",
                              state: { meetingId: aMeeting.meetingId },
                            }}
                          >
                            Facts of the Case
                          </Link>
                          <Link
                            className="btn btn-primary buttonz"
                            to={{
                              pathname: "/meeting",
                              state: { meetingLink: aMeeting.meetingLink },
                            }}
                          >
                            Meeting Link
                          </Link>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))}
                </Accordion>
              </div>,
            ]
          ),
        ]
      )}
    </main>
  );
}
export default DashboarLawyer;
