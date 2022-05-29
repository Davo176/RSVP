-- MySQL dump 10.13  Distrib 8.0.28, for Linux (x86_64)
--
-- Host: 127.0.0.1    Database: production
-- ------------------------------------------------------
-- Server version	8.0.28-0ubuntu0.20.04.3

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
INSERT INTO `event_admins` VALUES ('Will','1111111'),('Neil','1111112'),('Harrison','1111113'),('thomas','1111113'),('Will','1111113');
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
INSERT INTO `event_invitees` VALUES ('Harrison','1111111','unsure'),('Harrison','1111112','unsure'),('Neil','1111111','going'),('Neil','1111113','going'),('Seamus','1111111','not going'),('Seamus','1111112','not going'),('Seamus','1111113','not going'),('thomas','1111111','not going'),('Will','1111112','going'),('Will','1111113','Going');
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
  PRIMARY KEY (`event_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES ('1111111','Wills 20th Birthday','21/06/2022','7:00pm','test.jpg','60th fourth avenue St. Peters',NULL),('1111112','Neil 20th Birthday','23/06/2022','7:00pm','test.jpg','60th fourth avenue St. Peters','Lets party like kings for my 20th birthday'),('1111113','Poker Night','23/07/2022','8:00pm','test.jpg','60th fourth avenue St. Peters','Test your lucky stars tonight and win big at poker night');
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
INSERT INTO `friends` VALUES ('Harrison','Seamus','2022-05-23',NULL),('Harrison','Will','2022-05-23','2022-05-23'),('Neil','Will','2022-05-23','2022-05-23');
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
INSERT INTO `unavailabilities` VALUES ('22222221','2022-06-23 18:00:00','2022-06-24 18:00:00','clashes with another event','Seamus','1111112'),('22222222','2022-05-23 18:00:00','2022-05-24 18:00:00','clashes with another event','Neil','1111113'),('61def84f-2f8f-4ac5-9d68-df9dce2382c2','2022-05-31 09:00:00','2022-05-31 11:00:00','Testing','will',NULL),('bdcca053-971f-47d2-b2fb-2a7b5a7b70d1','2022-05-23 10:00:00','2022-05-23 11:00:00','Party','will',NULL),('d6d6d04e-f5b1-401f-8921-c14401d72f37','2022-05-01 09:00:00','2022-05-01 11:00:00','Poker','will',NULL);
/*!40000 ALTER TABLE `unavailabilities` ENABLE KEYS */;
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
INSERT INTO `users` VALUES ('Harrison','Harrison','Stokes','hazzaj467@gmail.com','pale'),('Humshikan','Humshikan','Gill','Hgill@gmail.com','hummus22'),('Neil','Neil','Mazumdar','neil.k.mazumdar@gmail.com','curry'),('Seamus','Seamus','Pitcher','SPitcher@gmail.com','besttrim'),('Thomas','Thomas','Foo','tfue@gmail.com','fooey2002'),('will','will','davis','willdavis925@gmail.com','admin');
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

-- Dump completed on 2022-05-28 11:26:20