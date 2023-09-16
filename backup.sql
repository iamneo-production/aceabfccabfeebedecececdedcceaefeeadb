-- MariaDB dump 10.19  Distrib 10.5.18-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: appdb
-- ------------------------------------------------------
-- Server version	5.6.51

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `appdb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `appdb` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `appdb`;

--
-- Table structure for table `admission_model`
--

DROP TABLE IF EXISTS `admission_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admission_model` (
  `admission_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_id` int(11) NOT NULL,
  `institute_id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `student_student_id` int(11) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`admission_id`),
  KEY `FK2c6jvxmy3xe4pbl0ypnyyl8ti` (`student_student_id`),
  KEY `FKjc47rtehnd1b1tsuqwdbx7bi8` (`user_id`),
  CONSTRAINT `FK2c6jvxmy3xe4pbl0ypnyyl8ti` FOREIGN KEY (`student_student_id`) REFERENCES `student_model` (`student_id`),
  CONSTRAINT `FKjc47rtehnd1b1tsuqwdbx7bi8` FOREIGN KEY (`user_id`) REFERENCES `user_model` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admission_model`
--

LOCK TABLES `admission_model` WRITE;
/*!40000 ALTER TABLE `admission_model` DISABLE KEYS */;
INSERT INTO `admission_model` VALUES (1,8,3,'enrolled',NULL,4,4),(3,13,3,'enrolled',NULL,4,4),(4,19,4,'enrolled',NULL,12,12),(5,2,2,'enrolled',NULL,12,12),(10,6,1,'enrolled',NULL,1,1),(12,11,1,'enrolled',NULL,3,3);
/*!40000 ALTER TABLE `admission_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `course_model`
--

