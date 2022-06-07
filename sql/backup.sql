-- MySQL dump 10.13  Distrib 8.0.29, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: production
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `production`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `production` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `production`;

--
-- Table structure for table `event_admins`
--

DROP TABLE IF EXISTS `event_admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_admins` (
  `admin_id` varchar(36) NOT NULL,
  `event_id` varchar(36) NOT NULL,
  PRIMARY KEY (`admin_id`,`event_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `event_admins_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `users` (`user_name`) ON DELETE CASCADE,
  CONSTRAINT `event_admins_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_admins`
--

LOCK TABLES `event_admins` WRITE;
/*!40000 ALTER TABLE `event_admins` DISABLE KEYS */;
INSERT INTO `event_admins` VALUES ('Neil','1111111'),('Seamus','1111111'),('Will','1111111'),('Neil','1111112'),('Harrison','1111113'),('thomas','1111113'),('Will','1111113');
/*!40000 ALTER TABLE `event_admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_invitees`
--

DROP TABLE IF EXISTS `event_invitees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_invitees` (
  `invitee_id` varchar(36) NOT NULL,
  `event_id` varchar(36) NOT NULL,
  `attending_status` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`invitee_id`,`event_id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `event_invitees_ibfk_1` FOREIGN KEY (`invitee_id`) REFERENCES `users` (`user_name`) ON DELETE CASCADE,
  CONSTRAINT `event_invitees_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_invitees`
--

LOCK TABLES `event_invitees` WRITE;
/*!40000 ALTER TABLE `event_invitees` DISABLE KEYS */;
INSERT INTO `event_invitees` VALUES ('54832645-44dc-4510-b818-2fc1dab04a2d','1111111','Unsure'),('Harrison','1111111','Unsure'),('Harrison','1111112','Unsure'),('Harrison','1111113','Unsure'),('Neil','1111111','Going'),('Neil','1111113','Going'),('Seamus','1111111','Not Going'),('Seamus','1111112','Not Going'),('Seamus','1111113','Not Going'),('thomas','1111111','Not Going'),('Thomas','1111113','Unsure'),('will','1111111','Going'),('Will','1111112','Going'),('Will','1111113','Going');
/*!40000 ALTER TABLE `event_invitees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `event_id` varchar(36) NOT NULL,
  `event_title` varchar(32) DEFAULT NULL,
  `event_date` varchar(50) DEFAULT NULL,
  `event_time` varchar(255) DEFAULT NULL,
  `event_image` varchar(500) DEFAULT NULL,
  `event_address` varchar(255) DEFAULT NULL,
  `event_description` varchar(255) DEFAULT NULL,
  `finalised` tinyint NOT NULL,
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES ('1111111','Wills 20th Birthday','2022-06-21','18:30','test.jpg','60th fourth avenue St. Peters','Come party with Will \n:)',0),('1111112','Neil 20th Birthday','2022-06-23','20:00','barbeque.jpg','60th fourth avenue St. Peters','Lets party like kings for my 20th birthday',0),('1111113','Poker Night','2022-07-23','20:00','poker.jpg','60th fourth avenue St. Peters','Test your lucky stars tonight and win big at poker night',0);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `requester` varchar(36) NOT NULL,
  `requestee` varchar(36) NOT NULL,
  `request_date` date DEFAULT NULL,
  `friendship_start_date` date DEFAULT NULL,
  PRIMARY KEY (`requester`,`requestee`),
  KEY `requestee` (`requestee`),
  CONSTRAINT `friends_ibfk_1` FOREIGN KEY (`requester`) REFERENCES `users` (`user_name`) ON DELETE CASCADE,
  CONSTRAINT `friends_ibfk_2` FOREIGN KEY (`requestee`) REFERENCES `users` (`user_name`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES ('Harrison','Seamus','2022-05-23',NULL),('Harrison','Will','2022-05-23','2022-05-23'),('Neil','Will','2022-05-23','2022-05-23'),('will','Seamus','2022-06-07',NULL);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unavailabilities`
--

DROP TABLE IF EXISTS `unavailabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `unavailabilities` (
  `unavailability_id` varchar(36) NOT NULL,
  `unavailable_from` datetime DEFAULT NULL,
  `unavailable_to` datetime DEFAULT NULL,
  `reason` varchar(64) DEFAULT NULL,
  `user` varchar(36) DEFAULT NULL,
  `event_id` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`unavailability_id`),
  KEY `user` (`user`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `unavailabilities_ibfk_1` FOREIGN KEY (`user`) REFERENCES `users` (`user_name`) ON DELETE CASCADE,
  CONSTRAINT `unavailabilities_ibfk_2` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unavailabilities`
--

LOCK TABLES `unavailabilities` WRITE;
/*!40000 ALTER TABLE `unavailabilities` DISABLE KEYS */;
INSERT INTO `unavailabilities` VALUES ('22222221','2022-06-23 18:00:00','2022-06-24 18:00:00','clashes with another event','Seamus','1111112'),('22222222','2022-05-23 18:00:00','2022-05-24 18:00:00','clashes with another event','Neil','1111113'),('22222223','2022-06-21 18:30:00','2022-06-21 19:40:00','TEST','neil',NULL),('2d21dd90-69b8-454b-ad66-583c9fea1358','2022-06-21 18:30:00','2022-06-21 19:30:00','clash','Neil',NULL),('3afe8e4d-babb-4f0a-ae7e-6dfc7754c32d','2022-06-20 18:30:00','2022-06-20 19:30:00','clashing','Neil',NULL),('61def84f-2f8f-4ac5-9d68-df9dce2382c2','2022-05-31 09:00:00','2022-05-31 11:00:00','Testing','will',NULL),('bdcca053-971f-47d2-b2fb-2a7b5a7b70d1','2022-05-23 10:00:00','2022-05-23 11:00:00','Party','will',NULL),('d6d6d04e-f5b1-401f-8921-c14401d72f37','2022-05-01 09:00:00','2022-05-01 11:00:00','Poker','will',NULL);
/*!40000 ALTER TABLE `unavailabilities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_email_settings`
--

DROP TABLE IF EXISTS `user_email_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_email_settings` (
  `user_name` varchar(36) NOT NULL,
  `setting_name` varchar(36) NOT NULL,
  `setting_state` tinyint NOT NULL,
  PRIMARY KEY (`user_name`,`setting_name`),
  CONSTRAINT `user_email_settings_ibfk_1` FOREIGN KEY (`user_name`) REFERENCES `users` (`user_name`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_email_settings`
--

LOCK TABLES `user_email_settings` WRITE;
/*!40000 ALTER TABLE `user_email_settings` DISABLE KEYS */;
INSERT INTO `user_email_settings` VALUES ('harrison','response',1),('neil','cancel',1),('thomas','finalise',0),('will','cancel',1),('will','finalise',1),('will','response',1);
/*!40000 ALTER TABLE `user_email_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_name` varchar(36) NOT NULL,
  `first_name` varchar(32) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('<b>test</b>','test','test','test','90a3ed9e32b2aaf4c61c410eb925426119e1a9dc53d4286ade99a809'),('<img src=\'test\' onerror=\'alert(1)\'>','testing','asdf','test','90a3ed9e32b2aaf4c61c410eb925426119e1a9dc53d4286ade99a809'),('54832645-44dc-4510-b818-2fc1dab04a2d','Johnathon','Doe',NULL,NULL),('Harrison','Harrison','Stokes','hazzaj467@gmail.com','af8325db585ac1d3a50c30462cffd07060bb13418435ad0f45fddedc'),('Humshikan','Humshikan','Gill','Hgill@gmail.com','6ebe25963c6462d67789bc2d6000bbfe6dcbe5c9941270e0b6ee5180'),('Neil','Neil','Mazumdar','neil.k.mazumdar@gmail.com','e964ebb08f8642e0be7be7418847be96114f401b8e64578ceba8e996'),('Seamus','Seamus','Pitcher','SPitcher@gmail.com','75fdb030ad83f58f3fba1f1ce52f077c50a85170fb829bd4d2ddf472'),('Thomas','Thomas','Foo','tfue@gmail.com','45b24c8a95d54ecc7d42ac6be9ea9f7f069e2930ee2d17c23adfd25e'),('will','Will','Davis','willdavis925@gmail.com','58acb7acccce58ffa8b953b12b5a7702bd42dae441c1ad85057fa70b');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-07 14:53:34
