import React from "react";
import "../../styles/message.css";
import { FaFacebookMessenger } from "react-icons/fa";
const Messenger = ({
  isMessageBoxOpen,
  setIsMessageBoxOpen,
  friends,
  setSelectedUser,
  setIsChatOpen,
  API_BASE_URL,
}) => {
  return (
    <>
      <a
        className="btn-message"
        onClick={() => setIsMessageBoxOpen(!isMessageBoxOpen)}
      >
        <FaFacebookMessenger />
      </a>
      {isMessageBoxOpen && (
        <div className="message-box">
          <div className="chat-header">
            <span>Đoạn chat</span>
            <button
              className="icon-close-box"
              onClick={() => setIsMessageBoxOpen(false)}
            >
              X
            </button>
          </div>
          <div className="chat-search">
            <input type="text" placeholder="Tìm kiếm trên Messenger" />
          </div>
          <div className="chat-list">
            {friends.length > 0 ? (
              friends.map((friend) => (
                <div
                  className="list-friend-content-item"
                  key={friend.id}
                  onClick={() => {
                    setSelectedUser(friend);
                    setIsChatOpen(true);
                  }}
                >
                  <img
                    src={`${API_BASE_URL}/${friend.avatar}`}
                    alt=""
                    className="img-avt"
                  />
                  <span className="post-name">{friend.username}</span>
                </div>
              ))
            ) : (
              <p>Không có bạn bè nào</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Messenger;