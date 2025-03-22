import { createGroup, addGroupMembers, getUserGroups, getGroupById,getGroupMembers  } from "../models/groupModel.js";

// API tạo nhóm
export const createNewGroup = async (req, res) => {
    try {
        const { name, created_by, members } = req.body;
        if (!name || !created_by || !Array.isArray(members) || members.length === 0) {
            return res.status(400).json({ success: false, message: "Thiếu thông tin nhóm." });
        }

        const avatar = req.file ? `uploads/groups/${req.file.filename}` : null;
        console.log("📌 Dữ liệu nhận được:", { name, created_by, members, avatar });

        const groupId = await createGroup(name, created_by, avatar);
        console.log("✅ Nhóm tạo thành công, ID:", groupId);

        await addGroupMembers(groupId, [...members, created_by]);
        console.log("✅ Thành viên đã được thêm vào nhóm!");

        res.status(201).json({ success: true, message: "Nhóm đã được tạo", groupId, avatar });
    } catch (error) {
        console.error("❌ Lỗi tạo nhóm:", error);
        res.status(500).json({ success: false, message: "Lỗi tạo nhóm.", error: error.message });
    }
};

// API lấy danh sách nhóm của người dùng
export const getGroupsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const groups = await getUserGroups(userId);
        res.json(groups);
    } catch (error) {
        console.error("❌ Lỗi lấy danh sách nhóm:", error);
        res.status(500).json({ success: false, message: "Lỗi lấy danh sách nhóm." });
    }
};


// API lấy thông tin chi tiết của nhóm
export const getGroupDetail = async (req, res) => {
    try {
        const { groupId } = req.params;
        const group = await getGroupById(groupId);

        if (!group) {
            return res.status(404).json({ success: false, message: "Nhóm không tồn tại." });
        }

        res.status(200).json({ success: true, group });
    } catch (error) {
        console.error("❌ Lỗi lấy thông tin nhóm:", error);
        res.status(500).json({ success: false, message: "Lỗi lấy thông tin nhóm." });
    }
};



// lấy thành viên nhómnhóm
export const getMembers = async (req, res) => {
    const { groupId } = req.params;
    
    try {
        const members = await getGroupMembers(groupId);
        res.json({ success: true, members });
    } catch (error) {
        res.status(500).json({ success: false, message: "Lỗi lấy danh sách thành viên", error });
    }
};