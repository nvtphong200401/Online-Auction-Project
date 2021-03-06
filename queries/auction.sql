-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 13, 2022 at 07:00 PM
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

--
-- Dumping data for table `banned_bidder`
--

INSERT INTO `banned_bidder` (`BID`, `ProID`) VALUES
(2, 6),
(30, 6);

-- --------------------------------------------------------

--
-- Table structure for table `bid_history`
--

CREATE TABLE `bid_history` (
  `BID` int(11) NOT NULL,
  `ProID` int(11) NOT NULL,
  `Time` datetime NOT NULL,
  `Price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bid_history`
--

INSERT INTO `bid_history` (`BID`, `ProID`, `Time`, `Price`) VALUES
(1, 2, '2022-01-13 22:22:35', '700000'),
(1, 4, '2022-01-13 22:45:59', '49000000'),
(1, 6, '2022-01-13 23:54:55', '290000'),
(1, 9, '2022-01-13 22:34:14', '2900000'),
(1, 13, '2022-01-13 22:34:21', '3300000'),
(1, 14, '2022-01-13 22:47:09', '2000000'),
(1, 20, '2022-01-13 22:31:18', '5540000'),
(1, 21, '2022-01-13 22:29:40', '600000'),
(1, 22, '2022-01-13 22:19:40', '490000'),
(2, 2, '2022-01-13 22:29:48', '800000'),
(2, 4, '2022-01-13 22:26:14', '44000000'),
(2, 9, '2022-01-13 22:26:27', '2600000'),
(2, 13, '2022-01-13 22:26:35', '2800000'),
(2, 14, '2022-01-13 22:26:41', '1400000'),
(2, 20, '2022-01-13 22:26:50', '2540000'),
(2, 21, '2022-01-13 22:26:57', '500000'),
(2, 22, '2022-01-13 22:27:04', '490000'),
(30, 2, '2022-01-13 22:29:48', '900000'),
(30, 4, '2022-01-13 22:30:00', '46000000'),
(30, 9, '2022-01-13 22:30:47', '2800000'),
(30, 13, '2022-01-13 22:30:55', '3000000'),
(30, 14, '2022-01-13 22:31:05', '1600000'),
(30, 20, '2022-01-13 22:31:18', '4540000'),
(30, 21, '2022-01-13 22:34:57', '800000'),
(30, 22, '2022-01-13 22:35:03', '590000'),
(31, 4, '2022-01-13 22:33:56', '48000000'),
(31, 6, '2022-01-13 22:34:04', '240000'),
(31, 9, '2022-01-13 22:46:13', '3000000'),
(31, 13, '2022-01-13 22:34:21', '3200000'),
(31, 14, '2022-01-13 22:34:43', '1800000'),
(31, 19, '2022-01-13 22:34:50', '1920000'),
(31, 21, '2022-01-13 22:34:57', '800000'),
(31, 22, '2022-01-13 22:47:40', '690000'),
(33, 6, '2022-01-13 23:54:55', '280000'),
(34, 4, '2022-01-13 22:45:59', '50000000'),
(34, 6, '2022-01-13 22:46:05', '260000'),
(34, 9, '2022-01-13 22:46:13', '3100000'),
(34, 14, '2022-01-13 22:47:09', '2000000'),
(34, 19, '2022-01-13 22:47:23', '2020000'),
(34, 21, '2022-01-13 22:47:31', '900000'),
(34, 22, '2022-01-13 22:47:40', '790000');

-- --------------------------------------------------------

--
-- Table structure for table `bid_system`
--

CREATE TABLE `bid_system` (
  `BID` int(11) NOT NULL,
  `ProID` int(11) NOT NULL,
  `MaxPrice` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `bid_system`
--

INSERT INTO `bid_system` (`BID`, `ProID`, `MaxPrice`) VALUES
(1, 2, '700000'),
(1, 4, '49000000'),
(1, 6, '300000'),
(1, 9, '2900000'),
(1, 13, '3700000'),
(1, 14, '2000000'),
(1, 20, '5540000'),
(1, 21, '600000'),
(1, 22, '490000'),
(2, 2, '800000'),
(2, 4, '44000000'),
(2, 9, '2600000'),
(2, 13, '2800000'),
(2, 14, '1400000'),
(2, 20, '2540000'),
(2, 21, '500000'),
(2, 22, '490000'),
(30, 2, '900000'),
(30, 4, '46000000'),
(30, 9, '2800000'),
(30, 13, '3000000'),
(30, 14, '1600000'),
(30, 20, '4540000'),
(30, 21, '800000'),
(30, 22, '590000'),
(31, 4, '48000000'),
(31, 6, '240000'),
(31, 9, '3000000'),
(31, 13, '3200000'),
(31, 14, '1800000'),
(31, 19, '1920000'),
(31, 21, '800000'),
(31, 22, '690000'),
(33, 6, '280000'),
(34, 4, '50000000'),
(34, 6, '260000'),
(34, 9, '3100000'),
(34, 14, '2000000'),
(34, 19, '2020000'),
(34, 21, '900000'),
(34, 22, '790000');

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
(1, '????? ??i???n t???', NULL),
(2, 'Th???i trang', NULL),
(3, 'M??? ph???m', NULL),
(4, 'N???i th???t', NULL),
(5, 'Trang s???c', NULL),
(6, 'Laptop', 1),
(7, '??i???n tho???i', 1),
(8, 'Qu???n ??o Nam', 2),
(9, 'Qu???n ??o N???', 2),
(10, 'Son', 3),
(11, 'N?????c hoa', 3),
(12, 'B??n', 4),
(13, 'Gh???', 4),
(14, 'D??y chuy???n', 5),
(15, 'V??ng tay', 5);

-- --------------------------------------------------------

--
-- Table structure for table `comment`
--

CREATE TABLE `comment` (
  `ID1` int(11) NOT NULL COMMENT 'Ng?????i ????nh gi??',
  `ID2` int(11) NOT NULL COMMENT 'Ng?????i b??? ????nh gi??',
  `Date` datetime DEFAULT current_timestamp(),
  `Score` tinyint(1) NOT NULL,
  `Opinion` varchar(150) DEFAULT NULL,
  `ProID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `comment`
--

INSERT INTO `comment` (`ID1`, `ID2`, `Date`, `Score`, `Opinion`, `ProID`) VALUES
(2, 34, '2022-01-14 00:40:01', 0, 'ko tra tien', 16),
(2, 34, '2022-01-14 00:39:37', 0, 'Ng?????i th???ng kh??ng thanh to??n', 20),
(34, 2, '2022-01-14 00:35:21', 1, 'Giay tot, se mua tiep', 20);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ProID` int(11) NOT NULL,
  `ProName` varchar(50) NOT NULL,
  `CatID` int(11) NOT NULL,
  `SID` int(11) NOT NULL,
  `Winner` int(11) DEFAULT NULL,
  `Status` tinyint(1) NOT NULL,
  `Start_price` decimal(10,0) NOT NULL,
  `Step_price` decimal(10,0) NOT NULL,
  `Buy_now` decimal(10,0) DEFAULT NULL,
  `UploadDate` datetime NOT NULL DEFAULT current_timestamp(),
  `EndDate` datetime NOT NULL,
  `TinyDesc` varchar(150) DEFAULT NULL,
  `FullDesc` varchar(1000) NOT NULL,
  `AutoTime` tinyint(1) DEFAULT NULL,
  `AllowAll` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ProID`, `ProName`, `CatID`, `SID`, `Winner`, `Status`, `Start_price`, `Step_price`, `Buy_now`, `UploadDate`, `EndDate`, `TinyDesc`, `FullDesc`, `AutoTime`, `AllowAll`) VALUES
(1, 'Freshwater Cultured Pearl', 9, 30, NULL, 0, '1500000', '150000', '5500000', '2021-12-02 22:08:16', '2022-12-04 09:32:16', 'Freshwater Cultured Pearl, Citrine, Peridot & Amethyst Bracelet, 7.5\"', '<UL>\r\n    <LI>Metal stamp: 14k </LI>\r\n    <LI>Metal: yellow-ld</LI>\r\n    <LI>Material Type: amethyst, citrine, ld, pearl, peridot</LI>\r\n    <LI>Gem Type: citrine, peridot, amethyst</LI>\r\n    <LI>Length: 7.5 inches</LI>\r\n    <LI>Clasp Type: filigree-box</LI>\r\n    <LI>Total metal weight: 0.6 Grams</LI>\r\n</UL>\r\n<STRONG>Pearl Information</STRONG><BR>\r\n<UL>\r\n    <LI>Pearl type: freshwater-cultured</LI>\r\n</UL>\r\n<STRONG>Packaging Information</STRONG><BR>\r\n<UL>\r\n    <LI>Package: Regal Blue Sueded-Cloth Pouch</LI>\r\n</UL>', 1, 0),
(2, 'Pink Sapphire Sterling Silver', 14, 2, 34, 1, '300000', '100000', '900000', '2021-12-02 08:32:16', '2022-01-13 22:36:45', '14 1/2 Carat Created Pink Sapphire Sterling Silver Bracelet w/ Diamond Accents', '<P><STRONG>Jewelry Information</STRONG></P>\r\n<UL>\r\n    <LI>Lo???i h??ng: H??ng trong n?????c</LI>\r\n</UL>\r\n', 0, 1),
(3, 'Torrini KC241', 15, 30, NULL, 0, '160000000', '1000000', NULL, '2021-12-02 08:41:03', '2022-12-02 21:08:00', 'Nh???n kim c????ng - v??? ?????p ki??u sa', '<P>Kh??ng ch??? c?? ki???u d??ng truy???n th???ng ch??? c?? m???t h???t kim c????ng ??? gi???a, c??c nh?? thi???t k??? ???? t???o nh???ng nh???ng chi???c nh???n v?? c??ng ?????c ????o v?? tinh t???. Tuy nhi??n, gi?? c???a ????? trang s???c n??y th?? ch??? c?? d??n ch??i m???i c?? th??? kham ???????c.</P>\r\n<UL>\r\n    <LI>Ki???u s???n ph???m: Nh???n n???</LI>\r\n    <LI>Lo???i ????: To paz</LI>\r\n    <LI>Ch???t li???u: kim c????ng, nguy??n li???u v?? c??ng ngh??? Italy...</LI>\r\n    <LI>????n gi??: 2,110,250 VND / Chi???c</LI>\r\n</UL>\r\n', 1, 0),
(4, 'Torrini KC242', 15, 30, NULL, 0, '42000000', '1000000', NULL, '2021-12-02 08:41:03', '2022-03-08 00:23:16', 'tinh x???o v?? sang tr???ng', '<P>????? s??? h???u m???t chi???c nh???n kim c????ng l???p l??nh tr??n tay, b???n ph???i l?? ng?????i ch???u chi v?? s??nh ??i???u.<BR>\r\nV???i s??? k???t h???p kh??o l??o v?? ?????c ????o gi???a kim c????ng v?? Saphia, Ruby... nh???ng chi???c nh???n c??ng tr??? n??n gi?? tr???.</P>\r\n<UL>\r\n    <LI>Ki???u s???n ph???m: Nh???n nam</LI>\r\n    <LI>Lo???i ????: To paz</LI>\r\n    <LI>Ch???t li???u: V??ng t??y 24K, nguy??n li???u v?? c??ng ngh??? Italy...</LI>\r\n</UL>\r\n', 1, 1),
(5, 'Nokia 7610', 7, 30, NULL, 0, '2900000', '500000', '5900000', '2021-12-02 08:32:16', '2023-09-06 14:29:16', '????? ph??n gi???i cao, m??n h??nh m??u, ch???p ???nh xu???t s???c.', '<UL>\r\n    <LI>M??y ???nh c?? ????? ph??n gi???i 1 megapixel</LI>\r\n    <LI>M??n h??nh 65.536 m??u, r???ng 2,1 inch, 176 X 208 pixel v???i ????? h???a s???c n??t, ????? ph??n gi???i cao</LI>\r\n    <LI>Quay phim video l??n ?????n 10 ph??t v???i h??nh ???nh s???c n??t h??n</LI>\r\n    <LI>Kinh nghi???m ??a ph????ng ti???n ???????c t??ng c?????ng</LI>\r\n    <LI>Streaming video &amp; ??m thanh v???i RealOne Player (h??? tr??? c??c d???ng th???c MP3/AAC).</LI>\r\n    <LI>N??ng c???p cho nh???ng ??o???n phim c?? nh??n c???a b???n b???ng c??c t??nh n??ng ch???nh s???a t??? ?????ng th??ng minh</LI>\r\n    <LI>In ???nh ch???t l?????ng cao t??? nh??, v??n ph??ng, kios v?? qua m???ng</LI>\r\n    <LI>D??? d??ng k???t n???i v???I m??y PC ????? l??u tr??? v?? chia s??? (b???ng c??p USB, PopPort, c??ng ngh??? Bluetooth)</LI>\r\n    <LI>48 nh???c chu??ng ??a ??m s???c, True tones. M???ng GSM 900 / GSM 1800 / GSM 1900</LI>\r\n    <LI>K??ch th?????c 109 x 53 x 19 mm, 93 cc</LI>\r\n    <LI>Tr???ng l?????ng 118 g</LI>\r\n    <LI>Hi???n th???: Lo???i TFT, 65.536 ma??u</LI>\r\n    <LI>K??ch c???: 176 x 208 pixels </LI>\r\n</UL>', 1, 0),
(6, '??o thun n???', 9, 2, NULL, 0, '180000', '10000', NULL, '2021-12-02 08:41:36', '2022-02-04 09:32:16', 'M??u s???c t????i t???n, ki???u d??ng tr??? trung', '<UL>\r\n    <LI>Lo???i h??ng: H??ng trong n?????c</LI>\r\n    <LI>Xu???t x???: Tp H??? Ch?? Minh</LI>\r\n</UL>14-01-2022<br><ul>\r\n<li>??i???u ??&agrave;</li>\r\n</ul>', 1, 1),
(7, 'Simen AP75', 7, 30, NULL, 0, '2800000', '1000000', '8880000', '2021-12-02 08:32:16', '2024-08-07 09:32:16', 'Thi???t k??? tinh x???o, hi???n ?????i', '<UL>\r\n    <LI>H??nh ???nh ho??n h???o, r?? n??t ??? m???i g??c m??n h??nh</LI>\r\n    <LI>Gi???m thi???u s??? ph???n chi???u ??nh s??ng</LI>\r\n    <LI>Menu hi???n th??? ti???ng Vi???t</LI>\r\n    <LI>H??? th???ng h??nh ???nh th??ng minh</LI>\r\n    <LI>??m thanh Hifi Stereo m???nh m???</LI>\r\n    <LI>H??? th???ng ??m l?????ng th??ng minh</LI>\r\n    <LI>B??? nh??? 100 ch????ng tr??nh</LI>\r\n    <LI>Ch???n k??nh ??a th??ch</LI>\r\n    <LI>C??c ki???u s???p ?????t s???n h??nh ???nh / ??m thanh</LI>\r\n    <LI>K??ch th?????c (r???ng x cao x d??y): 497 x 458 x 487mm</LI>\r\n    <LI>Tr???ng l?????ng: 25kg</LI>\r\n    <LI>M??u: v??ng, xanh, b???c </LI>\r\n</UL>\r\n', 1, 0),
(8, '??o b?? trai', 8, 2, 33, 1, '270000', '500000', '10000000', '2021-12-02 08:32:16', '2022-01-13 23:59:23', 'H??m h???nh d??? th????ng', '<UL>\r\n    <LI>Qu???n ??o b?? trai</LI>\r\n    <LI>Lo???i h??ng: H??ng trong n?????c</LI>\r\n    <LI>Xu???t x???: Tp H??? Ch?? Minh</LI>\r\n</UL>\r\n', 1, 1),
(9, 'B??ng tai n???m h???t rubby', 15, 30, NULL, 0, '2400000', '100000', NULL, '2021-12-02 08:42:00', '2025-08-11 09:32:16', 'Tr??? trung v?? qu?? ph??i', '<UL>\r\n    <LI>T??n s???n ph???m: B??ng tai n???m h???t rubby</LI>\r\n    <LI>????ng nh??n hi???u: Torrini</LI>\r\n    <LI>Ngu???n g???c, xu???t x???: Italy</LI>\r\n    <LI>H??nh th???c thanh to??n: L/C T/T M/T CASH</LI>\r\n    <LI>Th???i gian giao h??ng: trong v??ng 3 ng??y k??? t??? ng??y mua</LI>\r\n    <LI>Ch???t l?????ng/ch???ng ch???: od</LI>\r\n</UL>\r\n', 1, 1),
(10, '?????m d??? h???i ??nh kim', 9, 30, NULL, 0, '2800000', '100000', NULL, '2021-12-02 08:42:00', '2022-08-11 22:32:16', '????? m??u s???c - ki???u d??ng', '<UL>\r\n    <LI>M??u s???c: Khuynh h?????ng ??nh kim c?? th??? th??? hi???n tr??n v??ng, b???c, ????? t??a, xanh bi???n, v??ng t??m, tr???ng v?? ??en.</LI>\r\n    <LI>M???t s??? bi???n t???u mang t??nh vui nh???n l?? v??ng chanh, m??u hoa v??n anh v?? ng???c lam; trong ???? ho??ng kim v?? nh?? b???c kh?? ph??? bi???n.</LI>\r\n    <LI>Phong c??ch: Di???m ????ng ten, r??? xu???ng theo chi???u th???ng ?????ng, nhi???u l???p, c??? ch??? s??u, eo ch??t cao t???i ng???c... ???????c bi???n t???u t??y theo m???i nh?? thi???t k???.</LI>\r\n</UL>\r\n09-01-2022<br><ul>\r\n<li>????? m???i ?????p l???m, m???i ng?????i mua ??i</li>\r\n</ul>', 1, 0),
(13, '?????m d??? h???i Xinh Xinh', 9, 2, NULL, 0, '2600000', '100000', NULL, '2021-12-02 08:42:28', '2022-05-29 19:25:16', '????n gi???n nh??ng qu?? ph??i', '<P>Nh???ng ???????ng cong tuy???t ?????p s??? c??ng ???????c ph?? b??y khi di???n c??c thi???t k??? n??y.</P>\r\n<UL>\r\n    <LI>N??t c???t t??o b???o ??? ng???c gi??p b???n g??i th??m ph???n quy???n r??, ngay c??? khi kh??ng c?? trang&nbsp; s???c n??o tr??n ng?????i.</LI>\r\n    <LI>?????m hai d??y th???t ??i???u ???? v???i n?? xinh tr?????c ng???c nh??ng tr??ng b???n v???n to??t l??n v??? tinh ngh???ch v?? b???i b???m nh??? thi???t k??? ?????m b?? ?????c ????o c??ng s???c m??u s???m.</LI>\r\n    <LI>H??ng s???n xu???t: NEM</LI>\r\n    <LI>K??ch c??? : T???t c??? c??c k??ch c???</LI>\r\n    <LI>Ki???u d??ng : Qu??y/???ng</LI>\r\n    <LI>Ch???t li???u : Satin</LI>\r\n    <LI>M??u : ??en, ?????</LI>\r\n    <LI>Xu???t x??? : Vi???t Nam</LI>\r\n</UL>\r\n', 1, 1),
(14, '?????m d??? h???i NEM', 9, 2, NULL, 0, '1200000', '100000', '2200000', '2021-12-02 08:32:16', '2022-09-09 18:32:22', 'T??o b???o v?? quy???n r??', '<P>Nh???ng ???????ng cong tuy???t ?????p s??? c??ng ???????c ph?? b??y khi di???n c??c thi???t k??? n??y.</P>\r\n<UL>\r\n    <LI>N??t c???t t??o b???o ??? ng???c gi??p b???n g??i th??m ph???n quy???n r??, ngay c??? khi kh??ng c?? trang&nbsp; s???c n??o tr??n ng?????i.</LI>\r\n    <LI>?????m hai d??y th???t ??i???u ???? v???i n?? xinh tr?????c ng???c nh??ng tr??ng b???n v???n to??t l??n v??? tinh ngh???ch v?? b???i b???m nh??? thi???t k??? ?????m b?? ?????c ????o c??ng s???c m??u s???m.</LI>\r\n    <LI>H??ng s???n xu???t: NEM</LI>\r\n    <LI>K??ch c??? : T???t c??? c??c k??ch c???</LI>\r\n    <LI>Ki???u d??ng : Qu??y/???ng</LI>\r\n    <LI>Ch???t li???u : Satin</LI>\r\n    <LI>M??u : ??en, ?????</LI>\r\n    <LI>Xu???t x??? : Vi???t Nam</LI>\r\n</UL>\r\n', 0, 1),
(15, 'D??y chuy???n ???? qu??', 14, 2, NULL, 0, '1925000', '100000', NULL, '2021-12-02 08:42:42', '2022-06-09 10:28:16', 'K???t h???p v??ng tr???ng v?? ???? qu??', '<UL>\r\n    <LI>Ki???u s???n ph???m: D??y chuy???n</LI>\r\n    <LI>Ch???t li???u: V??ng tr???ng 14K v?? ???? qu??, nguy??n li???u v?? c??ng ngh??? Italy...</LI>\r\n    <LI>Tr???ng l?????ng ch???t li???u: 1.1 Ch??? </LI>\r\n</UL>\r\n', 0, 1),
(16, 'Nokia N72', 7, 2, 34, 1, '3200000', '1000000', '6400000', '2021-12-02 08:32:16', '2022-01-13 22:58:31', 'S??nh ??i???u c??ng N72', '<UL>\r\n    <LI>Camera mega pixel : 2 mega pixel</LI>\r\n    <LI>B???? nh???? trong : 16 - 31 mb</LI>\r\n    <LI>Ch????c n??ng : quay phim, ghi ??m, nghe ??a??i FM</LI>\r\n    <LI>H??? tr???: Bluetooth, the?? nh???? na??i, nha??c MP3 &lt;br/&gt;</LI>\r\n    <LI>Tro??ng l??????ng (g) : 124g</LI>\r\n    <LI>Ki??ch th??????c (mm) : 109 x 53 x 21.8 mm</LI>\r\n    <LI>Ng??n ng???? : C?? ti???ng vi???t</LI>\r\n    <LI>H??? ??i???u h??nh: Symbian OS 8.1</LI>\r\n</UL>\r\n', 0, 1),
(17, 'M???t d??y chuy???n Ruby', 14, 2, NULL, 0, '1820000', '1000000', '5000000', '2021-12-02 08:32:16', '2022-06-19 09:42:16', 'To??? s??ng c??ng Ruby', '<UL>\r\n    <LI>Ki???u s???n ph???m:&nbsp; M???t d??y</LI>\r\n    <LI>Ch???t li???u: V??ng tr???ng 14K, nguy??n li???u v?? c??ng ngh??? Italy...</LI>\r\n    <LI>Tr???ng l?????ng ch???t li???u: 0.32 Ch???</LI>\r\n</UL>\r\n', 0, 0),
(18, '1/2 Carat Pink Sapphire Silver', 15, 2, NULL, 0, '3400000', '100000', NULL, '2021-12-02 08:42:57', '2022-11-24 09:32:25', 'Created Pink Sapphire', '<UL>\r\n    <LI>Brand Name: Ice.com</LI>\r\n    <LI>Material Type: sterling-silver, created-sapphire, diamond</LI>\r\n    <LI>Gem Type: created-sapphire, Diamond</LI>\r\n    <LI>Minimum total gem weight: 14.47 carats</LI>\r\n    <LI>Total metal weight: 15 Grams</LI>\r\n    <LI>Number of stones: 28</LI>\r\n    <LI>Created-sapphire Information</LI>\r\n    <LI>Minimum color: Not Available</LI>\r\n</UL>\r\n', 1, 0),
(19, 'Netaya', 14, 2, NULL, 0, '1820000', '100000', NULL, '2021-12-02 08:42:57', '2022-05-08 04:17:00', 'D??y chuy???n v??ng tr???ng', '<UL>\r\n    <LI>Ki???u s???n ph???m:&nbsp; D??y chuy???n</LI>\r\n    <LI>Ch???t li???u: V??ng t??y 18K, nguy??n li???u v?? c??ng ngh??? Italy...</LI>\r\n    <LI>Tr???ng l?????ng ch???t li???u: 1 Ch???</LI>\r\n</UL>\r\n', 1, 1),
(20, 'Gi??y nam GN16', 8, 2, NULL, 1, '540000', '1000000', '9500000', '2021-12-02 08:32:16', '2022-01-13 23:05:24', '??m - ?????p - b???', '<UL>\r\n    <LI>Lo???i h??ng: H??ng trong n?????c</LI>\r\n    <LI>Xu???t x???: Tp H??? Ch?? Minh</LI>\r\n    <LI>Gi??: 300 000 VN??</LI>\r\n</UL>\r\n', 1, 1),
(21, 'G3.370A', 8, 1, NULL, 0, '300000', '100000', '1300000', '2021-12-02 08:32:16', '2026-10-07 14:37:19', '??en b??ng, sang tr???ng', '<UL>\r\n    <LI>Lo???i h??ng: H??ng trong n?????c</LI>\r\n    <LI>Xu???t x???: Tp H??? Ch?? Minh</LI>\r\n</UL>\r\n', 0, 1),
(22, 'Gi??y n??? GN1', 9, 1, NULL, 0, '290000', '100000', NULL, '2021-12-02 08:43:12', '2022-07-08 00:10:11', 'Ki???u d??ng thanh tho??t', '<UL>\r\n    <LI>Lo???i h??ng: H??ng trong n?????c</LI>\r\n    <LI>Xu???t x???: Tp H??? Ch?? Minh</LI>\r\n</UL>\r\n', 0, 1),
(23, 'Motorola W377', 7, 1, NULL, 0, '2400000', '1000000', NULL, '2021-12-02 08:43:44', '2023-09-14 20:28:11', 'N??? t??nh - tr??? trung', '<UL>\r\n    <LI>General: 2G Network, GSM 900 / 1800 / 1900</LI>\r\n    <LI>Size:&nbsp; 99 x 45 x 18.6 mm, 73 cc</LI>\r\n    <LI>Weight: 95 g</LI>\r\n    <LI>Display: type TFT, 65K colors</LI>\r\n    <LI>Size: 128 x 160 pixels, 28 x 35 mm</LI>\r\n</UL>\r\n', 0, 0),
(24, 'Loriel perfume', 11, 1, NULL, 0, '1500000', '100000', NULL, '2022-01-13 23:12:30', '2022-10-11 23:10:00', 'N?????c hoa ?????n t??? n?????c Ph??p', '<ul>\r\n<li>N?????c hoa</li>\r\n<li>Th??m</li>\r\n</ul>', 1, 1),
(25, 'Narsico for her', 11, 1, NULL, 0, '2000000', '100000', '10000000', '2022-01-13 23:16:43', '2022-10-04 23:15:00', 'N?????c hoa ?????n t??? nh?? Thu', '<ul>\r\n<li>N?????c hoa</li>\r\n<li>Th??m</li>\r\n<li>Tuy???t h???o</li>\r\n<li>?????p</li>\r\n</ul>', 0, 1),
(26, 'N?????c hoa dior', 11, 1, NULL, 0, '2000000', '100000', '15000000', '2022-01-13 23:19:11', '2022-11-23 12:18:00', 'N?????c hoa ?????n t??? n?????c Y', '<ul>\r\n<li>Th??m</li>\r\n<li>Ngon</li>\r\n<li>Kh&ocirc;ng ?????c</li>\r\n</ul>', 0, 1),
(27, 'B??n l??m vi???c', 12, 1, NULL, 0, '500000', '50000000', '10000000', '2022-01-13 23:21:28', '2022-02-13 23:20:00', 'B??n g??? ', '<ul>\r\n<li>Ch???c ch???n</li>\r\n<li>Nh???</li>\r\n<li>Ti???n d???ng</li>\r\n</ul>', 0, 1),
(28, 'Gh??? g???', 13, 1, NULL, 0, '100000', '10000', '5000000', '2022-01-13 23:48:29', '2022-01-15 23:47:00', 'Gh??? ch???c ch???n', '<ul>\r\n<li>Gh??? g???</li>\r\n<li>Th??m</li>\r\n<li>Ch???c ch???n</li>\r\n</ul>', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int(11) UNSIGNED NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`session_id`, `expires`, `data`) VALUES
('7a9J6VGen7Zfbd9HDWi9fqni9QtF5THJ', 1642174025, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":true,\"cart\":[],\"flash\":{},\"authUser\":{\"ID\":2,\"Username\":\"ntmthu\",\"FullName\":\"Nguy???n Th??? Minh Thu\",\"DOB\":\"2021-12-27T17:00:00.000Z\",\"Email\":\"19127568@student.hcmus.edu.vn\",\"Role\":1,\"Pending\":0,\"Verified\":1,\"isBanned\":0,\"ExpiredDate\":null},\"retUrl\":\"/product/22\"}'),
('tdtydW2nkqjS3eeKRsXJXBtbFkG0Tkpi', 1642183164, '{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"auth\":true,\"cart\":[{\"id\":1}],\"flash\":{},\"authUser\":{\"ID\":34,\"Username\":\"jrmaster\",\"FullName\":\"Thu Phong Hi???u\",\"DOB\":\"2001-01-05T17:00:00.000Z\",\"Email\":\"tthieu19@clc.fitus.edu.vn\",\"Role\":1,\"Pending\":0,\"Verified\":1,\"isBanned\":0,\"ExpiredDate\":\"2022-01-20T17:00:00.000Z\"},\"retUrl\":\"/bidder/product/list/won\",\"passport\":{\"user\":{\"id\":\"2946274515703275\",\"name\":{\"familyName\":\"Nguy???n\",\"givenName\":\"Phong\",\"middleName\":\"V??n T???n\"},\"emails\":[{\"value\":\"hackkerguy@yahoo.com\"}],\"provider\":\"facebook\",\"_raw\":\"{\\\"id\\\":\\\"2946274515703275\\\",\\\"email\\\":\\\"hackkerguy\\\\u0040yahoo.com\\\",\\\"last_name\\\":\\\"Nguy\\\\u1ec5n\\\",\\\"first_name\\\":\\\"Phong\\\",\\\"middle_name\\\":\\\"V\\\\u0103n T\\\\u1ea5n\\\",\\\"birthday\\\":\\\"04\\\\/20\\\\/2001\\\"}\",\"_json\":{\"id\":\"2946274515703275\",\"email\":\"hackkerguy@yahoo.com\",\"last_name\":\"Nguy???n\",\"first_name\":\"Phong\",\"middle_name\":\"V??n T???n\",\"birthday\":\"04/20/2001\"}}}}');

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
(1, 'admin', 'Nguy???n V??n T???n Phong', '$2a$10$YnUgqtqDsKZqCIGkaTdiqePXl.D77Of857y6K8Tr2K/SX4nHzSTWq', '2001-04-19', 'nvtphong19@clc.fitus.edu.vn', 2, 0, 1, 0, NULL),
(2, 'ntmthu', 'Nguy???n Th??? Minh Thu', '$2a$10$TJVfzJ1ZQLHhnuHa3ltblugmFsfyUNIOF6pWc4S.JhZG/VMeN3RQ6', '2021-12-28', '19127568@student.hcmus.edu.vn', 1, 0, 1, 0, NULL),
(30, 'giai123', 'Phan V?? Giai', '$2a$10$Rq35FP9LMya94T8B4NunOeH00P2jdCnY/LO0KyRJxJyKi4majkZ5m', '2000-12-07', 'hackkerguy11@gmail.com', 1, 0, 1, 0, NULL),
(31, 'dzso1', 'Nguy???n Nh???t Huy', '', '2001-04-19', 'hackkerguy@yahoo.com', 1, 0, 1, 0, NULL),
(33, 'thivl', 'Nguy???n ????ng Thi', '$2a$10$tmaLpnSatF1LPXMpMMtvj.54pIXKZOO9AHlPIWawwc.YFnmkEeT1a', '2000-01-05', '19127646@student.hcmus.edu.vn', 0, 0, 1, 0, NULL),
(34, 'jrmaster', 'Thu Phong Hi???u', '$2a$10$FhUGsu/X2n4h.S7ZSrkQXuC22u0nBhoUVvTTCmZS4YAwC7ZmiX77q', '2001-01-06', 'tthieu19@clc.fitus.edu.vn', 1, 0, 1, 0, '2022-01-21');

-- --------------------------------------------------------

--
-- Table structure for table `verifications`
--

CREATE TABLE `verifications` (
  `id` int(11) NOT NULL,
  `email` varchar(250) CHARACTER SET utf8 NOT NULL,
  `token` varchar(250) CHARACTER SET utf8 NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `verifications`
--

INSERT INTO `verifications` (`id`, `email`, `token`, `created_at`) VALUES
(9, 'tthieu19@clc.fitus.edu.vn', 'y1Jhdg20PPfDirxCq5uP', '2022-01-14'),
(10, '19127568@student.hcmus.edu.vn', 'DN55n6SrIMrYTSDFlShH', '2022-01-14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `banned_bidder`
--
ALTER TABLE `banned_bidder`
  ADD PRIMARY KEY (`BID`,`ProID`),
  ADD KEY `fk_banned_bidder_ProID` (`ProID`);

--
-- Indexes for table `bid_history`
--
ALTER TABLE `bid_history`
  ADD PRIMARY KEY (`BID`,`ProID`),
  ADD KEY `ProID` (`ProID`);

--
-- Indexes for table `bid_system`
--
ALTER TABLE `bid_system`
  ADD PRIMARY KEY (`BID`,`ProID`),
  ADD KEY `ProID` (`ProID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CatID`),
  ADD UNIQUE KEY `CatName` (`CatName`),
  ADD KEY `fk_category_CatParent` (`CatParent`);
ALTER TABLE `category` ADD FULLTEXT KEY `CatName_2` (`CatName`);

--
-- Indexes for table `comment`
--
ALTER TABLE `comment`
  ADD PRIMARY KEY (`ID1`,`ID2`,`ProID`),
  ADD KEY `fk_comment_ID2` (`ID2`),
  ADD KEY `fk_comment_ProID` (`ProID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ProID`),
  ADD KEY `fk_product_CatID` (`CatID`),
  ADD KEY `fk_product_SID` (`SID`),
  ADD KEY `fk_product_Winner` (`Winner`);
ALTER TABLE `product` ADD FULLTEXT KEY `FTX_product` (`ProName`,`TinyDesc`,`FullDesc`);
ALTER TABLE `product` ADD FULLTEXT KEY `ProName` (`ProName`,`TinyDesc`,`FullDesc`);
ALTER TABLE `product` ADD FULLTEXT KEY `ProName_2` (`ProName`);
ALTER TABLE `product` ADD FULLTEXT KEY `ProName_3` (`ProName`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`session_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `verifications`
--
ALTER TABLE `verifications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `CatID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ProID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2147483648;

--
-- AUTO_INCREMENT for table `verifications`
--
ALTER TABLE `verifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banned_bidder`
--
ALTER TABLE `banned_bidder`
  ADD CONSTRAINT `fk_banned_bidder_BID` FOREIGN KEY (`BID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_banned_bidder_ProID` FOREIGN KEY (`ProID`) REFERENCES `product` (`ProID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bid_history`
--
ALTER TABLE `bid_history`
  ADD CONSTRAINT `fk_bid_history_BID` FOREIGN KEY (`BID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bid_history_ProID` FOREIGN KEY (`ProID`) REFERENCES `product` (`ProID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bid_system`
--
ALTER TABLE `bid_system`
  ADD CONSTRAINT `fk_bid_system_BID` FOREIGN KEY (`BID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_bid_system_ProID` FOREIGN KEY (`ProID`) REFERENCES `product` (`ProID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `fk_category_CatParent` FOREIGN KEY (`CatParent`) REFERENCES `category` (`CatID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `fk_comment_ID1` FOREIGN KEY (`ID1`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comment_ID2` FOREIGN KEY (`ID2`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_comment_ProID` FOREIGN KEY (`ProID`) REFERENCES `product` (`ProID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `product`
--
ALTER TABLE `product`
  ADD CONSTRAINT `fk_product_CatID` FOREIGN KEY (`CatID`) REFERENCES `category` (`CatID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_SID` FOREIGN KEY (`SID`) REFERENCES `user` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_Winner` FOREIGN KEY (`Winner`) REFERENCES `user` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `Expire_verifications` ON SCHEDULE EVERY 1 HOUR STARTS '2022-01-09 21:45:42' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'Clears out verification table every hour.' DO DELETE FROM verifications WHERE UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(created_at) > 60$$

CREATE DEFINER=`root`@`localhost` EVENT `Expire_Seller` ON SCHEDULE EVERY 1 SECOND STARTS '2022-01-10 22:23:41' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE user
SET Role = 3
WHERE ExpiredDate IS NOT NULL
AND (UNIX_TIMESTAMP(NOW()) - UNIX_TIMESTAMP(ExpiredDate)) > 0$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
