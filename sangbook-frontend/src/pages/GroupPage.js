import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/addfriendpage.css";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar";
import SidebarRight from "../components/SidebarRight";
import { getAcceptedFriends } from "../api/friendAPI";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const GroupPage = () => {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [friends, setFriends] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [groups, setGroups] = useState([]);

  // Lấy danh sách bạn bè
  useEffect(() => {
    const fetchFriends = async () => {
      if (user.id) {
        const friendList = await getAcceptedFriends(user.id);
        setFriends(friendList);
      }
    };

    fetchFriends();
  }, [user.id]);

  // Lấy danh sách nhóm
  useEffect(() => {
    const fetchGroups = async () => {
      if (user.id) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/groups/user/${user.id}`);
          setGroups(response.data);
        } catch (error) {
          console.error("Lỗi khi lấy danh sách nhóm:", error);
        }
      }
    };

    fetchGroups();
  }, [user.id]);

  // Đóng modal
  const onClose = () => {
    setShowModal(false);
    setGroupName("");
    setSelectedFriends([]);
    setAvatar(null);
    setPreview(null);
  };

  // Chọn bạn bè để thêm vào nhóm
  const handleFriendSelect = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId)
        ? prev.filter((id) => id !== friendId)
        : [...prev, friendId]
    );
  };

  // Xử lý thay đổi avatar
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(file);
      setPreview(URL.createObjectURL(file)); // Hiển thị ảnh trước khi upload
    }
  };

  // Tạo nhóm mới
  const handleCreateGroup = async () => {
    if (!groupName || selectedFriends.length === 0) return;

    try {
      const formData = new FormData();
      formData.append("groupName", groupName);
      formData.append("created_by", user.id);
      if (avatar) formData.append("avatar", avatar);
      selectedFriends.forEach((friend) => formData.append("members[]", friend));

      const response = await axios.post(`${API_BASE_URL}/api/groups/create`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        alert("Tạo nhóm thành công!");
        onClose();
        // Cập nhật lại danh sách nhóm
        const updatedGroups = await axios.get(`${API_BASE_URL}/api/groups/user/${user.id}`);
        setGroups(updatedGroups.data);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Lỗi khi tạo nhóm:", error);
      alert("Lỗi khi tạo nhóm!");
    }
  };

  return (
    <>
      <Header />
      <div className="main">
        <Sidebar />
        <div className="content">
          <h1>Quản lý nhóm</h1>
          <button onClick={() => setShowModal(true)}>Tạo nhóm mới</button>

          {/* Danh sách nhóm */}
          <div className="group-list">
            {groups.length > 0 ? (
              groups.map((group) => (
                <div key={group.id} className="group-item">
                  <img
                    src={`${API_BASE_URL}/${group.avatar}`}
                    alt="Avatar nhóm"
                    className="group-avatar"
                  />
                  <div className="group-info">
                    <h3>{group.name}</h3>
                    <p>Số thành viên: {group.members.length}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>Bạn chưa tham gia nhóm nào.</p>
            )}
          </div>

          {/* Modal tạo nhóm */}
          {showModal && (
            <div className="modal show">
              <div className="modal-inner">
                <div className="modal-header">
                  <p>Tạo Nhóm Chat</p>
                  <i className="fa-solid fa-xmark" onClick={onClose}></i>
                </div>
                <div className="modal-content">
                  <input
                    type="text"
                    placeholder="Nhập tên nhóm"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />

                  {/* Upload avatar */}
                  <input type="file" accept="image/*" onChange={handleFileChange} />
                  {preview && <img src={preview} alt="Avatar nhóm" className="preview-avatar" />}

                  <div className="friend-list">
                    <hr />
                    <p>Danh sách bạn bè:</p>
                    {friends.length > 0 ? (
                      friends.map((friend) => (
                        <label key={friend.id} className="friend-item d-flex gap-2 m-1">
                          <input
                            type="checkbox"
                            checked={selectedFriends.includes(friend.id)}
                            onChange={() => handleFriendSelect(friend.id)}
                          />
                          <img
                            src={friend.avatar ? `${API_BASE_URL}/${friend.avatar}` : "/default-avatar.jpg"}
                            alt="Avatar"
                            className="img-avt"
                          />
                          <span>{friend.username}</span>
                        </label>
                      ))
                    ) : (
                      <p>Không có bạn bè để thêm vào nhóm</p>
                    )}
                  </div>
                </div>
                <div className="modal-footer">
                  <button onClick={onClose}>Đóng</button>
                  <button
                    onClick={handleCreateGroup}
                    disabled={!groupName || selectedFriends.length === 0}
                  >
                    Tạo Nhóm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        <SidebarRight />
      </div>
    </>
  );
};

export default GroupPage;