import { saveMessage, getMessages } from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  const { send_id, receive_id, content } = req.body;

  if (!send_id || !receive_id || !content) {
    return res.status(400).json({ message: "Thiếu thông tin tin nhắn" });
  }

  try {
    await saveMessage(send_id, receive_id, content);
    res.status(201).json({ message: "Tin nhắn đã gửi" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi gửi tin nhắn", error });
  }
};

export const fetchMessages = async (req, res) => {
  const { user1, user2 } = req.params;

  try {
    const messages = await getMessages(user1, user2);
    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy tin nhắn", error });
  }
};
