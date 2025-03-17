import React, { useEffect } from "react";
import "../../styles/message.css";

const ChatWindow = ({
  isChatOpen,
  setIsChatOpen,
  selectedUser,
  messages,
  message,
  setMessage,
  sendMessage,
  user_id,
  API_BASE_URL,
}) => {
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      let chatBox = document.getElementById("message-chat-main");
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    }, 100);
  };

  if (!isChatOpen || !selectedUser) return null;

  return (
    <div className="message-chat">
      <div className="message-chat-header p-2">
        <div className="message-chat-info-recieve">
          <img
            src={`${API_BASE_URL}/${selectedUser.avatar}`}
            alt="Avatar"
            className="img-avt"
          />
          <span className="chat-header-recieve-name">
            {selectedUser.username}
          </span>
        </div>
        <div className="d-flex gap-3">
          <div className="icon-call">
            <i className="fa-solid fa-video"></i>
          </div>
          <div className="icon-close" onClick={() => setIsChatOpen(false)}>
            X
          </div>
        </div>
      </div>

      <div id="message-chat-main" className="message-chat-main">
        {messages
          .filter(
            (msg) =>
              (msg.send_id === user_id.id &&
                msg.receive_id === selectedUser.id) ||
              (msg.send_id === selectedUser.id && msg.receive_id === user_id.id)
          )
          .map((msg, index) => (
            <div
              key={index}
              className={`message-chat-item ${
                msg.send_id === user_id.id
                  ? "message-chat-send"
                  : "message-chat-recieve"
              }`}
            >
              <div
                className={`d-flex justify-content-${
                  msg.send_id === user_id.id ? "end" : "start"
                }`}
              >
                <img
                  src={
                    msg.send_id === user_id.id
                      ? user_id.avatar.startsWith("http")
                        ? user_id.avatar
                        : `${API_BASE_URL}/${user_id.avatar}`
                      : selectedUser.avatar.startsWith("http")
                      ? selectedUser.avatar
                      : `${API_BASE_URL}/${selectedUser.avatar}`
                  }
                  alt="Avatar"
                  className="img-avt"
                />
                <div className="label-chat">
                  <p
                    className={`chat-${
                      msg.send_id === user_id.id ? "send" : "recieve"
                    }-name`}
                  >
                    {msg.send_id === user_id.id ? "Bạn" : selectedUser.username}
                  </p>
                  <p
                    className={`chat-${
                      msg.send_id === user_id.id ? "send" : "recieve"
                    }-content`}
                  >
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

export default ChatWindow;