import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import db from "./db.js"; // ✅ Kết nối MySQL
import http from "http";
import { Server } from "socket.io";
import { saveMessage } from "./models/messageModel.js"; // ✅ Lưu tin nhắn vào MySQL
import { sendMessage } from "./models/groupModels.js"; // ✅ Lưu tin nhắn nhóm

// 🔥 Import routes
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import commentPostRoutes from "./routes/commentPostRoutes.js";
import reactionPostRoutes from "./routes/reactionPostRoutes.js";
import sidebarRoutes from "./routes/sidebarRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import friendRoutes from "./routes/friendRoutes.js";
import storyRoutes from "./routes/storyRoutes.js";
import groupRoutes from "./routes/groupRoutes.js";

dotenv.config();
const app = express();
const server = http.createServer(app); // Tạo HTTP Server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

// ✅ Fix lỗi __dirname trong ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Log request để debug
app.use((req, res, next) => {
  console.log(`📩 [${req.method}] ${req.url}`);
  next();
});

// ✅ API Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/comments", commentPostRoutes);
app.use("/api/reactions", reactionPostRoutes);
app.use("/api/sidebar", sidebarRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/friends", friendRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/groups", groupRoutes);

// ✅ Lưu trữ socket ID của user
let onlineUsers = {}; // Lưu danh sách user online

// ✅ KẾT NỐI WEBSOCKET
io.on("connection", (socket) => {
  console.log("🟢 New WebSocket Connection:", socket.id);

  socket.on("registerUser", (userId) => {
    if (!userId) return;

    if (!onlineUsers[userId]) {
      onlineUsers[userId] = [];
    }

    // Tránh thêm trùng socket ID
    if (!onlineUsers[userId].includes(socket.id)) {
      onlineUsers[userId].push(socket.id);
    }

    console.log("📌 Danh sách user online sau cập nhật:", onlineUsers);
  });

  socket.on("disconnect", () => {
    for (const userId in onlineUsers) {
      onlineUsers[userId] = onlineUsers[userId].filter((id) => id !== socket.id);
      if (onlineUsers[userId].length === 0) {
        delete onlineUsers[userId]; // Xóa user nếu không còn socket
      }
    }

    console.log("🔴 User disconnected:", socket.id);
    console.log("📌 Danh sách user online sau cập nhật:", onlineUsers);
  });
  

  socket.on("getOnlineUsers", () => {
    socket.emit("updateUsers", onlineUsers);
  });
  
  

  // ✅ Xử lý gửi tin nhắn cá nhân
  socket.on("sendMessage", async (data) => {
    console.log("📩 Tin nhắn nhận được từ client:", data);
    const { send_id, receive_id, content } = data;

    if (!send_id || !receive_id || !content) {
      console.error("❌ Lỗi: Thiếu dữ liệu tin nhắn", { send_id, receive_id, content });
      return;
    }

    try {
      await saveMessage(send_id, receive_id, content);
      io.emit("receiveMessage", { send_id, receive_id, content, created_at: new Date() });
    } catch (error) {
      console.error("❌ Lỗi khi lưu tin nhắn:", error);
    }
  });

  // ✅ Xử lý gửi tin nhắn nhóm
  socket.on("sendGroupMessage", async (data) => {
    console.log("📩 Tin nhắn nhóm nhận từ client:", data);

    const { username, avatar, group_id, sender_id, message, media } = data;
    if (!group_id || !sender_id || (!message && !media)) {
      console.error("❌ Lỗi: Thiếu dữ liệu tin nhắn nhóm", data);
      return;
    }

    try {
      console.log("✅ Đang lưu tin nhắn vào DB...");
      await sendMessage(group_id, sender_id, message, media);

      console.log("✅ Tin nhắn đã lưu thành công, gửi lại cho nhóm...");
      io.to(`group_${group_id}`).emit("receiveGroupMessage", {
        username,
        avatar,
        group_id,
        sender_id,
        message,
        media,
        sent_at: new Date(),
      });
    } catch (error) {
      console.error("❌ Lỗi khi gửi tin nhắn nhóm:", error);
    }
  });

  // ✅ Tham gia nhóm chat
  socket.on("joinGroup", (group_id) => {
    socket.join(`group_${group_id}`);
    console.log(`✅ Người dùng ${socket.id} đã tham gia nhóm ${group_id}`);
  });

  // ✅ Rời nhóm chat
  socket.on("leaveGroup", (group_id) => {
    socket.leave(`group_${group_id}`);
    console.log(`👋 Người dùng ${socket.id} rời khỏi nhóm ${group_id}`);
  });


  
});

// ✅ Kết nối MySQL
db.getConnection()
  .then(() => console.log("✅ Kết nối MySQL thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MySQL:", err));

// ✅ Khởi động server
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);
});
