import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../assets/css/lawyer_endpage/lawyer_endpage.css";

export default function ConfirmationLawyer() {
  return(
    <div>
      <div>
    <h1 class="thankyouheader">Thank you for filling up your availability.</h1>
    </div>
    <div>
    <h4 class="thankyoutext">We will get back to you with the requisite details.</h4>
    </div>
    <Link to="/dashboard">
      <button className="btn btn-primary btn-confirmation">
      Return to Dashboard
      </button>
    </Link>
    </div>
  )
}