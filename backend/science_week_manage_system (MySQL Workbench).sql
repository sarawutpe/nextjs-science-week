-- MariaDB dump 10.19  Distrib 10.4.24-MariaDB, for Win64 (AMD64)
--
-- Host: firstproject.asia    Database: science_week_manage_system
-- ------------------------------------------------------
-- Server version	10.1.48-MariaDB-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activities`
--

DROP TABLE IF EXISTS `activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activities` (
  `activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) NOT NULL,
  `activity_name` varchar(255) NOT NULL,
  `activity_type` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activities`
--

LOCK TABLES `activities` WRITE;
/*!40000 ALTER TABLE `activities` DISABLE KEYS */;
INSERT INTO `activities` VALUES (1,6,'การประกวดนวัตกรรมสุขภาพ',1,'2022-05-22 13:19:15','2022-05-22 13:19:15'),(2,7,'การประกวดการปั้นโมเดลทางชีววิทยา',1,'2022-05-22 13:20:15','2022-05-22 13:20:15'),(3,2,'การประกวด Science Show',1,'2022-05-23 08:24:39','2022-05-24 12:18:23'),(4,8,'การแข่งขันพัฒนาเว็บไซต์',1,'2022-05-24 13:01:24','2022-05-24 13:01:24'),(5,7,'การประกวดภาพวาดจินตนาการทางวิทยาศาสตร์และเทคโนโลยี',1,'2022-05-30 14:40:56','2022-05-30 14:40:56'),(6,8,'การแข่งขันพัฒนาแอปพลิเคชันด้วย Flutter',1,'2022-06-01 06:25:50','2022-06-01 06:25:50'),(7,8,'การประกวดนวัตกรรมการออกกำลังกายเพื่อสุขภาพ',1,'2022-06-01 06:30:04','2022-06-01 06:30:04'),(8,8,'การประกวดคลิปวีดีโอส่งเสริมการฉีดวัคซีนป้องกันโรค COVID-19',1,'2022-06-01 06:33:06','2022-06-01 06:33:06');
/*!40000 ALTER TABLE `activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `activity_levels`
--

DROP TABLE IF EXISTS `activity_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `activity_levels` (
  `activity_level_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`activity_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_levels`
--

