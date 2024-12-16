-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 21, 2024 at 09:35 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.2.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `quanlybanhang`
--

-- --------------------------------------------------------

--
-- Table structure for table `CTHD`
--

CREATE TABLE `CTHD` (
  `SOHD` int(11) NOT NULL,
  `MASP` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `SL` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `CTHD`
--

INSERT INTO `CTHD` (`SOHD`, `MASP`, `SL`) VALUES
(1001, 'BC01', 5),
(1001, 'BC02', 10),
(1001, 'ST01', 5),
(1001, 'ST08', 10),
(1002, 'BB01', 20),
(1002, 'BB02', 20),
(1002, 'BC04', 20),
(1003, 'BB03', 10),
(1004, 'TV01', 20),
(1006, 'ST01', 30),
(1006, 'ST02', 10),
(1007, 'ST03', 10),
(1008, 'ST04', 8),
(1009, 'ST05', 10),
(1010, 'ST04', 50),
(1010, 'ST07', 50),
(1010, 'ST08', 100),
(1011, 'ST06', 50),
(1012, 'ST07', 3),
(1013, 'ST08', 5),
(1014, 'BB01', 50),
(1014, 'BB02', 100),
(1014, 'BC02', 80),
(1014, 'BC04', 60),
(1015, 'BB02', 30),
(1015, 'BB03', 7),
(1016, 'TV01', 5),
(1018, 'ST04', 6),
(1019, 'ST05', 1),
(1019, 'ST06', 2),
(1020, 'ST07', 10),
(1021, 'ST08', 5),
(1021, 'TV01', 7),
(1022, 'ST07', 1),
(1023, 'ST04', 6);

-- --------------------------------------------------------

--
-- Table structure for table `HOADON`
--

CREATE TABLE `HOADON` (
  `SOHD` int(11) NOT NULL,
  `NGHD` date DEFAULT NULL,
  `MAKH` char(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MANV` char(4) COLLATE utf8_unicode_ci DEFAULT NULL,
  `TRIGIA` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `HOADON`
--

INSERT INTO `HOADON` (`SOHD`, `NGHD`, `MAKH`, `MANV`, `TRIGIA`) VALUES
(1001, '2006-07-23', 'KH01', 'NV01', 320000),
(1002, '2006-08-12', 'KH01', 'NV02', 840000),
(1003, '2006-08-23', 'KH02', 'NV01', 100000),
(1004, '2006-09-01', 'KH02', 'NV01', 180000),
(1005, '2006-10-20', 'KH01', 'NV02', 3800000),
(1006, '2006-10-16', 'KH01', 'NV03', 2430000),
(1007, '2006-10-28', 'KH03', 'NV03', 510000),
(1008, '2006-10-28', 'KH01', 'NV03', 440000),
(1009, '2006-10-28', 'KH03', 'NV04', 200000),
(1010, '2006-11-01', 'KH01', 'NV01', 5200000),
(1011, '2006-11-04', 'KH04', 'NV03', 250000),
(1012, '2006-11-30', 'KH05', 'NV03', 21000),
(1013, '2006-12-12', 'KH06', 'NV01', 5000),
(1014, '2006-12-31', 'KH03', 'NV02', 3150000),
(1015, '2007-01-01', 'KH06', 'NV01', 910000),
(1016, '2007-01-01', 'KH07', 'NV02', 12500),
(1017, '2007-01-02', 'KH08', 'NV03', 35000),
(1018, '2007-01-13', 'KH08', 'NV03', 330000),
(1019, '2007-01-13', 'KH01', 'NV03', 30000),
(1020, '2007-01-14', 'KH09', 'NV04', 70000),
(1021, '2007-01-16', 'KH10', 'NV03', 67500),
(1022, '2007-01-16', NULL, 'NV03', 7000),
(1023, '2007-01-17', NULL, 'NV01', 330000);

-- --------------------------------------------------------

--
-- Table structure for table `KHACHHANG`
--

CREATE TABLE `KHACHHANG` (
  `MAKH` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `HOTEN` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DCHI` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SODT` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NGSINH` date DEFAULT NULL,
  `NGDK` date DEFAULT NULL,
  `DOANHSO` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `KHACHHANG`
--

INSERT INTO `KHACHHANG` (`MAKH`, `HOTEN`, `DCHI`, `SODT`, `NGSINH`, `NGDK`, `DOANHSO`) VALUES
('KH01', 'Nguyen Van A', '731, Tran Hung Dao, Q 5, Tp HCM', '08823451', '1960-10-22', '2006-10-22', 13000000),
('KH02', 'Tran Ngoc Han', '23/5, Nguyen Trai, Q 5, Tp HCM', '0908256478', '1974-04-03', '2006-07-30', 13000000),
('KH03', 'Tran Ngoc Linh', '45, Nguyen Canh Chan, Q 1, Tp HCM', '0938776266', '1980-06-12', '2006-08-05', 3860000),
('KH04', 'Tran Minh Long', '50/34 Le Dai Hanh, Q 10, Tp HCM', '0917325476', '1965-03-09', '2006-10-02', 250000),
('KH05', 'Le Nhat Minh', '34, Truong Dinh, Q 3, Tp HCM', '08246108', '1950-03-10', '2006-10-26', 21000),
('KH06', 'Le Hoai Thuong', '227, Nguyen Van Cu, Q 5, Tp HCM', '08631738', '1981-12-31', '2006-11-24', 915000),
('KH07', 'Nguyen Van Tam', '32/3, Tran Binh Trong, Q 5, Tp HCM', '0916783565', '1971-04-06', '2006-12-01', 12500),
('KH08', 'Phan Thi Thanh', '45/2, An Duong Vuong, Q 5, Tp HCM', '0938435756', '1971-01-10', '2006-12-13', 365000),
('KH09', 'Le Ha Vinh', '873, Le Hong Phong, Q 5, Tp HCM', '08654763', '1979-09-03', '2007-01-14', 70000),
('KH10', 'Ha Duy Lap', '34/34B, Nguyen Trai, Q 1, Tp HCM', '08768904', '1983-05-02', '2007-01-16', 67500);

-- --------------------------------------------------------

--
-- Table structure for table `NHANVIEN`
--

CREATE TABLE `NHANVIEN` (
  `MANV` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `HOTEN` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SODT` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NGVL` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `NHANVIEN`
--

INSERT INTO `NHANVIEN` (`MANV`, `HOTEN`, `SODT`, `NGVL`) VALUES
('NV01', 'Nguyen Nhu Nhut', '0927345678', '2006-04-13'),
('NV02', 'Le Thi Phi Yen', '0987567390', '2006-04-21'),
('NV03', 'Nguyen Van B', '0997047382', '2006-04-27'),
('NV04', 'Ngo Thanh Tuan', '0913758498', '2006-06-24'),
('NV05', 'Nguyen Thi Truc Thanh', '0918590387', '2006-07-20'),
('NV10', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `SANPHAM`
--

CREATE TABLE `SANPHAM` (
  `MASP` char(4) COLLATE utf8_unicode_ci NOT NULL,
  `TENSP` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DVT` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `NUOCSX` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `GIA` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `SANPHAM`
--

INSERT INTO `SANPHAM` (`MASP`, `TENSP`, `DVT`, `NUOCSX`, `GIA`) VALUES
('BB01', 'But bi', 'cay', 'Viet Nam', 5000),
('BB02', 'But bi', 'cay', 'Trung Quoc', 7000),
('BB03', 'But bi', 'hop', 'Thai Lan', 100000),
('BC01', 'But chi', 'cay', 'Singapore', 3000),
('BC02', 'But chi', 'cay', 'Singapore', 5000),
('BC03', 'But chi', 'cay', 'Viet Nam', 3500),
('BC04', 'But chi', 'hop', 'Viet Nam', 30000),
('ST01', 'So tay 500 trang', 'quyen', 'Trung Quoc', 40000),
('ST02', 'So tay loai 1', 'quyen', 'Viet Nam', 55000),
('ST03', 'So tay loai 2', 'quyen', 'Viet Nam', 51000),
('ST04', 'So tay ', 'quyen', 'Thai Lan', 55000),
('ST05', 'So tay mong', 'quyen', 'Thai Lan', 20000),
('ST06', 'Phan viet bang', 'hop', 'Viet Nam', 5000),
('ST07', 'Phan khong bui', 'hop', 'Viet Nam', 7000),
('ST08', 'Bong bang', 'cai', 'Viet Nam', 1000),
('ST09', 'But long', 'cay', 'Viet Nam', 5000),
('ST10', 'But long', 'cay', 'Trung Quoc', 7000),
('TV01', 'Tap 100 giay mong', 'quyen', 'Trung Quoc', 2000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CTHD`
--
ALTER TABLE `CTHD`
  ADD PRIMARY KEY (`SOHD`,`MASP`),
  ADD KEY `MASP` (`MASP`);

--
-- Indexes for table `HOADON`
--
ALTER TABLE `HOADON`
  ADD PRIMARY KEY (`SOHD`),
  ADD KEY `MAKH` (`MAKH`),
  ADD KEY `MANV` (`MANV`);

--
-- Indexes for table `KHACHHANG`
--
ALTER TABLE `KHACHHANG`
  ADD PRIMARY KEY (`MAKH`);

--
-- Indexes for table `NHANVIEN`
--
ALTER TABLE `NHANVIEN`
  ADD PRIMARY KEY (`MANV`);

--
-- Indexes for table `SANPHAM`
--
ALTER TABLE `SANPHAM`
  ADD PRIMARY KEY (`MASP`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CTHD`
--
ALTER TABLE `CTHD`
  ADD CONSTRAINT `cthd_ibfk_1` FOREIGN KEY (`SOHD`) REFERENCES `HOADON` (`SOHD`),
  ADD CONSTRAINT `cthd_ibfk_2` FOREIGN KEY (`MASP`) REFERENCES `SANPHAM` (`MASP`);

--
-- Constraints for table `HOADON`
--
ALTER TABLE `HOADON`
  ADD CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`MAKH`) REFERENCES `KHACHHANG` (`MAKH`),
  ADD CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`MANV`) REFERENCES `NHANVIEN` (`MANV`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
