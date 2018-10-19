-- MySQL dump 10.13  Distrib 5.7.23, for Linux (x86_64)
--
-- Host: localhost    Database: ng-project
-- ------------------------------------------------------
-- Server version	5.7.23-0ubuntu0.16.04.1

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
-- Table structure for table `auth_assignment`
--

DROP TABLE IF EXISTS `auth_assignment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_assignment` (
  `item_name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`item_name`,`user_id`),
  KEY `auth_assignment_user_id_idx` (`user_id`),
  CONSTRAINT `auth_assignment_ibfk_1` FOREIGN KEY (`item_name`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_assignment`
--

LOCK TABLES `auth_assignment` WRITE;
/*!40000 ALTER TABLE `auth_assignment` DISABLE KEYS */;
INSERT INTO `auth_assignment` VALUES ('CUSTOMER','10',1539603203),('CUSTOMER','11',1539603448),('CUSTOMER','12',1539679788),('CUSTOMER','13',1539679858),('CUSTOMER','14',1539679942),('CUSTOMER','15',1539680038),('CUSTOMER','17',1539680431),('CUSTOMER','18',1539680810),('CUSTOMER','20',1539681069),('CUSTOMER','21',1539681201),('CUSTOMER','22',1539681251),('CUSTOMER','5',1539061857),('CUSTOMER','7',1539077631),('SUPERADMIN','1',1537250590);
/*!40000 ALTER TABLE `auth_assignment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_item`
--

DROP TABLE IF EXISTS `auth_item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_item` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `type` smallint(6) NOT NULL,
  `description` text COLLATE utf8_unicode_ci,
  `rule_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `data` blob,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`),
  KEY `rule_name` (`rule_name`),
  KEY `idx-auth_item-type` (`type`),
  CONSTRAINT `auth_item_ibfk_1` FOREIGN KEY (`rule_name`) REFERENCES `auth_rule` (`name`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_item`
--

LOCK TABLES `auth_item` WRITE;
/*!40000 ALTER TABLE `auth_item` DISABLE KEYS */;
INSERT INTO `auth_item` VALUES ('ADMIN',1,'Admin User',NULL,NULL,1537250590,1537250590),('CUSTOMER',1,'Customer',NULL,NULL,1537250590,1537250590),('STAFF',1,'Staff',NULL,NULL,1537250589,1537250589),('SUPERADMIN',1,'Super Admin',NULL,NULL,1537250589,1537250589);
/*!40000 ALTER TABLE `auth_item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_item_child`
--

DROP TABLE IF EXISTS `auth_item_child`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_item_child` (
  `parent` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `child` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`parent`,`child`),
  KEY `child` (`child`),
  CONSTRAINT `auth_item_child_ibfk_1` FOREIGN KEY (`parent`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `auth_item_child_ibfk_2` FOREIGN KEY (`child`) REFERENCES `auth_item` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_item_child`
--

LOCK TABLES `auth_item_child` WRITE;
/*!40000 ALTER TABLE `auth_item_child` DISABLE KEYS */;
INSERT INTO `auth_item_child` VALUES ('SUPERADMIN','ADMIN');
/*!40000 ALTER TABLE `auth_item_child` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_rule`
--

DROP TABLE IF EXISTS `auth_rule`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_rule` (
  `name` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `data` blob,
  `created_at` int(11) DEFAULT NULL,
  `updated_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_rule`
--

LOCK TABLES `auth_rule` WRITE;
/*!40000 ALTER TABLE `auth_rule` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_rule` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration`
--

LOCK TABLES `migration` WRITE;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` VALUES ('m000000_000000_base',1537248446),('m130524_201442_init',1537248454),('m140506_102106_rbac_init',1537250290),('m170907_052038_rbac_add_index_on_auth_assignment_user_id',1537250290);
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile`
--

DROP TABLE IF EXISTS `profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `age` int(11) DEFAULT NULL,
  `image` varchar(150) DEFAULT NULL,
  `gender` enum('female','male','other') DEFAULT NULL,
  `dob` int(15) DEFAULT NULL,
  `address` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  CONSTRAINT `fk_profile_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile`
--

LOCK TABLES `profile` WRITE;
/*!40000 ALTER TABLE `profile` DISABLE KEYS */;
INSERT INTO `profile` VALUES (1,11,45,NULL,'male',1539820800,'tetsdf'),(2,14,NULL,NULL,'male',1536364800,'tester'),(3,7,18,NULL,'male',1539907200,'tester');
/*!40000 ALTER TABLE `profile` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `last_name` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password_reset_token` (`password_reset_token`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Dileep','Amal','5RLNIVUpiHoVXs0BSbtuAUveCgIB1d_T','$2y$13$MC0zGe7lMt62l28ccm.CAeNOesXaBgHFjucIlpfwGZR8EKoA.NjB6','','a@d.com',1,1537250908,1537250908),(5,'pauly','nivin','9EfC1Qlx8jRmYb9jWlCs8AB7dLMmWGo6','$2y$13$KKFyDGdTAhit1yvRILW.5.hR05uXA0XY0x.D4X4.2Je3D2f91z2fe',NULL,'nivin@dmmail.com',1,1539061857,1539075188),(7,'dasppan','monayi','06_ipBYlWlUKFP6RwCikNnz28wztSMMS','$2y$13$8dKvkPSUPgvuBz4d5htws.BdoC1/oSSmigHeuvGWWDL7yUTgRpnFe',NULL,'monayi@dmmail.com',1,1539077631,1539667801),(10,'Ben','Manu','Tg0cC0mVrwa5YJN8QQmxmmADXJaUt5yr','$2y$13$ZN4NsGxTD9DOwQ2EphAF6uSf1iwMccPF51tb7Zndgc0jOE4vOcP1u',NULL,'manuben@dmmail.com',1,1539603203,1539603203),(11,'joseph','dijo','8ulnhORqw__GwA0Jk2jhkPBDlopCSRz6','$2y$13$Sd9Qohq2txCHr.FrulKEleiRGxOrskLQdwkX2RhVzMII54bUPk57m',NULL,'dijo@dmail.com',1,1539603448,1539603448),(12,'fgh','fgh','4q2lmZmvIW2W2EHC2dj-DYxIwmeoqUoS','$2y$13$4cMcuk97sYnPGfxMZN5.1eU02IL.Wkq.6eu8CH.gVAzyIBRo3LMLq',NULL,'fgh@d.com',1,1539679788,1539679788),(13,'dfgdfg','dsfgdfg','ybVeoJv5Mof2JzxRPht5sv_Y4dxk8nXr','$2y$13$wU04uU8IuQj1VPq85qNAQOmvjD6fFDG4h1fUmxi34QheKe3HUEjv6',NULL,'a@e.com',1,1539679858,1539679858),(14,'dfgdfg','dfgdfgdf','kld_fdpOioozAl-48iGjsSda0Ht6YT9O','$2y$13$LvxuKygh1abkT2Sczbzp7uw6QgV1C9.OqeKiuS7Mb3UetlCqpBE.K',NULL,'sdf@dfg.com',1,1539679942,1539679942),(15,'erefgdfgdfg','eyertergdfg','5O6NBrQ6Z7UwPCsQYKUEdLxPniYQv02G','$2y$13$KEOT7l4WKqCXHViu63KT3O72mfFl6ydLm.XnuWV9ljO8LY4VjAdii',NULL,'asdfgh@s.com',1,1539680038,1539680038),(17,'dfg','dfg','epkzv2avidtf4PGsbtbRFbV7yNHE5BpD','$2y$13$vhAsksTYBIdYLir/dhcaSeYiLI9igMzGhvJIzLnzf5LRIVYyxCK9O',NULL,'gdfg@d.com',1,1539680430,1539680430),(18,'dfg','tdfgh','doro1Bn2kbukf7ZDhibah7_NW2IGwQBz','$2y$13$gec9k/wgOFjP1ABWEPRhaOpyeSe9TZ9y5vsuwmqK5prhSRb8NhUNW',NULL,'df@dfg.bvn',1,1539680810,1539680810),(20,'fgh','fjh','j-OX6tK4jZjw5dooaNKI1hhDfrz7ZZNE','$2y$13$ryMQ56fL.Nka9coPB15JJ.xLIjikvPKpGSjmRUuqd.pDX6quwab7a',NULL,'aaassd@f.com',1,1539681069,1539681069),(21,'dfg','dfgdfg','eJnBQnG-PS-Ynwn-X-fiPtOayBKYGldB','$2y$13$wFI8E/zIw.08sL1sc1b6WuY6iD2YvRZC5XkurLmJgf8rhS86lfdry',NULL,'ghfgh@d.com',1,1539681201,1539681201),(22,'ertg','gfh','YJsNP8ZiJPR1aPDl9tU0_pR4QDepu5fL','$2y$13$shaFQxTKOC9rS9.r898UquwaJphD8MNXeuEosrD4CZeom23k64A8q',NULL,'gfhfgh@d.com',1,1539681251,1539681251);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_token`
--

DROP TABLE IF EXISTS `user_token`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_token` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `timezone` varchar(100) DEFAULT NULL,
  `lastaccess_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_token_1_idx` (`user_id`),
  CONSTRAINT `fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_token`
--

LOCK TABLES `user_token` WRITE;
/*!40000 ALTER TABLE `user_token` DISABLE KEYS */;
INSERT INTO `user_token` VALUES (1,1,'M2NmNTYwNDctOTE5MC0xMWU4LTg2ZGYtMzJhMjMxYTE4NzRj',1537250908,'asia/kolkota',1539947487);
/*!40000 ALTER TABLE `user_token` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ng-project'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-10-19 17:03:27
