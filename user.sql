-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 09, 2021 at 02:53 PM
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
  `Verified` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Username`, `FullName`, `Password`, `DOB`, `Email`, `Role`, `Pending`, `Verified`) VALUES
(1, 'admin', 'admin', '$2a$12$p9d7sXHk4j439Ave4NNEVOoRAezTKTGYVv0ay8fQbHXmaVFC9BSQS', '2001-04-20', 'nvtphong19@clc.fitus.edu.vn', 2, 0, 1),
(2, 'nvtPhong', 'Nguyễn Văn Tấn Phong', '123', '2001-12-05', 'nvtphong19@clc.fitus.edu.vn', 1, 0, 0),
(3, 'tgHy', 'Trần Gia Hy', '123', '2000-12-15', 'tghy@gmail.com', 0, 0, 0),
(5, 'tthieu', 'Trần Trung Hiếu', '123', '2001-12-07', 'tthieu19@clc.fitus.edu.vn', 0, 0, 1),
(16, 'phongdzso1', 'phong', '$2a$10$NDb4bE45JqT7y2T931lcV.4TqlPVqKWZ/OcMjDRma9KGGSFJUAesC', '2021-12-09', 'hackkerguy11@gmail.com', 0, 0, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
