-- MySQL dump 10.13  Distrib 8.0.20, for Win64 (x86_64)
--
-- Host: awa-production.cz9wipecz1cg.ap-southeast-1.rds.amazonaws.com    Database: virtual_legal_clinic
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `meetingTable`
--

DROP TABLE IF EXISTS `meetingTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meetingTable` (
  `meetingId` varchar(45) NOT NULL,
  `slotId` varchar(45) DEFAULT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime DEFAULT NULL,
  `lawyerId` varchar(10) DEFAULT NULL,
  `lawyerName` varchar(255) DEFAULT NULL,
  `applicantId` varchar(10) NOT NULL,
  `applicantName` varchar(255) DEFAULT NULL,
  `meetingLink` varchar(255) DEFAULT NULL,
  `taxonomy` varchar(100) DEFAULT NULL,
  `partyName` varchar(100) DEFAULT NULL,
  `relationship` varchar(100) DEFAULT NULL,
  `facts` varchar(1000) DEFAULT NULL,
  `questions` varchar(1000) DEFAULT NULL,
  `status` enum('PENDING','CONFIRMED','ONGOING','COMPLETED') DEFAULT NULL,
  PRIMARY KEY (`meetingId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `timeslotTable`
--

DROP TABLE IF EXISTS `timeslotTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `timeslotTable` (
  `timeslotId` varchar(20) NOT NULL,
  `slotDate` date DEFAULT NULL,
  `slotStart` time DEFAULT NULL,
  `slotEnd` time DEFAULT NULL,
  `slotNumber` int DEFAULT NULL,
  `lawyerId` varchar(10) DEFAULT NULL,
  `lawyerName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`timeslotId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `userTable`
--

DROP TABLE IF EXISTS `userTable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userTable` (
  `userid` varchar(10) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `role` enum('LAWYER','APPLICANT','ADMIN') DEFAULT NULL,
  `expertise` varchar(255) DEFAULT NULL,
  `isOnboarded` tinyint NOT NULL,
  `onboardingStage` int NOT NULL,
  `dob` varchar(45) DEFAULT NULL,
  `occupation` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `userid_UNIQUE` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-04 11:05:36
