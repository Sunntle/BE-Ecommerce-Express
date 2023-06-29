-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 29, 2023 at 06:17 PM
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
(1, 'glossy_tee_blue.jpg', 1),
(2, 'glossy_tee_blue_2.jpg', 1),
(4, 'glossy_tee_blue_1.jpg', 1),
(5, 'bottom3.jpg', 2),
(6, 'bottom2.jpg', 2),
(7, 'bottom1.jpg', 2),
(8, 'hades_18_1.jpg', 3),
(9, 'hades_18_2.jpg', 3),
(10, 'hades_18_3.jpg', 3),
(11, 'jacket2.jpg', 4),
(12, 'jacket1.jpeg', 4),
(13, 'jacket3.jpg', 4);

-- --------------------------------------------------------

--
-- Table structure for table `loaisanpham`
--

CREATE TABLE `loaisanpham` (
  `id` int(11) NOT NULL,
  `tenLoai` varchar(255) NOT NULL,
  `type` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `loaisanpham`
--

INSERT INTO `loaisanpham` (`id`, `tenLoai`, `type`) VALUES
(1, 'Áo', 0),
(2, 'Quần', 0),
(3, 'Áo khoác', 0),
(4, 'Vớ', 0),
(5, 'Mũ', 0);

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `id` int(11) NOT NULL,
  `idLoai` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `solanxem` int(20) NOT NULL DEFAULT 0,
  `hot` int(11) NOT NULL DEFAULT 0,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `sold` int(11) DEFAULT 0,
  `img` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`id`, `idLoai`, `name`, `price`, `solanxem`, `hot`, `date`, `sold`, `img`) VALUES
(1, 1, 'Glossy Tee', 700000, 35, 0, '2023-01-20', 10, 'glossy_tee_blue_2.jpg'),
(2, 2, 'CABINET BONE SHORT', 990000, 1, 0, '2023-01-01', 1, 'bottom3.jpg'),
(3, 1, 'CLAMOROUS GILE', 890000, 2, 0, '2023-10-02', 30, 'hades_18_3.jpg'),
(4, 3, 'TAWNY JACKET', 1190000, 1, 0, '2023-02-15', 0, 'jacket2.jpg'),
(5, 3, 'Tee Blue 222', 0, 0, 0, '2023-04-03', 0, 'hades_18_3.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `slide`
--

CREATE TABLE `slide` (
  `id` int(11) NOT NULL,
  `img` varchar(1000) NOT NULL,
  `content` varchar(1000) DEFAULT NULL,
  `headerContent` varchar(255) DEFAULT NULL,
  `mainContent` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `slide`
--

INSERT INTO `slide` (`id`, `img`, `content`, `headerContent`, `mainContent`) VALUES
(1, 'hero-1.jpg', 'Một nhãn hiệu chuyên nghiệp tạo ra những thứ thiết yếu sang trọng. Được chế tác một cách có đạo đức với cam kết vững chắc về chất lượng vượt trội.', 'Bộ sưu tập mùa hè', 'Bộ sưu tập Thu - Đông 2030'),
(2, 'hero-2.jpg', 'Một nhãn hiệu chuyên nghiệp tạo ra những thứ thiết yếu sang trọng. Được chế tác một cách có đạo đức với cam kết vững chắc về chất lượng vượt trội.', 'Bộ sưu tập mùa hè', 'Bộ sưu tập Thu - Đông 2030');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `email`, `role`) VALUES
(1, '123', '$2b$10$7Abygp2DjOXkuMB1MrWGuO3BJZ3ecYskMYCF5aTPm7aM3u4R4OzP.', 'taile@gmail.com', 0),
(2, 'nd1', '$2b$10$KjVlgDQ2NVQnUqE8/KClt.m9ZDvypS2UsQi42G3Dk74qcK0lVmqpi', 'finlay6511034@hotmail.com', 0),
(3, 'nd1', '$2b$10$auATX2wMEkLVuwG.BQfY3uJ71Obcr9kxY.TeawGfrsTcIt1x0sUzq', 'finlay6511034@hotmail.com', 0),
(4, 'nd1', '$2b$10$XBVvLYrtL0oSDB/Bsd3xVOKjpQX7OrDiHCP9DTEzpDMQ/9NAH6k5S', 'finlay6511034@hotmail.com', 0),
(5, '123', '$2b$10$7SZRZv9AJpN27Iyh0lj44.9qHAtRqH9DABpJ9ChOQg0ldP0mECyWK', 'nva@gmail.com', 0),
(6, 'thanhtai', '$2b$10$EYL.w58l/apEJgRm09ruUuurwAZYZ0oqBDiFycBPXCEILNnkpwSMS', 'sdad@sss.com', 0),
(7, '222', '$2b$10$zd0Z5ZrCo2jmfE8y8t.0AeNcyNpScyhq9eAXpNR8RqN50mVKTwfs2', '222@222.com', 0),
(8, '1234', '$2b$10$XFIcAXJOdh5CtI34Hvx2V.qSDogByU2jGYH8eLqqin.CoNZz6bm52', 'ss@ss.com', 0);

--
-- Indexes for dumped tables
--

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
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idLoai` (`idLoai`);

--
-- Indexes for table `slide`
--
ALTER TABLE `slide`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `loaisanpham`
--
ALTER TABLE `loaisanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `slide`
--
ALTER TABLE `slide`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `images`
--
ALTER TABLE `images`
  ADD CONSTRAINT `images_ibfk_1` FOREIGN KEY (`idSp`) REFERENCES `sanpham` (`id`);

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`idLoai`) REFERENCES `loaisanpham` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
