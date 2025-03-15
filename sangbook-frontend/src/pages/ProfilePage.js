import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import PostList from "../components/PostList";
import { getPostsByUser } from "../api/postAPI";
import { getUserById } from "../api/UserAPI";
import { sendFriendRequest, checkFriendStatus } from "../api/friendAPI";
import "../styles/profile.css";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [friendStatus, setFriendStatus] = useState("none");
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {}; // Lấy ID user hiện tại từ localStorage


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData.user);
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const userPosts = await getPostsByUser(id);
        if (userPosts?.success) {
          setPosts(userPosts.posts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error("Lỗi lấy bài viết của người dùng:", error);
        setPosts([]);
      }
    };

    const fetchFriendStatus = async () => {
      try {
        const response = await checkFriendStatus(loggedInUser.id, id);
        if (response.success) {
          setFriendStatus(response.status);
        }
      } catch (error) {
        console.error("Lỗi kiểm tra trạng thái bạn bè:", error);
      }
    };

    fetchUserData();
    fetchUserPosts();
    fetchFriendStatus();
  }, [id]);

  const handleSendRequest = async () => {
    try {
      const response = await sendFriendRequest(loggedInUser.id, id);
      if (response.success) {
        setFriendStatus("pending");
      }
    } catch (error) {
      console.error("Lỗi gửi kết bạn:", error);
    }
  };

  if (!user) return <p>Đang tải...</p>;

  return (
    <>
      <Header />
      <div className="cover-photo"></div>
      <div className="profile-info">
        <img className="profile-picture" src={`${API_BASE_URL}${user.avatar}`} alt="Ảnh đại diện" />
        <div className="user-info">
          <h1>{user.username}</h1>
          <p>419 người bạn - 1 bạn chung</p>
          <div className="btn-profile d-flex gap-2">
            {friendStatus === "none" && (
              <button className="btn-add-friend" onClick={handleSendRequest}>
                Thêm bạn bè
              </button>
            )}
            {friendStatus === "pending" && <button className="btn-pending">Đang chờ xác nhận</button>}
            {friendStatus === "accepted" && <button className="btn-friend">Bạn bè</button>}
            <button className="message-btn">Nhắn tin</button>
          </div>
        </div>
      </div>

      <nav className="profile-nav">
        <a href="#" className="active">Bài viết</a>
        <a href="#">Giới thiệu</a>
        <a href="#">Bạn bè</a>
        <a href="#">Ảnh</a>
        <a href="#">Video</a>
      </nav>

      <div className="main">
        <div className="content">
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
