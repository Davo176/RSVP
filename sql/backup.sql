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
INSERT INTO `event_admins` VALUES ('WDCRSVP6978','1b4207bb-4f7c-4cc6-a233-75c23ad46f73'),('WDCRSVP6978','44e3f0b1-0489-4e90-9711-86a5e0ec331a'),('Neil','6270445c-2f9a-41c6-80db-74771dd7eae2'),('Will','6270445c-2f9a-41c6-80db-74771dd7eae2'),('Harrison','8e5806ae-2360-44e0-b0ca-674e83733ab3'),('Will','8e5806ae-2360-44e0-b0ca-674e83733ab3'),('Seamus','99aab1f2-dbef-401e-b2a0-43e89cdeb60f'),('WDCRSVP6978','9d0146e4-108f-4a2d-9f68-ad85b0d835c3'),('Will','a4530556-cd68-4598-bdef-6c523a79b826'),('Seamus','b964b3b1-aab0-437c-bc1a-67fac48ab0da'),('Will','cf83ea49-4114-4897-9fd3-807929fb52d5');
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
INSERT INTO `event_invitees` VALUES ('Bugs','44e3f0b1-0489-4e90-9711-86a5e0ec331a','Unsure'),('Daffy','1b4207bb-4f7c-4cc6-a233-75c23ad46f73','Unsure'),('Daffy','44e3f0b1-0489-4e90-9711-86a5e0ec331a','Unsure'),('Daffy','cf83ea49-4114-4897-9fd3-807929fb52d5','Unsure'),('Harrison','1b4207bb-4f7c-4cc6-a233-75c23ad46f73','Unsure'),('Harrison','8e5806ae-2360-44e0-b0ca-674e83733ab3','Unsure'),('Harrison','9d0146e4-108f-4a2d-9f68-ad85b0d835c3','Unsure'),('Harrison','cf83ea49-4114-4897-9fd3-807929fb52d5','Unsure'),('MeepMeep','cf83ea49-4114-4897-9fd3-807929fb52d5','Unsure'),('Neil','1b4207bb-4f7c-4cc6-a233-75c23ad46f73','Unsure'),('Neil','6270445c-2f9a-41c6-80db-74771dd7eae2','Unsure'),('Neil','9d0146e4-108f-4a2d-9f68-ad85b0d835c3','Unsure'),('Neil','cf83ea49-4114-4897-9fd3-807929fb52d5','Unsure'),('Porky','1b4207bb-4f7c-4cc6-a233-75c23ad46f73','Unsure'),('Porky','44e3f0b1-0489-4e90-9711-86a5e0ec331a','Unsure'),('Porky','cf83ea49-4114-4897-9fd3-807929fb52d5','Unsure'),('Seamus','99aab1f2-dbef-401e-b2a0-43e89cdeb60f','Unsure'),('Seamus','9d0146e4-108f-4a2d-9f68-ad85b0d835c3','Unsure'),('Seamus','b964b3b1-aab0-437c-bc1a-67fac48ab0da','Unsure'),('WDCRSVP6978','1b4207bb-4f7c-4cc6-a233-75c23ad46f73','Unsure'),('WDCRSVP6978','44e3f0b1-0489-4e90-9711-86a5e0ec331a','Unsure'),('WDCRSVP6978','6270445c-2f9a-41c6-80db-74771dd7eae2','Unsure'),('WDCRSVP6978','8e5806ae-2360-44e0-b0ca-674e83733ab3','Unsure'),('WDCRSVP6978','99aab1f2-dbef-401e-b2a0-43e89cdeb60f','Unsure'),('WDCRSVP6978','9d0146e4-108f-4a2d-9f68-ad85b0d835c3','Unsure'),('WDCRSVP6978','b964b3b1-aab0-437c-bc1a-67fac48ab0da','Unsure'),('WDCRSVP6978','cf83ea49-4114-4897-9fd3-807929fb52d5','Unsure'),('Will','44e3f0b1-0489-4e90-9711-86a5e0ec331a','Unsure'),('Will','6270445c-2f9a-41c6-80db-74771dd7eae2','Unsure'),('Will','8e5806ae-2360-44e0-b0ca-674e83733ab3','Unsure'),('Will','99aab1f2-dbef-401e-b2a0-43e89cdeb60f','Unsure'),('Will','9d0146e4-108f-4a2d-9f68-ad85b0d835c3','Unsure'),('Will','a4530556-cd68-4598-bdef-6c523a79b826','Unsure'),('Will','b964b3b1-aab0-437c-bc1a-67fac48ab0da','Unsure'),('Will','cf83ea49-4114-4897-9fd3-807929fb52d5','Unsure');
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
INSERT INTO `events` VALUES ('1b4207bb-4f7c-4cc6-a233-75c23ad46f73','Test Deleting This Event','2022-06-03','05:00','test.jpg','Middle of Knowhere','Test Editing and Deleting this event. Maybe you set the wrong date, or time, or made a spelling mistake',0),('44e3f0b1-0489-4e90-9711-86a5e0ec331a','Poker Night','2022-07-05','21:00','d34f8979-159c-4490-bb90-f14b671aed1f.jpeg','221B Baker St., London','$100 buy ins, winner takes all.',0),('6270445c-2f9a-41c6-80db-74771dd7eae2','End of WDC','2022-07-19','11:00','edc49a3a-800d-43c3-9f30-93b39c8229b7.jpg','Ingkarni Wardli','Teachers and Students get together to bid WDC Fairwell!',0),('8e5806ae-2360-44e0-b0ca-674e83733ab3','Submit Final Project','2022-06-10','23:50','c5203b3b-1006-4510-b0ac-09727daf08d3.jpg','Ingkarni Wardli','Make sure the assignment is submitted by now!',0),('99aab1f2-dbef-401e-b2a0-43e89cdeb60f','Chirstmas in July Party','2022-07-25','12:00','df08c34a-b99b-448e-b45a-d0d69101b58e.jpg','62 West Wallaby Street','Have a jolly christmas with us!',0),('9d0146e4-108f-4a2d-9f68-ad85b0d835c3','Mark our Project','2022-06-20','15:00','673e0e3b-51a3-42c8-b6db-fc31325f6beb.jpeg','Adelaide University','Explore the Site. See time suggestions',0),('a4530556-cd68-4598-bdef-6c523a79b826','Post Footy Barbeque','2022-06-12','13:30','822d85e7-9dfb-4b6f-950a-f209c826d2ae.jpg','Tusmore Park','Come enjoy a snag and burger after the Adelaide Uni Blacks game',0),('b964b3b1-aab0-437c-bc1a-67fac48ab0da','Crows Grand Final Celebration','2022-09-24','21:00','ea07a473-d1a9-4b4d-9ffe-d43d214d7d5d.jpg','Brunton Ave, Richmond','Come celebrate after the mighty crows pummel reigning premiers melbourne on the last saturday of september',0),('cf83ea49-4114-4897-9fd3-807929fb52d5',"Will\'s Birthday",'2022-06-02','18:00','test.jpg','1600 Pennsylvania Avenue, Washington, D.C., USA','Come celebrate my birthday and meet some famous people',0);
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
INSERT INTO `friends` VALUES ('WDCRSVP6978','Bugs','2022-06-09','2022-06-09'),('WDCRSVP6978','Daffy','2022-06-09','2022-06-09'),('WDCRSVP6978','Harrison','2022-06-09','2022-06-09'),('WDCRSVP6978','MeepMeep','2022-06-09','2022-06-09'),('WDCRSVP6978','Neil','2022-06-09','2022-06-09'),('WDCRSVP6978','Porky','2022-06-09','2022-06-09'),('WDCRSVP6978','Seamus','2022-06-09','2022-06-09'),('WDCRSVP6978','Speedy','2022-06-09','2022-06-09'),('Will','Bugs','2022-06-09','2022-06-09'),('Will','Daffy','2022-06-09','2022-06-09'),('Will','Harrison','2022-06-09','2022-06-09'),('Will','MeepMeep','2022-06-09','2022-06-09'),('Will','Neil','2022-06-09','2022-06-09'),('Will','Porky','2022-06-09','2022-06-09'),('Will','Seamus','2022-06-09','2022-06-09'),('Will','Speedy','2022-06-09','2022-06-09'),('Will','WDCRSVP6978','2022-06-09','2022-06-09');
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
  `origin` varchar(10) DEFAULT NULL,
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
INSERT INTO `unavailabilities` VALUES ('099aebcc-7a3c-4f0b-9994-6ac5f165c90c','2022-06-19 18:00:00','2022-06-19 21:00:00','Crows Game','WDCRSVP6978',NULL,'internal'),('1567adad-104c-4ee6-b62e-e3a08807b93b','2022-06-20 16:30:00','2022-06-20 16:45:00','Dont want to mark','Seamus',NULL,'internal'),('206ad4b0-04f3-4a82-b5a6-6a7f831270da','2022-06-20 17:00:00','2022-06-20 17:31:00','Shouldnt mark my own project','Neil',NULL,'internal'),('48826068-2b21-49aa-a270-057b6389839c','2022-06-18 19:00:00','2022-06-18 21:00:00','Family Dinner','WDCRSVP6978',NULL,'internal'),('4b2ad595-f534-476d-ab6e-1012ceca8d04','2022-06-20 15:00:00','2022-06-20 15:30:00','Partying too hard to mark','Will',NULL,'internal'),('d1867006-dbd9-4263-bf05-4e437486e755','2022-06-10 23:00:00','2022-06-10 23:59:00','Final Submission Due','WDCRSVP6978',NULL,'internal');
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
INSERT INTO `user_email_settings` VALUES ('WDCRSVP6978','cancel',1),('WDCRSVP6978','finalise',1),('WDCRSVP6978','response',1);
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
  `forgotten_password_code` int DEFAULT NULL,
  PRIMARY KEY (`user_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Bugs','Bugs','Bunny','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL),('Daffy','Daffy','Duck','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL),('Harrison','Harrison','Stokes','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL),('MeepMeep','Road','Runner','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL),('Neil','Neil','Mazumdar','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL),('Porky','Porky','Pig','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL),('Seamus','Seamus','Pitcher','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL),('Speedy','Speedy','Gonzalas','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL),('WDCRSVP6978','WDC','RSVP','rsvpwdc@gmail.com',NULL,NULL),('Will','Will','Davis','fakeemail@fakedomain.com','a404481a208031bfcf6c3d3e714d5d0774a892d1e2be9d19f2de0f4c',NULL);
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

-- Dump completed on 2022-06-09 13:14:49
