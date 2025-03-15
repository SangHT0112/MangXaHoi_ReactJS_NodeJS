import React, { useEffect, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import "../styles/message.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const socket = io(`${API_BASE_URL}`);

const MessageChat = ({ selectedUser, currentUser, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedUser) return;

    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/messages/${currentUser.id}/${selectedUser.id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error);
      }
    };

    fetchMessages();
  }, [selectedUser]);

  useEffect(() => {
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);

  const sendMessage = () => {
    if (!selectedUser || message.trim() === "") return;

    const newMessage = {
      send_id: currentUser.id,
      receive_id: selectedUser.id,
      content: message,
    };

    socket.emit("sendMessage", newMessage);
    setMessage("");
  };

  return (
    <div className="message-chat">
      <div className="message-chat-header p-2">
        <div className="message-chat-info-recieve">
          <img
            src={`${API_BASE_URL}/${selectedUser.avatar}`}
            alt="Avatar"
            className="img-avt"
          />
          <span className="chat-header-recieve-name">{selectedUser.username}</span>
        </div>
        <div className="icon-close" onClick={onClose}>X</div>
      </div>

      <div id="message-chat-main" className="message-chat-main">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message-chat-item ${
              msg.send_id === currentUser.id ? "message-chat-send" : "message-chat-recieve"
            }`}
          >
            <div className={`d-flex justify-content-${msg.send_id === currentUser.id ? "end" : "start"}`}>
              <img
                src={
                  msg.send_id === currentUser.id
                    ? `${API_BASE_URL}/${currentUser.avatar}`
                    : `${API_BASE_URL}/${selectedUser.avatar}`
                }
                alt="Avatar"
                className="img-avt"
              />
              <div className="label-chat">
                <p className={`chat-${msg.send_id === currentUser.id ? "send" : "recieve"}-name`}>
                  {msg.send_id === currentUser.id ? "Bạn" : selectedUser.username}
                </p>
                <p className={`chat-${msg.send_id === currentUser.id ? "send" : "recieve"}-content`}>
                  {msg.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="message-chat-footer">
        <input
          type="text"
          placeholder="Gửi tin nhắn"
          className="input-message-send"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn-message-send" onClick={sendMessage}>
          Gửi
        </button>
      </div>
    </div>
  );
};

export default MessageChat;
