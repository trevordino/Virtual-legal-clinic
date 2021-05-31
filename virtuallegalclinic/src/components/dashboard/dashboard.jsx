import React, { useState, useEffect } from "react";
import "../../assets/css/dashboard/dashboard.css";
import DashboarLawyer from "./dashboardLawyer";
import DashboardApplicant from "./dashboardApplicant";
import { useAuth } from "../../context/auth";
import Loader from "../common/loader";

function Dashboard(props) {
  const { userRole, userid, isOnboarded } = useAuth();
  const [loading, setLoading] = useState(true);

  if (!isOnboarded) {
    window.location.href = "/"
  }

  useEffect(() => {
    setLoading(false)
  }, [userRole])

  return (
    <main>
      {loading ? (
        <div className="container-fluid d-flex justify-content-center">
          <Loader />
        </div>
      ) : (
        [
          userRole == "LAWYER" ? (
            <DashboarLawyer />
          ) : (
            <DashboardApplicant />
          ),
        ]
      )}
    </main>
  );
}
export default Dashboard;
