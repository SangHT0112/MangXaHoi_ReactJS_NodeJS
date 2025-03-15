import db from "../db.js";
import path from "path";
import fs from "fs";

// Lấy tất cả story
export const getAllStories = async () => {
  const [rows] = await db.query(
    `SELECT stories.*, users.username, users.avatar 
     FROM stories 
     JOIN users ON stories.user_id = users.id 
     ORDER BY stories.created_at DESC`
  );
  return rows;
};

// Tạo story mới
// Tạo story mới
export const createStory = async (user_id, image, video) => {
  const query = "INSERT INTO stories (user_id, image, video) VALUES (?, ?, ?)";

  // Chuyển đường dẫn về định dạng chuẩn "/"
  const imagePath = image ? image.path.replace(/\\/g, "/") : null; 
  const videoPath = video ? video.path.replace(/\\/g, "/") : null; 

  const values = [user_id, imagePath, videoPath];

  try {
      const [result] = await db.query(query, values);

      // Truy vấn thông tin người dùng từ bảng users
      const [userRows] = await db.query("SELECT username, avatar FROM users WHERE id = ?", [user_id]);
      
      // Kiểm tra user có tồn tại không
      if (userRows.length === 0) {
          throw new Error("User không tồn tại!");
      }

      const { username, avatar } = userRows[0];

      // Trả về story mới với đầy đủ thông tin
      return {
          id: result.insertId,
          user_id,
          image: imagePath,
          video: videoPath,
          username,
          avatar,
      };
  } catch (error) {
      throw error;
  }
};


// Xóa story
export const deleteStory = async (story_id) => {
  const [rows] = await db.query("SELECT image, video FROM stories WHERE id = ?", [story_id]);

  if (rows.length === 0) {
    return { success: false, message: "Story không tồn tại!" };
  }

  const { image, video } = rows[0];
  await db.query("DELETE FROM stories WHERE id = ?", [story_id]);

  if (image) fs.unlinkSync(path.join("uploads/stories", path.basename(image)));
  if (video) fs.unlinkSync(path.join("uploads/videos", path.basename(video)));

  return { success: true, message: "Story đã bị xóa!" };
};
