-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 14, 2024 at 02:01 AM
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
-- Database: `quanlynhanvien11`
--

-- --------------------------------------------------------

--
-- Table structure for table `CHINHANH`
--

CREATE TABLE `CHINHANH` (
  `MaChiNhanh` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `TenChiNhanh` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DiaChi` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MaCongTy` varchar(40) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `CHINHANH`
--

INSERT INTO `CHINHANH` (`MaChiNhanh`, `TenChiNhanh`, `DiaChi`, `MaCongTy`) VALUES
('CN01', 'Thành Phố Hồ Chí Minh', '336 An Dương Vương', 'CT01'),
('CN02', 'Hà Nội', '336 An Dương Vương', 'CT01'),
('CN03', 'Đà Nẵng', '36 Hùng Vương', 'CT01'),
('CN05', 'Điện máy SG', 'Thủ Đức', 'CT01'),
('CT10', 'Chi nhánh SG ', 'Quận 3', 'CT03');

-- --------------------------------------------------------

--
-- Table structure for table `CONGTY`
--

CREATE TABLE `CONGTY` (
  `MaCongTy` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `TenCongTy` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `DiaChi` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `CONGTY`
--

INSERT INTO `CONGTY` (`MaCongTy`, `TenCongTy`, `DiaChi`) VALUES
('CT01', 'CNTT1', '123 Lê Lợi, Quận 1, TP.HCM'),
('CT02', 'Điện máy Sài Gòn', 'Đỗ Xuân Hợp, Quận 9'),
('CT03', 'Chứng khoáng', '36 Hùng Vương'),
('CT20', 'Điện Máy Phan Thiết', '123 Lê Lợi, Quận 1, PT');

-- --------------------------------------------------------

--
-- Table structure for table `NHANVIEN`
--

CREATE TABLE `NHANVIEN` (
  `MaNhanVien` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `TenNhanVien` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `LuongThang` float DEFAULT NULL,
  `GioiTinh` tinyint(4) DEFAULT NULL,
  `MaPhong` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `NHANVIEN`
--

INSERT INTO `NHANVIEN` (`MaNhanVien`, `TenNhanVien`, `LuongThang`, `GioiTinh`, `MaPhong`) VALUES
('NV01', 'Nguyễn Xuân Tùng', 10000000, 1, 'MP01'),
('NV02', 'Nguyễn Xuân Tú', 12000000, 1, 'MP01'),
('NV03', 'Nguyễn Xuân Tâm 1', 2000, 0, 'MP01');

-- --------------------------------------------------------

--
-- Table structure for table `PHONGBAN`
--

CREATE TABLE `PHONGBAN` (
  `MaPhong` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `TenPhong` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL,
  `MaChiNhanh` varchar(40) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `PHONGBAN`
--

INSERT INTO `PHONGBAN` (`MaPhong`, `TenPhong`, `MaChiNhanh`) VALUES
('MP01', 'Kỹ thuật ', 'CN01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `CHINHANH`
--
ALTER TABLE `CHINHANH`
  ADD PRIMARY KEY (`MaChiNhanh`),
  ADD KEY `tt` (`MaCongTy`);

--
-- Indexes for table `CONGTY`
--
ALTER TABLE `CONGTY`
  ADD PRIMARY KEY (`MaCongTy`);

--
-- Indexes for table `NHANVIEN`
--
ALTER TABLE `NHANVIEN`
  ADD PRIMARY KEY (`MaNhanVien`),
  ADD KEY `nn` (`MaPhong`);

--
-- Indexes for table `PHONGBAN`
--
ALTER TABLE `PHONGBAN`
  ADD PRIMARY KEY (`MaPhong`),
  ADD KEY `pb_cn` (`MaChiNhanh`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `CHINHANH`
--
ALTER TABLE `CHINHANH`
  ADD CONSTRAINT `tt` FOREIGN KEY (`MaCongTy`) REFERENCES `CONGTY` (`MaCongTy`);

--
-- Constraints for table `NHANVIEN`
--
ALTER TABLE `NHANVIEN`
  ADD CONSTRAINT `nn` FOREIGN KEY (`MaPhong`) REFERENCES `PHONGBAN` (`MaPhong`);

--
-- Constraints for table `PHONGBAN`
--
ALTER TABLE `PHONGBAN`
  ADD CONSTRAINT `pb_cn` FOREIGN KEY (`MaChiNhanh`) REFERENCES `CHINHANH` (`MaChiNhanh`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
