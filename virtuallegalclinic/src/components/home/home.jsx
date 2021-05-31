import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "../../assets/css/home/home.css";
import { useAuth } from "../../context/auth";

export default function Home(props) {
  const { login, loggedIn, isOnboarded, setApplicant } = useAuth();

  if (loggedIn) {
    if (isOnboarded) {
      return <Redirect to={{ pathname: "/dashboard" }} />;
    } else {
      return <Redirect to={{ pathname: "/onboarding" }} />;
    }
  }

  return (
    <main>
      {/* {this.state.loading ? <Loading /> : null} */}
      <div>
        <header
          className="masthead"
          style={{
            backgroundImage: "url(" + "../assets/img/supcourt.jpg" + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            height: "85vh",
          }}
        >
          <div className="container">
            <div className="intro-text text-center">
              <div className="intro-heading text-uppercase" style={{ fontFamily: '"Droid Serif"' }}>
                <span
                  style={{
                    fontSize: "50px",
                    left: "255px",
                    color: "white",
                    boxShadow: "0px 0px",
                    borderColor: "rgb(0,0,0)",
                    filter: "brightness(150%)",
                    fontFamily: "Montserrat, HELVETICA",
                  }}
                >
                  VIRTUAL LEGAL CLINIC
                </span>
              </div>
              <div className="intro-lead-in text-center pb-3" style={{}}>
                <span
                  style={{
                    fontSize: "25px",
                    color: "white",
                    filter: "brightness(103%) contrast(183%) grayscale(23%) hue-rotate(0deg)",
                    opacity: 1,
                    fontFamily: 'Montserrat, "HELVETICA"',
                  }}
                >
                  The VLC is a joint initiative by the judiciary and the Ministry of Law. We aim to provide legal assistance to the general public of Singapore.
                </span>
              </div>
              <a className="btn btn-primary btn-xl text-uppercase js-scroll-trigger" role="button" href="/about" style={{ background: "rgb(254,209,54)", color: "rgb(0,0,0)" }}>
                Tell me more
              </a>
            </div>
          </div>
        </header>
        <div className="container-fluid row d-flex justify-content-center m-0 pt-5">
          <div className="col-10">
            <p className="text-center" style={{ fontSize: "20px" }}>
              “Pro-bono services represents the highest form of social work that the legal profession can perform in service to the public” - Justice Chan Sek Keong
            </p>
          </div>
        </div>
        <div className="col container-fluid">
          <div className="row">
            <img src="../assets/img/flow.png" className="img-fluid mx-auto" alt=""/>
          </div>
          
        </div>
        <div className="container-fluid row d-flex justify-content-center p-5">
          <div className="col d-flex justify-content-right">
            <div className="card">
              <img className="card-img-top img-fluid" src="../assets/img/handshake.jpeg" alt="Card image cap" />
              <div className="card-body">
                <h5 className="card-title">Access the Virtual Legal Clinic</h5>
                <p className="card-text">Log in here</p>
                <div className="row d-flex justify-content-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      login();
                    }}
                  >
                    Login With Singpass
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
