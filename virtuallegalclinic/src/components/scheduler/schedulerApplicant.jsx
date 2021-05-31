import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { timings, slotAvailability } from "../../utils/schedulerConst";
import axios from "axios";
import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import { useAuth } from "../../context/auth";
import Loader from "../common/loader";

export default function SchedulerApplicant(props) {
  const { userid, name } = useAuth();
  const [timeslotLoading, setTimeslotLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [slotsAvailable, setSlotsAvailable] = useState([]);
  const [noSlots, setNoSlots] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [completed, setCompleted] = useState(false)
  const [slotStartTime, setSlotStartTime] = useState(null)
  const [slotEndTime, setSlotEndTime] = useState(null)

  useEffect(() => {
    getTimeslot(startDate);
  }, []);

  async function getTimeslot(date) {
    setTimeslotLoading(true);
    setStartDate(date);
    setNoSlots(false);
    var allSlots = Object.assign({}, slotAvailability);;
    await axios.get("http://localhost:5000/meeting/" + date).then(function (response) {
      var result = response.data;
      if (result.length == 12) {
        setNoSlots(true);
      }
      for (const aSlot of result) {
        let slotId = aSlot.slotId;
        allSlots[slotId] = false;
      }
    });
    setSlotsAvailable(allSlots);
    setTimeslotLoading(false);
  }

  const handleForm = (event) => {
    event.preventDefault();
    if (selectedSlot == null) {
      alert("You must select a slot to continue.");
      return;
    }
    var startDateTime = startDate.getFullYear() + "-" + (startDate.getUTCMonth() + 1) + "-" + startDate.getDate() + ' ' + timings[selectedSlot][1]
    var endDateTime = startDate.getFullYear() + "-" + (startDate.getUTCMonth() + 1) + "-" + startDate.getDate() + ' ' + timings[selectedSlot][2]
    setSlotStartTime(new Date(startDateTime))
    setSlotEndTime(new Date(endDateTime))
    setCompleted(true);
  };

  if (completed) {
    return (
      <Redirect
        to={{
          pathname: "/triage",
          state: { slot: selectedSlot, slotStart: slotStartTime, slotEnd: slotEndTime, slotDate: startDate }
        }}
      />
    );
  }

  return (
    <div>
      <form onSubmit={handleForm}>
        <div className="heading-container col-10 mx-auto">
          <h1 className="heading pt-5">Step 1 of 2</h1>
        </div>
        <div className="timeslot-container col-10 mx-auto">
          <h4 className="Date selection pt-5 pb-3">Select a date</h4>

          <DatePicker class="datepicker" selected={startDate} onChange={(date) => getTimeslot(date)} minDate={new Date()} maxDate={addDays(new Date(), 14)} />

          <h4 className="Appointment timing pt-5">Select your preferred timing</h4>
          <h6 className="Note pb-3">*Each consulation slot is for 20 minutes.</h6>
          <div className="row timeslot-grid">
            {noSlots ? <p>Sorry, no slots available on this day.</p> : null}
            {timeslotLoading ? (
              <Loader />
            ) : (
              [
                Object.keys(slotsAvailable).map((key, id) =>
                  slotsAvailable[key] ? (
                    <div className="col-xs-4 col-sm-2 chkbox-grid">
                      <input type="radio" name="timeslots[]" id={key} onClick={(e) => setSelectedSlot(key)} />
                      <label htmlFor={key}>{timings[key][0]}</label>
                    </div>
                  ) : (
                    <div className="col-xs-4 col-sm-2 chkbox-grid">
                      <input type="radio" name="timeslots[]" id={key} disabled="true" />
                      <label htmlFor={id}>{timings[key][0]}</label>
                    </div>
                  )
                ),
              ]
            )}
          </div>
          <div className="row">
            <button className="btn btn-primary mx-auto mt-5"> Next step</button>
          </div>
        </div>
      </form>
    </div>
  );
}
