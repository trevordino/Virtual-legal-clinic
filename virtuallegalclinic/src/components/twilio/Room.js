import React, { useEffect, useState } from "react";
import Participant from "./Participant";

const Room = ({ roomName, room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) => prevParticipants.filter((p) => p !== participant));
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => <Participant key={participant.sid} participant={participant} />);

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Go back</button>
      <div className="row container-fluid">
        <div className="col-6">
          <h3>You</h3>
          <div className="local-participant">{room ? <Participant key={room.localParticipant.sid} participant={room.localParticipant} /> : ""}</div>
        </div>
        <div className="col-6">
          <h3>Remote participants</h3>
          <div className="remote-participants">{remoteParticipants}</div>
        </div>
      </div>
    </div>
  );
};

export default Room;
