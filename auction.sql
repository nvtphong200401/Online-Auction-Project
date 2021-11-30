-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 30, 2021 at 08:53 AM
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
-- Table structure for table `banned_bidder`
--

CREATE TABLE `banned_bidder` (
  `BID` int(11) NOT NULL,
  `ProID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `bid_history`
--

CREATE TABLE `bid_history` (
  `BID` int(11) NOT NULL,
  `ProID` int(11) NOT NULL,
  `Time` datetime NOT NULL,
  `Price` decimal(10,0) NOT NULL,
  `MaxPrice` decimal(10,0) NOT NULL,
  `BID_current` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `CatID` int(11) NOT NULL,
  `CatName` varchar(50) NOT NULL,
  `CatParent` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`CatID`, `CatName`, `CatParent`) VALUES
(1, 'Đồ điện tử', NULL),
(2, 'Thời trang', NULL),
(3, 'Mỹ phẩm', NULL),
(4, 'Nội thất', NULL),
(5, 'Trang sức', NULL),
(6, 'Laptop', 1),
(7, 'Điện thoại', 1),
(8, 'Quần áo Nam', 2),
(9, 'Quần áo Nữ', 2),
(10, 'Son', 3),
(11, 'Nước hoa', 3),
(12, 'Bàn', 4),
(13, 'Ghế', 4),
(14, 'Dây chuyền', 5),
(15, 'Vòng tay', 5);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `ID1` int(11) NOT NULL COMMENT 'Người đánh giá',
  `ID2` int(11) NOT NULL COMMENT 'Người bị đánh giá',
  `Date` datetime NOT NULL,
  `Score` tinyint(1) NOT NULL,
  `Opinion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `Name` varchar(50) NOT NULL,
  `Main_img` varchar(100) NOT NULL,
  `Current_bid` decimal(10,0) NOT NULL,
  `Buy_now` decimal(10,0) NOT NULL,
  `SellerID` int(11) NOT NULL,
  `HighestBID` int(11) DEFAULT NULL,
  `UploadDate` datetime NOT NULL DEFAULT current_timestamp(),
  `EndDate` datetime NOT NULL,
  `TinyDesc` varchar(150) DEFAULT NULL,
  `FullDesc` varchar(500) DEFAULT NULL,
  `CatID` int(11) NOT NULL,
  `PriceStep` decimal(10,0) NOT NULL,
  `AutoTime` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `sub_img`
--

CREATE TABLE `sub_img` (
  `PID` int(11) NOT NULL,
  `SubImg` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `Password` varchar(50) NOT NULL,
  `DOB` date NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Role` int(11) NOT NULL,
  `Pending` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `watchlist`
--

CREATE TABLE `watchlist` (
  `BID` int(11) NOT NULL,
  `ProID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banned_bidder`
--
ALTER TABLE `banned_bidder`
  ADD PRIMARY KEY (`BID`,`ProID`);

--
-- Indexes for table `bid_history`
--
ALTER TABLE `bid_history`
  ADD PRIMARY KEY (`BID`,`ProID`,`MaxPrice`) USING BTREE;

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CatID`),
  ADD UNIQUE KEY `CatName` (`CatName`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID1`,`ID2`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `sub_img`
--
ALTER TABLE `sub_img`
  ADD PRIMARY KEY (`PID`,`SubImg`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`);

--
-- Indexes for table `watchlist`
--
ALTER TABLE `watchlist`
  ADD PRIMARY KEY (`BID`,`ProID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CatID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
