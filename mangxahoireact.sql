-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2025 at 03:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mangxahoireact`
--

-- --------------------------------------------------------

--
-- Table structure for table `friends`
--

CREATE TABLE `friends` (
  `id` int(11) NOT NULL,
  `send_id` int(11) NOT NULL,
  `receive_id` int(11) NOT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `friends`
--

INSERT INTO `friends` (`id`, `send_id`, `receive_id`, `status`, `created_at`) VALUES
(6, 18, 17, 'accepted', '2025-03-08 06:59:06'),
(7, 19, 17, 'accepted', '2025-03-08 11:12:18'),
(8, 19, 18, 'accepted', '2025-03-08 11:12:24'),
(10, 20, 17, 'accepted', '2025-03-08 11:17:44'),
(11, 19, 20, 'accepted', '2025-03-11 10:55:32'),
(12, 22, 17, 'accepted', '2025-03-15 16:57:35'),
(13, 18, 33, 'pending', '2025-03-16 17:13:56'),
(14, 18, 34, 'pending', '2025-03-16 17:13:57'),
(15, 17, 42, 'pending', '2025-03-16 17:15:30'),
(16, 18, 42, 'pending', '2025-03-16 17:17:36'),
(17, 17, 41, 'pending', '2025-03-16 17:18:13'),
(18, 17, 33, 'pending', '2025-03-17 08:14:15');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_by` int(11) NOT NULL,
  `avatar` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`, `description`, `created_by`, `avatar`, `created_at`) VALUES
(17, 'Nhóm Thảo Luận IT', NULL, 17, 'uploads/groups/avatar-1742183649860.jpg', '2025-03-17 03:54:09'),
(18, 'OKBOY', NULL, 17, NULL, '2025-03-17 04:10:28'),
(19, 'ADSADAS', NULL, 17, 'uploads/groups/avatar-1742184809027.jpg', '2025-03-17 04:13:29'),
(20, 'ADSADAS', NULL, 17, 'uploads/groups/avatar-1742184858820.jpg', '2025-03-17 04:14:18'),
(21, 'aaaaa', NULL, 17, 'uploads/groups/avatar-1742185021601.png', '2025-03-17 04:17:01'),
(22, 'NHOMMMMM', NULL, 17, 'uploads/groups/avatar-1742185653506.jpg', '2025-03-17 04:27:33'),
(23, 'okoko', NULL, 17, NULL, '2025-03-17 04:29:44'),
(24, 'NHOM', NULL, 17, 'uploads/groups/avatar-1742198963938.webp', '2025-03-17 08:09:23'),
(25, '123231', NULL, 17, NULL, '2025-03-17 08:10:42'),
(26, 'đấ', NULL, 17, NULL, '2025-03-17 08:24:12'),
(27, 'đấ', NULL, 17, NULL, '2025-03-17 08:24:15'),
(28, 'sang', NULL, 17, 'uploads/groups/1742200265343.png', '2025-03-17 08:31:05'),
(29, 'Nhóm Thảo Luận IT', NULL, 17, 'uploads/groups/1742200873272.jpg', '2025-03-17 08:41:13'),
(30, 'Nhóm Hỏi Đáp Về Lập Trình', NULL, 17, 'uploads/groups/1742200901007.jpg', '2025-03-17 08:41:41'),
(31, 'Nhóm Thảo luận WEB', NULL, 18, 'uploads/groups/1742281626750.jpg', '2025-03-18 07:07:06');

-- --------------------------------------------------------

--
-- Table structure for table `group_chats`
--

CREATE TABLE `group_chats` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT 'default-group.png',
  `created_by` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_chats`
--

INSERT INTO `group_chats` (`id`, `name`, `avatar`, `created_by`, `created_at`) VALUES
(6, 'Nhóm 4 ae', 'uploads/group_chats/1741607856855.jpg', 17, '2025-03-10 11:57:36');

-- --------------------------------------------------------

--
-- Table structure for table `group_chat_members`
--