LOCK TABLES `activity_levels` WRITE;
/*!40000 ALTER TABLE `activity_levels` DISABLE KEYS */;
INSERT INTO `activity_levels` VALUES (1,'มัธยมศึกษาตอนต้น (ม.1 - ม.3)','2022-05-22 13:19:15','2022-05-22 13:19:15'),(2,'มัธยมศึกษาตอนปลาย (ม.4 - ม.6)','2022-05-22 13:19:19','2022-05-22 13:19:19'),(3,'อุดมศึกษา หรือ ปวส หรือ บุคคลทั่วไป','2022-05-22 13:19:23','2022-05-22 13:19:23');
/*!40000 ALTER TABLE `activity_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `type` char(5) NOT NULL,
  `level` tinyint(1) NOT NULL,
  `suspend` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`admin_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin','$2b$10$brVzoIET3A6zEkXVR19EVO8CSk6gzY4gxB3KtnAtSpC2Gs.nU9Pge','แอดมิน','1653998289201_1.png','admin@example.com','admin',1,0,'2022-05-22 09:27:26','2022-05-31 11:58:09'),(2,'admin2','$2b$10$30JU20Vx0fGtQDaxVYAY9ead1.L673JpWOTd5CNA1OUVaJNNx9ufi','แอดมิน','1653998303889_2.png','admin2@gmail.com','admin',2,0,'2022-05-22 09:42:29','2022-05-31 11:58:23'),(3,'admin3','$2b$10$jSssOXzzIqLqb6HJByGvyeefsZyzRAjpW5VyrayLWVb6gEXI2AE8y','แอดมิน','1653998315998_3.png','admin3@gmail.com','admin',3,0,'2022-05-22 09:42:55','2022-05-31 11:58:35'),(4,'admin4','$2b$10$q.kYPqWMXZzl6GC8u2y3lepVNNyivLu.nLYAzwrbaoqX/j8/cPiGm','แอดมิน','1653998277120_4.png','admin4@gmail.com','admin',4,0,'2022-05-22 09:43:19','2022-05-31 11:57:57'),(5,'admin5','$2b$10$whT9Bdh6pFBZFE6AvGLKzO0/XPUotX366e8f9q4X3/rmNXkLamWHa','แอดมิน','1653998328452_5.png','admin5@gmail.com','admin',5,0,'2022-05-22 09:43:50','2022-05-31 11:58:48'),(6,'thanakorn','$2b$10$BSBW2EwZsmP7Ike4PLIWZ.IuKk3APge.T9Kq.efPkBc8uwlFxO8Di','แอดมิน','','thanakorn@gmail.com','admin',2,0,'2022-05-22 13:17:34','2022-05-22 13:17:34'),(7,'pisanu','$2b$10$nSlzXwPTnIFeKmmuJGun7emU8LAHYlWOy29.E3aThmLXS4CDJxZiu','แอดมิน','','pisanu@gmail.com','admin',2,0,'2022-05-22 13:18:09','2022-05-22 13:18:09'),(8,'sarawut','$2b$10$OCHZNPQXUtf4m/0QQwy0M.A725Vdw4a8iqyoz5qtOGFhTm2EY.rb.','สราวุฒิ','','mr.sarawutpe1@gmail.com','admin',2,0,'2022-05-24 12:58:26','2022-05-24 12:58:26');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `advisors`
--

DROP TABLE IF EXISTS `advisors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advisors` (
  `advisor_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` int(11) NOT NULL,
  `advisor_name` varchar(255) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL,
  PRIMARY KEY (`advisor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advisors`
--

LOCK TABLES `advisors` WRITE;
/*!40000 ALTER TABLE `advisors` DISABLE KEYS */;
INSERT INTO `advisors` VALUES (1,1,'นางสาวณัฏฐกัญจน์ ไชยภักดี',2022,2022),(2,2,'นายธวัชชัย ทองอุทัยศรี',2022,2022),(3,3,'ปิติณัช ราชภักดี',2022,2022),(4,4,'เทพสถิตย์ ตะรุวรรณ',2022,2022),(5,5,'นายสุรชัย สดไธสง',2022,2022),(6,6,'ไอแซก นิวตัน',2022,2022),(7,7,'การประกวด Science Show',2022,2022),(9,7,'นางสาวเพชรดา  หาญคำ',2022,2022),(10,8,'ว่าที่ร้อยตรีวรายุทธ พลแสง',2022,2022),(12,9,'นางแสงเดือน จันทร์ศรี',2022,2022),(13,10,'นายกฤษฎา กฤษณานนท์',2022,2022),(14,11,'นายรัชชานนท์ ตั้งตระกูล',2022,2022),(15,12,'นายรัชชานนท์ ตั้งตระกูล',2022,2022),(16,13,'นางสาวปัณฑมาพร พงษ์ธนู',2022,2022);
/*!40000 ALTER TABLE `advisors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `award_attachments`
--

DROP TABLE IF EXISTS `award_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `award_attachments` (
  `award_attachment_id` int(11) NOT NULL AUTO_INCREMENT,
  `award_attachment_name` varchar(255) NOT NULL,
  `award_attachment_path` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`award_attachment_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award_attachments`
--

LOCK TABLES `award_attachments` WRITE;
/*!40000 ALTER TABLE `award_attachments` DISABLE KEYS */;
INSERT INTO `award_attachments` VALUES (1,'เอกสารขอรับเงินรางวัล (ไฟล์ PDF)','1653227222111_howtoinput.pdf','2022-05-22 13:47:02','2022-05-22 13:47:02');
/*!40000 ALTER TABLE `award_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `award_levels`
--

DROP TABLE IF EXISTS `award_levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `award_levels` (
  `award_level_id` int(11) NOT NULL AUTO_INCREMENT,
  `award_level_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`award_level_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award_levels`
--

LOCK TABLES `award_levels` WRITE;
/*!40000 ALTER TABLE `award_levels` DISABLE KEYS */;
INSERT INTO `award_levels` VALUES (1,'ชนะเลิศ','2022-05-22 13:19:33','2022-05-22 13:19:33'),(2,'รองชนะเลิศอันดับ 1','2022-05-22 13:19:39','2022-05-22 13:19:39'),(3,'รองชนะเลิศอันดับ 2','2022-05-22 13:19:43','2022-05-22 13:19:43'),(4,'ชมเชย','2022-05-22 13:19:47','2022-05-22 13:19:47'),(5,'ผ่านการอบรม','2022-05-22 13:19:52','2022-05-22 13:19:52');
/*!40000 ALTER TABLE `award_levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `certificates`
--

DROP TABLE IF EXISTS `certificates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `certificates` (
  `certificate_id` int(11) NOT NULL AUTO_INCREMENT,
  `certificate_name` varchar(255) NOT NULL,
  `certificate_type` tinyint(1) NOT NULL,
  `certificate_img` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`certificate_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `certificates`
--

LOCK TABLES `certificates` WRITE;
/*!40000 ALTER TABLE `certificates` DISABLE KEYS */;
INSERT INTO `certificates` VALUES (1,'สำหรับการแข่งขัน/การประกวด',1,'1653225640278_certificate_template_type1.jpg','2022-05-22 13:20:40','2022-05-24 12:29:02'),(2,'สำหรับอบรม',2,'1653225645550_certificate_template_type2.jpg','2022-05-22 13:20:45','2022-05-24 12:29:09'),(3,'สำหรับผู้เข้าร่วมกิจกรรม',3,'1653225651531_certificate_template_type3.jpg','2022-05-22 13:20:51','2022-05-24 12:29:19');
/*!40000 ALTER TABLE `certificates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competition_results`
--

DROP TABLE IF EXISTS `competition_results`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competition_results` (
  `competition_result_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL,
  `competition_id` int(11) NOT NULL,
  `award_level_id` int(11) NOT NULL,
  `amount` float(10,2) NOT NULL,
  `proof_of_payment` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`competition_result_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competition_results`
--

LOCK TABLES `competition_results` WRITE;
/*!40000 ALTER TABLE `competition_results` DISABLE KEYS */;
INSERT INTO `competition_results` VALUES (1,2,5,1,2000.00,'1653227911328_pm.jpg','2022-05-22 13:45:49','2022-05-22 13:58:31'),(2,2,1,2,1000.00,'1653227919799_pm.jpg','2022-05-22 13:45:49','2022-05-22 13:58:39'),(3,2,6,3,500.00,'1653227932580_pm.jpg','2022-05-22 13:45:49','2022-05-22 13:58:52'),(4,1,3,3,500.00,'1653227896686_pm.jpg','2022-05-22 13:49:06','2022-05-22 13:58:16'),(5,1,4,1,2000.00,'1653227851008_pm.jpg','2022-05-22 13:49:06','2022-05-22 13:57:31'),(6,1,2,2,1000.00,'1653227870044_pm.jpg','2022-05-22 13:49:06','2022-05-22 13:57:50'),(7,3,7,1,0.00,'','2022-05-24 12:21:12','2022-05-24 12:21:12'),(8,4,8,2,1000.00,'1653398887898_pm.jpg','2022-05-24 13:19:41','2022-05-24 13:28:07'),(9,4,10,1,1500.00,'1653398865964_pm.jpg','2022-05-24 13:19:41','2022-05-24 13:27:45'),(10,4,9,3,300.00,'1654062435349_pm.jpg','2022-05-24 13:19:41','2022-06-01 05:47:15');
/*!40000 ALTER TABLE `competition_results` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `competitions`
--

DROP TABLE IF EXISTS `competitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competitions` (
  `competition_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`competition_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitions`
--

LOCK TABLES `competitions` WRITE;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;
INSERT INTO `competitions` VALUES (1,1,2,'2022-05-22 13:34:42','2022-05-22 13:34:42'),(2,3,1,'2022-05-22 13:43:14','2022-05-22 13:43:14'),(3,2,1,'2022-05-22 13:43:25','2022-05-22 13:43:25'),(4,1,1,'2022-05-22 13:43:52','2022-05-22 13:43:52'),(5,3,2,'2022-05-22 13:44:27','2022-05-22 13:44:27'),(6,2,2,'2022-05-22 13:45:14','2022-05-22 13:45:14'),(7,3,3,'2022-05-23 08:26:28','2022-05-23 08:26:28'),(8,4,4,'2022-05-24 13:05:47','2022-05-24 13:05:47'),(9,1,4,'2022-05-24 13:07:30','2022-05-24 13:07:30'),(10,5,4,'2022-05-24 13:09:03','2022-05-24 13:09:03'),(13,3,5,'2022-05-31 12:20:27','2022-05-31 12:20:27');
/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coordinators`
--

DROP TABLE IF EXISTS `coordinators`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `coordinators` (
  `coordinator_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL,
  `coordinator_name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`coordinator_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coordinators`
--

LOCK TABLES `coordinators` WRITE;
/*!40000 ALTER TABLE `coordinators` DISABLE KEYS */;
INSERT INTO `coordinators` VALUES (1,1,'ผศ.ดร.พัชราภรณ์  ไชยศรี','2022-05-22 13:25:05','2022-05-22 13:25:05'),(2,1,'รศ.ดร.สังคม ศุภรัตนกุล','2022-05-22 13:25:05','2022-05-22 13:25:05'),(3,1,'ผศ.ดร.อัจฉรา จินวงษ์','2022-05-22 13:25:05','2022-05-22 13:25:05'),(4,1,'ดร.นฤปวรรต์ พรหมมาวัย','2022-05-22 13:25:05','2022-05-22 13:25:05'),(5,1,'ดร.สรญา  แสนมาโนช','2022-05-22 13:25:05','2022-05-22 13:25:05'),(6,2,'ผศ. นวภัทร นวกะคาม      ประธาน','2022-05-22 13:25:29','2022-05-22 13:25:29'),(7,2,'ผศ. ดร.สรฉัตร เทียมดาว    กรรมการ','2022-05-22 13:25:29','2022-05-22 13:25:29'),(8,2,'ผศ. ดร.ธนิศรา อินทโสตถิ   กรรมการ','2022-05-22 13:25:29','2022-05-22 13:25:29'),(9,2,'ดร.ศกุนตลา ศิริอุดม         กรรมการและเลขานุการ','2022-05-22 13:25:29','2022-05-22 13:25:29'),(10,4,'ผศ. วิไลพร กุลตังวัฒนา','2022-05-24 13:02:51','2022-05-24 13:02:51'),(11,4,'รศ.ดร. กริช สมกันธา','2022-05-24 13:02:51','2022-05-24 13:02:51'),(12,5,'ดร.วิบูล เป็นสุข','2022-05-30 14:45:23','2022-05-30 14:45:23'),(13,5,'ผศ.สิงขร ภักดี','2022-05-30 14:45:23','2022-05-30 14:45:23'),(14,6,'อ.ศักดิ์สิทธิ์ บัวคำ','2022-05-30 14:47:41','2022-05-30 14:47:41'),(15,6,'ผศ.เรืองศักดิ์ ปัดถาวะโร','2022-05-30 14:47:41','2022-05-30 14:47:41'),(16,7,'อ. วรรณสิริ ธุระชน','2022-06-01 06:29:30','2022-06-01 06:29:30'),(17,7,'ผศ.ดร. พิศณุ ชัยจิตวณิชกุล','2022-06-01 06:29:30','2022-06-01 06:29:30'),(18,7,'ดร. วันทนี รัฐสมุทร','2022-06-01 06:29:30','2022-06-01 06:29:30'),(19,7,'อ. ภาณุพันธุ์ ชื่นบุญ','2022-06-01 06:29:30','2022-06-01 06:29:30'),(20,8,'ผศ. ธนัมพร ทองลอง','2022-06-01 06:32:30','2022-06-01 06:32:30'),(21,8,'ผศ.ดร.ภูษณพาส สมนิล','2022-06-01 06:32:30','2022-06-01 06:32:30'),(22,8,'อ.สุภาวดี กสิกรรม','2022-06-01 06:32:30','2022-06-01 06:32:30'),(23,8,'อ.ฤทธิรงค์ อัญจะนะ','2022-06-01 06:32:30','2022-06-01 06:32:30'),(24,8,'อ.สหรัฐฯ ศรีพุทธา','2022-06-01 06:32:31','2022-06-01 06:32:31'),(25,9,'อ.ภาณุพันธุ์ ชื่นบุญ','2022-06-01 06:35:29','2022-06-01 06:35:29'),(26,9,'ผศ.ตรีรัตน์ เสริมทรัพย์','2022-06-01 06:35:29','2022-06-01 06:35:29'),(27,9,'ผศ.พนารัตน์ ศรีเซษฐา','2022-06-01 06:35:29','2022-06-01 06:35:29'),(28,9,'ผศ.วิไลพร กุลตังวัฒนา','2022-06-01 06:35:29','2022-06-01 06:35:29'),(29,9,'อ.ณรรฐวรรณ์ พูลสน','2022-06-01 06:35:29','2022-06-01 06:35:29'),(30,9,'อ.วรรณสิริ ธุระชน','2022-06-01 06:35:29','2022-06-01 06:35:29'),(31,9,'ดร.วันทนี รัฐสมุทร','2022-06-01 06:35:29','2022-06-01 06:35:29'),(32,9,'อ.ขวัญชัย สุขแสน','2022-06-01 06:35:29','2022-06-01 06:35:29'),(33,9,'ดร.นฤปวรรต์ พรหมมาวัย','2022-06-01 06:35:29','2022-06-01 06:35:29'),(34,9,'อ.ทรงยศ ศรีหริ่ง','2022-06-01 06:35:29','2022-06-01 06:35:29');
/*!40000 ALTER TABLE `coordinators` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `documents`
--

DROP TABLE IF EXISTS `documents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `documents` (
  `document_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL,
  `document_name` varchar(255) NOT NULL,
  `document_src` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`document_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `documents`
--

LOCK TABLES `documents` WRITE;
/*!40000 ALTER TABLE `documents` DISABLE KEYS */;
INSERT INTO `documents` VALUES (1,1,'ไฟล์คุณสมบัติและกติกา (PDF)','1653225905068_activity202101.pdf','2022-05-22 13:25:05','2022-05-22 13:25:05'),(2,2,'ไฟล์คุณสมบัติและกติกา (PDF)','1653225929241_document_9.pdf','2022-05-22 13:25:29','2022-05-22 13:25:29'),(3,4,'ไฟล์คุณสมบัติและกติกา (PDF)','1653397371669_activity202106.pdf','2022-05-24 13:02:51','2022-05-24 13:02:51'),(4,5,'ไฟล์คุณสมบัติและกติกา (PDF)','1653921923048_document_9.pdf','2022-05-30 14:45:23','2022-05-30 14:45:23'),(5,6,'ไฟล์คุณสมบัติและกติกา (PDF)','1653922061690_document_9.pdf','2022-05-30 14:47:41','2022-05-30 14:47:41'),(6,7,'ไฟล์คุณสมบัติและกติกา (PDF)','1654064970027_activity202106.pdf','2022-06-01 06:29:30','2022-06-01 06:29:30'),(7,8,'ไฟล์คุณสมบัติและกติกา (PDF)','1654065151003_activity202106.pdf','2022-06-01 06:32:31','2022-06-01 06:32:31'),(8,9,'ไฟล์คุณสมบัติและกติกา (PDF)','1654065329264_1646930077171.pdf','2022-06-01 06:35:29','2022-06-01 06:35:29');
/*!40000 ALTER TABLE `documents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_activities`
--

DROP TABLE IF EXISTS `form_activities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_activities` (
  `form_activity_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `no` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `required` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`form_activity_id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_activities`
--

LOCK TABLES `form_activities` WRITE;
/*!40000 ALTER TABLE `form_activities` DISABLE KEYS */;
INSERT INTO `form_activities` VALUES (1,2,1,2,'เพศ',1,'2022-05-22 13:27:38','2022-05-22 13:27:38'),(2,2,2,2,'ความพึงพอใจ',1,'2022-05-22 13:28:16','2022-05-22 13:28:16'),(3,2,3,3,'ข้อเสนอแนะ',1,'2022-05-22 13:28:43','2022-05-22 13:28:43'),(4,1,1,2,'เพศ',1,'2022-05-22 13:29:21','2022-05-22 13:29:21'),(5,0,2,2,'ความสนใจกิจกรรมการประกวดนวัตกรรมสุขภาพ',1,'2022-05-22 13:32:47','2022-05-22 13:32:47'),(7,1,2,2,'ความสนใจกิจกรรมการประกวดนวัตกรรมสุขภาพ',1,'2022-05-22 13:33:51','2022-05-22 13:33:51'),(8,4,1,2,'เพศ',1,'2022-06-01 06:49:31','2022-06-01 06:49:31'),(9,4,2,2,'สถานะ/อาชีพ',1,'2022-06-01 06:49:58','2022-06-01 06:49:58'),(10,4,3,2,'ภาพรวมความพึงพอใจในการจัดการแข่งขันพัฒนาเว็บไซต์',1,'2022-06-01 06:51:19','2022-06-01 06:51:19'),(11,4,4,3,'ความคิดเห็นเพิ่มเติม',0,'2022-06-01 06:51:39','2022-06-01 06:51:39');
/*!40000 ALTER TABLE `form_activities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_activity_radioes`
--

DROP TABLE IF EXISTS `form_activity_radioes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_activity_radioes` (
  `form_activity_radio_id` int(11) NOT NULL AUTO_INCREMENT,
  `form_activity_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`form_activity_radio_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_activity_radioes`
--

LOCK TABLES `form_activity_radioes` WRITE;
/*!40000 ALTER TABLE `form_activity_radioes` DISABLE KEYS */;
INSERT INTO `form_activity_radioes` VALUES (1,1,'ชาย','2022-05-22 13:27:38','2022-05-22 13:27:38'),(2,1,'หญิง','2022-05-22 13:27:38','2022-05-22 13:27:38'),(3,2,'มาก','2022-05-22 13:28:16','2022-05-22 13:28:16'),(4,2,'ปานกลาง','2022-05-22 13:28:16','2022-05-22 13:28:16'),(5,2,'น้อย','2022-05-22 13:28:16','2022-05-22 13:28:16'),(6,4,'ชาย','2022-05-22 13:29:21','2022-05-22 13:29:21'),(7,4,'หญิง','2022-05-22 13:29:21','2022-05-22 13:29:21'),(8,5,'มากที่สุด','2022-05-22 13:32:47','2022-05-22 13:32:47'),(9,5,'มาก','2022-05-22 13:32:47','2022-05-22 13:32:47'),(10,5,'ปานกลาง','2022-05-22 13:32:47','2022-05-22 13:32:47'),(11,5,'น้อย','2022-05-22 13:32:47','2022-05-22 13:32:47'),(12,5,'น้อยที่สุด','2022-05-22 13:32:47','2022-05-22 13:32:47'),(13,7,'มากที่สุด','2022-05-22 13:33:51','2022-05-22 13:33:51'),(14,7,'มาก','2022-05-22 13:33:51','2022-05-22 13:33:51'),(15,7,'ปานกลาง','2022-05-22 13:33:51','2022-05-22 13:33:51'),(16,7,'น้อย','2022-05-22 13:33:51','2022-05-22 13:33:51'),(17,7,'น้อยที่สุด','2022-05-22 13:33:51','2022-05-22 13:33:51'),(18,8,'ชาย','2022-06-01 06:49:31','2022-06-01 06:49:31'),(19,8,'หญิง','2022-06-01 06:49:31','2022-06-01 06:49:31'),(20,9,'นักเรียน/นักศึกษา','2022-06-01 06:49:58','2022-06-01 06:49:58'),(21,9,'ครู/อาจารย์','2022-06-01 06:49:58','2022-06-01 06:49:58'),(22,9,'บุคคลทั่วไป','2022-06-01 06:49:58','2022-06-01 06:49:58'),(23,10,'มากที่สุด','2022-06-01 06:51:19','2022-06-01 06:51:19'),(24,10,'มาก','2022-06-01 06:51:19','2022-06-01 06:51:19'),(25,10,'ปานกลาง','2022-06-01 06:51:19','2022-06-01 06:51:19'),(26,10,'น้อย','2022-06-01 06:51:19','2022-06-01 06:51:19'),(27,10,'น้อยที่สุด','2022-06-01 06:51:19','2022-06-01 06:51:19');
/*!40000 ALTER TABLE `form_activity_radioes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_activity_responses`
--

DROP TABLE IF EXISTS `form_activity_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_activity_responses` (
  `form_activity_response_id` int(11) NOT NULL AUTO_INCREMENT,
  `member_id` int(11) NOT NULL,
  `form_activity_id` int(11) NOT NULL,
  `response` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`form_activity_response_id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_activity_responses`
--

LOCK TABLES `form_activity_responses` WRITE;
/*!40000 ALTER TABLE `form_activity_responses` DISABLE KEYS */;
INSERT INTO `form_activity_responses` VALUES (1,1,1,'ชาย','2022-05-22 13:35:19','2022-05-22 13:35:19'),(2,1,2,'มาก','2022-05-22 13:35:19','2022-05-22 13:35:19'),(3,1,3,'กิจกรรมดีมากๆ','2022-05-22 13:35:19','2022-05-22 13:35:19'),(4,1,4,'ชาย','2022-05-22 13:44:17','2022-05-22 13:44:17'),(5,1,7,'มาก','2022-05-22 13:44:17','2022-05-22 13:44:17'),(6,2,1,'ชาย','2022-05-22 13:47:51','2022-05-22 13:47:51'),(7,2,2,'น้อย','2022-05-22 13:47:51','2022-05-22 13:47:51'),(8,2,3,'ไม่มีครับ','2022-05-22 13:47:51','2022-05-22 13:47:51'),(9,3,1,'ชาย','2022-05-22 13:47:53','2022-05-22 13:47:53'),(10,3,2,'ปานกลาง','2022-05-22 13:47:53','2022-05-22 13:47:53'),(11,3,3,'ทดสอบ','2022-05-22 13:47:53','2022-05-22 13:47:53'),(12,3,4,'หญิง','2022-05-22 13:48:13','2022-05-22 13:48:13'),(13,3,7,'ปานกลาง','2022-05-22 13:48:13','2022-05-22 13:48:13'),(14,2,4,'ชาย','2022-05-22 13:48:28','2022-05-22 13:48:28'),(15,2,7,'น้อยที่สุด','2022-05-22 13:48:28','2022-05-22 13:48:28'),(16,4,8,'ชาย','2022-06-01 06:52:34','2022-06-01 06:52:34'),(17,4,9,'นักเรียน/นักศึกษา','2022-06-01 06:52:34','2022-06-01 06:52:34'),(18,4,10,'มาก','2022-06-01 06:52:34','2022-06-01 06:52:34'),(19,4,11,'-','2022-06-01 06:52:34','2022-06-01 06:52:34'),(20,1,8,'ชาย','2022-06-01 06:54:51','2022-06-01 06:54:51'),(21,1,9,'นักเรียน/นักศึกษา','2022-06-01 06:54:51','2022-06-01 06:54:51'),(22,1,10,'ปานกลาง','2022-06-01 06:54:51','2022-06-01 06:54:51'),(23,1,11,'อยากให้เพิ่มเรื่องเงินรางวัล','2022-06-01 06:54:51','2022-06-01 06:54:51'),(24,5,8,'หญิง','2022-06-01 06:55:43','2022-06-01 06:55:43'),(25,5,9,'นักเรียน/นักศึกษา','2022-06-01 06:55:43','2022-06-01 06:55:43'),(26,5,10,'มาก','2022-06-01 06:55:43','2022-06-01 06:55:43'),(27,5,11,'ขยายระยะเวลาการจัดกิจกรรม','2022-06-01 06:55:43','2022-06-01 06:55:43');
/*!40000 ALTER TABLE `form_activity_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_science_day_radioes`
--

DROP TABLE IF EXISTS `form_science_day_radioes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_science_day_radioes` (
  `form_science_day_radio_id` int(11) NOT NULL AUTO_INCREMENT,
  `form_science_day_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`form_science_day_radio_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_science_day_radioes`
--

LOCK TABLES `form_science_day_radioes` WRITE;
/*!40000 ALTER TABLE `form_science_day_radioes` DISABLE KEYS */;
INSERT INTO `form_science_day_radioes` VALUES (1,1,'ชาย','2022-05-22 13:49:10','2022-05-22 13:49:10'),(2,1,'หญิง','2022-05-22 13:49:10','2022-05-22 13:49:10'),(3,2,'นักเรียน/นักศึกษา','2022-05-22 13:49:42','2022-05-22 13:49:42'),(4,2,'ครู/อาจารย์','2022-05-22 13:49:42','2022-05-22 13:49:42'),(5,2,'บุคคลทั่วไป','2022-05-22 13:49:42','2022-05-22 13:49:42'),(6,3,'มากที่สุด','2022-05-22 13:50:31','2022-05-22 13:50:31'),(7,3,'มาก','2022-05-22 13:50:31','2022-05-22 13:50:31'),(8,3,'ปานกลาง','2022-05-22 13:50:31','2022-05-22 13:50:31'),(9,3,'น้อย','2022-05-22 13:50:31','2022-05-22 13:50:31'),(10,3,'น้อยที่สุด','2022-05-22 13:50:31','2022-05-22 13:50:31'),(11,4,'มาก','2022-05-24 13:40:19','2022-05-24 13:40:19'),(12,4,'น้อย','2022-05-24 13:40:19','2022-05-24 13:40:19');
/*!40000 ALTER TABLE `form_science_day_radioes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_science_day_responses`
--

DROP TABLE IF EXISTS `form_science_day_responses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_science_day_responses` (
  `form_science_day_response_id` int(11) NOT NULL AUTO_INCREMENT,
  `form_science_day_survey_id` int(11) NOT NULL,
  `form_science_day_id` int(11) NOT NULL,
  `response` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`form_science_day_response_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_science_day_responses`
--

LOCK TABLES `form_science_day_responses` WRITE;
/*!40000 ALTER TABLE `form_science_day_responses` DISABLE KEYS */;
INSERT INTO `form_science_day_responses` VALUES (1,1,1,'หญิง','2022-05-22 13:52:23','2022-05-22 13:52:23'),(2,1,2,'นักเรียน/นักศึกษา','2022-05-22 13:52:23','2022-05-22 13:52:23'),(3,1,3,'มากที่สุด','2022-05-22 13:52:23','2022-05-22 13:52:23'),(4,2,1,'ชาย','2022-05-22 13:54:09','2022-05-22 13:54:09'),(5,2,2,'นักเรียน/นักศึกษา','2022-05-22 13:54:09','2022-05-22 13:54:09'),(6,2,3,'ปานกลาง','2022-05-22 13:54:09','2022-05-22 13:54:09'),(7,4,1,'ชาย','2022-05-22 13:55:54','2022-05-22 13:55:54'),(8,4,2,'นักเรียน/นักศึกษา','2022-05-22 13:55:54','2022-05-22 13:55:54'),(9,4,3,'ปานกลาง','2022-05-22 13:55:54','2022-05-22 13:55:54'),(10,5,1,'ชาย','2022-05-22 13:56:08','2022-05-22 13:56:08'),(11,5,2,'บุคคลทั่วไป','2022-05-22 13:56:08','2022-05-22 13:56:08'),(12,5,3,'ปานกลาง','2022-05-22 13:56:08','2022-05-22 13:56:08'),(13,6,1,'ชาย','2022-05-24 13:45:04','2022-05-24 13:45:04'),(14,6,2,'นักเรียน/นักศึกษา','2022-05-24 13:45:04','2022-05-24 13:45:04'),(15,6,3,'มากที่สุด','2022-05-24 13:45:04','2022-05-24 13:45:04'),(16,6,4,'มาก','2022-05-24 13:45:04','2022-05-24 13:45:04');
/*!40000 ALTER TABLE `form_science_day_responses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_science_day_surveys`
--

DROP TABLE IF EXISTS `form_science_day_surveys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_science_day_surveys` (
  `form_science_day_survey_id` int(11) NOT NULL AUTO_INCREMENT,
  `id_card` char(13) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `sub_district` varchar(255) DEFAULT NULL,
  `district` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `postcode` char(5) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`form_science_day_survey_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_science_day_surveys`
--

LOCK TABLES `form_science_day_surveys` WRITE;
/*!40000 ALTER TABLE `form_science_day_surveys` DISABLE KEYS */;
INSERT INTO `form_science_day_surveys` VALUES (1,'1419901798412','ธนกร โพธิโสภณ','47/1','ตำบล หมาแข้ง','อำเภอ เมือง','จังหวัด อุดรธานี','41000','2022-05-22 13:52:23','2022-05-22 13:52:23'),(2,'1410700080541','พิษณุ คำสุข','156/6','ตำบลทุ่งฝน','อำเภอทุ่งฝน','จังหวัดอุดรธานี','41310','2022-05-22 13:54:09','2022-05-22 13:54:09'),(3,'1411001167443','นายสราวุฒิ ชมภูเขียว','123 123','ตำบลผาสุก','อำเภอวังสามหมอ','จังหวัดอุดรธานี','41280','2022-05-22 13:54:22','2022-05-22 13:54:22'),(4,'1410700080541','พิษณุ คำสุข','156/6','ตำบลทุ่งฝน','อำเภอทุ่งฝน','จังหวัดอุดรธานี','41310','2022-05-22 13:55:54','2022-05-22 13:55:54'),(5,'1419901798412','ธนกร โพธิโสภณ','47/1','ตำบล หมาแข้ง','อำเภอ เมือง','จังหวัด อุดรธานี','41000','2022-05-22 13:56:08','2022-05-22 13:56:08'),(6,'1411001167443','สราวุฒิ ชมภูเขียว','123','ตำบลผาสุก','อำเภอวังสามหมอ','จังหวัดอุดรธานี','41280','2022-05-24 13:45:04','2022-05-24 13:45:04');
/*!40000 ALTER TABLE `form_science_day_surveys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form_science_days`
--

DROP TABLE IF EXISTS `form_science_days`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `form_science_days` (
  `form_science_day_id` int(11) NOT NULL AUTO_INCREMENT,
  `no` int(11) NOT NULL,
  `type` tinyint(1) NOT NULL,
  `name` varchar(255) NOT NULL,
  `required` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`form_science_day_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form_science_days`
--

LOCK TABLES `form_science_days` WRITE;
/*!40000 ALTER TABLE `form_science_days` DISABLE KEYS */;
INSERT INTO `form_science_days` VALUES (1,1,2,'เพศ',0,'2022-05-22 13:49:10','2022-05-22 13:49:10'),(2,2,2,'สถานะ/อาชีพ',0,'2022-05-22 13:49:42','2022-05-22 13:49:42'),(3,3,2,'ความพึงพอใจต่อการอำนวยความสะดวก/การให้บริการของเจ้าหน้าที่ในภาพรวม',0,'2022-05-22 13:50:31','2022-05-22 13:50:31'),(4,4,2,'ความพึงพอใจทั้งหมด',0,'2022-05-24 13:40:19','2022-05-24 13:40:19');
/*!40000 ALTER TABLE `form_science_days` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `links`
--

DROP TABLE IF EXISTS `links`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `links` (
  `link_id` int(11) NOT NULL AUTO_INCREMENT,
  `program_id` int(11) NOT NULL,
  `link_name` varchar(255) NOT NULL,
  `link_src` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`link_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `links`
--

LOCK TABLES `links` WRITE;
/*!40000 ALTER TABLE `links` DISABLE KEYS */;
INSERT INTO `links` VALUES (1,1,'meet','https://meet.google.com/udy-ygqh-aog','2022-05-22 13:25:05','2022-05-22 13:25:05'),(2,2,'meet','https://meet.google.com/hst-oern-gye','2022-05-22 13:25:29','2022-05-22 13:25:29'),(3,4,'meet','https://meet.google.com/abi-qqtd-upo','2022-05-24 13:02:51','2022-05-24 13:02:51'),(4,5,'meet','https://meet.google.com/vrv-wdfg-sco','2022-05-30 14:45:23','2022-05-30 14:45:23'),(5,6,'meet','https://meet.google.com/psn-mkzi-suo','2022-05-30 14:47:41','2022-05-30 14:47:41'),(6,7,'meet','https://meet.google.com/zwz-qtjv-cei','2022-06-01 06:29:30','2022-06-01 06:29:30'),(7,8,'meet','https://meet.google.com/axu-srfn-tnu','2022-06-01 06:32:31','2022-06-01 06:32:31'),(8,9,'meet','https://meet.google.com/qwt-ddav-soj','2022-06-01 06:35:29','2022-06-01 06:35:29');
/*!40000 ALTER TABLE `links` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `members`
--

DROP TABLE IF EXISTS `members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `members` (
  `member_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` char(60) NOT NULL,
  `name` varchar(255) NOT NULL,
  `picture` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `type` char(6) NOT NULL,
  `suspend` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `members`
--

LOCK TABLES `members` WRITE;
/*!40000 ALTER TABLE `members` DISABLE KEYS */;
INSERT INTO `members` VALUES (1,1,'pitsanu01','$2b$10$DwWw2q0EPmvVJAKb0UIPNO4W09Ht/d/iG2Qpewghfal9jE.1TIEEW','พิษณุ คำสุข','','61240233103@udru.ac.th','','','member',0,'2022-05-22 13:32:35','2022-05-22 13:32:35'),(2,2,'61240233101','$2b$10$9opRu2Kd0RLDuIbCl7Dofus3BZCZt5DcwyEo9N645Jska63E9qotu','ธนกร โพธิโสภณ','','61240233101@udru.ac.th','','','member',0,'2022-05-22 13:38:39','2022-05-22 14:07:18'),(3,3,'pe','$2b$10$YGBEAas7rtXBAqTTGOXTLeXtyNSpfGaYaB5q31t/WAsYoMRA9oT1.','สราวุฒิ ชมภูเขียว','','mr.sarawutpe@gmail.com','','','member',0,'2022-05-22 13:39:03','2022-05-22 13:39:03'),(4,4,'pepe','$2b$10$pzP/OosgGhKns7kWjeKWNO02614jYRUvj5TRisnEY1Fry2zsoca8G','สราวุฒิ ชมภูเขียว','','61240233105@udru.ac.th','','','member',0,'2022-05-24 13:03:52','2022-05-24 13:03:52'),(5,1,'thanakorn01','$2b$10$Ff1o0IXK2iWOqg4rzXBCr.JkVUgRVEI4u2LDS9a8UobTCYlyZcQES','ธนกร','','thanakorn01@gmail.com','','','member',0,'2022-05-24 13:08:34','2022-05-24 13:08:34'),(6,1,'pepe1','$2b$10$96GtYEQkpFjz6jpd70zlGOvzkGYHGcRNqSaRQAIkRaL6mKHLoIJba','สราวุฒิ','','pepe@gmail.com','','','member',0,'2022-05-24 13:13:54','2022-05-24 13:13:54'),(7,2,'demo','$2b$10$qu.Q2jn25Xj9DYVY4fzqOeD22KePBjoxRJEMhkFLF70pbjUeQdACa','บัญชีทดลอง','','demo@gmail.com','','','member',0,'2022-06-01 06:56:34','2022-06-01 06:56:34');
/*!40000 ALTER TABLE `members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `news`
--

DROP TABLE IF EXISTS `news`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `news` (
  `news_id` int(11) NOT NULL AUTO_INCREMENT,
  `news_topic` varchar(255) NOT NULL,
  `news_img` varchar(255) NOT NULL,
  `news_desc` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`news_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `news`
--

LOCK TABLES `news` WRITE;
/*!40000 ALTER TABLE `news` DISABLE KEYS */;
INSERT INTO `news` VALUES (1,'มาตรการและการเฝ้าระวังการระบาดของโรคไวรัสโคโรน่า','1653225715495_covid2021.jpg','มาตรการและการเฝ้าระวังการระบาดของโรคไวรัสโคโรน่า มหาวิทยาลัยราชภัฏอุดรธานี','2022-05-22 13:21:55','2022-05-22 13:21:55'),(2,'กองทุนเกื้อกูลนักศึกษา','1653225727615_covid-scholarship-udru.jpg','ประกาศมหาวิทยาลัยราชภัฏอุดรธานี ว่าด้วย กองทุนเกื้อกูลนักศึกษามหาวิทยาลัยราชภัฏอุดรธานี พ.ศ. 2563','2022-05-22 13:22:07','2022-05-22 13:22:07'),(3,'โครงการจ้างงานประชาชนฯ','1653225753034_covid-job.jpg','โครงการยกระดับเศรษฐกิจและสังคมรายตำบลแบบบูรณาการ\r\n(มหาวิทยาลัยสู่ตำบล สร้างรากแก้วให้ประเทศ)','2022-05-22 13:22:33','2022-05-22 13:22:33');
/*!40000 ALTER TABLE `news` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `participants` (
  `participant_id` int(11) NOT NULL AUTO_INCREMENT,
  `competition_id` int(11) NOT NULL,
  `participant_name` varchar(255) NOT NULL,
  `participant_active` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`participant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES (1,1,'นางสาวดาหลา จรูญศักดิ์',1,'2022-05-22 13:34:42','2022-05-22 13:41:52'),(2,1,'นางสาวชนม์ชนก เอี่ยมอักษร',1,'2022-05-22 13:34:42','2022-05-22 13:41:52'),(3,1,'นายสรวิศ พลพิทักษ์',1,'2022-05-22 13:34:42','2022-05-22 13:41:52'),(4,2,'นางสาวพรพรรณ ชารัญจะ',1,'2022-05-22 13:43:14','2022-05-22 13:49:55'),(5,2,'นางสาวจิดาภา จันทรสมบัติ',1,'2022-05-22 13:43:14','2022-05-22 13:49:55'),(6,2,'นายสิทธิ์วโรจน์ สีอ่อน',1,'2022-05-22 13:43:14','2022-05-22 13:49:55'),(7,3,'นางสาว วัชราภรณ์ ผาคำ',1,'2022-05-22 13:43:25','2022-05-22 13:50:01'),(8,3,'นางสาว เจนจิรา มายชนะ',1,'2022-05-22 13:43:25','2022-05-22 13:50:01'),(9,3,'นางสาวศศิวิมล สิทธิสวนจิก',1,'2022-05-22 13:43:25','2022-05-22 13:50:01'),(10,3,'นางสาววิชชุดา อสุระพงษ์',1,'2022-05-22 13:43:25','2022-05-22 13:50:01'),(11,3,'นางสาววิลาวรรณ์ เฉยฉิว',1,'2022-05-22 13:43:25','2022-05-22 13:50:01'),(12,4,'นางสาวสิริรัตน์ จันทา',1,'2022-05-22 13:43:52','2022-05-22 13:50:07'),(13,4,'นางสาวสิริรัตน์ ปานาพุฒ',1,'2022-05-22 13:43:52','2022-05-22 13:50:07'),(14,4,'นางสาวกมลรัตน์ ดำรงค์กูลสมบัติ',1,'2022-05-22 13:43:52','2022-05-22 13:50:07'),(15,5,'นางสาวธาริกา นามแก้ว',1,'2022-05-22 13:44:27','2022-05-22 13:45:24'),(16,5,'นางสาวศรัณย์ภัทร หล้ามะโฮง',1,'2022-05-22 13:44:27','2022-05-22 13:45:24'),(17,5,'นางสาวสายธาร ชุมเสนา',1,'2022-05-22 13:44:27','2022-05-22 13:45:24'),(18,6,'ด.ช ธนกร โพธิโสภณ',1,'2022-05-22 13:45:14','2022-05-22 13:45:30'),(19,6,'ด.ญ ปัญญา สูงสุด',1,'2022-05-22 13:45:14','2022-05-22 13:45:30'),(20,6,'ด.ช กล้าหาญ กตัญญู',1,'2022-05-22 13:45:14','2022-05-22 13:45:30'),(21,7,'นายอาคม  ดวงกุลสา',1,'2022-05-23 08:26:28','2022-05-24 12:20:57'),(22,8,'นายจักษวัฏ เรืองอร่าม',1,'2022-05-24 13:05:47','2022-05-24 13:18:26'),(23,9,'นางสาวสุพัตรา ทองที',1,'2022-05-24 13:07:30','2022-05-24 13:18:30'),(24,9,'นางสาวฎีชา ปราบศัตรู',1,'2022-05-24 13:07:30','2022-05-24 13:18:30'),(25,10,'นายภูตะวัน สายสมบูรณ์',1,'2022-05-24 13:09:03','2022-05-24 13:18:34'),(26,10,'นายธัชชัย บุ่งอุทุม',0,'2022-05-24 13:09:03','2022-05-24 13:18:34'),(27,8,'นายชเลศวร ธีระนุกูล',1,'2022-05-24 13:17:39','2022-05-24 13:18:26'),(28,11,'เด็กหญิงปภาวรินทร์ นิยมเหมาะ',0,'2022-05-30 15:04:52','2022-05-30 15:04:52'),(29,11,'เด็กหญิงปภาวรินทร์ นิยมเหมาะ',0,'2022-05-30 15:04:52','2022-05-30 15:04:52'),(31,12,'เด็กหญิงปภาวรินทร์ นิยมเหมาะ',0,'2022-05-30 15:07:10','2022-05-30 15:10:02'),(32,13,'นายกิตติศักดิ์ ฉันสิมา',0,'2022-05-31 12:20:27','2022-06-01 05:04:47'),(33,13,'นายวรวุฒิ ภักดีนอก',0,'2022-05-31 12:20:27','2022-06-01 05:04:47'),(34,13,'นายวรวุฒิ ภักดีใหม่',0,'2022-05-31 12:20:27','2022-06-01 05:04:47');
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `programs`
--

DROP TABLE IF EXISTS `programs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `programs` (
  `program_id` int(11) NOT NULL AUTO_INCREMENT,
  `activity_id` int(11) NOT NULL,
  `activity_level_id` int(11) NOT NULL,
  `limit_per_advisor` int(11) unsigned NOT NULL,
  `limit_per_team` int(11) unsigned NOT NULL,
  `limit_per_school` int(11) unsigned NOT NULL,
  `limit_per_program` int(11) unsigned NOT NULL,
  `apply_from` datetime NOT NULL,
  `apply_to` datetime NOT NULL,
  `start_date` datetime NOT NULL,
  `result_date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `confirm` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`program_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `programs`
--

LOCK TABLES `programs` WRITE;
/*!40000 ALTER TABLE `programs` DISABLE KEYS */;
INSERT INTO `programs` VALUES (1,1,3,1,5,3,10,'2022-05-22 13:25:00','2022-05-25 09:00:00','2022-05-26 01:00:00','2022-05-31 09:00:00','รูปแบบออนไลน์',1,'2022-05-22 13:25:05','2022-05-22 13:49:06'),(2,2,2,1,3,2,10,'2022-05-22 13:25:00','2022-05-25 13:20:00','2022-05-27 13:20:00','2022-05-29 13:20:00','รูปแบบออนไลน์',1,'2022-05-22 13:25:29','2022-05-22 13:45:49'),(3,3,1,2,1,0,0,'2022-05-23 08:26:00','2022-05-23 08:26:00','2022-05-23 08:26:00','2022-05-23 08:26:00','รูปแบบออนไลน์',1,'2022-05-23 08:25:11','2022-05-24 12:21:12'),(4,4,3,2,2,2,10,'2022-04-20 13:13:00','2022-05-25 13:01:00','2022-05-26 13:01:00','2022-05-27 13:01:00','รูปแบบออนไลน์',1,'2022-05-24 13:02:51','2022-05-31 13:34:50'),(5,5,1,1,3,2,20,'2022-05-30 14:45:00','2022-06-01 14:41:00','2022-06-03 14:41:00','2022-06-05 14:41:00','รูปแบบออนไลน์',0,'2022-05-30 14:45:23','2022-05-30 15:03:34'),(6,5,2,1,3,2,20,'2022-05-30 14:49:00','2022-06-01 14:41:00','2022-06-03 14:41:00','2022-06-05 14:41:00','รูปแบบออนไลน์',0,'2022-05-30 14:47:41','2022-05-30 15:03:55'),(7,6,3,2,2,0,10,'2022-06-01 09:00:00','2022-06-10 09:00:00','2022-06-11 09:00:00','2022-06-12 09:00:00','รูปแบบออนไลน์',0,'2022-06-01 06:29:30','2022-06-01 06:29:30'),(8,7,1,2,2,0,10,'2022-06-01 11:00:00','2022-06-02 11:00:00','2022-06-03 01:00:00','2022-06-04 01:00:00','รูปแบบออนไลน์',0,'2022-06-01 06:32:30','2022-06-01 06:32:30'),(9,8,3,2,2,0,10,'2022-06-01 11:00:00','2022-06-02 11:00:00','2022-06-03 01:00:00','2022-06-04 01:00:00','รูปแบบออนไลน์',0,'2022-06-01 06:35:29','2022-06-01 06:35:29');
/*!40000 ALTER TABLE `programs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `schools`
--

DROP TABLE IF EXISTS `schools`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `schools` (
  `school_id` int(11) NOT NULL AUTO_INCREMENT,
  `school_type` tinyint(1) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_thai_520_w2 NOT NULL,
  `address` varchar(255) NOT NULL,
  `sub_district` varchar(255) NOT NULL,
  `district` varchar(255) NOT NULL,
  `province` varchar(255) NOT NULL,
  `postcode` char(5) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`school_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `schools`
--

LOCK TABLES `schools` WRITE;
/*!40000 ALTER TABLE `schools` DISABLE KEYS */;
INSERT INTO `schools` VALUES (1,1,'โรงเรียนทุ่งฝนวิทยาคาร','156/6','ตำบลทุ่งฝน','อำเภอทุ่งฝน','จังหวัดอุดรธานี','41310','2022-05-22 13:32:10','2022-05-22 13:32:10'),(2,0,'บุคคลทั่วไป','-','-','-','-','-','2022-05-22 13:36:23','2022-05-22 13:36:23'),(3,1,'โรงเรียนวังสามหมอวิทยาคาร','88 หมู่ 13','ตำบลวังสามหมอ','อำเภอวังสามหมอ','จังหวัดอุดรธานี','41280','2022-05-22 13:37:14','2022-05-22 13:37:14'),(4,1,'โรงเรียนอุดรพิทยานุกูล','77 ถนนศรีสุข ซอย ๔','ตำบลหมากแข้ง','อำเภอเมืองอุดรธานี','จังหวัดอุดรธานี','41000','2022-05-24 12:39:56','2022-05-24 12:39:56');
/*!40000 ALTER TABLE `schools` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sites`
--

DROP TABLE IF EXISTS `sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sites` (
  `site_id` int(11) NOT NULL AUTO_INCREMENT,
  `site_title` varchar(255) NOT NULL,
  `site_header` varchar(255) NOT NULL,
  `site_banner` varchar(255) NOT NULL,
  `site_footer` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`site_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sites`
--

LOCK TABLES `sites` WRITE;
/*!40000 ALTER TABLE `sites` DISABLE KEYS */;
INSERT INTO `sites` VALUES (1,'สัปดาห์วิทยาศาสตร์แห่งชาติส่วนภูมิภาค ประจำปี 2565 คณะวิทยาศาสตร์ มหาวิทยาลัยราชภัฏอุดรธานี','กิจกรรมสัปดาห์วิทยาศาสตร์แห่งชาติ ส่วนภูมิภาค','1653212443173_banner_web_moocUDRU_1600x470px-01.jpg','คณะวิทยาศาสตร์ มหาวิทยาลัยราชภัฏอุดรธานี สามพร้าว','2022-05-22 09:40:43','2022-05-22 09:40:43');
/*!40000 ALTER TABLE `sites` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-02 16:27:54
