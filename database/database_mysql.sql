-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: dbtmdt
-- ------------------------------------------------------
-- Server version	8.0.24

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

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `description` varchar(800) DEFAULT NULL,
  `userid` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_userid_idx` (`userid`),
  CONSTRAINT `fk_userid` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (1,'2021-07-24','10:00:00','Test this app',1),(2,'2021-07-25','10:00:00','Check this product',1),(3,'2021-07-29','22:00:00','Wait for moonlight\n',1),(4,'2021-07-23','18:00:00','6:00pm eat pizza at home',1),(5,'2021-07-30','10:00:00','Learn dancing with Rose',1),(6,'2021-07-31','13:30:00','Invade Poland',1),(7,'2021-08-03','08:30:00','Find Nemo in backyard',1),(8,'2021-07-08','07:00:00','Drink coffee with mom!',1),(9,'2021-08-03','07:00:00','Dancing t\'il midnight!',1);
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `order_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pro_idx` (`product_id`),
  KEY `fk_order_idx` (`order_id`),
  CONSTRAINT `fk_order` FOREIGN KEY (`order_id`) REFERENCES `orderbill` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_pro` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (1,4,5,1),(2,45,7,1),(3,89,2,1),(14,2,2,2),(15,1,2,2),(16,58,1,3),(17,84,2,3),(18,87,1,3),(19,59,1,3),(20,55,2,3),(21,83,1,3),(22,80,2,3),(23,86,2,3),(24,2,1,4),(25,12,2,4),(26,96,2,5),(27,93,1,5),(28,77,2,5),(29,8,2,6),(30,87,2,6),(31,54,1,6),(32,30,1,6),(34,4,2,8),(35,81,1,8),(36,58,1,8),(37,53,1,8),(38,55,1,8),(39,86,1,9),(40,96,2,9),(41,77,2,9),(42,84,3,9),(43,76,2,9),(44,78,2,9),(45,82,2,9),(46,65,2,9),(47,6,1,9),(48,93,1,9),(49,51,2,9),(50,4,2,9),(52,95,2,11),(53,98,2,11),(54,56,1,11),(55,90,1,11),(56,97,1,11),(57,53,2,11),(58,62,1,11),(59,102,1,11),(60,17,1,11),(61,15,2,11),(62,57,1,11),(63,12,2,12),(64,5,1,12);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderbill`
--

DROP TABLE IF EXISTS `orderbill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderbill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userid` int DEFAULT NULL,
  `contact_name` varchar(45) DEFAULT NULL,
  `address` varchar(450) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  `payment_method` varchar(45) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `total_item` int DEFAULT NULL,
  `total_price` decimal(13,2) DEFAULT NULL,
  `shipperid` int DEFAULT NULL,
  `note` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_1_idx` (`userid`),
  KEY `fk_2_idx` (`shipperid`),
  CONSTRAINT `fk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_2` FOREIGN KEY (`shipperid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderbill`
--

LOCK TABLES `orderbill` WRITE;
/*!40000 ALTER TABLE `orderbill` DISABLE KEYS */;
INSERT INTO `orderbill` VALUES (1,3,'Minh Vũ Trần Quốc','38 Chiến Thắng','0788283307','quocminh.vutran3105@gmail.com','2021-07-13','cash',1,14,338.75,NULL,'Backedn test'),(2,3,'Tròn','38 Chiến Thắng Phường 9 Quận Phú Nhuận TP.HCM','0788283307','quocminh.vutran3105@gmail.com','2021-07-13','paypal',4,4,114.10,11,'OK!'),(3,3,'Chi','89 Hồ Văn Huê Phường 9 Quận Phú Nhuận TP.HCM','0786789330','tron@gmail.com','2021-07-13','cash',3,12,175.70,11,NULL),(4,3,'Tròn','99 Hoàng Văn Thụ Phường 11 Quận Phú Nhuận TP.HCM','0789999999','qwe@gmail.com','2021-07-13','paypal',5,3,144.00,11,'Got trolled!'),(5,3,'Minh','56 Võ Văn Ngân Phường 8 Quận Thủ Đức TP.HCM','07892336600','m@gmail.com','2021-07-13','cash',2,5,49.65,NULL,NULL),(6,3,'Chi','547 Lê Văn Việt Phường 12 Quận Tân Bình TP.HCM','0789999000','chi@gmail.com','2021-07-13','cash',2,6,178.55,NULL,NULL),(8,3,'Minh Mâm','83 Thắng Chiến Phường 9 Quận Phú Nhuận TP.HCM','0789900099','mm@gmail.com','2021-07-13','cash',1,6,180.45,NULL,NULL),(9,3,'Tờ Ròn','39 Chiến Thắng Phường 9 Quận Phú Nhuận TP.HCM','0788283307','toron@gmail.com','2021-07-13','cash',2,22,341.20,NULL,NULL),(11,4,'Gold','45 Bạch Đằng Phường 12 Quận Bình Thạnh TP.HCM','0782934059','geo@gmail.com','2021-07-16','cash',1,15,306.55,NULL,NULL),(12,6,'Toàn','567 Phan Văn Trị Phường 10 Quận Gò Vấp TP.HCM','0782293423','t@gmail.com','2021-07-18','cash',1,3,136.10,NULL,'Xoài phải chín nha :))');
/*!40000 ALTER TABLE `orderbill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(450) DEFAULT NULL,
  `price` decimal(13,2) DEFAULT NULL,
  `description` varchar(750) DEFAULT NULL,
  `units_in_stock` int DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `img_url` varchar(450) DEFAULT NULL,
  `last_update` varchar(450) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Mango LALBAG',24.55,'A almond-rich mango smoothie is a lip-smacking delight. Must try!',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantImages/b64a2405-9056-4366-a9e1-33ab20867898.jpg','11-07-2021 02:16:27'),(2,'Banana Golden ',32.50,'Surprise your loved ones with a luxurious cake made with soft and sweet bananas',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/de0cd3e5-eefd-4b56-9ec1-503a5db10333_425x425.JPG','10-07-2021 15:05:59'),(3,'Apple Red Delicious - Washington  ',36.00,'When it comes to apples, our mind remembers Washington automatically. Enjoy every bite of this All time favourite apples of the world.\n',123,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/f2dc3bb9-191a-470d-a278-15f443ab155c_425x425.jpg','11-07-2021 02:16:44'),(4,'Watermelon KIRAN',40.00,'Watermelon is delicious, hydrating and refreshing; a summer star!!',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/38c287cf-0d6d-47c5-9c31-80bd68b44dc0_425x425.jpg','10-07-2021 15:05:59'),(5,'Banana Elaichi',24.60,'Bananas can be eaten as a snack or paired with oatmeal or cereal for a power breakfast',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/54d367b3-614b-4208-bfdb-b9a4e52cdeb9_425x425.JPG','10-07-2021 15:05:59'),(6,'Pomegranate',45.25,'Pomegranate is a round fruit with a thick, reddish maroon skin and hundreds of edible seeds within.',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/639006d2-1a80-411f-b5ac-c4a457839907_425x425.JPG','10-07-2021 15:05:59'),(7,'Sweet Lime',23.55,'Excellent thirst quencher, tasty sweetlime juice leaves you hydrated and refreshed',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/e059422a-13cd-42b4-8308-3c38f86d33f9_425x425.JPG','10-07-2021 15:05:59'),(8,'Tangerine',45.65,'Make a delightful tangerine pudding that\'s pleasantly sweet and tart',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/bb52d3f8-0cc1-4afc-a738-a6fdafae7c91_425x425.JPG','10-07-2021 15:05:59'),(9,'Apple Fuji',78.00,'A distinctive, honey sweet taste and a juicy texture makes this apple delectable',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/620b0bb1-440e-4d83-896a-35bc6f274c3c_425x425.jpg','10-07-2021 15:05:59'),(10,'Chikoo',30.25,'Enjoy the sweet flesh directly, or scoop it out and add to fruit cups or smoothies',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/9f1cc309-11d4-4fd0-b1de-7b925b9b9302_425x425.jpg','10-07-2021 15:05:59'),(11,'Apple Green ',35.60,'The compound quercitin, a major component in green apple peels, helps to lower sugar levels and manage type-2 diabetes mellitus.',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/fb35012c-ed68-4553-af94-b44c35ed8586_425x425.jpg','10-07-2021 15:05:59'),(12,'COCONUT TENDER',55.75,'Tender coconut pudding can make a mouth-watering cold dessert',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/eb224811-9b70-40a4-a307-84827d018ace_425x425.JPG','10-07-2021 15:05:59'),(13,'Plums Indian - Natures Basket',30.25,'Plums Indian - Natures Basket',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/1929bc22-79c8-4841-a4a9-6daf9176c525_425x425.jpg','10-07-2021 15:05:59'),(14,'APPLE CUSTARD EACH',26.70,'The Custard Apple has similar consistency of a ripe pear matched with a creamy, custard taste. You can tell its ripe if it gives slightly when pressed. You can cut in half and eat flesh by itself or use as a substitute for apples in your favourite recipes. It contains good source of Vitamins C, B6, dietary fibre, magnesium and potassium.',86,'Fruit','https://cdn.shopify.com/s/files/1/0206/9470/products/4402-done_1024x1024.jpg?v=1624251729','11-07-2021 03:03:27'),(15,'Pineapple',29.95,'Who does not like the juicy and zesty pineapple? This one is a must have.',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/6ea997b9-efca-415c-951d-c315c177acb8_425x425.JPG','10-07-2021 15:05:59'),(16,'Musk Melon',45.85,'A delicious, refreshing juice made from musk melon is a summer favorite!',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/290fc1c3-7c0a-4312-90cf-5bd2e23b0b4e_425x425.JPG','10-07-2021 15:05:59'),(17,'Alphonso Mango ',24.55,'Who doesn\'t enjoy the creamy flesh and fruity aroma of this \"King of fruits\"!',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/e58c4504-377b-4656-b556-db36662f026c_425x425.jpg','10-07-2021 15:05:59'),(18,'Nectarine - Imported',45.50,'Juicy nectarine has a delicious flavor that can be relished as is or in desserts',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/8ddeaf63-7d49-4498-bfd8-2dc80e3df458_425x425.JPG','10-07-2021 15:05:59'),(19,'BLUEBERRY IMP',10.05,'BLUEBERRY IMP',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/35403f9c-5d62-47ae-acc3-ed99f6f22e45_425x425.jpg','10-07-2021 15:05:59'),(20,'Papaya',23.45,'Papaya is an almost staple fruit for all Indian families. It is loved for its digestive properties.',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/06dd4c2e-6f7f-49bf-8f8b-c2dd84a8cef2_425x425.jpg','10-07-2021 15:05:59'),(21,'Dragon Fruit ',55.50,'Its spongy pulp is white or sometimes pinkish red, sweet and juicy with numerous tiny edible black seeds scattered throughout.',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/a74484d4-af8a-48af-a142-27d99e9fe303_425x425.jpg','10-07-2021 15:05:59'),(22,'MANGO KESAR',33.00,'MANGO KESAR',100,'Fruit','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/7efb87b0-97da-4202-a6a2-e8f79bf4b02f_425x425.jpg','10-07-2021 15:05:59'),(23,'Grape Fruit Imported',22.50,'Grape Fruit Imported',100,'Fruit','https://cdn.modernbazaar.online/assets/uploads/product/compress/compress_FNV_GRAPE_FRUIT.jpg','10-07-2021 15:05:59'),(24,'Litchi Fruit',44.55,'Litchi Fruit',100,'Fruit','https://cdn.modernbazaar.online/assets/uploads/product/compress/compress_FNV_LITCHI.jpg','10-07-2021 15:05:59'),(25,'Yellow Melon',30.50,'Yellow Melon',100,'Fruit','https://cdn.modernbazaar.online/assets/uploads/product/compress/compress_5457125155.jpg','10-07-2021 15:05:59'),(26,'CAULIFLOWER',20.75,'Product of : INDIA',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/999a14d9-d3ad-4d97-b637-813aeebfdf69_425x425.jpg','10-07-2021 15:05:59'),(27,'CURRY LEAF',10.25,'Product of : INDIA',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/1b080f5d-c454-488f-b4cb-f81ba8e5f029_425x425.jpg','10-07-2021 15:05:59'),(28,'Onion',35.55,'Add sage and cheddar to make an extra special and delicious onion soup',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/14c3fa54-5d8e-4238-903f-a8ef58132879_425x425.JPG','10-07-2021 15:05:59'),(29,'Garlic',14.25,'Garlic is an essential part of global cuisines. It has a distinct flavour and multiple medicinal qualities.',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/53825dfc-b626-4246-9c7a-19ec44f49471_425x425.JPG','10-07-2021 15:05:59'),(30,'Ginger',27.25,'Steep a healing, rejuvenating cup of ginger tea on days when you need an extra push!',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/9c26881e-0375-492b-ad72-462f4c900bb9_425x425.JPG','10-07-2021 15:05:59'),(31,'Tomato',45.25,'Stuff tomatoes with some mixed veggies and crumbled panner and enjoy them grilled',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/e4ecd12c-b2db-4f76-b9ea-45e0436ba350_425x425.JPG','10-07-2021 15:05:59'),(32,'Potato',30.25,'Potato is a popular and important ingredient in every imaginable cuisine. It is loved globally.',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/25653f6e-62fe-4e1d-9e95-9adc63305f32_425x425.JPG','10-07-2021 15:05:59'),(33,'Lemon',23.45,'Add abundant flavor to a variety of dishes with a simple drizzle of lemon',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/8066a890-bca6-43ca-9f18-6e8d07830503_425x425.JPG','10-07-2021 15:05:59'),(34,'Coconut',30.50,'Flavoured with onions and whole garam masala, Kerala style coconut rice is a must try!',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/a70fc16f-be57-4578-ae19-0956165913c2_425x425.jpg','10-07-2021 15:05:59'),(35,'Carrot',38.85,'A classic carrot cake with a dash of cinnamon and walnuts is a decadent treat',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/1ca1d5a8-2c35-41c4-8128-2d06541b4626_425x425.JPG','10-07-2021 15:05:59'),(36,'Cucumber',24.95,'Cucumbers are a respite to long, hot days. Made mostly out of water, they are refreshing.',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/81ea7935-45a2-4d4e-89c6-a6f57f49f8f4_425x425.JPG','10-07-2021 15:05:59'),(37,'Bottle Gourd',31.15,'Try a healthy, detox bottle gourd juice with mint and coriander leaves',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/9f5dcc7f-df57-479f-9dec-67b63b1a7081_425x425.jpg','10-07-2021 15:05:59'),(38,'Chilli Green',28.35,'Can we think of Indian cooking without a dash of hot, peppery green chillies?',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/ef293d5a-93c6-420a-9d0c-a84973fb90d6_425x425.JPG','10-07-2021 15:05:59'),(39,'White Cucumber',34.80,'Cucumber salad can be your light, refreshing, and easy-to-make anytime salad',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/5c8928de-71d2-467c-849a-2ac0474a877f_425x425.JPG','10-07-2021 15:05:59'),(40,'Colocasia',20.35,'Make a simple yet tasty arbi chaat with added onions, lemon, coriander and spices',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/17399f75-d4bc-48f4-850f-2c8b317c4440_425x425.JPG','10-07-2021 15:05:59'),(41,'Capsicum',34.25,'Capsicum improves blood circulation, uces cholesterol levels, has anti-inflammatory and anti-bacterial properties',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/9f5ce81b-8325-4ae3-9fad-83e2e7303198_425x425.JPG','10-07-2021 15:05:59'),(42,'Lady Finger/Bhendi',12.75,'Bhindi Fry is an easy snack that can be savored as a starter or a side dish',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/f49579c1-1e6d-4ad4-ab52-26ac0318fbcf_425x425.JPG','10-07-2021 15:05:59'),(43,'Beet Root',39.00,'Grate coconut, beetroot and other desired veggies and toss with spices and lime',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/52e6f7fa-4b65-465f-b00b-031632ca072c_425x425.JPG','10-07-2021 15:05:59'),(44,'Sweet Corn',36.25,'Sweet corn is an internationally much loved food item. It is a common sight in most countries.',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/bb748243-d418-48d9-86e5-3e8daeab0918_425x425.JPG','10-07-2021 15:05:59'),(45,'Fenugreek/Methi',17.75,'Fenugreek leaves are important herbs in the Indian cuisine. They are loved for their bitterness.',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/dd51553a-7998-4e87-81b0-00a4b04cd2e2_425x425.JPG','10-07-2021 15:05:59'),(46,'French Beans',21.35,'French beans are a healthy vegetable from the bean family. It can be eaten as often as desired.',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/f4b01a37-baf5-413c-825b-92dd94e99cc6_425x425.jpg','10-07-2021 15:05:59'),(47,'Eggplant',44.65,'The nurtitious eggplant is delicious grilled, stuffed or sauted as a side or main dish',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/2ae7993e-56b3-4e73-add7-5b14940cefb7_425x425.jpg','10-07-2021 15:05:59'),(48,'SPROUTS CHANA BROWN',23.95,'Try a tongue-tickling curry of sprouted kala chana with a dash of jaggery',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/1365257_425x425.jpg','10-07-2021 15:05:59'),(49,'SPROUTS MIXED',44.00,'Product of : INDIA',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/fffaf60c-3245-48e9-9b59-764136106ddf_425x425.jpg','10-07-2021 15:05:59'),(50,'Pointed Gourd/Tondli ',27.55,'Served as a main or side dish, fried ivy gourd is a popular Indian recipe',100,'Vegetable','https://d1z88p83zuviay.cloudfront.net/ProductVariantThumbnailImages/6481233d-cbd6-49f9-99cd-1e3b1f99c7cf_425x425.jpg','10-07-2021 15:05:59'),(51,'Alpenliebe Chewy Candy Box Mango With Chili Salt Mixed',23.50,'Delicious candy!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/09/Alpenlibebe-mango-with-chili-salt-mixed.jpg','10-07-2021 15:05:59'),(52,'Alpenliebe Chewy Candy Mix Grape & Strawberry Flavor 2 Chew',14.50,'Delicious candy!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/07/alpenliebe-2-chew-mix-grape-strawberry-flavor-120g-1.jpg','10-07-2021 15:05:59'),(53,'Alpenliebe Chewy Candy Caramen Flavor',20.00,'Delicious candy!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/08/alpenliebe-caramen-flavor-bag-512g-1-600x600.jpg','10-07-2021 15:05:59'),(54,'AFC Crackers  Potato Enriched Vegetable Flavour',40.00,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/AFC-Cracker-Box-100g-Potato-Enriched-Vegetable-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(55,'Choco Pie Soft Cake Dark Cacao Flavor',13.70,'Delicious pie!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/Choco-Pie-Soft-Cake-Box-360g-Dark-Cacao-flavor-x12-1-600x600.jpg','10-07-2021 15:05:59'),(56,'Choco PN Soft Cake Chocolate Cream',22.45,'Delicious pie!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/Choco-PN-Soft-Cake-Bag-216g-x12-Chocolate-Cream-1-600x600.jpg','10-07-2021 15:05:59'),(57,'Bibica Chewy Candy  Mint Flavor Cheery',33.45,'Delicious candy!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/04/bibica-chewy-candy-mint-flavor-cheery-90g-1-600x600.jpg','10-07-2021 15:05:59'),(58,'Bibica Sumica Chewy Candy Bag Milk Chocolate',60.00,'Delicious candy!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/09/Bibica-Sumica-Milk-chocolate-chewy-candy.jpg','10-07-2021 15:05:59'),(59,'Bibica Migita Chewy Candy Bag Mint Flavour',15.25,'Delicious candy!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/09/Bibica-Migita-Mint-flavour-candy.jpg','10-07-2021 15:05:59'),(60,'Hura Deli Rollcake Pandan Coconut Flavour',18.25,'Delicious pie!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/Hura-Deli-Rollcake-Box-336g-Pandan-Coconut-Flavour-x12-1-600x600.jpg','10-07-2021 15:05:59'),(61,'Hura Swissroll Cake ',19.15,'Delicious pie!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/Hura-Swissroll-Cake-Box-360g-Butter-Milk-x20-1-600x600.jpg','10-07-2021 15:05:59'),(62,'AFC Crackers Box 200g Vegetable',23.70,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2021/03/AFC-Crackers-Box-200g-Vegetable-16pcs-1-600x450.jpg','10-07-2021 15:05:59'),(63,'Chupa Chups Big Babol Lollipop',45.60,'Delicious candy!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/04/chupa-chups-bigbabol-135g-1-600x600.jpg','10-07-2021 15:05:59'),(64,'Chupa Chups Chewy Candy Cola',23.60,'Delicious candy!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2021/04/Chupa-Chups-Chewy-Candy-Bag-160g-Cola-1-600x600.jpg','10-07-2021 15:05:59'),(65,'One One Rice Cracker  BBQ Beef Steak Flavour',16.00,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/One-One-Rice-Cracker-Bag-150g-BBQ-Beef-Steak-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(66,'Oreo Pie Cadbury Chocolate',37.50,'Delicious pie!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2021/03/Oreo-Pie-Box-180g-Cadbury-Chocolate-1-copy-600x600.jpg','10-07-2021 15:05:59'),(67,'Solite Cake Choco Delight Pie Butter',14.15,'Delicious pie!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/Solite-Cake-Box-140g-Choco-Delight-pie-butter-x14-scaled.jpg','10-07-2021 15:05:59'),(68,'One One Rice Cracker Soft Sweet Flavour',13.15,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/One-One-Rice-Cracker-Bag-150g-Soft-Sweet-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(69,'One One Rice Cracker Corn Cheese Flavour',21.35,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/One-One-Rice-Cracker-Bag-118g-Corn-Cheese-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(70,'AFC Crunchy Crackers Seaweed Potato Enriched',25.25,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/AFC-Crunchy-Crackers-Box-200g-Seaweed-Potato-Enriched-1-600x600.jpg','10-07-2021 15:05:59'),(71,'AFC Crunchy Crackers  Wheat Potato Enriched',35.85,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/AFC-Crunchy-Crackers-Box-200g-Wheat-Potato-Enriched-1-600x600.jpg','10-07-2021 15:05:59'),(72,'Solite Cupcake Cappuccino Flavour',24.55,'Delicious pie!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2020/12/Solite-Cupcake-box-276g-capuccino-flavor-x12-1-600x600.jpg','10-07-2021 15:05:59'),(73,'AFC Crackers  Beef',17.95,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2021/03/AFC-Crackers-Box-200g-Beef-8pcs-1-600x450.jpg','10-07-2021 15:05:59'),(74,'Lu Veritable Cookie Box',45.55,'Delicious cracker!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2021/03/Lu-Veritable-Cookie-Box-200g-Petit-Beurre-24pcs-1-600x450.jpg','10-07-2021 15:05:59'),(75,'Solite Cupcake Box Milk Egg Strawberry ',23.45,'Delicious pie!',100,'Confectionery','https://fmcg-viet.com/wp-content/uploads/2021/03/Solite-Cupcake-Box-360g-Milk-Egg-Strawberry-20pcs-1-600x450.jpg','10-07-2021 15:05:59'),(76,'Oishi Marty’s Snack Bag Vagatable Fried Pork Skin Flavour',9.00,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Oishi-Martys-Snack-Bag-40g-Vagatable-Fried-Pork-Skin-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(77,'Oishi Snack  Premium Cheese',8.95,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Oishi-Snack-Bag-40g-Premium-Cheese-1-600x600.jpg','10-07-2021 15:05:59'),(78,'Lay’s Wavy Potato Chips Texas Tenderloin Steak Flavour',6.75,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Lays-Wavy-Chips-Bag-95g-texas-Tenderloin-Steak-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(79,'Lay’s Wavy Potato Chips  Cheddar Cheese Flavour',5.65,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2021/01/Lays-Wavy-Potato-Chips-Bag-35g-Cheddar-Cheese-Flavour.jpg','10-07-2021 15:05:59'),(80,'Oishi Snack  Pumpkin Beef Steak',5.55,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Oishi-Snack-Bag-40g-Pumpkin-Beef-Steak-1-600x600.jpg','10-07-2021 15:05:59'),(81,'Oishi Snack Shrimp Salted Green Peppers Flavour',6.75,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Oishi-Snack-Bag-40g-Shrimp-Salted-Green-Peppers-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(82,'Lay’s Wavy Potato Chips Cheddar Cheese Flavour',7.85,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Lays-Wavy-Chips-Bag-95g-Cheddar-Cheese-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(83,'Oishi Snack Shrimp Spicy',8.75,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Oishi-Snack-Bag-40g-Shrimp-Spicy-1-600x600.jpg','10-07-2021 15:05:59'),(84,'King Do Snack Bag ',9.25,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2021/03/King-Do-Snack-Bag-32g-Crab-1-600x450.jpg','10-07-2021 15:05:59'),(85,'Lay’s Wavy Potato Chip Nori Seaweed Flavour',9.65,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2021/01/Lays-Wavy-Potato-Chips-Bag-35g-Nori-Seaweed-Flavour.jpg','10-07-2021 15:05:59'),(86,'Oishi Snack Tomato Flavour',12.35,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Oishi-Snack-Bag-40g-tomato-Flavour-1-600x600.jpg','10-07-2021 15:05:59'),(87,'Lay’s Wavy Potato Chips Thai Spicy Squid Flavour',10.00,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2021/01/Lays-Wavy-Potato-Chips-Bag-35g-Thai-Spicy-Squid-Flavour.jpg','10-07-2021 15:05:59'),(88,'Oishi Snack Indo Squid',7.15,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Oishi-Snack-Bag-40g-Indo-Squid-1-600x600.jpg','10-07-2021 15:05:59'),(89,'Lay’s Wavy Potato Chips Manhattan Rib Eye Steak Flavour',7.25,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2021/01/Lays-Wavy-Potato-Chips-Bag-35g-Manhattan-Rib-Eye-Steak-Flavour.jpg','10-07-2021 15:05:59'),(90,'Oishi Snack Shrimp Special Spicy',9.00,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Oishi-Snack-Bag-40g-Shrimp-Special-Spicy-1-600x600.jpg','10-07-2021 15:05:59'),(91,'Lay’s Wavy Potato Chips Natural Classic Flavour',9.95,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Lays-Wavy-Chips-Bag-95g-Natural-Classic-Flavour-4-600x600.jpg','10-07-2021 15:05:59'),(92,'Lay’s Wavy Potato Chips Brazil BBQ Pork Rib Flavour',6.95,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2021/01/Lays-Wavy-Potato-Chips-Bag-35g-Brazil-BBQ-Pork-Rib-Flavour.jpg','10-07-2021 15:05:59'),(93,'Pringles Potato Chips Potato Slices BBQ Flavor',8.65,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/07/pringles-potato-chip-slices-bbq-flavor-107g-1.jpg','10-07-2021 15:05:59'),(94,'Pringles Potato Chips Paprika',7.45,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/04/pringles-paprika-165g-1-600x600.jpg','10-07-2021 15:05:59'),(95,'Pringles Potato Chips Tube Original Flavor',8.55,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/07/pringles-potato-chip-slices-original-flavor-107g-1.jpg','10-07-2021 15:05:59'),(96,'Pringles Potato Chips Jamon',11.55,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/04/pringles-sabor-jamon-165g-1-600x600.jpg','10-07-2021 15:05:59'),(97,'Vinamit Chips Banana Fruit Chip',10.45,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/08/vinamit-banana-fruit-chips-100g.jpg','10-07-2021 15:05:59'),(98,'Vinamit Chips Jack Fruit Chip',21.25,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/04/jack-fruit-chips-100g-1-600x600.jpg','10-07-2021 15:05:59'),(99,'Vinamit Chips Mix Fruit Chip',45.75,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/08/vinamit-vinatural-mix-fruit-chips-150g.jpg','10-07-2021 15:05:59'),(100,'Pringles Potato Chips Malaysia All Variants ',23.45,'Delicious snack!',100,'Snack','https://fmcg-viet.com/wp-content/uploads/2020/12/Pringles-Potato-Chips-Tube-42g-Malaysia-All-Variants-x12.jpg','10-07-2021 15:05:59'),(101,'AVOCADO IMPERFECT',25.65,'Avocados have a dark green bumpy skin and soft flesh. They have a rich and mellow flavour with a thick, buttery texture. A good source of vitamins B6, E and folic acid and a useful source of vitamin C and potassium. They should be left to ripen at room temperature and is ready to serve when it yields to gentle pressure.',50,'Fruit','http://res.cloudinary.com/dkmk9tdwx/image/upload/v1625990319/ny7xbhl5u2ubeyec2hoe.jpg','11-07-2021 02:58:52'),(102,'BLUEBERRIES PREMIUM',23.45,'Blueberries are a hybrid of flavours having a slight sweet taste with a bit of acid. They are bursting with flavour and have a juicy mouthfeel. A good source of antioxidants, with some Vitamin A and C. Should be stored in a covered container in refrigerator for up to a week.  ',50,'Fruit','http://res.cloudinary.com/dkmk9tdwx/image/upload/v1625990604/j5ro581clqh2qi5awlni.jpg','11-07-2021 03:03:27');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `img_url` varchar(500) DEFAULT NULL,
  `status` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'tron','1','admin','Minh Mâm','0788283308','trondeptrai@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(2,'user1','1','customer','Trần Thiên Hoàng','0789833700','hoang@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(3,'tronMM','87654321','customer','Tròn','0788283307','quocminh.vutran3105@gmail.com','http://res.cloudinary.com/dkmk9tdwx/image/upload/v1626077488/swum8dmsrduywz5r5mq5.jpg',1),(4,'namu','12345678','customer','Việt Name','0788283302','nam@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',0),(5,'bao','12345678','employee','Bảo','0788283303','bao@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(6,'toan','12345678','customer','Toàn','0788283304','toan@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',0),(7,'linh','12345678','customer','Linh','0788283305','linh@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(8,'hoang','12345678','customer','Hoàng','0788283306','hoang@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(9,'tuan','12345678','customer','Tuấn','0788283307','tuan@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(10,'dat','12345678','employee','Đạt','0788283308','dat@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',0),(11,'vinh','1','shipper','Vinh Xô','0788283309','vinh@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(12,'lan','12345678','customer','Lan','0788283310','lan@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(13,'hung','12345678','customer','Hùng','0788283311','hung@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1),(15,'tai','1','shipper','Tài','0789877033','tai@gmail.com','https://res.cloudinary.com/dkmk9tdwx/image/upload/v1626066284/106423_user_512x512_qyhovd.png',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `verify_code`
--

DROP TABLE IF EXISTS `verify_code`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `verify_code` (
  `id` int NOT NULL AUTO_INCREMENT,
  `verify_code` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `verify_code`
--

LOCK TABLES `verify_code` WRITE;
/*!40000 ALTER TABLE `verify_code` DISABLE KEYS */;
/*!40000 ALTER TABLE `verify_code` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-07-18 15:10:11
