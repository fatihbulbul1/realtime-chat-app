import io from "socket.io-client";
import React, { useState } from "react";
import Chat from "./components/Chat";
const socket = io("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    socket.emit("join_room", room);
    setShowChat(!showChat);
  };

  return (
    <div className="App">
      {!showChat ? (
        <>
          <h3>Join a Chat</h3>
          <input
            type="text"
            placeholder="Nick..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onKeyDown={(e) => {
              if (e.key === "Enter") joinRoom();
            }}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
