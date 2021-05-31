import React, { useState } from "react";
import { useAuth } from "../../context/auth";
import Button from "react-bootstrap/Button";

function Header(props) {
  const { loggedIn, userRole, name, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {loggedIn ? (
          <a className="navbar-brand" href="/dashboard">
            <img src="assets/img/navbar-logo.png" style={{ height: "80px" }} />
          </a>
        ) : (
          <a className="navbar-brand" href="/">
            <img src="assets/img/navbar-logo.png" style={{ height: "80px" }} />
          </a>
        )}

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {loggedIn ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item" style={{color: "white"}}>
                <p>Welcome, <b>{name}</b>. Role: {userRole}</p>
              </li>
              <li className="nav-item">
                <Button variant="outline-primary" onClick={logout}>
                  Log Out
                </Button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/about">
                  ABOUT US
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  CONTACT
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
