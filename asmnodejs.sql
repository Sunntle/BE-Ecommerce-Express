-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 26, 2023 at 07:59 AM
-- Server version: 10.4.25-MariaDB
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `asmnodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `color_id` int(11) NOT NULL,
  `color` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`color_id`, `color`) VALUES
(1, 'red'),
(2, 'pink'),
(3, 'blue'),
(4, 'green'),
(5, 'purple'),
(6, 'brown');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `img` varchar(1000) NOT NULL,
  `idSp` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `img`, `idSp`) VALUES
(14, 'https://flone.jamstacktemplates.dev/assets/img/product/fashion/9.jpg', 1),
(15, 'https://flone.jamstacktemplates.dev/assets/img/product/fashion/7.jpg', 1),
(16, 'https://flone.jamstacktemplates.dev/assets/img/product/fashion/5.jpg', 2),
(17, 'https://flone.jamstacktemplates.dev/assets/img/product/fashion/2.jpg', 2),
(19, 'https://flone.jamstacktemplates.dev/assets/img/product/fashion/8.jpg', 3),
(20, 'https://flone.jamstacktemplates.dev/assets/img/product/fashion/1.jpg', 4),
(21, 'https://flone.jamstacktemplates.dev/assets/img/product/fashion/7.jpg', 4),
(37, 'https://res.cloudinary.com/dw6jih4yt/image/upload/v1690464892/ImagesProduct/eudsj95n7vpxzu9fel0t.png', 68),
(38, 'https://res.cloudinary.com/dw6jih4yt/image/upload/v1690464891/ImagesProduct/tzeeanphuyurdt1lsfdj.png', 68),
(39, 'https://res.cloudinary.com/dw6jih4yt/image/upload/v1690464990/ImagesProduct/wxmjmk9g8jnvqdj5s0ia.png', 69),
(40, 'https://res.cloudinary.com/dw6jih4yt/image/upload/v1690464990/ImagesProduct/crioabwvpzmwipuyzrxb.png', 69),
(41, 'https://res.cloudinary.com/dw6jih4yt/image/upload/w_600,h_800/v1690465199/ImagesProduct/scy3gdthonlomniq8yrj.png', 70),
(42, 'https://res.cloudinary.com/dw6jih4yt/image/upload/w_600,h_800/v1690465249/ImagesProduct/tfgifaaciusa4gosthxe.png', 71);

-- --------------------------------------------------------

--
-- Table structure for table `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `id` int(11) NOT NULL,
  `tenLoai` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loaisanpham`
--

INSERT INTO `loaisanpham` (`id`, `tenLoai`) VALUES
(1, 'Áo'),
(2, 'Quần'),
(3, 'Áo khoác'),
(4, 'Vớ'),
(5, 'Mũ');

-- --------------------------------------------------------

--
-- Table structure for table `order_details`
--

CREATE TABLE `order_details` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `payment_id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT ' 0 - success\r\n1 - pending\r\n2 - fail',
  `order_idVnPay` int(11) NOT NULL DEFAULT 0,
  `create_DateVnPay` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_details`
--

INSERT INTO `order_details` (`id`, `user_id`, `total`, `create_at`, `payment_id`, `name`, `address`, `status`, `order_idVnPay`, `create_DateVnPay`) VALUES
(117, 24, 1980000, '2023-05-20 06:58:41', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Đồng Văn Tỉnh Hà Giang', 0, 0, 0),
(118, 24, 1980000, '2023-07-20 07:08:31', 'NCB', '123 456 ', '2 Huyện Bảo Lạc Tỉnh Cao Bằng', 0, 140831, 0),
(119, 24, 500000, '2023-07-20 07:20:29', 'NCB', 'Glossy 223222 ', '1 Thành phố Hà Giang Tỉnh Hà Giang', 0, 142029, 2147483647),
(120, 24, 1980000, '2023-07-20 12:37:41', 'NCB', 'SHOES 2 ', '2 Huyện Mèo Vạc Tỉnh Hà Giang', 0, 193741, 2147483647),
(121, 24, 400000, '2023-07-20 12:51:35', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Đồng Văn Tỉnh Hà Giang', 0, 195135, 2147483647),
(122, 24, 1980000, '2023-07-20 12:53:50', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Đồng Văn Tỉnh Hà Giang', 0, 195350, 2147483647),
(123, 24, 998000, '2023-07-20 12:59:30', 'NCB', 'Tai Lee ', '123 Huyện Mèo Vạc Tỉnh Hà Giang', 0, 195930, 2147483647),
(124, 24, 1000000, '2023-07-20 13:04:49', 'NCB', 'SHOES 2 ', '2 Thành phố Hà Giang Tỉnh Hà Giang', 0, 200450, 2147483647),
(125, 24, 400000, '2023-07-20 13:11:39', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Đồng Văn Tỉnh Hà Giang', 0, 201139, 2147483647),
(126, 24, 400000, '2023-07-20 13:26:33', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 0, 0, 0),
(127, 24, 400000, '2023-07-20 13:27:31', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 0, 0, 0),
(128, 24, 400000, '2023-07-20 13:28:11', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 0, 0, 0),
(129, 24, 400000, '2023-07-20 13:29:00', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 0, 0, 0),
(130, 24, 400000, '2023-07-20 13:30:43', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 0, 0, 0),
(131, 24, 400000, '2023-07-20 13:31:10', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 0, 0, 0),
(132, 24, 400000, '2023-07-20 13:34:45', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 0, 203445, 2147483647),
(133, 24, 800000, '2023-07-21 06:12:47', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Bảo Lạc Tỉnh Cao Bằng', 1, 131247, 2147483647),
(134, 24, 1000000, '2023-07-21 06:30:39', 'NCB', 'SHOES 2 ', '2 Quận Ba Đình Thành phố Hà Nội', 2, 133039, 2147483647),
(135, 24, 1000000, '2023-07-22 07:39:31', 'COD', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Đồng Văn Tỉnh Hà Giang', 1, 143931, 2147483647),
(136, 24, 1000000, '2023-07-22 07:41:45', 'COD', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Đồng Văn Tỉnh Hà Giang', 0, 144145, 2147483647),
(137, 24, 1000000, '2023-07-22 07:42:17', 'COD', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Đồng Văn Tỉnh Hà Giang', 1, 144217, 2147483647),
(139, 24, 1000000, '2023-07-22 07:43:33', 'COD', 'SHOES 2 ', '2 Huyện Đồng Văn Tỉnh Hà Giang', 1, 0, 0),
(140, 24, 1980000, '2023-07-22 07:47:26', 'COD', 'SHOES 2 ', '2 Huyện Mèo Vạc Tỉnh Hà Giang', 0, 0, 0),
(146, 25, 2000000, '2023-07-27 12:53:45', 'NCB', 'Nguyen Van A ', '123 Huyện Đồng Văn Tỉnh Hà Giang', 0, 195345, 2147483647),
(147, 25, 1500000, '2023-07-29 10:29:49', 'COD', 'Nguyen Van A ', '123 Huyện Đồng Văn Tỉnh Hà Giang', 2, 0, 0),
(148, 25, 2980000, '2023-07-29 13:00:11', 'COD', 'Lê Tài ', 'Tan Dong, Go Cong Dong, Tien Giang Thành phố Cao Bằng Tỉnh Cao Bằng', 0, 0, 0),
(151, 24, 1980000, '2023-07-30 11:27:22', 'NCB', 'loai ThanhTai ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Đồng Văn Tỉnh Hà Giang', 0, 182722, 2147483647),
(153, 24, 4598000, '2023-08-01 12:32:31', 'NCB', 'Nguyen Van A ', '123 Quận Ba Đình Thành phố Hà Nội', 1, 193231, 2147483647),
(154, 24, 4598000, '2023-08-01 12:36:03', 'NCB', 'Lê Tài ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 2, 193603, 2147483647),
(155, 24, 3178000, '2023-08-01 13:19:34', 'NCB', 'Lê Tài ', 'Tan Dong, Go Cong Dong, Tien Giang Quận Hoàn Kiếm Thành phố Hà Nội', 0, 201934, 2147483647),
(156, 24, 4378000, '2023-10-14 02:47:46', 'AGRIBANK', '123 123123 ', '1 Huyện Bảo Lạc Tỉnh Cao Bằng', 2, 94746, 2147483647),
(157, 24, 1000000, '2023-10-14 02:48:57', 'NCB', 'Lê Tài ', 'Tan Dong, Go Cong Dong, Tien Giang Huyện Bảo Lâm Tỉnh Cao Bằng', 1, 94857, 2147483647);

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `create_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `size` varchar(11) DEFAULT NULL,
  `color` varchar(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `create_at`, `size`, `color`) VALUES
