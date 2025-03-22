import express from "express";
import multer from "multer";
import path from "path";
import { createNewGroup, getGroupsByUser,getGroupDetail,getMembers  } from "../controllers/groupController.js";

const router = express.Router();

// Cấu hình lưu ảnh nhóm
const storage = multer.diskStorage({
    destination: "uploads/groups/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Routes
router.post("/create", upload.single("avatar"), createNewGroup);
router.get("/user/:userId", getGroupsByUser);

//Lấy thông tin của group
router.get("/:groupId", getGroupDetail);

// API lấy danh sách thành viên nhóm
router.get("/:groupId/members", getMembers);


export default router;
