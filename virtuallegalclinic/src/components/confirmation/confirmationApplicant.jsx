import React from "react";
import DashBoard from "../dashboard/dashboard.jsx";
import { Link } from "react-router-dom";

export default function ConfirmationApplicant(props) {
  return (
    <main>
      <div>
        <section className="features-boxed">
          <div className="container-fluid" style={{ width: "100%", margin: 0 }}>
            <div className="intro my-5">
              <h1 className="text-center">Form Submission Complete</h1>
            </div>
            <div className="text-center">
              <p
                style={{
                  fontSize: "14px",
                }}
              >
                Click on the link below to access your upcoming meetings
              </p>
            </div>
          </div>
        </section>

        <div className="text-center pt-3">
          <Link to="/dashboard">
            <button className="btn btn-primary">Dashboard</button>
          </Link>
        </div>
      </div>
    </main>
  );
}
