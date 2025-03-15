import React, { useState, useEffect, useRef } from "react";
import { fetchStories, createStory,incrementViews } from "../api/storyAPI";
import "../styles/story.css";
import "../styles/config.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

dayjs.extend(relativeTime);
dayjs.locale("vi")
const Story = ({ stories, setStories }) => { // Nhận stories & setStories từ props
  const [selectedStory, setSelectedStory] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);
  const [preview, setPreview] = useState("");
  const storyListRef = useRef(null);
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const API_BASE_URL = "http://localhost:4000/";


  const scrollLeft = () => {
    if (storyListRef.current) {
      storyListRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (storyListRef.current) {
      storyListRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setVideo(null);
    } else if (file.type.startsWith("video/")) {
      setVideo(file);
      setPreview(URL.createObjectURL(file));
      setImage(null);
    } else {
      alert("Chỉ hỗ trợ hình ảnh và video!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user_id = user.id;
    if (!user_id) {
      alert("Vui lòng đăng nhập để thêm story!");
      return;
    }
  
    const formData = new FormData();
    formData.append("user_id", user_id);
    if (image) formData.append("image", image);
    if (video) formData.append("video", video);
  
    try {
      const newStory = await createStory(formData);
      console.log("Story mới:", newStory);
  
      // Đảm bảo newStory có avatar & username từ user
      const updatedStory = {
        ...newStory,
        avatar: user.avatar, // Lấy avatar từ localStorage
        username: user.username, // Lấy username từ localStorage
      };
  
      setStories((prevStories) => [{ 
        ...newStory, 
        image: newStory.image ? `${API_BASE_URL}${newStory.image}` : null, 
        video: newStory.video ? `${API_BASE_URL}${newStory.video}` : null,
        avatar: newStory.avatar ? `${API_BASE_URL}${newStory.avatar}` : "default-avatar.png",
      }, ...prevStories]);
      
      setShowModal(false);
      setImage(null);
      setVideo(null);
      setPreview("");
      const updatedStories = await fetchStories();
      setStories(updatedStories);

    } catch (error) {
      console.error("Lỗi khi thêm story:", error);
    }
  };

  //Thay đổi khi nhấn pre next story
  const changeStory = async (direction) => {
    const currentIndex = stories.findIndex(story => story.id === selectedStory.id);
    const newIndex = currentIndex + direction;
  
    if (newIndex >= 0 && newIndex < stories.length) {
      const newStory = stories[newIndex];
      setSelectedStory(newStory);
  
      try {
        await fetch(`${API_BASE_URL}/api/stories/view/${newStory.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" }
        });
  
        setStories((prevStories) =>
          prevStories.map((s) =>
            s.id === newStory.id ? { ...s, views: (s.views || 0) + 1 } : s
          )
        );
  
        setSelectedStory((prev) => ({ ...prev, views: (prev.views || 0) + 1 }));
      } catch (error) {
        console.error("Lỗi khi tăng lượt xem:", error);
      }
    }
  };
  
  
  const handleStoryClick = async (story) => {
    setSelectedStory(story);
  
    try {
      await fetch(`${API_BASE_URL}/api/stories/view/${story.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" }
      });
  
      // Cập nhật danh sách stories
      setStories((prevStories) =>
        prevStories.map((s) =>
          s.id === story.id ? { ...s, views: (s.views || 0) + 1 } : s
        )
      );
  
      // Cập nhật story đang xem
      setSelectedStory((prev) => ({ ...prev, views: (prev.views || 0) + 1 }));
    } catch (error) {
      console.error("Lỗi khi tăng lượt xem:", error);
    }
  };
  
  
  

  return (
    <div className="story-container">
      <button className="scroll-btn left" onClick={scrollLeft}>{"<"}</button>
      <div className="story-list" ref={storyListRef}>
        <div className="story-item add-story" onClick={() => setShowModal(true)}>
          <div className="add-story-icon">+</div>
          <p>Thêm story</p>
        </div>

        {stories.map((story) => (
          story ? (
            <div key={story.id} className="story-item" onClick={() => handleStoryClick(story)}>
              {story.video ? (
                <video src={`${API_BASE_URL}${story.video}`} className="story-thumbnail" muted loop />
              ) : story.image ? (
                <img src={`${API_BASE_URL}${story.image}`} alt={story.username} className="story-thumbnail" />
              ) : (
                <div className="story-thumbnail">No media available</div>
              )}
              
              <div className="story-info">
                <img
                  src={story.avatar?.startsWith("http") ? story.avatar : `${API_BASE_URL}${story.avatar || "default-avatar.png"}`}
                  alt={story.username || "Unknown User"}
                  className="story-avatar"
                />
                <p>{story.username || "Unknown User"}</p>
              </div>
            </div>
          ) : null
        ))}

      </div>
      <button className="scroll-btn right" onClick={scrollRight}>{">"}</button>

      {showModal && (
        <div className="modal show" onClick={(e) => e.target.className === "modal show" && setShowModal(false)}>
          <div className="modal-inner">
            <div className="modal-header">
              <p>Thêm Story</p>
              <i className="fa-solid fa-xmark" onClick={() => setShowModal(false)}></i>
            </div>
            <div className="modal-content">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="modal-info">
                  <img src={user.avatar} alt="Avatar" className="img-avt" />
                  <p>{user.username}</p>
                </div>
                <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
                {preview && (image ? <img src={preview} alt="Preview" className="preview-img" /> : <video src={preview} controls className="preview-video" />)}
                <div className="modal-footer">
                  <button type="submit">Thêm Story</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {selectedStory && (
        <div className="story-modal">
          <button className="story-close" onClick={() => setSelectedStory(null)}>✖</button>
          <button className="story-nav left" onClick={() => changeStory(-1)}>{"<"}</button>
          <div className="story-content" onClick={() => setSelectedStory(null)}>
            <span className="post-time">Đã đăng {dayjs(selectedStory.created_at).fromNow()}</span>
            {selectedStory.video ? (
              <video src={`${API_BASE_URL}${selectedStory.video}`} controls autoPlay className="story-media" />
            ) : (
              <img src={`${API_BASE_URL}${selectedStory.image}`} alt="Story" className="story-media" />
            )}
            <div className="story-interact">
                  <p className="story-views">Lượt xem: {selectedStory.views || 0}</p>
              </div>
            <div className="d-flex mt-3">
              <img src={`${API_BASE_URL}${selectedStory.avatar}`} className="img-avt"/>
              <p>{selectedStory.username}</p>
            </div>
          </div>
          <button className="story-nav right" onClick={() => changeStory(1)}>{">"}</button>
        </div>
      )}

    </div>
  );
};

export default Story;
