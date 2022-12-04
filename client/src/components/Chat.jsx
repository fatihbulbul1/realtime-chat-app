import React, { useState } from "react";
import { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const sendMessage = () => {
    if (currentMessage === "" || currentMessage === " ") return;
    const messageData = {
      room: room,
      username: username,
      message: currentMessage,
    };
    socket.emit("send_message", messageData);
    setMessageList((list) => [...list, messageData]);
    setCurrentMessage("");
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);
  return (
    <div id="message-box">
      <h3 style={{ textAlign: "center" }}>
        Welcome to chatroom {room}, {username}
      </h3>
      <ScrollToBottom className="message-list">
        {messageList.map((message) => {
          return (
            <div
              className={
                username === message.username
                  ? "message sent"
                  : "message recieved"
              }
            >
              <p className="username">{message.username}</p>
              <p>{message.message}</p>
            </div>
          );
        })}
      </ScrollToBottom>
      <div className="message-input">
        <input
          value={currentMessage}
          type="text"
          placeholder="Hey..."
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          onChange={(e) => setCurrentMessage(e.target.value)}
        />
        <button className="send" onClick={sendMessage}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default Chat;
