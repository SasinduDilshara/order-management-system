DROP TABLE IF EXISTS `Orders`;
DROP TABLE IF EXISTS `Cargo`;

CREATE TABLE `Cargo` (
	`id` VARCHAR(191) NOT NULL,
	`lat` VARCHAR(191) NOT NULL,
	`lon` VARCHAR(191) NOT NULL,
	`startFrom` VARCHAR(191) NOT NULL,
	`endFrom` VARCHAR(191) NOT NULL,
	`cargoType` ENUM('ShipEx', 'CargoWave', 'TradeLogix') NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `Orders` (
	`id` VARCHAR(191) NOT NULL,
	`customerId` VARCHAR(191) NOT NULL,
	`date` VARCHAR(191) NOT NULL,
	`status` ENUM('PENDING', 'SHIPPED', 'DELIVERED', 'CANCELED', 'RETURNED') NOT NULL,
	`quantity` INT NOT NULL,
	`item` VARCHAR(191) NOT NULL,
	`cargoId` VARCHAR(191) NOT NULL,
	FOREIGN KEY(`cargoId`) REFERENCES `Cargo`(`id`),
	PRIMARY KEY(`id`)
);

INSERT INTO Cargo (id, lat, lon, startFrom, endFrom, cargoType)
VALUES
    ('S-224', '1.2312', '72.1110', 'London', 'Washington', 'SHIPEX'),
    ('S-225', '1.2542', '72.1650', 'Sydney', 'New York', 'TradeLogix'),
    ('S-226', '1.2992', '72.6550', 'Sydney', 'London', 'CargoWave');

CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6)
);

INSERT INTO locations (latitude, longitude)
VALUES
    (37.774929, -122.419416),
    (40.712776, -74.005974),
    (51.507351, -0.127758),
    (48.856613, 2.352222),
    (34.052235, -118.243683);
