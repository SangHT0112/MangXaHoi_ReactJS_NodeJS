import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


export const getGroupById = async (groupId) => {
    const response = await axios.get(`${API_BASE_URL}/api/groups/${groupId}`);
    return response.data;
};

export const getMember = async (groupId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/groups/${groupId}/members`);
        return response.data; // Giả sử API trả về danh sách thành viên
    } catch (error) {
        console.error("Lỗi lấy danh sách thành viên:", error);
        return { success: false, message: "Lỗi lấy danh sách thành viên" };
    }
};



export const getPostsByGroup = async (groupId) => {
    const response = await axios.get(`${API_BASE_URL}/api/groups/${groupId}/posts`);
    return response.data;
};

export const joinGroup = async (userId, groupId) => {
    await axios.post(`${API_BASE_URL}/api/groups/${groupId}/join`, { userId });
};

export const leaveGroup = async (userId, groupId) => {
    await axios.post(`${API_BASE_URL}/api/groups/${groupId}/leave`, { userId });
};

export const checkMembership = async (userId, groupId) => {
    const response = await axios.get(`${API_BASE_URL}/api/groups/${groupId}/check-membership/${userId}`);
    return response.data;
};