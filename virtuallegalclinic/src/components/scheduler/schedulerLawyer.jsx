import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import "../../assets/css/lawyer_scheduler/lawyer_scheduler.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { addDays } from "date-fns";
import Loader from "../common/loader";
import axios from "axios";
import { useAuth } from "../../context/auth";

export default function SchedulerLawyer(props) {
  const { userid, name } = useAuth();
  const [timeslotLoading, setTimeslotLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [slotOne, setSlotOne] = useState(false);
  const [slotTwo, setSlotTwo] = useState(false);
  const [slotOneSelected, setSlotOneSelected] = useState(false);
  const [slotTwoSelected, setSlotTwoSelected] = useState(false);
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    getTimeslot(startDate);
  }, []);

  async function getTimeslot(date) {
    setTimeslotLoading(true);
    setSlotOne(false);
    setSlotTwo(false);
    setSlotOneSelected(false);
    setSlotTwoSelected(false);
    setStartDate(date);
    var data = [];
    var takenSlots = [];
    await axios.get("http://localhost:5000/timeslot/" + date).then(function (response) {
      data = response.data;
    });
    // let takenSlots = []
    for (const aSlot of data) {
      if (aSlot.slotNumber == 1) {
        takenSlots.push(1);
      }
      if (aSlot.slotNumber == 2) {
        takenSlots.push(2);
      }
    }
    if (!takenSlots.includes(1)) {
      setSlotOne(true);
    }
    if (!takenSlots.includes(2)) {
      setSlotTwo(true);
    }
    setTimeslotLoading(false);
  }

  const handleForm = async (event) => {
    event.preventDefault();
    if (!slotOneSelected && !slotTwoSelected) {
      alert("Please select minimum of 1 slot");
      return;
    }
    var selectedSlots = [];
    if (slotOneSelected) {
      selectedSlots.push(1);
    }
    if (slotTwoSelected) {
      selectedSlots.push(2);
    }
    var data = {
      date: startDate,
      slots: selectedSlots,
      lawyerId: userid,
      lawyerName: name,
    };
    axios.post("http://localhost:5000/timeslot/", data).then(function (response) {
      setCompleted(true);
    }).catch(function (error) {
      alert("failed");
      alert(error);
    });
  };

  if (completed) {
    return (
      <Redirect
        to={{
          pathname: "/confirmation",
        }}
      />
    );
  }

  return (
    <div className="d-flex justify-content-center">
      <form onSubmit={handleForm}>
        <div className="heading-container col-10 mx-auto  ">
          <h1 className="heading pt-5">Indicate your availability for the VLC session</h1>
        </div>
        <div className="timeslot-container col-10 mx-auto">
          <h4 className="Date selection pt-5 pb-3">Select a date</h4>

          <DatePicker class="datepicker" selected={startDate} onChange={(date) => getTimeslot(date)} minDate={new Date()} maxDate={addDays(new Date(), 14)} />

          <h4 className="Appointment timing pt-5">Select your preferred timing</h4>
          <h6 className="Note pb-3">*You may choose more than 1 time slot.</h6>
          <div className="row timeslot-grid pl-3">
            {timeslotLoading ? (
              <Loader />
            ) : (
              [
                !slotOne && !slotTwo ? <p>No slots found, please choose another date</p> : null,
                slotOne ? (
                  <div className="col-xs-4 col-sm-2 chkbox-grid">
                    <input type="checkbox" checked={slotOneSelected} name="timeslots[]" id="slotOne" onClick={() => setSlotOneSelected(!slotOneSelected)} />
                    <label htmlFor="slotOne">6:00PM to 8:00PM</label>
                  </div>
                ) : null,
                slotTwo ? (
                  <div className="col-xs-4 col-sm-2 chkbox-grid">
                    <input type="checkbox" checked={slotTwoSelected} name="timeslots[]" id="slotTwo" onClick={() => setSlotTwoSelected(!slotTwoSelected)} />
                    <label htmlFor="slotTwo">8:00PM to 10:00PM</label>
                  </div>
                ) : null,
              ]
            )}

            {/* {durationBody} */}
          </div>
          <div>
            <button type="submit" className="btn btn-primary mx-auto mt-5 lsbutton">
              Submit Your Availability
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
