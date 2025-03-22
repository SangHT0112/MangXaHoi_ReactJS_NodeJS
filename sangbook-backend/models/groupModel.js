import db from "../db.js";

// Tạo nhóm mới
export const createGroup = async (groupName, created_by, avatar) => {
    const [result] = await db.query(
        "INSERT INTO groups (name, created_by, avatar) VALUES (?, ?, ?)",
        [groupName, created_by, avatar]
    );
    return result.insertId;
};

// Thêm thành viên vào nhóm
export const addGroupMembers = async (groupId, members) => {
    if (!Array.isArray(members) || members.length === 0) return;

    const values = members.map(userId => [groupId, userId]);
    await db.query("INSERT INTO group_members (group_id, user_id) VALUES ?", [values]);
};

// Lấy danh sách nhóm của người dùng
export const getUserGroups = async (userId) => {
    const [rows] = await db.query(`
        SELECT g.* FROM \`groups\` g
        JOIN group_members gm ON g.id = gm.group_id
        WHERE gm.user_id = ?`, [userId]);
    return rows;
};


//GroupDetaiPage
// Lấy thông tin chi tiết của nhóm, bao gồm thông tin người tạo nhóm
export const getGroupById = async (groupId) => {
    const query = `
      SELECT 
        \`groups\`.*, 
        users.avatar AS creator_avatar, 
        users.username AS creator_username 
      FROM \`groups\`
      JOIN users ON \`groups\`.created_by = users.id
      WHERE \`groups\`.id = ?
    `;
    const [rows] = await db.query(query, [groupId]);
    return rows[0] || null;
};


// Lấy tất cả thành viên trong nhóm
export const getGroupMembers = async (groupId) => {
    const query = `
        SELECT users.id, users.username, users.avatar 
        FROM group_members 
        JOIN users ON group_members.user_id = users.id 
        WHERE group_members.group_id = ?;
    `;
    
    try {
        const [rows] = await db.query(query, [groupId]);
        return rows; // Trả về danh sách thành viên
    } catch (error) {
        console.error("Lỗi lấy danh sách thành viên:", error);
        throw error;
    }
};
