import express from "express";
import { createGroupController, addMemberController, sendMessageController, getGroupMessagesController, getUserGroupsController } from "../controllers/groupChatController.js";
import multer from "multer";
import path from "path";

// Cấu hình lưu trữ file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/group_chats/"); // Thư mục lưu ảnh nhóm
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const router = express.Router();

router.post("/create", upload.single("avatar"), createGroupController);
router.post("/add-member", addMemberController);
router.post("/send-message", sendMessageController);
router.get("/:group_id/messages", getGroupMessagesController);

router.get("/user/:user_id", getUserGroupsController);


export default router;