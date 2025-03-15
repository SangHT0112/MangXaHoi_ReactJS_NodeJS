import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client"; // Import socket.io-client
import "../styles/Header.css";
import "../styles/list_friend.css";
import { useNavigate } from "react-router-dom";  //Khi click vào người dùng cần tìm kiếm
import "../styles/message.css";
import { getAcceptedFriends } from "../api/friendAPI";
import {
  FaHome,
  FaUsers,
  FaYoutube,
  FaStore,
  FaUserPlus,
  FaHive,
  FaFacebookMessenger,
  FaBell,
} from "react-icons/fa";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


const socket = io(`${API_BASE_URL}`); // Kết nối WebSocket với backend

const Header = ({ user }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMessageBoxOpen, setIsMessageBoxOpen] = useState(false);

  const [isBellOpen, setIsBellOpen] = useState(false);

  const [message, setMessage] = useState(""); // Tin nhắn nhập vào
  const [messages, setMessages] = useState([]); // Danh sách tin nhắn nhận được

  const user_id = JSON.parse(localStorage.getItem("user")) || {};

  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [friendRequests, setFriendRequests] = useState([]); // Mảng rỗng tránh undefined
  const navigate = useNavigate(); // Khai báo navigate
  const [friends, setFriends] = useState([]);
  
  const [searchTerm, setSearchTerm] = useState(""); // Lưu từ khóa tìm kiếm


  // const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);

  // Lấy danh sách người dùng
  const fetchFriends = async () => {
    try {
      const data = await getAcceptedFriends(user_id.id);
      setFriends(data || []);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách bạn bè:", error);
    }
  };
  // Lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/auth/users`);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
    }
  };
  

  useEffect(() => {
    fetchUsers();
    fetchFriends();
    // Lắng nghe tin nhắn từ server
    socket.on("receiveMessage", (data) => {
      setMessages((prev) => [...prev, data]); // Cập nhật danh sách tin nhắn
    });

    return () => {
      socket.off("receiveMessage"); // Cleanup khi component unmount
    };
  }, []);


  const fetchMessages = async () => {
    scrollToBottom();
    if (!selectedUser) return;
    try {
        const response = await axios.get(`${API_BASE_URL}/api/messages/${user_id.id}/${selectedUser.id}`);
        setMessages(response.data.messages); 
    } catch (error) {
        console.error("Lỗi khi lấy tin nhắn:", error);
    }
  };

  useEffect(() => {

      fetchMessages();
  }, [selectedUser]); // Gọi API khi chọn user khác



  // Gửi tin nhắn lên server
  const sendMessage = () => {
    if (!selectedUser || message.trim() === "") return;
  
    const newMessage = { 
        send_id: user_id.id,  
        receive_id: selectedUser.id, 
        content: message 
    };
  
    console.log("📩 Gửi tin nhắn:", newMessage);
    
    // Gửi tin nhắn qua WebSocket, nhưng KHÔNG cập nhật ngay lập tức
    socket.emit("sendMessage", newMessage);
    
    setMessage(""); // Xóa nội dung input sau khi gửi
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Gọi khi danh sách tin nhắn thay đổi

  function scrollToBottom() {
    setTimeout(() => {
        let chatBox = document.getElementById("message-chat-main");
        if (chatBox) {
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }, 100); // Delay 100ms để đảm bảo tin nhắn mới đã render xong
}


  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/friends/friend-requests/${user_id.id}`);
      setFriendRequests(response.data.friendRequests || []); // Đúng key của API
    } catch (error) {
      console.error("Lỗi khi lấy danh sách lời mời kết bạn:", error);
    }
  };

  const acceptFriendRequest = async (requestId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/friends/accept`, {
        request_id: requestId,
      });
      setFriendRequests(friendRequests.filter((req) => req.request_id !== requestId)); // Cập nhật danh sách
    } catch (error) {
      console.error("Lỗi khi chấp nhận lời mời:", error);
    }
  };
  
  const declineFriendRequest = async (requestId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/friends/decline`, {
        request_id: requestId,
      });
      setFriendRequests(friendRequests.filter((req) => req.request_id !== requestId)); // Cập nhật danh sách
    } catch (error) {
      console.error("Lỗi khi từ chối lời mời:", error);
    }
  };
  

  return (
    <nav className="navbar">
      <div className="header">
        {/* Block 1: Logo & Tìm kiếm */}
        <div className="block1">
          <a href="/">
            <img className="img-avt" src="logo192.png" alt="Logo" />
          </a>
          
          <div className="search-bar">
            <input
              type="text"
              placeholder="Tìm kiếm trên SangBook"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <div className="search-results">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user.id}
                      className="search-item"
                      onClick={() => navigate(`/profile/${user.id}`)}
                    >
                      <img
                        src={`${API_BASE_URL}/${user.avatar}`}
                        alt=""
                        className="img-avt"
                      />
                      <span>{user.username}</span>
                    </div>
                  ))
                ) : (
                  <p>Không tìm thấy kết quả</p>
                )}
              </div>
            )}
          </div>


        </div>

        {/* Block 2: Menu chính */}
        <div className="block2">
          <a href="/" className={location.pathname === "/" ? "active" : ""}>
            <FaHome />
          </a>
          <a href="/friends" className={location.pathname === "/friends" ? "active" : ""}>
            <FaUsers />
          </a>
          <a href="/videos" className={location.pathname === "/videos" ? "active" : ""}>
            <FaYoutube />
          </a>
          <a href="/marketplace" className={location.pathname === "/marketplace" ? "active" : ""}>
            <FaStore />
          </a>
          <a href="/add-friend" className={location.pathname === "/add-friend" ? "active" : ""}>
            <FaUserPlus />
          </a>
        </div>

        {/* Block 3: Messenger, Thông báo, Avatar */}
        <div className="block3">
          <a href="#" className="change-background">
            <FaHive />
          </a>

          <a className="btn-message" onClick={() => setIsMessageBoxOpen(!isMessageBoxOpen)}>
            <FaFacebookMessenger />
          </a>

          {isMessageBoxOpen && (
            <div className="message-box">
              <div className="chat-header">
                <span>Đoạn chat</span>
                <button className="icon-close-box" onClick={() => setIsMessageBoxOpen(false)}>X</button>
              </div>
              <div className="chat-search">
                <input type="text" placeholder="Tìm kiếm trên Messenger" />
              </div>
              <div className="chat-list">
              {friends.length > 0 ? (
                friends.map((friend) => (
                  <div className="list-friend-content-item" 
                    key={friend.id}
                    onClick={() => {
                      setSelectedUser(friend);
                      setIsChatOpen(true);
                    }}>
                    <img src={`${API_BASE_URL}/${friend.avatar}`} alt="" className="img-avt" />
                    <span className="post-name">{friend.username}</span>
                  </div>
                ))
              ) : (<p>Không có bạn bè nào</p>)}

               
              </div>
            </div>
          )}

          {isChatOpen && selectedUser && (
            <div className="message-chat">
              <div className="message-chat-header p-2">
                <div className="message-chat-info-recieve">
                  <img src={`${API_BASE_URL}/${selectedUser.avatar}`} alt="Avatar" className="img-avt" />
                  <span className="chat-header-recieve-name">{selectedUser.username}</span>
                </div>
                <div className="d-flex gap-3">
                  <div className="icon-call">
                    <i className="fa-solid fa-video"></i>
                  </div>
                  <div className="icon-close" onClick={() => setIsChatOpen(false)}>X</div>
                </div>
              </div>

              {/* Hiển thị giao diện gọi video khi nhấn nút */}
              {/* {isVideoCallOpen && <CallVideo selectedUser={selectedUser} onClose={() => setIsVideoCallOpen(false)} />} */}

              <div id="message-chat-main" className="message-chat-main">
                {messages
                  .filter(msg => 
                    (msg.send_id === user_id.id && msg.receive_id === selectedUser.id) || 
                    (msg.send_id === selectedUser.id && msg.receive_id === user_id.id)
                  )
                  .map((msg, index) => (
                    <div key={index} className={`message-chat-item ${msg.send_id === user_id.id ? "message-chat-send" : "message-chat-recieve"}`}>
                      <div className={`d-flex justify-content-${msg.send_id === user_id.id ? "end" : "start"}`}>
                        <img 
                          src={msg.send_id === user_id.id 
                            ? (user_id.avatar.startsWith("http") ? user_id.avatar : `${API_BASE_URL}/${user_id.avatar}`) 
                            : (selectedUser.avatar.startsWith("http") ? selectedUser.avatar : `${API_BASE_URL}/${selectedUser.avatar}`)
                          } 
                          alt="Avatar" 
                          className="img-avt" 
                        />
                        <div className="label-chat">
                          <p className={`chat-${msg.send_id === user_id.id ? "send" : "recieve"}-name`}>
                            {msg.send_id === user_id.id ? "Bạn" : selectedUser.username}
                          </p>
                          <p className={`chat-${msg.send_id === user_id.id ? "send" : "recieve"}-content`}>
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
                <button className="btn-message-send" onClick={sendMessage}>Gửi</button>
              </div>
            </div>
          )}



            <a className="btn-bell" onClick={() => {
                setIsBellOpen(!isBellOpen);
                if (!isBellOpen) fetchFriendRequests();
            }}>

            <FaBell />
            {isBellOpen && (
              <div className="friend-request d-flex">
                {friendRequests.length > 0 ? (
                  friendRequests.map((request) => (
                    <div key={request.id} className="friend-request-item">
                      <img src={`${API_BASE_URL}/${request.avatar}`} className="img-avt"/>
                      <span>{request.username}</span>
                      <div className="d-flex gap-2">
                      <button className="btn-accept-friend" onClick={() => acceptFriendRequest(request.request_id)}>
                        Chấp nhận
                      </button>
                      <button className="btn-decline-friend" onClick={() => declineFriendRequest(request.request_id)}>
                        Hủy
                      </button>

                      </div>
                    </div>
                  ))
                ) : (
                  <p>Không có lời mời kết bạn</p>
                )}
              </div>
            )}

            
          </a>


          <a href="/profile" className="avatar-link">
            <img src={user_id.avatar} alt="" className="img-avt" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;



