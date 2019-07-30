CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(30) NOT NULL,
    `password` VARCHAR(30) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `room`(
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(30) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `participants` (
	`id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`room_id`) REFERENCES room(`id`),
    FOREIGN KEY(`user_id`) REFERENCES user(`id`)
);

CREATE TABLE `message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `room_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `message` VARCHAR(500) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY(`room_id`) REFERENCES room(`id`),
    FOREIGN KEY(`user_id`) REFERENCES user(`id`)
);