DROP TABLE IF EXISTS `course_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `course_model` (
  `course_id` int(11) NOT NULL AUTO_INCREMENT,
  `course_description` varchar(255) DEFAULT NULL,
  `course_duration` int(11) NOT NULL,
  `course_name` varchar(255) DEFAULT NULL,
  `institute_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`course_id`),
  KEY `FK2g05ijdf25ccdydo2elx8prva` (`institute_id`),
  CONSTRAINT `FK2g05ijdf25ccdydo2elx8prva` FOREIGN KEY (`institute_id`) REFERENCES `institute_model` (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `course_model`
--

LOCK TABLES `course_model` WRITE;
/*!40000 ALTER TABLE `course_model` DISABLE KEYS */;
INSERT INTO `course_model` VALUES (1,'Study of mechanical systems and machines.',2,'Masters in Mechanical Engine',1),(3,'Exploration of literary works and analysis.',2,'Masters in English Literature',3),(4,'Solutions for environmental challenges.',2,'Masters in Environmental Engineering',4),(5,'Study of historical events and eras.',2,'Masters in History',5),(6,'Strategies and techniques in marketing.',2,'Masters in Marketing',1),(7,'Advanced physics principles and experiments.',2,'Masters in Physics',2),(8,'Study of society and human behavior.',2,'Masters in Sociology',3),(9,'Advanced mathematical concepts and theories.',2,'Masters in Mathematics',4),(10,'Exploration of music theory and composition.',2,'Masters in Music',5),(11,'Study of political systems and theories.',2,'Masters in Political Science',1),(12,'Exploration of Earth\'s geological processes.',2,'Masters in Geology',2),(13,'Study of human societies and cultures.',2,'Masters in Anthropology',3),(14,'Advanced economic principles and policies.',2,'Masters in Economics',4),(15,'Exploration of visual and performing arts.',2,'Masters in Fine Arts',5),(16,'Study of nutrition and its impact on health.',2,'Masters in Nutrition Science',1),(17,'Design and development of aircraft and spacecraft.',2,'Masters in Aerospace Engineering',2),(18,'Design and construction of buildings and structures.',2,'Masters in Architecture',3),(19,'Advanced studies in robotics and automation.',2,'Masters in Robotics',4),(20,'A comprehensive program in computer science.',2,'Masters in Computer Science',5),(26,'d1',6,'New Course 8',22);
/*!40000 ALTER TABLE `course_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `institute_model`
--

DROP TABLE IF EXISTS `institute_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `institute_model` (
  `institute_id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `imageurl` varchar(255) DEFAULT NULL,
  `institute_address` varchar(255) DEFAULT NULL,
  `institute_description` varchar(255) DEFAULT NULL,
  `institute_name` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `star_rating` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`institute_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `institute_model`
--

LOCK TABLES `institute_model` WRITE;
/*!40000 ALTER TABLE `institute_model` DISABLE KEYS */;
INSERT INTO `institute_model` VALUES (1,'admin@stanfordUniversity.edu','https://www.stanford.edu/wp-content/uploads/2022/04/Arts-District.jpg','Stanford, CA','Description for Stanford University','Stanford University','(650) 723-2091','4.5'),(2,'info@university.edu','https://images.shiksha.com/mediadata/images/1535018303phpgh5hHQ_g.jpg','Houston, TX','Description for University of Houston','University of Houston','987-654-3210','4'),(3,'mit@mit.edu','https://news.mit.edu/sites/default/files/styles/news_article__image_gallery/public/images/202206/EmilyDahl22-CampusAerial_0.jpg?itok=KsGRpFWG','Cambridge, MA','Description for Mit','MIT','555-555-5555','4'),(4,'info@vit.ac.in','https://imgs.search.brave.com/eZjlnAO5CbvKT_QbKt54MqpJGUDZag6Y2hAS5bUs6xI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly92aXQu/YWMuaW4vc2l0ZXMv/YWxsL3RoZW1lcy92/aXR0aGVtZS9pbWFn/ZXMvaG9zdGVsLWlt/Zy53ZWJw','Vellore, India','Description for Card 4','VIT','999-888-7777','4.2'),(5,'contact@srmuniv.ac.in','https://www.edufever.com/wp-content/uploads/2022/04/SRM-University-Kattankulathur-jpg-webp.webp','Chennai, India','Description for Card 5','SRM','777-888-9999','4.6'),(9,'info@yale.edu','https://admissions.yale.edu/sites/default/files/styles/flexslider_full/public/2010_05_10_19_03_37_central_campus_1.jpg?itok=1hVNjje6','New Haven, CT','Description for Yale University','Yale University','555-555-5556','4.6'),(10,'contact@berkeley.admin','https://www.tclf.org/sites/default/files/styles/full_width/public/thumbnails/image/CA_Berkeley_UniversityOfCaliforniaAtBerkeley_byCharlieNguyen-Flickr_2008_001_Sig.jpg?itok=xj9PXLbL','Berkeley, CA','Description for UC Berkeley','University of California, Berkeley','999-888-7777','4.4'),(18,'vit.ac.in','https://imgs.search.brave.com/eZjlnAO5CbvKT_QbKt54MqpJGUDZag6Y2hAS5bUs6xI/rs:fit:500:0:0/g:ce/aHR0cHM6Ly92aXQu/YWMuaW4vc2l0ZXMv/YWxsL3RoZW1lcy92/aXR0aGVtZS9pbWFn/ZXMvaG9zdGVsLWlt/Zy53ZWJw','Vellore','Uni','Vellore Institute of Technology ','1234567890','2'),(21,'Dummy@emai.com','https://www.stanford.edu/wp-content/uploads/2022/04/Arts-District.jpg','Dummy institute','Dummy institute','Dummy institute','1234567890','4'),(22,'rachna@gmail.COM','https://www.tclf.org/sites/default/files/styles/full_width/public/thumbnails/image/CA_Berkeley_UniversityOfCaliforniaAtBerkeley_byCharlieNguyen-Flickr_2008_001_Sig.jpg?itok=xj9PXLbL','rachana ins','rachana ins','rachana ins','mob','2');
/*!40000 ALTER TABLE `institute_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_model`
--

DROP TABLE IF EXISTS `student_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `student_model` (
  `student_id` int(11) NOT NULL AUTO_INCREMENT,
  `diploma` int(11) NOT NULL,
  `hsc` int(11) NOT NULL,
  `sslc` int(11) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `eligibility` varchar(255) DEFAULT NULL,
  `mobile` varchar(255) DEFAULT NULL,
  `studentdob` date DEFAULT NULL,
  `student_name` varchar(255) DEFAULT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`student_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_model`
--

LOCK TABLES `student_model` WRITE;
/*!40000 ALTER TABLE `student_model` DISABLE KEYS */;
INSERT INTO `student_model` VALUES (1,140,120,100,'add','Eligible','231434134','2023-08-29','Shiv Sai Indrakanti',1),(2,6999,99,72,'add2','Eligible','9989071668','2023-09-19','stu2z',2),(3,999999,22,11,'a1','Eligible','99','2023-09-30','u1',3),(4,6999,11,100,'ad4','Eligible','1234567890','2023-10-03','Stu4',4),(5,6999,100,100,'sdfghjkl;','Eligible','9989071668','2023-09-13','Shiv Sai Indrakanti',12);
/*!40000 ALTER TABLE `student_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_model`
--

DROP TABLE IF EXISTS `user_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_model` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mobile_number` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `user_role` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_model`
--

LOCK TABLES `user_model` WRITE;
/*!40000 ALTER TABLE `user_model` DISABLE KEYS */;
INSERT INTO `user_model` VALUES (1,'user1@gmail.com','1234567891','user1','user','user1'),(2,'user2@gmail.com','1234567891','user2','user','user2'),(3,'user3@gmail.com','1234567891','user3','user','user3'),(4,'user4@gmail.com','1234567891','user4','user','user4'),(5,'user5@gmail.com','1234567891','user5','user','user5'),(6,'user6@gmail.com','1234567891','user6','user','user6'),(7,'user7@gmail.com','1234567891','user7','user','user7'),(8,'admin1@gmail.com','1234567891','admin1','admin','admin1'),(9,'admin2@gmail.com','1234567891','admin2','admin','admin2'),(10,'admin3@gmail.com','1234567891','admin3','admin','admin3'),(11,'admin4@gmail.com','1234567890','admin3','admin','admin4'),(12,'shivsaii@virtusa.com','8247057536','pwd','user','Shiv Sai Indrakanti');
/*!40000 ALTER TABLE `user_model` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-16 18:16:11
