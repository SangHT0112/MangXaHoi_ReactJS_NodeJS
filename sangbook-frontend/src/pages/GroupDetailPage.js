import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header/Header";
import PostList from "../components/PostList";
import { getPostsByGroup } from "../api/postAPI";
import { getGroupById , getMember} from "../api/groupAPI";
import "../styles/profile.css";

// import "../styles/groupDetail.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function GroupDetailPage() {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [members, setMembers] = useState([]);
  const [posts, setPosts] = useState([]);
  const loggedInUser = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchGroupData = async () => {
      try {
        const groupData = await getGroupById(id);
        console.log(groupData);
        setGroup(groupData.group);
      } catch (error) {
        console.error("Lỗi lấy thông tin nhóm:", error);
      }
    };

    

    // const fetchGroupPosts = async () => {
    //   try {
    //     const groupPosts = await getPostsByGroup(id);
    //     if (groupPosts?.success) {
    //       setPosts(groupPosts.posts);
    //     } else {
    //       setPosts([]);
    //     }
    //   } catch (error) {
    //     console.error("Lỗi lấy bài viết trong nhóm:", error);
    //     setPosts([]);
    //   }
    // };

    fetchGroupData();
    //fetchGroupPosts();
  }, [id]);

  useEffect(() => {
    const fetchGroupMembers = async () => {
        const memberData = await getMember(id);
        console.log("DADA", memberData);
        if (memberData.success) {
            setMembers(memberData.members);
        }
    };

    fetchGroupMembers();
  }, [id]);

  if (!group) return <p>Đang tải...</p>;

  return (
    <>
      <Header user={loggedInUser} />
      <div className="cover-photo">
        <img src={`https://th.bing.com/th/id/OIP.uGurtILGqi0vNzJCBmFM0AHaD4?rs=1&pid=ImgDetMain`} alt="Avatar" />
      </div>
      <div className="profile-info">
        <img className="profile-picture" src={`${API_BASE_URL}/${group.avatar}`} alt="Ảnh nhóm" />
        <div className="user-info">
          <h1>{group.name}</h1>
          <p>{group.description}</p>
          <p>Trưởng nhóm: {group.creator_username}</p>
          <div className="btn-profile d-flex gap-2">
            <button className="btn-add-friend">Tham gia nhóm</button>
            <button className="btn-friend">Rời nhóm</button>
            <button className="message-btn">Nhắn tin nhóm</button>
          </div>
        </div>
      </div>
      <div>
        <div className="group-members">
          <h2>Thành viên ({members.length})</h2>
          <ul>
            {members.map((member) => (
              <li key={member.id}>
                <img src={`${API_BASE_URL}/${member.avatar}`} className="img-avt" alt="Avatar" />
                <span>{member.username} {member.username == group.creator_username ? '(Trưởng nhóm)' : ""}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <nav className="group-nav">
        <a href="#" className="active">Bài viết</a>
        <a href="#">Thành viên</a>
        <a href="#">Ảnh</a>
      </nav>

      <div className="main">
        <div className="content">
          <PostList posts={posts} />
        </div>
      </div>
    </>
  );
}

export default GroupDetailPage;
