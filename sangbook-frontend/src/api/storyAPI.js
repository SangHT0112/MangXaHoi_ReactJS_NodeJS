import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Lấy danh sách stories
export const fetchStories = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi lấy stories:", error);
    return [];
  }
};

// Đăng story mới
export const createStory = async (formData) => {
    try {
      const response = await axios.post(API_BASE_URL, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi khi đăng story:", error);
      throw error; // Ném lỗi để xử lý ở phía frontend
    }
  };

// Xóa story
export const deleteStory = async (storyId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${storyId}`);
    return true;
  } catch (error) {
    console.error("Lỗi khi xóa story:", error);
    return false;
  }
};



//Tăng lượt xem story
export const incrementViews = async (storyId) => {
  return axios.put(`http://localhost:4000/api/story/view/${storyId}`);
};

