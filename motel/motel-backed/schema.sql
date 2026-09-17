-- MySQL 8.0+. Run once against a fresh database.
CREATE DATABASE IF NOT EXISTS motel CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE motel;
CREATE TABLE room_types (
 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 slug VARCHAR(80) NOT NULL UNIQUE,
 name VARCHAR(100) NOT NULL,
 nightly_rate DECIMAL(10,2) NOT NULL,
 capacity TINYINT UNSIGNED NOT NULL DEFAULT 2,
 active BOOLEAN NOT NULL DEFAULT TRUE,
 CHECK (nightly_rate > 0), CHECK (capacity > 0)
) ENGINE=InnoDB;
CREATE TABLE room_units (
 id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 room_type_id INT UNSIGNED NOT NULL,
 room_number VARCHAR(20) NOT NULL UNIQUE,
 active BOOLEAN NOT NULL DEFAULT TRUE,
 FOREIGN KEY (room_type_id) REFERENCES room_types(id)
) ENGINE=InnoDB;
CREATE TABLE bookings (
 id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 reference VARCHAR(24) NOT NULL UNIQUE,
 idempotency_key CHAR(36) NOT NULL UNIQUE,
 request_hash CHAR(64) NOT NULL,
 room_unit_id INT UNSIGNED NOT NULL,
 guest_name VARCHAR(100) NOT NULL,
 email VARCHAR(254) NOT NULL,
 phone VARCHAR(30) NOT NULL,
 check_in DATE NOT NULL,
 check_out DATE NOT NULL,
 guests TINYINT UNSIGNED NOT NULL,
 nights SMALLINT UNSIGNED NOT NULL,
 nightly_rate DECIMAL(10,2) NOT NULL,
 total_amount DECIMAL(12,2) NOT NULL,
 currency CHAR(3) NOT NULL DEFAULT 'AUD',
 notes TEXT,
 status ENUM('confirmed','cancelled') NOT NULL DEFAULT 'confirmed',
 terms_accepted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 FOREIGN KEY (room_unit_id) REFERENCES room_units(id),
 INDEX idx_booking_overlap(room_unit_id,status,check_in,check_out),
 CHECK (check_out > check_in), CHECK (guests > 0), CHECK (nights > 0)
) ENGINE=InnoDB;
CREATE TABLE contact_messages (
 id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 name VARCHAR(100) NOT NULL,
 email VARCHAR(254) NOT NULL,
 subject VARCHAR(100) NOT NULL,
 message TEXT NOT NULL,
 created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
CREATE TABLE newsletter_subscribers (
 id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
 email VARCHAR(254) NOT NULL UNIQUE,
 consent_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;
INSERT INTO room_types (id,slug,name,nightly_rate,capacity) VALUES
 (1,'oceanfront-terrace','Oceanfront Terrace',310,2),
 (2,'coastal-king','Coastal King',290,2),
 (3,'garden-courtyard','Garden Courtyard',190,2),
 (4,'ocean-breeze-twin','Ocean Breeze Twin',180,2);
INSERT INTO room_units (room_type_id,room_number) VALUES
 (1,'101'),(1,'102'),(2,'201'),(2,'202'),(2,'203'),(3,'301'),(3,'302'),(4,'401'),(4,'402');
-- Create a restricted application user separately; do not use root in .env.
-- CREATE USER 'motel_app'@'%' IDENTIFIED BY 'your-strong-password';
-- GRANT SELECT, INSERT, UPDATE ON motel.* TO 'motel_app'@'%';
