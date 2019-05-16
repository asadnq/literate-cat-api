-- MySQL dump 10.17  Distrib 10.3.13-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: book_store
-- ------------------------------------------------------
-- Server version	10.3.13-MariaDB

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
-- Table structure for table `adonis_schema`
--

DROP TABLE IF EXISTS `adonis_schema`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `adonis_schema` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `batch` int(11) DEFAULT NULL,
  `migration_time` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `adonis_schema`
--

LOCK TABLES `adonis_schema` WRITE;
/*!40000 ALTER TABLE `adonis_schema` DISABLE KEYS */;
INSERT INTO `adonis_schema` VALUES (1,'1503248427885_user',1,'2019-04-09 04:48:38'),(2,'1503248427886_token',1,'2019-04-09 04:48:40'),(3,'1554591484003_categories_schema',1,'2019-04-09 04:48:40'),(4,'1554591525697_book_schema',1,'2019-04-09 04:48:41'),(5,'1554693249657_carts_schema',1,'2019-04-09 04:48:41'),(6,'1554781305549_author_schema',1,'2019-04-09 04:48:41');
/*!40000 ALTER TABLE `adonis_schema` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authors`
--

DROP TABLE IF EXISTS `authors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `authors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authors`
--

LOCK TABLES `authors` WRITE;
/*!40000 ALTER TABLE `authors` DISABLE KEYS */;
INSERT INTO `authors` VALUES (1,'Malcolm Gladwell',NULL,NULL),(2,'Steven Pinker',NULL,NULL),(3,'Nick Bostrom',NULL,NULL),(4,'Robert Cecil Martin',NULL,NULL),(5,'Andy Hunt, Dave Thomas',NULL,NULL),(6,'Fred Brooks',NULL,NULL),(7,' Thomas H. Cormen, Charles E. Leiserson, Ronald Rivest, Clifford Stein',NULL,NULL),(8,'Paul Coelho',NULL,NULL),(9,'Harper Lee',NULL,NULL),(10,'Ray Bradbury',NULL,NULL);
/*!40000 ALTER TABLE `authors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `books`
--

DROP TABLE IF EXISTS `books`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `books` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(10) unsigned DEFAULT NULL,
  `author_id` int(10) unsigned DEFAULT NULL,
  `name` varchar(120) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` int(10) unsigned DEFAULT NULL,
  `stock` int(10) unsigned DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `books_category_id_foreign` (`category_id`),
  KEY `books_author_id_foreign` (`author_id`),
  CONSTRAINT `books_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `books_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `books`
--

LOCK TABLES `books` WRITE;
/*!40000 ALTER TABLE `books` DISABLE KEYS */;
INSERT INTO `books` VALUES (1,1,1,'The Tipping Point','The tipping point is that magic moment when an idea, trend, or social behavior crosses a threshold, tips, and spreads like wildfire. Just as a single sick person can start an epidemic of the flu, so too can a small but precisely targeted push cause a fashion trend, the popularity of a new product, or a drop in the crime rate. This widely acclaimed bestseller, in which Malcolm Gladwell explores and brilliantly illuminates the tipping point phenomenon, is already changing the way people throughout the world think about selling products and disseminating ideas.\n\n            Gladwell introduces us to the particular personality types who are natural pollinators of new ideas and trends, the people who create the phenomenon of word of mouth. He analyzes fashion trends, smoking, children\'s television, direct mail, and the early days of the American Revolution for clues about making ideas infectious, and visits a religious commune, a successful high-tech company, and one of the world\'s greatest salesmen to show how to start and sustain social epidemics',131000,NULL,'/cover_images/the-tipping-point.jpg',NULL,NULL),(2,1,1,'Blink','Drawing on cutting-edge neuroscience and psychology and displaying all of the brilliance that made The Tipping Point a classic, Blink changes the way you\'ll understand every decision you make. Never again will you think about thinking the same way.\n\n            Malcolm Gladwell redefined how we understand the world around us. Now, in Blink, he revolutionizes the way we understand the world within. Blink is a book about how we think without thinking, about choices that seem to be made in an instant - in the blink of an eye - that actually aren\'t as simple as they seem. Why are some people brilliant decision makers, while others are consistently inept? Why do some people follow their instincts and win, while others end up stumbling into error? How do our brains really work - in the office, in the classroom, in the kitchen, and in the bedroom? And why are the best decisions often those that are impossible to explain to others? \n            \n            In Blink we meet the psychologist who has learned to predict whether a marriage will last, based on a few minutes of observing a couple; the tennis coach who knows when a player will double-fault before the racket even makes contact with the ball; the antiquities experts who recognize a fake at a glance. Here, too, are great failures of \"blink\": the election of Warren Harding; \"New Coke\"; and the shooting of Amadou Diallo by police. Blink reveals that great decision makers aren\'t those who process the most information or spend the most time deliberating, but those who have perfected the art of \"thin-slicing\" - filtering the very few factors that matter from an overwhelming number of variables',125000,NULL,'/cover_images/blink.jpg',NULL,NULL),(3,1,1,'Outliers','In this stunning new book, Malcolm Gladwell takes us on an intellectual journey through the world of \"outliers\"--the best and the brightest, the most famous and the most successful. He asks the question: what makes high-achievers different?\n\n            His answer is that we pay too much attention to what successful people are like, and too little attention to where they are from: that is, their culture, their family, their generation, and the idiosyncratic experiences of their upbringing. Along the way he explains the secrets of software billionaires, what it takes to be a great soccer player, why Asians are good at math, and what made the Beatles the greatest rock band.',125000,NULL,'/cover_images/outliers.jpg',NULL,NULL),(4,1,1,'What The Dog Saw','What is the difference between choking and panicking? Why are there dozens of varieties of mustard but only one variety of ketchup? What do football players teach us about how to hire teachers? What does hair dye tell us about the history of the 20th century?\n\n            In the past decade, Malcolm Gladwell has written three books that have radically changed how we understand our world and ourselves: The Tipping Point, Blink, and Outliers. Now, in What the Dog Saw, he brings together, for the first time, the best of his writing from The New Yorker over the same period. \n\n            Here you\'ll find the bittersweet tale of the inventor of the birth control pill, and the dazzling creations of pasta sauce pioneer Howard Moscowitz. Gladwell sits with Ron Popeil, the king of the American kitchen, as he sells rotisserie ovens, and divines the secrets of Cesar Millan, the \"dog whisperer\" who can calm savage animals with the touch of his hand. He explores intelligence tests and ethnic profiling and why it was that employers in Silicon Valley once tripped over themselves to hire the same college graduate.',145000,NULL,'/cover_images/what-the-dog-saw.jpg',NULL,NULL),(5,1,1,'David and Goliath','In his #1 bestselling books The Tipping Point, Blink, and Outliers, Malcolm Gladwell has explored the ways we understand and change our world. Now he looks at the complex and surprising ways the weak can defeat the strong, the small can match up against the giant, and how our goals (often culturally determined) can make a huge difference in our ultimate sense of success. Drawing upon examples from the world of business, sports, culture, cutting-edge psychology, and an array of unforgettable characters around the world, David and Goliath is in many ways the most practical and provocative book Malcolm Gladwell has ever written.',122000,NULL,'/cover_images/david-and-goliath.jpg',NULL,NULL),(6,1,2,'Enlightenment Now','The follow-up to Pinker\'s groundbreaking The Better Angels of Our Nature presents the big picture of human progress: people are living longer, healthier, freer, and happier lives, and while our problems are formidable, the solutions lie in the Enlightenment ideal of using reason and science. \n\nIs the world really falling apart? Is the ideal of progress obsolete? In this elegant assessment of the human condition in the third millennium, cognitive scientist and public intellectual Steven Pinker urges us to step back from the gory headlines and prophecies of doom, which play to our psychological biases. Instead, follow the data: In seventy-five jaw-dropping graphs, Pinker shows that life, health, prosperity, safety, peace, knowledge, and happiness are on the rise, not just in the West, but worldwide. This progress is not the result of some cosmic force. It is a gift of the Enlightenment: the conviction that reason and science can enhance human flourishing.\n\nFar from being a naïve hope, the Enlightenment, we now know, has worked. But more than ever, it needs a vigorous defense. The Enlightenment project swims against currents of human nature--tribalism, authoritarianism, demonization, magical thinking--which demagogues are all too willing to exploit. Many commentators, committed to political, religious, or romantic ideologies, fight a rearguard action against it. The result is a corrosive fatalism and a willingness to wreck the precious institutions of liberal democracy and global cooperation. \n\nWith intellectual depth and literary flair, Enlightenment Now makes the case for reason, science, and humanism: the ideals we need to confront our problems and continue our progress.',158000,NULL,'/cover_images/enlightenment-now.jpg',NULL,NULL),(7,1,2,'The Better Angles of Our Nature','Believe it or not, today we may be living in the most peaceful moment in our species\' existence. In his gripping and controversial new work, New York Times bestselling author Steven Pinker shows that despite the ceaseless news about war, crime, and terrorism, violence has actually been in decline over long stretches of history. Exploding myths about humankind\'s inherent violence and the curse of modernity, this ambitious book continues Pinker\'s exploration of the essence of human nature, mixing psychology and history to provide a remarkable picture of an increasingly enlightened world.\n',160000,NULL,'/cover_images/the-better-angels-of-our-nature.jpg',NULL,NULL),(8,1,2,'The Blank Slate','In The Blank Slate, Steven Pinker explores the idea of human nature and its moral, emotional, and political colorings. He shows how many intellectuals have denied the existence of human nature by embracing three linked dogmas: the Blank Slate (the mind has no innate traits), the Noble Savage (people are born good and corrupted by society), and the Ghost in the Machine (each of us has a soul that makes choices free from biology). Each dogma carries a moral burden, so their defenders have engaged in desperate tactics to discredit the scientists who are now challenging them.\n\nPinker injects calm and rationality into these debates by showing that equality, progress, responsibility, and purpose have nothing to fear from discoveries about a rich human nature. He disarms even the most menacing threats with clear thinking, common sense, and pertinent facts from science and history. Despite its popularity among intellectuals during much of the twentieth century, he argues, the doctrine of the Blank Slate may have done more harm than good. It denies our common humanity and our individual preferences, replaces hardheaded analyses of social problems with feel-good slogans, and distorts our understanding of government, violence, parenting, and the arts.\n\nPinker shows that an acknowledgement of human nature that is grounded in science and common sense, far from being dangerous, can complement insights about the human condition made by millennia of artists and philosophers. All this is done in the style that earned his previous books many prizes and worldwide acclaim: wit, lucidity, and insight into matters great and small.',148000,NULL,'/cover_images/the-blank-state.jpg',NULL,NULL),(9,1,3,'Superintelligence: Paths, Dangers, Strategies','Superintelligence asks the questions: What happens when machines surpass humans in general intelligence? Will artificial agents save or destroy us? Nick Bostrom lays the foundation for understanding the future of humanity and intelligent life. The human brain has some capabilities that the brains of other animals lack. It is to these distinctive capabilities that our species owes its dominant position. If machine brains surpassed human brains in general intelligence, then this new superintelligence could become extremely powerful - possibly beyond our control. As the fate of the gorillas now depends more on humans than on the species itself, so would the fate of humankind depend on the actions of the machine superintelligence. But we have one advantage: we get to make the first move. Will it be possible to construct a seed Artificial Intelligence, to engineer initial conditions so as to make an intelligence explosion survivable? How could one achieve a controlled detonation? This profoundly ambitious and original book breaks down a vast track of difficult intellectual terrain. After an utterly engrossing journey that takes us to the frontiers of thinking about the human condition and the future of intelligent life, we find in Nick Bostrom\'s work nothing less than a reconceptualization of the essential task of our time.',162000,NULL,'/cover_images/superintelligence.jpg',NULL,NULL),(10,1,4,'Clean Code: A Handbook of Agile Software Craftsmanship','Even bad code can function. But if code isn t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code. But it doesn t have to be that way. \nNoted software expert Robert C. Martin presents a revolutionary paradigm with Clean Code: A Handbook of Agile Software Craftsmanship . Martin has teamed up with his colleagues from Object Mentor to distill their best agile practice of cleaning code on the fly into a book that will instill within you the values of a software craftsman and make you a better programmer but only if you work at it. \nWhat kind of work will you be doing? You ll be reading code lots of code. And you will be challenged to think about what s right about that code, and what s wrong with it. More importantly, you will be challenged to reassess your professional values and your commitment to your craft. \nClean Code is divided into three parts. The first describes the principles, patterns, and practices of writing clean code. The second part consists of several case studies of increasing complexity. Each case study is an exercise in cleaning up code of transforming a code base that has some problems into one that is sound and efficient. The third part is the payoff: a single chapter containing a list of heuristics and smells gathered while creating the case studies. The result is a knowledge base that describes the way we think when we write, read, and clean code. \nReaders will come away from this book understanding\n\nHow to tell the difference between good and bad code How to write good code and how to transform bad code into good code How to create good names, good functions, good objects, and good classes How to format code for maximum readability How to implement complete error handling without obscuring code logic How to unit test and practice test-driven development This book is a must for any developer, software engineer, project manager, team lead, or systems analyst with an interest in producing better code. ',160000,NULL,'/cover_images/clean-code.jpg',NULL,NULL),(11,1,5,'The Pragmatic Programmer: From Journeyman to Master','-- Ward Cunningham Straight from the programming trenches, The Pragmatic Programmer cuts through the increasing specialization and technicalities of modern software development to examine the core process--taking a requirement and producing working, maintainable code that delights its users. It covers topics ranging from personal responsibility and career development to architectural techniques for keeping your code flexible and easy to adapt and reuse. Read this book, and youll learn how to *Fight software rot; *Avoid the trap of duplicating knowledge; *Write flexible, dynamic, and adaptable code; *Avoid programming by coincidence; *Bullet-proof your code with contracts, assertions, and exceptions; *Capture real requirements; *Test ruthlessly and effectively; *Delight your users; *Build teams of pragmatic programmers; and *Make your developments more precise with automation. Written as a series of self-contained sections and filled with entertaining anecdotes, thoughtful examples, and interesting analogies, The Pragmatic Programmer illustrates the best practices and major pitfalls of many different aspects of software development. Whether youre a new coder, an experienced programmer.',130000,NULL,'/cover_images/the-pragmatic-programmer.jpg',NULL,NULL),(12,1,6,'The Mythical Man-Month: Essays on Software Engineering','Few books on software project management have been as influential and timeless as The Mythical Man-Month. With a blend of software engineering facts and thought-provoking opinions, Fred Brooks offers insight for anyone managing complex projects. These essays draw from his experience as project manager for the IBM System/360 computer family and then for OS/360, its massive software system. Now, 20 years after the initial publication of his book, Brooks has revisited his original ideas and added new thoughts and advice, both for readers already familiar with his work and for readers discovering it for the first time.\nThe added chapters contain (1) a crisp condensation of all the propositions asserted in the original book, including Brooks\' central argument in The Mythical Man-Month: that large programming projects suffer management problems different from small ones due to the division of labor; that the conceptual integrity of the product is therefore critical; and that it is difficult but possible to achieve this unity; (2) Brooks\' view of these propositions a generation later; (3) a reprint of his classic 1986 paper \"No Silver Bullet\"; and (4) today\'s thoughts on the 1986 assertion, \"There will be no silver bullet within ten years.\"',147800,NULL,'/cover_images/the-mythical-man-month.jpg',NULL,NULL),(13,1,7,'Introduction to Algorithms','This title covers a broad range of algorithms in depth, yet makes their design and analysis accessible to all levels of readers. Each chapter is relatively self-contained and can be used as a unit of study. The algorithms are described in English and in a pseudocode designed to be readable by anyone who has done a little programming. The explanations have been kept elementary without sacrificing depth of coverage or mathematical rigor.',189500,NULL,'/cover_images/introduction-to-algorithm.jpg',NULL,NULL),(14,2,8,'The Alchemist','Paulo Coelho\'s masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined. Santiago\'s journey teaches us about the essential wisdom of listening to our hearts, of recognizing opportunity and learning to read the omens strewn along life\'s path, and, most importantly, to follow our dreams.',67000,NULL,'/cover_images/the-alchemist.jpg',NULL,NULL),(15,2,9,'To Kill a Mockingbird','The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.\n\nCompassionate, dramatic, and deeply moving, To Kill A Mockingbird takes readers to the roots of human behavior - to innocence and experience, kindness and cruelty, love and hatred, humor and pathos. Now with over 18 million copies in print and translated into forty languages, this regional story by a young Alabama woman claims universal appeal. Harper Lee always considered her book to be a simple love story. Today it is regarded as a masterpiece of American literature.',65000,NULL,'/cover_images/to-kill-a-mockingbird.jpg',NULL,NULL),(16,2,9,'Go Set a Watchman','From Harper Lee comes a landmark new novel set two decades after her beloved Pulitzer Prize-winning masterpiece, To Kill a Mockingbird. Maycomb, Alabama. Twenty-six-year-old Jean Louise Finch--\"Scout\"--returns home from New York City to visit her aging father, Atticus. Set against the backdrop of the civil rights tensions and political turmoil that were transforming the South, Jean Louise\'s homecoming turns bittersweet when she learns disturbing truths about her close-knit family, the town and the people dearest to her. Memories from her childhood flood back, and her values and assumptions are thrown into doubt. Featuring many of the iconic characters from To Kill a Mockingbird, Go Set a Watchman perfectly captures a young woman, and a world, in a painful yet necessary transition out of the illusions of the past--a journey that can be guided only by one\'s conscience. Written in the mid-1950s, Go Set a Watchman imparts a fuller, richer understanding and appreciation of Harper Lee. Here is an unforgettable novel of wisdom, humanity, passion, humor and effortless precision--a profoundly affecting work of art that is both wonderfully evocative of another era and relevant to our own times. It not only confirms the enduring brilliance of To Kill a Mockingbird, but also serves as its essential companion, adding depth, context and new meaning to an American classic.',65000,NULL,'/cover_images/go-set-a-watchman.jpg',NULL,NULL),(17,2,10,'Fahrenheit 451','Guy Montag is a fireman. In his world, where television rules and literature is on the brink of extinction, firemen start fires rather than put them out. His job is to destroy the most illegal of commodities, the printed book, along with the houses in which they are hidden.\n\nMontag never questions the destruction and ruin his actions produce, returning each day to his bland life and wife, Mildred, who spends all day with her television \'family\'. But then he meets an eccentric young neighbor, Clarisse, who introduces him to a past where people did not live in fear and to a present where one sees the world through the ideas in books instead of the mindless chatter of television.\n\nWhen Mildred attempts suicide and Clarisse suddenly disappears, Montag begins to question everything he has ever known. ',80000,NULL,'/cover_images/fahrenheit-451.jpg',NULL,NULL);
/*!40000 ALTER TABLE `books` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `book_id` int(10) unsigned DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price_sum` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `carts_book_id_foreign` (`book_id`),
  CONSTRAINT `carts_book_id_foreign` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (68,17,2,160000,'2019-04-12 20:08:21','2019-04-12 20:08:21');
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'non-fiction',NULL,NULL),(2,'fiction',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre_lists`
--

DROP TABLE IF EXISTS `genre_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre_lists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre_lists`
--

LOCK TABLES `genre_lists` WRITE;
/*!40000 ALTER TABLE `genre_lists` DISABLE KEYS */;
INSERT INTO `genre_lists` VALUES (1,'non-fiction'),(2,'fiction'),(3,'autobiography'),(4,'biography'),(5,'business'),(6,'computer science'),(7,'classics'),(8,'science fiction'),(9,'history'),(10,'self help'),(11,'sociology'),(12,'philosophy'),(13,'fantasy'),(14,'science'),(15,'psychology'),(16,'essays');
/*!40000 ALTER TABLE `genre_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genres` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `book_id` int(10) unsigned NOT NULL,
  `genre_id` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `genres_books_FK` (`book_id`),
  KEY `genres_genre_list_FK` (`genre_id`),
  CONSTRAINT `genres_books_FK` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`),
  CONSTRAINT `genres_genre_list_FK` FOREIGN KEY (`genre_id`) REFERENCES `genre_lists` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (1,1,1),(2,1,5),(3,1,15),(4,1,11),(5,1,14),(6,2,1),(7,2,10),(8,2,15),(9,2,11),(10,2,14),(11,3,1),(12,3,10),(13,3,11),(14,3,15),(15,3,14),(16,3,5),(17,4,1),(18,4,15),(19,4,5),(20,4,11),(21,4,16),(22,5,1),(23,5,15),(24,5,5),(25,5,11),(26,6,1),(27,6,12),(28,6,15);
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned DEFAULT NULL,
  `token` varchar(255) NOT NULL,
  `type` varchar(80) NOT NULL,
  `is_revoked` tinyint(1) DEFAULT 0,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tokens_token_unique` (`token`),
  KEY `tokens_user_id_foreign` (`user_id`),
  KEY `tokens_token_index` (`token`),
  CONSTRAINT `tokens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
INSERT INTO `tokens` VALUES (1,3,'0d35362d-a930-46b3-8b58-7ed877cc93c2','jwt_refresh_token',0,'2019-04-16 18:33:22','2019-04-16 18:33:22'),(2,3,'27aa584d-f016-4e0e-8952-c7255516623e','jwt_refresh_token',0,'2019-04-17 16:21:52','2019-04-17 16:21:52');
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(80) NOT NULL,
  `email` varchar(254) NOT NULL,
  `password` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_username_unique` (`username`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'rohit','test@mail.com','$2a$10$kjZmEprd7HfpkpUzao032u983pbMjPyYjFAynLup1.vSgzARdWb7G','2019-04-16 13:42:54','2019-04-16 13:42:54'),(2,'asad','test@mail.id','$2a$10$/Kf.sgSf36n8vqsCW.1J9eSDJHVmZVtkxr1VSDerhfIn7lUIN2SkK','2019-04-16 17:55:30','2019-04-16 17:55:30'),(3,'tom','tom@mail.id','$2a$10$a/OlhOW6Rbh5pk6CKe8tJeB9.kO9dc3E3US0miF3FIn/5GxZtH6ce','2019-04-16 18:30:34','2019-04-16 18:30:34'),(4,'user','user@test.de','$2a$10$cKGAqyro2cl8INVrzxJyiuMPS/21Tdre7E8mO3oqdU7UqDZhIMXoa','2019-04-17 10:27:10','2019-04-17 10:27:10'),(5,'adudu','adu@mail.com','$2a$10$nCax3opoBOXE/HBRYWVOKex0nu9dpK7LLPQjrEhbCOPszusNo.Mfe','2019-04-17 16:09:41','2019-04-17 16:09:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'book_store'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-04-18  8:53:42
