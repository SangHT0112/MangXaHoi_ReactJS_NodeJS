import React, { useEffect, useState } from "react";
import { getAcceptedFriends } from "../api/friendAPI";
import "../styles/message.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const MessageBox = ({ user_id, onSelectUser }) => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      const friendList = await getAcceptedFriends(user_id);
      setFriends(friendList);
    };

    fetchFriends();
  }, [user_id]);

  return (
    <div className="message-box">
      <div className="chat-header">
        <span>Đoạn chat</span>
        <button className="icon-close-box" onClick={() => onSelectUser(null)}>
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
              key={friend.id}
              className="list-friend-content-item"
              onClick={() => onSelectUser(friend)}
            >
              <img src={`${API_BASE_URL}/${friend.avatar}`} alt="" className="img-avt" />
              <span className="post-name">{friend.username}</span>
            </div>
          ))
        ) : (
          <p>Không có bạn bè nào</p>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