CREATE TABLE `group_chat_members` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_chat_members`
--

INSERT INTO `group_chat_members` (`id`, `group_id`, `user_id`, `joined_at`) VALUES
(15, 6, 17, '2025-03-10 11:57:36'),
(16, 6, 18, '2025-03-10 11:57:36'),
(17, 6, 19, '2025-03-10 11:57:36'),
(18, 6, 20, '2025-03-10 11:57:36');

-- --------------------------------------------------------

--
-- Table structure for table `group_chat_messages`
--

CREATE TABLE `group_chat_messages` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `sent_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_chat_messages`
--

INSERT INTO `group_chat_messages` (`id`, `group_id`, `sender_id`, `message`, `media`, `sent_at`) VALUES
(1, 6, 17, 'Xin chao nha', NULL, '2025-03-10 13:52:15'),
(2, 6, 20, 'Chào', NULL, '2025-03-10 14:01:03'),
(3, 6, 20, 'khỏe không', NULL, '2025-03-10 14:03:58'),
(4, 6, 17, 'ok', NULL, '2025-03-10 14:28:10'),
(5, 6, 20, '193812903', NULL, '2025-03-10 14:29:41'),
(6, 6, 17, 'ok', NULL, '2025-03-10 14:29:52'),
(7, 6, 20, 'OKOKOOKO', NULL, '2025-03-10 14:30:23'),
(8, 6, 17, 'hi', NULL, '2025-03-10 14:32:38'),
(9, 6, 17, 'tuyet voi', NULL, '2025-03-10 14:34:32'),
(10, 6, 17, 'good', NULL, '2025-03-10 14:50:41'),
(11, 6, 20, 'Tuyet voi', NULL, '2025-03-10 15:19:45'),
(12, 6, 20, 'hi', NULL, '2025-03-10 15:26:18'),
(13, 6, 17, 'god', NULL, '2025-03-10 15:28:54'),
(14, 6, 17, ' Tuyet voi luon', NULL, '2025-03-10 15:29:25'),
(21, 6, 19, 'hi', NULL, '2025-03-14 07:48:17'),
(22, 6, 17, 'hi', NULL, '2025-03-14 07:48:28'),
(23, 6, 17, 'aaaaaa', NULL, '2025-03-15 00:38:58'),
(29, 6, 18, 'lo', NULL, '2025-03-16 15:35:00');

-- --------------------------------------------------------

--
-- Table structure for table `group_comments`
--

CREATE TABLE `group_comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_members`
--

CREATE TABLE `group_members` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `joined_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_members`
--

INSERT INTO `group_members` (`id`, `group_id`, `user_id`, `joined_at`) VALUES
(1, 28, 19, '2025-03-17 08:31:05'),
(2, 28, 18, '2025-03-17 08:31:05'),
(3, 28, 17, '2025-03-17 08:31:05'),
(4, 29, 18, '2025-03-17 08:41:13'),
(5, 29, 19, '2025-03-17 08:41:13'),
(6, 29, 20, '2025-03-17 08:41:13'),
(7, 29, 22, '2025-03-17 08:41:13'),
(8, 29, 17, '2025-03-17 08:41:13'),
(9, 30, 18, '2025-03-17 08:41:41'),
(10, 30, 19, '2025-03-17 08:41:41'),
(11, 30, 20, '2025-03-17 08:41:41'),
(12, 30, 22, '2025-03-17 08:41:41'),
(13, 30, 17, '2025-03-17 08:41:41'),
(14, 31, 17, '2025-03-18 07:07:06'),
(15, 31, 19, '2025-03-18 07:07:06'),
(16, 31, 18, '2025-03-18 07:07:06');

-- --------------------------------------------------------

--
-- Table structure for table `group_posts`
--

CREATE TABLE `group_posts` (
  `id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `media` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `send_id` int(11) DEFAULT NULL,
  `receive_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `content`, `send_id`, `receive_id`, `created_at`) VALUES
(72, 'HELLO ', 17, 18, '2025-03-05 03:38:42'),
(73, 'GỬI TIN NHẮN', 17, 18, '2025-03-05 03:39:35'),
(74, 'Hello', 17, 18, '2025-03-05 03:43:28'),
(75, 'Đã trả lời', 18, 17, '2025-03-05 03:54:18'),
(76, '12312321321', 17, 18, '2025-03-05 04:03:51'),
(77, '48329048234983294083048238320', 17, 18, '2025-03-05 04:06:20'),
(78, '4823843242384932890324', 18, 17, '2025-03-05 04:06:40'),
(79, 'Xin chào nha', 18, 17, '2025-03-05 06:27:04'),
(80, 'haha', 17, 18, '2025-03-05 06:30:53'),
(81, 'ok', 17, 18, '2025-03-05 06:36:44'),
(82, 'Hus', 18, 17, '2025-03-06 02:05:31'),
(83, 'Ê', 18, 17, '2025-03-06 02:08:06'),
(84, 'ALo', 17, 18, '2025-03-06 02:08:14'),
(85, 'ok', 17, 18, '2025-03-09 13:19:42'),
(86, 'alo', 17, 19, '2025-03-14 15:27:41'),
(87, 'sfsdfds', 17, 18, '2025-03-15 00:38:41'),
(88, '1312321', 17, 19, '2025-03-15 00:38:54'),
(89, 'hi', 17, 18, '2025-03-15 14:20:35'),
(90, '4234324324', 17, 18, '2025-03-15 14:20:55'),
(91, 'test', 17, 18, '2025-03-16 15:29:36');

-- --------------------------------------------------------

--
-- Table structure for table `message_reactions`
--

CREATE TABLE `message_reactions` (
  `id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `reaction` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `privacy` enum('public','friends','private') DEFAULT 'public',
  `email` varchar(255) NOT NULL,
  `video` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `content`, `image`, `created_at`, `privacy`, `email`, `video`) VALUES
