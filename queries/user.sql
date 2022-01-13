-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2022 at 03:44 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `auction`
--

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `Password` varchar(500) NOT NULL,
  `DOB` date NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Role` int(11) NOT NULL DEFAULT 0,
  `Pending` tinyint(1) NOT NULL DEFAULT 0,
  `Verified` tinyint(1) NOT NULL DEFAULT 0,
  `isBanned` tinyint(1) NOT NULL DEFAULT 0,
  `ExpiredDate` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Username`, `FullName`, `Password`, `DOB`, `Email`, `Role`, `Pending`, `Verified`, `isBanned`, `ExpiredDate`) VALUES
(1, 'admin', 'Nguyễn Văn Tấn Phong', '$2a$10$D6QfslwNdlVonTrxPci7q.hIHAp9zEMfkbLJWigIGU1VHxV5L3pJ.', '2001-04-19', 'nvtphong19@clc.fitus.edu.vn', 2, 0, 1, 0, NULL),
(30, 'giai123', 'Phan Vĩ Giai', '$2a$10$Rq35FP9LMya94T8B4NunOeH00P2jdCnY/LO0KyRJxJyKi4majkZ5m', '2000-12-07', 'hackkerguy11@gmail.com', 1, 0, 1, 0, NULL),
(31, 'dzso1', 'Nguyễn Nhất Huy', '', '2001-04-19', 'hackkerguy@yahoo.com', 1, 0, 1, 0, NULL),
(32, 'ntmthu', 'Nguyễn Thị Minh Thu', '$2a$10$TJVfzJ1ZQLHhnuHa3ltblugmFsfyUNIOF6pWc4S.JhZG/VMeN3RQ6', '2021-12-28', '19127568@student.hcmus.edu.vn', 0, 0, 1, 0, NULL),
(33, 'thivl', 'Nguyễn Đăng Thi', '$2a$10$tmaLpnSatF1LPXMpMMtvj.54pIXKZOO9AHlPIWawwc.YFnmkEeT1a', '2000-01-05', '19127646@student.hcmus.edu.vn', 0, 0, 1, 0, NULL),
(34, 'jrmaster', 'Thu Phong Hiếu', '$2a$10$FhUGsu/X2n4h.S7ZSrkQXuC22u0nBhoUVvTTCmZS4YAwC7ZmiX77q', '2001-01-06', 'tthieu19@clc.fitus.edu.vn', 0, 0, 1, 0, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
