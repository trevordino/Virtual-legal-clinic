import React, { useState, useEffect } from "react";
import Loader from "../common/loader";
import "../../assets/css/facts_of_the_case/facts_of_the_case.css";
import axios from "axios";

export default function Facts(props) {
  const [meetingId, setMeetingId] = useState(props.location.state.meetingId);
  const [meetingInfo, setMeetingInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await axios
      .get("http://localhost:5000/meeting/id/" + meetingId)
      .then(function (response) {
        setMeetingInfo(response.data[0]);
      })
      .catch(function (error) {
        alert(error);
      });
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? <Loader /> : null}
      <div>
        <h4 class="taxonomybox">Facts of the Case</h4>
        {meetingInfo == null ? null : <p class="fotc">{meetingInfo.facts}</p>}
      </div>
      <div>
        <h4 class="taxonomybox">Question for Lawyers</h4>
        {meetingInfo == null ? null : <p class="fotc">{meetingInfo.questions}</p>}
      </div>
    </div>
  );
}