(85, 117, 2, 2, '2023-07-20 06:58:41', 'M', 'red'),
(86, 118, 2, 2, '2023-07-20 07:08:31', 'M', 'red'),
(87, 119, 1, 1, '2023-07-20 07:20:29', 'S', 'red'),
(88, 120, 2, 2, '2023-07-20 12:37:41', 'M', 'purple'),
(89, 122, 2, 2, '2023-07-20 12:53:50', 'M', 'red'),
(91, 124, 1, 2, '2023-07-20 13:04:49', 'S', 'pink'),
(96, 134, 1, 2, '2023-07-21 06:30:39', 'S', 'green'),
(97, 135, 1, 2, '2023-07-22 07:39:31', 'S', 'green'),
(98, 136, 1, 2, '2023-07-22 07:41:45', 'S', 'green'),
(99, 137, 1, 2, '2023-07-22 07:42:17', 'S', 'green'),
(100, 139, 1, 2, '2023-07-22 07:43:33', 'S', 'pink'),
(101, 140, 2, 2, '2023-07-22 07:47:26', 'M', 'red'),
(108, 146, 1, 2, '2023-07-27 12:53:45', 'S', 'pink'),
(109, 146, 1, 2, '2023-07-27 12:53:45', 'S', 'green'),
(110, 147, 1, 3, '2023-07-29 10:29:49', 'S', 'red'),
(111, 148, 2, 2, '2023-07-29 13:00:11', 'L', 'blue'),
(112, 148, 1, 2, '2023-07-29 13:00:11', 'S', 'pink'),
(117, 151, 2, 2, '2023-07-30 11:27:22', 'M', 'red'),
(119, 153, 1, 6, '2023-08-01 12:32:31', 'S', 'red'),
(120, 153, 69, 2, '2023-08-01 12:32:31', 'XL', 'purple'),
(121, 154, 1, 6, '2023-08-01 12:36:03', 'S', 'red'),
(122, 154, 69, 2, '2023-08-01 12:36:03', 'XL', 'purple'),
(123, 155, 68, 2, '2023-08-01 13:19:34', 'M', 'purple'),
(124, 155, 3, 2, '2023-08-01 13:19:34', 'S', 'red'),
(125, 156, 2, 2, '2023-10-14 02:47:46', 'M', 'red'),
(126, 156, 68, 2, '2023-10-14 02:47:46', 'M', 'purple'),
(127, 156, 1, 2, '2023-10-14 02:47:46', 'S', 'red'),
(128, 157, 1, 2, '2023-10-14 02:48:57', 'S', 'pink');

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `product_id` int(11) NOT NULL,
  `product_color` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_colors`
--

INSERT INTO `product_colors` (`product_id`, `product_color`) VALUES
(1, 1),
(1, 2),
(1, 3),
(1, 4),
(2, 1),
(2, 3),
(2, 5),
(3, 5),
(3, 1),
(3, 6),
(4, 4),
(68, 5),
(68, 6),
(69, 5),
(69, 6),
(70, 3),
(70, 4),
(71, 5),
(71, 6);

-- --------------------------------------------------------

--
-- Table structure for table `product_sizes`
--

CREATE TABLE `product_sizes` (
  `product_id` int(11) NOT NULL,
  `size_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product_sizes`
--

INSERT INTO `product_sizes` (`product_id`, `size_id`) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 3),
(4, 3),
(4, 4),
(3, 1),
(3, 2),
(68, 2),
(68, 3),
(69, 4),
(69, 3),
(70, 2),
(70, 4),
(71, 2),
(71, 4),
(71, 3);

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `idLoai` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `date` datetime NOT NULL DEFAULT current_timestamp(),
  `sold` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`id`, `idLoai`, `name`, `price`, `date`, `sold`) VALUES
(1, 1, 'Glossy Tee', 500000, '2023-01-20 00:00:00', 10),
(2, 2, 'CABINET BONE SHORT', 990000, '2023-01-01 00:00:00', 1),
(3, 1, 'CLAMOROUS GILE', 890000, '2023-10-02 00:00:00', 30),
(4, 3, 'TAWNY JACKET', 1190000, '2023-02-15 00:00:00', 0),
(68, 3, 'Jacket Fluffy', 699000, '2023-07-27 00:00:00', 0),
(69, 3, 'Trench coats', 799000, '2023-07-27 00:00:00', 0),
(70, 2, 'Short New French Terry', 259000, '2023-07-27 00:00:00', 0),
(71, 2, 'Daily Short Excool V2', 189000, '2023-07-27 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `size`
--

CREATE TABLE `size` (
  `size_id` int(11) NOT NULL,
  `size` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `size`
--

INSERT INTO `size` (`size_id`, `size`) VALUES
(1, 'S'),
(2, 'M'),
(3, 'L'),
(4, 'XL');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` tinyint(1) NOT NULL DEFAULT 0,
  `phone` varchar(13) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`, `phone`, `address`, `name`) VALUES
(24, 'test123', '$2b$10$J7zV3YEihGOgZFvXi2ijwOZn3XHHOC3Vn8LPX8C0t9hSbq.jMSOKC', 'ss@ss.com', 1, '0', '123 To Ky', 'Le Tai'),
(25, 'test321', '$2b$10$H8qAaU8hiFg3at.Rkk1C2.d1nK6NiYmTEYi6iSarHFGtiW9rWFZbi', 'finlay6511034@hotmail.com', 0, '0', '', ''),
(26, 'admin1', '$2b$10$og5TmTiGG/TCeYDPndsQM.mDqOZT/egvHtwm24ucfyuHtaa1WT0Ou', 'sadad@sdsad.com', 0, '0', '', ''),
(29, 'test1', '$2b$10$/J8tJ6mVHGx9UOluZ4sifOhXxyInf1QzSxTu9So6.TSGVszjPjjX2', 'test@test.com', 0, '0369852457', '', 'test12345'),
(30, 'test2', '$2b$10$Km6rpou74ZwG4Ynps6QDBeiIp9OY2voSn2oWVGl49YXEnwKYAsmjW', 'taikute012532@gmail.com', 0, '+84938339724', 'Tan Dong, Go Cong Dong, Tien Giang', 'test23'),
(31, 'Nguyen Van A', '$2b$10$or01MbE3uX1dMNZg8YKnHOzxouzcTLCM2RTOQMceh0nI7hhRWVsIO', '12@fpt.edu.vn', 0, '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`color_id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idSp` (`idSp`);

--
-- Indexes for table `loaisanpham`
--
ALTER TABLE `loaisanpham`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_details`
--
ALTER TABLE `order_details`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `payment_id` (`payment_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD KEY `product_color` (`product_color`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD KEY `product_id` (`product_id`),
  ADD KEY `size_id` (`size_id`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLoai` (`idLoai`);

--
-- Indexes for table `size`
--
ALTER TABLE `size`
  ADD PRIMARY KEY (`size_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `color_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100;

--
-- AUTO_INCREMENT for table `loaisanpham`
--
ALTER TABLE `loaisanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `order_details`
--
ALTER TABLE `order_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=129;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- AUTO_INCREMENT for table `size`
--
ALTER TABLE `size`
  MODIFY `size_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`idSp`) REFERENCES `sanpham` (`id`);

--
-- Constraints for table `order_details`
--
ALTER TABLE `order_details`
  ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `order_details` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `sanpham` (`id`);

--
-- Constraints for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD CONSTRAINT `product_colors_ibfk_1` FOREIGN KEY (`product_color`) REFERENCES `color` (`color_id`),
  ADD CONSTRAINT `product_colors_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `sanpham` (`id`);

--
-- Constraints for table `product_sizes`
--
ALTER TABLE `product_sizes`
  ADD CONSTRAINT `product_sizes_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `sanpham` (`id`),
  ADD CONSTRAINT `product_sizes_ibfk_2` FOREIGN KEY (`size_id`) REFERENCES `size` (`size_id`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`idLoai`) REFERENCES `loaisanpham` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