(3, 17, 'Xinh', 'uploads/posts/67ac9a929dae2.jpg', '2025-02-12 19:56:50', 'public', '', NULL),
(4, 17, 'Coder', 'uploads/posts/67ae22ba4384b.avif', '2025-02-13 23:50:02', 'public', '', NULL),
(5, 17, 'okkk', 'uploads/posts/67aed1c198fda.jpg', '2025-02-14 12:16:49', 'public', '', NULL),
(6, 17, 'Code', 'uploads/posts/67b1f438634f6.jpg', '2025-02-16 21:20:40', 'public', '', NULL),
(7, 17, 'okkk', 'uploads/posts/67b69aace6bd0.jpg', '2025-02-20 09:59:56', 'public', '', NULL),
(10, 17, 'code', 'uploads/posts/67c173727ad18.jpg', '2025-02-28 15:27:30', 'public', '', NULL),
(168, 17, 'Đăng bài viết', 'uploads/posts/1740838473430.jpg', '2025-03-01 21:14:33', 'public', '', NULL),
(175, 18, 'Chill Guy', NULL, '2025-03-02 01:06:12', 'public', '', 'uploads/videos/1740852372354.mp4'),
(178, 17, 'Video', NULL, '2025-03-02 01:40:50', 'public', '', 'uploads/videos/1740854450728.mp4'),
(180, 18, 'ok', 'uploads/posts/1740899920113.jpg', '2025-03-02 14:18:40', 'public', '', NULL),
(181, 17, 'Nhạc hay', NULL, '2025-03-02 17:03:35', 'public', '', 'uploads/videos/1740909815162.mp4'),
(182, 18, 'Cool Boy', NULL, '2025-03-03 09:29:24', 'public', '', 'uploads/videos/1740968964343.mp4'),
(183, 18, 'Bolero', NULL, '2025-03-03 09:53:31', 'public', '', 'uploads/videos/1740970411300.mp4'),
(188, 17, 'Danh Sách Học Bổng Năm 2 - Học Kỳ 1\r\n2023-2024', 'uploads/posts/1741173466334.png', '2025-03-05 18:17:46', 'public', '', NULL),
(189, 17, 'Nhạc hay', NULL, '2025-03-06 09:12:24', 'public', '', 'uploads/videos/1741227144770.mp4'),
(190, 19, 'Doremon', 'uploads/posts/1741963686854.jpg', '2025-03-14 21:48:06', 'public', '', NULL),
(191, 18, 'ok', 'uploads/posts/1742005568142.png', '2025-03-15 09:26:08', 'public', '', NULL),
(192, 17, '12321321', 'uploads/posts/1742005614915.jpg', '2025-03-15 09:26:54', 'public', '', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `post_comments`
--

CREATE TABLE `post_comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_comments`
--

INSERT INTO `post_comments` (`id`, `post_id`, `user_id`, `content`, `created_at`) VALUES
(73, 180, 18, 'ok', '2025-03-02 14:21:16'),
(74, 180, 17, 'Xinh', '2025-03-02 14:31:02'),
(75, 180, 17, 'Tuyệt Vời', '2025-03-02 15:34:08'),
(76, 180, 17, 'WOW', '2025-03-02 15:35:43'),
(77, 181, 17, 'Cảm động', '2025-03-02 17:21:49'),
(78, 183, 17, 'ok', '2025-03-03 10:08:38'),
(82, 188, 18, 'Gud', '2025-03-06 10:48:45'),
(83, 188, 20, 'ok', '2025-03-11 18:12:02'),
(84, 190, 17, 'ok', '2025-03-14 22:16:51'),
(85, 192, 17, 'ok', '2025-03-15 09:33:26'),
(86, 192, 17, 'xin', '2025-03-20 09:47:48');

-- --------------------------------------------------------

--
-- Table structure for table `post_reactions`
--

CREATE TABLE `post_reactions` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `reaction` enum('like','love','haha','wow','sad','angry') NOT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `post_reactions`
--

INSERT INTO `post_reactions` (`id`, `post_id`, `user_id`, `reaction`, `created_at`) VALUES
(160, 178, 17, 'love', '2025-03-02 20:59:56'),
(176, 181, 18, 'love', '2025-03-03 09:20:54'),
(179, 183, 18, 'haha', '2025-03-03 09:54:13'),
(180, 183, 17, 'haha', '2025-03-03 10:11:18'),
(182, 188, 18, 'love', '2025-03-06 09:04:22'),
(183, 189, 18, 'love', '2025-03-06 10:48:19'),
(184, 188, 20, 'love', '2025-03-11 18:11:56'),
(185, 190, 17, 'angry', '2025-03-14 22:07:33'),
(186, 191, 18, 'love', '2025-03-15 09:26:24'),
(192, 189, 17, 'love', '2025-03-15 09:44:53'),
(197, 192, 17, 'love', '2025-03-15 10:20:19'),
(200, 191, 17, 'haha', '2025-03-15 15:01:20'),
(202, 192, 18, 'haha', '2025-03-15 22:33:58');

-- --------------------------------------------------------

--
-- Table structure for table `sidebar`
--

CREATE TABLE `sidebar` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `ten_menu` varchar(100) NOT NULL,
  `link` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sidebar`
--

INSERT INTO `sidebar` (`id`, `image`, `ten_menu`, `link`) VALUES
(13, 'uploads/menus/67a82bec3e893.jpg', 'Trang chủ', ''),
(14, 'uploads/menus/67ac8394696b5.jpg', 'Bạn bè', ''),
(16, 'uploads/menus/67ac83a7c57df.jpg', 'Kỉ niệm', ''),
(17, 'uploads/menus/67ac83b244f30.jpg', 'Nhóm', ''),
(18, 'uploads/menus/67ac83b8b2844.jpg', 'Video', ''),
(19, 'uploads/menus/67ac83c31f51c.jpg', 'Marketplace ', ''),
(25, 'uploads/menus/1741387496541.jpg', 'Love', ''),
(27, 'uploads/menus/1742176729458.jpg', 'OK', '');

-- --------------------------------------------------------

--
-- Table structure for table `stories`
--

CREATE TABLE `stories` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `reactions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`reactions`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stories`
--

INSERT INTO `stories` (`id`, `user_id`, `content`, `image`, `video`, `views`, `reactions`, `created_at`) VALUES
(18, 17, NULL, 'uploads/stories/1741518333186.jpg', NULL, 3, NULL, '2025-03-09 11:05:33'),
(19, 17, NULL, 'uploads/stories/1741518381984.jpg', NULL, 4, NULL, '2025-03-09 11:06:21'),
(20, 17, NULL, 'uploads/stories/1741519522214.jpg', NULL, 4, NULL, '2025-03-09 11:25:22'),
(21, 17, NULL, 'uploads/stories/1741519523126.jpg', NULL, 4, NULL, '2025-03-09 11:25:23'),
(22, 17, NULL, 'uploads/stories/1741519605910.jpg', NULL, 4, NULL, '2025-03-09 11:26:45'),
(23, 17, NULL, 'uploads/stories/1741519673463.jpg', NULL, 5, NULL, '2025-03-09 11:27:53'),
(24, 17, NULL, 'uploads/stories/1741519883242.jpg', NULL, 5, NULL, '2025-03-09 11:31:23'),
(25, 17, NULL, 'uploads/stories/1741519924885.jpg', NULL, 5, NULL, '2025-03-09 11:32:04'),
(26, 17, NULL, 'uploads/stories/1741519987773.jpg', NULL, 6, NULL, '2025-03-09 11:33:07'),
(27, 17, NULL, 'uploads/stories/1741520193199.png', NULL, 7, NULL, '2025-03-09 11:36:33'),
(28, 17, NULL, 'uploads/stories/1741520252428.jpg', NULL, 14, NULL, '2025-03-09 11:37:32'),
(29, 17, NULL, NULL, 'uploads/videos/1741520796649.mp4', 8, NULL, '2025-03-09 11:46:36'),
(30, 17, NULL, NULL, 'uploads/videos/1741608975751.mp4', 14, NULL, '2025-03-10 12:16:15'),
(31, 17, NULL, NULL, 'uploads/videos/1741618104315.mp4', 17, NULL, '2025-03-10 14:48:24'),
(32, 20, NULL, 'uploads/stories/1741677459530.jpg', NULL, 12, NULL, '2025-03-11 07:17:39'),
(33, 17, NULL, NULL, 'uploads/videos/1741690333473.mp4', 11, NULL, '2025-03-11 10:52:14'),
(34, 17, NULL, NULL, 'uploads/videos/1741936249394.mp4', 7, NULL, '2025-03-14 07:10:49'),
(35, 17, NULL, 'uploads/stories/1742040969116.jpg', NULL, 3, NULL, '2025-03-15 12:16:09');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `avatar`, `created_at`) VALUES
(17, 'Huỳnh Thanh Sang', '$2b$10$i1hpVi2U.ANevF3ZMSLVG.pIpVVM8PUYmss/YfmrIIlYRJECIUfLS', 'sang022101032@tgu.edu.vn', 'uploads/avatars/1740797217104.png', '2025-03-01 02:46:57'),
(18, 'Phạm Gia Bảo', '$2b$10$TL687PesuM3jR8Ngnl2xhO8q6jjSxwA3p98HGliU8Ccn4J1mKOUL6', 'baohaha@gmail.com', 'uploads/avatars/1740813020958.jpg', '2025-03-01 07:10:21'),
(19, 'Huỳnh Nguyễn Long Phi', '$2b$10$78fpdho9NvSSedvB6pPSwuFZZ.74BHbLJj7mx7/mCRgY5pjpSY49u', 'phi022101034@tgu.edu.vn', 'uploads/avatars/1741432031852.png', '2025-03-08 11:07:11'),
(20, 'Nguyễn Hoàng Phước Thiện', '$2b$10$Yj33oG9Cki5UFc0DJc4h3eK5PhGZAMmRZhcrrS0hnaEMheQ1Th7pe', 'thien022101026@tgu.edu.vn', 'uploads/avatars/1741432636932.png', '2025-03-08 11:17:16'),
(22, 'Sang Sang', '$2b$10$Q.aXWLryzSMOZEGCZOCyd.ZEcRCDMOOqOtST5SXksU.9b8ssugt6u', 'sangsang123@gmail.com', 'uploads/avatars/1742057839099.png', '2025-03-15 16:57:19'),
(33, 'Sơn Tùng MTP', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'sontungmtp@gmail.com', 'uploads/avatars/hinh11.jpg', '2025-03-16 16:59:32'),
(34, 'Mỹ Tâm', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'mytam@tgu.edu.vn', 'uploads/avatars/hinh12.jpg', '2025-03-16 16:59:32'),
(35, 'Hà Anh Tuấn', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'haanhtuan1990@gmail.com', 'uploads/avatars/hinh13.jpg', '2025-03-16 16:59:32'),
(36, 'Đông Nhi', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'dongnhi@hcmut.edu.vn', 'uploads/avatars/hinh14.jpg', '2025-03-16 16:59:32'),
(37, 'Noo Phước Thịnh', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'noophuocthinh@gmail.com', 'uploads/avatars/hinh15.jpg', '2025-03-16 16:59:32'),
(38, 'Hoàng Thùy Linh', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'hoangthuylinh456@yahoo.com.vn', 'uploads/avatars/hinh16.jpg', '2025-03-16 16:59:32'),
(39, 'Thùy Chi', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'thuychi@outlook.com', 'uploads/avatars/hinh17.jpg', '2025-03-16 16:59:32'),
(40, 'Phan Mạnh Quỳnh', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'phanmanhquynh88@gmail.com', 'uploads/avatars/hinh18.jpg', '2025-03-16 16:59:32'),
(41, 'Hòa Minzy', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'hoaminzy@vnu.edu.vn', 'uploads/avatars/hinh19.jpg', '2025-03-16 16:59:32'),
(42, 'Đức Phúc', '$2b$10$xxxxxxxxxxxxxxxxxxxxx', 'ducphuc123@fpt.com.vn', 'uploads/avatars/hinh20.jpg', '2025-03-16 16:59:32');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `friends`
--
ALTER TABLE `friends`
  ADD PRIMARY KEY (`id`),
  ADD KEY `send_id` (`send_id`),
  ADD KEY `receive_id` (`receive_id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `group_chats`
--
ALTER TABLE `group_chats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `created_by` (`created_by`);

--
-- Indexes for table `group_chat_members`
--
ALTER TABLE `group_chat_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `group_chat_messages`
--
ALTER TABLE `group_chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `sender_id` (`sender_id`);

--
-- Indexes for table `group_comments`
--
ALTER TABLE `group_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `group_members`
--
ALTER TABLE `group_members`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `group_posts`
--
ALTER TABLE `group_posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `group_id` (`group_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_send` (`send_id`),
  ADD KEY `id_recieve` (`receive_id`);

--
-- Indexes for table `message_reactions`
--
ALTER TABLE `message_reactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `message_id` (`message_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `post_reactions`
--
ALTER TABLE `post_reactions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `sidebar`
--
ALTER TABLE `sidebar`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stories`
--
ALTER TABLE `stories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `friends`
--
ALTER TABLE `friends`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `group_chats`
--
ALTER TABLE `group_chats`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `group_chat_members`
--
ALTER TABLE `group_chat_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `group_chat_messages`
--
ALTER TABLE `group_chat_messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `group_comments`
--
ALTER TABLE `group_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `group_members`
--
ALTER TABLE `group_members`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `group_posts`
--
ALTER TABLE `group_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;

--
-- AUTO_INCREMENT for table `message_reactions`
--
ALTER TABLE `message_reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=193;

--
-- AUTO_INCREMENT for table `post_comments`
--
ALTER TABLE `post_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- AUTO_INCREMENT for table `post_reactions`
--
ALTER TABLE `post_reactions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=203;

--
-- AUTO_INCREMENT for table `sidebar`
--
ALTER TABLE `sidebar`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `stories`
--
ALTER TABLE `stories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `friends`
--
ALTER TABLE `friends`
  ADD CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`send_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`receive_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_chats`
--
ALTER TABLE `group_chats`
  ADD CONSTRAINT `group_chats_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_chat_members`
--
ALTER TABLE `group_chat_members`
  ADD CONSTRAINT `group_chat_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_chats` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_chat_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_chat_messages`
--
ALTER TABLE `group_chat_messages`
  ADD CONSTRAINT `group_chat_messages_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `group_chats` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_chat_messages_ibfk_2` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_comments`
--
ALTER TABLE `group_comments`
  ADD CONSTRAINT `group_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `group_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_members`
--
ALTER TABLE `group_members`
  ADD CONSTRAINT `group_members_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_members_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_posts`
--
ALTER TABLE `group_posts`
  ADD CONSTRAINT `group_posts_ibfk_1` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `group_posts_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`send_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `messages_ibfk_2` FOREIGN KEY (`receive_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `message_reactions`
--
ALTER TABLE `message_reactions`
  ADD CONSTRAINT `message_reactions_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_comments`
--
ALTER TABLE `post_comments`
  ADD CONSTRAINT `post_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `post_reactions`
--
ALTER TABLE `post_reactions`
  ADD CONSTRAINT `post_reactions_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `post_reactions_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `stories`
--
ALTER TABLE `stories`
  ADD CONSTRAINT `stories_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
