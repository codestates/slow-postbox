CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `email` varchar(255),
  `salt` varchar(255),
  `password` varchar(255),
  `oauth` boolean,
  `admin` boolean,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `mails` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `writerEmail` varchar(255),
  `receiverEmail` varchar(255),
  `reserved_at` date,
  `title` varchar(255),
  `content` varchar(10000),
  `isChecked` boolean,
  `isRead` boolean,
  `created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
