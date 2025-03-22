import db from "../db.js"; // Kết nối với MySQL
import fs from "fs";
import path from "path";
// Lấy tất cả bài viết
export const getAllPosts = async (user_id) => {   //user_id để lấy tương tác bài viếtviết
  const [rows] = await db.query(
    `
     SELECT 
          posts.*,
          users.email,
          users.username,
          users.avatar,
          (SELECT COUNT(*) FROM post_reactions WHERE post_reactions.post_id = posts.id) AS like_count,
          (SELECT COUNT(*) FROM post_comments WHERE post_comments.post_id = posts.id) AS comment_count,
          (SELECT reaction FROM post_reactions WHERE post_reactions.post_id = posts.id AND post_reactions.user_id = ?) AS user_reaction
      FROM posts
      JOIN users ON posts.user_id = users.id
      ORDER BY posts.id DESC
    `,
    [user_id]
  );
  return rows;
};



// Tạo bài viết mới
// Tạo bài viết mới
export const createPost = async (user_id, content, image, video) => {
  const imagePath = image ? `uploads/posts/${image.filename}` : null;
  const videoPath = video ? `uploads/videos/${video.filename}` : null;

  try {
    const [result] = await db.query(
      "INSERT INTO posts (user_id, content, image, video) VALUES (?, ?, ?, ?)",
      [user_id, content, imagePath, videoPath]
    );

    return {
      id: result.insertId,
      user_id,
      content,
      image: imagePath,
      video: videoPath,
    };
  } catch (error) {
    console.error("Lỗi khi thêm bài viết vào database:", error);
    throw error;
  }
};



// Xóa bài viết
export const deletePost = async (post_id, user_id) => {
  try {
    // Lấy thông tin bài viết trước khi xóa
    const [rows] = await db.query("SELECT image, video FROM posts WHERE id = ?", [post_id]);

    if (rows.length === 0) {
      return { success: false, message: "Bài viết không tồn tại hoặc không thuộc quyền sở hữu!" };
    }

    const { image, video } = rows[0];

    // Xóa bài viết khỏi database
    await db.query("DELETE FROM Posts WHERE id = ?", [post_id]);

    // Xóa file ảnh nếu có
    if (image) {
      const imagePath = path.join("uploads/posts", path.basename(image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Xóa file video nếu có
    if (video) {
      const videoPath = path.join("uploads/videos", path.basename(video));
      if (fs.existsSync(videoPath)) {
        fs.unlinkSync(videoPath);
      }
    }

    return { success: true, message: "Xóa bài viết thành công!" };
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
    throw error;
  }
};
