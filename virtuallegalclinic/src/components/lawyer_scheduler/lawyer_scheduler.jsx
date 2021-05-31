import React, { useState } from "react";
import "../../assets/css/lawyer_scheduler/lawyer_scheduler.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import { timings } from '../../utils/LawyerScheduler';
import axios from "axios";

export default function Lawyer_Scheduler(props) {

  const handleForm = event => {
    event.preventDefault();
    if (startTimings == null) {
      alert("Selection of Timing is required");
        return;
      }
    
  
    var data = {
      'date': startDate,
      'timeslot': startTimings
    }
    alert(JSON.stringify(data))

    if (startTimings != null) {
    window.location.href='/lawyer_endpage'
    return;
    }

    axios.get()
  };
  const [startTimings, setStartTimings] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  let availableTimings = timings;

  let durationBody = Object.keys(availableTimings).map((id, i) => {
    return (
      <div className="col-xs-4 col-sm-2 chkbox-grid">
        <input
          type="checkbox"
          name="timeslots[]"
          id={id}
          onClick={e => setStartTimings(e.target.id)}
        />
        <label htmlFor={id}>{availableTimings[id]}</label>
      </div>


    )
  })

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleForm}>
        <div className="heading-container col-10 mx-auto  ">
          <h1 className="heading pt-5">Indicate your availability for the VLC session</h1>
        </div>
        <div className="timeslot-container col-10 mx-auto">
          <h4 className="Date selection pt-5 pb-3">Select a date</h4>

          <DatePicker class="datepicker" selected={startDate} onChange={date => setStartDate(date)} minDate={new Date()} maxDate={addDays(new Date(), 14)} />


          <h4 className="Appointment timing pt-5">Select your preferred timing</h4>
          <h6 className="Note pb-3">*You may choose more than 1 time slot.</h6>
          <div className="row timeslot-grid pl-3">
            {durationBody}
          </div>
          <div>
            <button type="Submit" className="btn btn-primary mx-auto mt-5 lsbutton" href="/lawyer_endpage"> Submit Your Availability  </button>

          </div>
        </div>
      </form>
    </div>
  );
}
