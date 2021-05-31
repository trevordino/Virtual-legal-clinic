import React from "react";
import Loader from "../common/loader";

const Lobby = ({ username, handleUsernameChange, roomName, handleRoomNameChange, handleSubmit, connecting }) => {
  return (
    <form onSubmit={handleSubmit} className="col-lg-4 mx-auto">
      <h2>Join Meeting</h2>
      {username != "" && roomName != null ? (
        <Loader />
      ) : (
        <div>
          <label htmlFor="name">Name:</label>
          <input type="text" id="field" value={username} onChange={handleUsernameChange} readOnly={connecting} required />
          {/* </div>

      <div> */}
          <label htmlFor="room">Room name:</label>
          <input type="text" id="room" value={roomName} onChange={handleRoomNameChange} readOnly={connecting} required />
        </div>
      )}
      <button type="submit" disabled={connecting}>
        {connecting ? "Connecting" : "Click here if not redirected"}
      </button>
    </form>
  );
};

export default Lobby;
