import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";

import Loader from '../common/loader';
import ConfirmationApplicant from  './confirmationApplicant';
import ConfirmationLawyer from './confirmationLawyer';

export default function Confirmation(props) {
  const { userRole } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
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
            <ConfirmationLawyer />
          ) : (
            <ConfirmationApplicant />
          ),
        ]
      )}
    </main>
  );

}
