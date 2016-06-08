-- MySQL dump 10.13  Distrib 5.7.9, for osx10.9 (x86_64)
--
-- Host: localhost    Database: chatit
-- ------------------------------------------------------
-- Server version	5.7.12

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
-- Table structure for table `AccountInfo`
--

DROP TABLE IF EXISTS `AccountInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `AccountInfo` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) NOT NULL,
  `passwd` varchar(50) NOT NULL,
  `email_addr` varchar(50) NOT NULL,
  `photo` varchar(50) DEFAULT NULL,
  `motto` varchar(50) DEFAULT NULL,
  `age` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name` (`user_name`),
  UNIQUE KEY `email_addr` (`email_addr`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccountInfo`
--

LOCK TABLES `AccountInfo` WRITE;
/*!40000 ALTER TABLE `AccountInfo` DISABLE KEYS */;
INSERT INTO `AccountInfo` VALUES (9,'陆宽95123','3130100659lucas','lucas95123@outlook.com','/avatar/9','好强啊',21),(10,'赵冠淳124','123456','3130100673@zju.edu.cn','/avatar/10','詹姆斯是全世界最差的球员',21),(11,'许洋sbsb','123456','xy123456@outlook.com','/avatar/11','磨叽磨叽',21),(12,'镇海开车123','123456','zhzh@123.com','/avatar/12','我就是喝不醉',21),(13,'陈喆12345','123456','cz@123.com','/avatar/13','我喜欢尾劭',21);
/*!40000 ALTER TABLE `AccountInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `FriendInfo`
--

DROP TABLE IF EXISTS `FriendInfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `FriendInfo` (
  `user_id` int(11) NOT NULL,
  `friend_id` int(11) NOT NULL,
  `tag` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`user_id`,`friend_id`),
  KEY `friend_id` (`friend_id`),
  CONSTRAINT `friendinfo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `AccountInfo` (`user_id`),
  CONSTRAINT `friendinfo_ibfk_2` FOREIGN KEY (`friend_id`) REFERENCES `AccountInfo` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `FriendInfo`
--

LOCK TABLES `FriendInfo` WRITE;
/*!40000 ALTER TABLE `FriendInfo` DISABLE KEYS */;
INSERT INTO `FriendInfo` VALUES (9,10,'1070'),(9,11,'持久型眼泪坦克'),(9,12,'持久型眼泪坦克'),(9,13,'1070'),(10,9,'上帝'),(10,11,'未分组'),(10,13,'未分组'),(11,9,'未分组'),(11,10,'未分组'),(11,12,'未分组'),(12,9,'未分组'),(12,11,'未分组'),(13,9,'未分组'),(13,10,'未分组');
/*!40000 ALTER TABLE `FriendInfo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OfflineMessage`
--

DROP TABLE IF EXISTS `OfflineMessage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `OfflineMessage` (
  `user_id` int(11) NOT NULL,
  `target_id` int(11) NOT NULL,
  `message` text NOT NULL,
  `time_stamp` datetime NOT NULL,
  KEY `user_id` (`user_id`),
  KEY `target_id` (`target_id`),
  CONSTRAINT `offlinemessage_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `AccountInfo` (`user_id`),
  CONSTRAINT `offlinemessage_ibfk_2` FOREIGN KEY (`target_id`) REFERENCES `AccountInfo` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OfflineMessage`
--

LOCK TABLES `OfflineMessage` WRITE;
/*!40000 ALTER TABLE `OfflineMessage` DISABLE KEYS */;
/*!40000 ALTER TABLE `OfflineMessage` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-06-08  0:32:01
