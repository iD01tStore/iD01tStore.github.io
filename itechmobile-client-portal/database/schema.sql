-- ============================================
-- iTechMobile Database Schema
-- Complete GSM Unlock Store - CAD Currency
-- Secure API Integration with iPhoneUnlockingStore.com
-- ============================================

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

-- ============================================
-- Database
-- ============================================
CREATE DATABASE IF NOT EXISTS `itechmobile_db` 
DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `itechmobile_db`;

-- ============================================
-- Settings Table
-- ============================================
CREATE TABLE IF NOT EXISTS `settings` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `key` VARCHAR(100) NOT NULL,
    `value` TEXT,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `key` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Default Settings (CAD Currency)
INSERT INTO `settings` (`key`, `value`) VALUES
('currency', 'CAD'),
('currency_symbol', '$'),
('site_name', 'iTechMobile'),
('site_url', 'https://itechmobile.site'),
('admin_email', 'itechinfomtl@gmail.com'),
('paypal_email', 'itechinfomtl@gmail.com'),
('api_provider', 'iphoneunlockingstore'),
('api_enabled', '1');

-- ============================================
-- API Providers Table (Secure Key Storage)
-- Keys should be encrypted in production
-- ============================================
CREATE TABLE IF NOT EXISTS `api_providers` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `slug` VARCHAR(100) NOT NULL,
    `api_url` VARCHAR(500) NOT NULL,
    `api_key` VARCHAR(500) DEFAULT NULL COMMENT 'Encrypted API key - NEVER expose to frontend',
    `api_secret` VARCHAR(500) DEFAULT NULL COMMENT 'Encrypted API secret',
    `balance` DECIMAL(10,2) DEFAULT 0.00,
    `active` TINYINT(1) NOT NULL DEFAULT 1,
    `last_checked` DATETIME DEFAULT NULL,
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- API Provider Configuration
-- In production: Store encrypted keys here or use environment variables
INSERT INTO `api_providers` (`name`, `slug`, `api_url`, `active`) VALUES
('iPhoneUnlockingStore', 'iphoneunlockingstore', 'https://iphoneunlockingstore.com/api/', 1);

-- ============================================
-- Users Table
-- ============================================
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `google_id` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `photo` VARCHAR(500) DEFAULT NULL,
    `balance` DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    `role` ENUM('user', 'admin', 'reseller') NOT NULL DEFAULT 'user',
    `status` ENUM('active', 'suspended', 'banned') NOT NULL DEFAULT 'active',
    `api_key` VARCHAR(64) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `last_login` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `google_id` (`google_id`),
    UNIQUE KEY `email` (`email`),
    KEY `status` (`status`),
    KEY `role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Services Table
-- ============================================
CREATE TABLE IF NOT EXISTS `services` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `slug` VARCHAR(255) NOT NULL,
    `category` VARCHAR(50) NOT NULL,
    `description` TEXT,
    `price` DECIMAL(10,2) NOT NULL,
    `delivery_time` VARCHAR(50) NOT NULL,
    `icon` VARCHAR(100) DEFAULT 'fas fa-mobile-alt',
    `color` VARCHAR(20) DEFAULT '#00d4ff',
    `requires_carrier` TINYINT(1) NOT NULL DEFAULT 0,
    `requires_model` TINYINT(1) NOT NULL DEFAULT 0,
    `api_service_id` VARCHAR(100) DEFAULT NULL COMMENT 'External API service ID',
    `active` TINYINT(1) NOT NULL DEFAULT 1,
    `sort_order` INT(11) NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `slug` (`slug`),
    KEY `category` (`category`),
    KEY `active` (`active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- COMPLETE SERVICE LIST (CAD Pricing)
-- Your exact pricing from the SQL script
-- ============================================

INSERT INTO `services` 
(`name`, `slug`, `category`, `description`, `price`, `delivery_time`, `icon`, `color`, `active`, `sort_order`, `requires_carrier`, `created_at`) 
VALUES 

-- =============================================
-- 🔥 SPECIAL LAUNCH PROMOS
-- =============================================
('SPECIAL: Samsung Android 16 Remote Bypass', 'samsung-android-16-promo', 'samsung', 'LIMITED TIME LAUNCH PROMO! Remote USB Redirector bypass for latest Samsung Android 16 devices.', 20.00, '10-30 Mins', 'fas fa-fire', '#FF0000', 1, 1, 0, NOW()),

('PROMO: Any iPhone/iPad MDM Bypass', 'iphone-ipad-mdm-promo', 'apple', 'Bypass Mobile Device Management (Remote Management) profile on any iOS device. Instant removal.', 40.00, 'Instant', 'fas fa-id-badge', '#FF0000', 1, 2, 0, NOW()),

-- =============================================
-- 🍏 ICLOUD BYPASS (No Signal / WiFi Only)
-- =============================================
('iCloud Bypass - iPhone XR to 12 (No Signal)', 'icloud-xr-12-no-signal', 'apple', 'Bypass Hello Screen for iPhone XR, XS, 11, 12 series. WiFi usage only (No Calls/Data).', 40.00, 'Instant', 'fas fa-cloud', '#333333', 1, 10, 0, NOW()),

('iCloud Bypass - iPhone 13 to 15 (No Signal)', 'icloud-13-15-no-signal', 'apple', 'Bypass Hello Screen for iPhone 13, 14, 15 series. WiFi usage only (No Calls/Data).', 50.00, 'Instant', 'fas fa-cloud', '#333333', 1, 11, 0, NOW()),

('iCloud Bypass - iPhone 16 & 17 (No Signal)', 'icloud-16-17-no-signal', 'apple', 'Bypass Hello Screen for newest iPhone 16 & 17 series. WiFi usage only.', 60.00, 'Instant', 'fas fa-cloud', '#333333', 1, 12, 0, NOW()),

-- =============================================
-- 🍏 ICLOUD BYPASS (Remote / Direct +$20)
-- =============================================
('Remote iCloud Bypass - iPhone XR to 12', 'remote-icloud-xr-12', 'apple', 'We connect remotely to your PC to perform the bypass. iPhone XR to 12.', 60.00, '15-45 Mins', 'fas fa-desktop', '#1e88e5', 1, 15, 0, NOW()),

('Remote iCloud Bypass - iPhone 13 to 15', 'remote-icloud-13-15', 'apple', 'We connect remotely to your PC to perform the bypass. iPhone 13 to 15.', 70.00, '15-45 Mins', 'fas fa-desktop', '#1e88e5', 1, 16, 0, NOW()),

('Remote iCloud Bypass - iPhone 16 & 17', 'remote-icloud-16-17', 'apple', 'We connect remotely to your PC to perform the bypass. iPhone 16 & 17.', 80.00, '15-45 Mins', 'fas fa-desktop', '#1e88e5', 1, 17, 0, NOW()),

-- =============================================
-- 🤖 ANDROID FRP (Google Lock)
-- =============================================
('Android FRP - Old Versions (Tool)', 'android-frp-old', 'android', 'Remove Google Lock for older Android versions (Android 12 and below). Self-service tool.', 20.00, 'Instant', 'fab fa-google', '#4CAF50', 1, 20, 0, NOW()),

('Android FRP - Android 13/14 (Tool)', 'android-frp-13-14', 'android', 'Remove Google Lock for Android 13 and 14 devices. Self-service tool.', 40.00, 'Instant', 'fab fa-android', '#4CAF50', 1, 21, 0, NOW()),

('Android FRP - Android 15 (Tool)', 'android-frp-15', 'android', 'Remove Google Lock for Android 15 devices. Self-service tool.', 50.00, 'Instant', 'fab fa-android', '#4CAF50', 1, 22, 0, NOW()),

('Android FRP - Android 16 (Tool)', 'android-frp-16', 'android', 'Remove Google Lock for new Android 16 devices. Self-service tool.', 60.00, 'Instant', 'fab fa-android', '#4CAF50', 1, 23, 0, NOW()),

('Samsung FRP Bypass (IMEI) - Android 14 & Below', 'samsung-frp-imei', 'samsung', 'Official server bypass by IMEI. No PC required. Supports up to Android 14.', 50.00, '1-24 Hours', 'fas fa-globe', '#1428A0', 1, 24, 0, NOW()),

-- =============================================
-- 🤖 ANDROID REMOTE SERVICES (Direct +$20)
-- =============================================
('Remote Android FRP - Android 13/14', 'remote-frp-13-14', 'android', 'We connect remotely to your PC to unlock FRP. Android 13/14.', 60.00, '15-30 Mins', 'fas fa-headset', '#009688', 1, 25, 0, NOW()),

('Remote Android FRP - Android 15', 'remote-frp-15', 'android', 'We connect remotely to your PC to unlock FRP. Android 15.', 70.00, '15-30 Mins', 'fas fa-headset', '#009688', 1, 26, 0, NOW()),

('Remote Android FRP - Android 16', 'remote-frp-16', 'android', 'We connect remotely to your PC to unlock FRP. Android 16.', 80.00, '15-30 Mins', 'fas fa-headset', '#009688', 1, 27, 0, NOW()),

-- =============================================
-- 🛡️ MDM SOLUTIONS (Corporate Lock)
-- =============================================
('Android MDM Removal - Standard', 'android-mdm-std', 'android', 'Remove Corporate/Enterprise lock from standard Android devices.', 40.00, 'Instant', 'fas fa-building', '#607D8B', 1, 30, 0, NOW()),

('Android MDM Removal - Premium/Knox', 'android-mdm-prem', 'android', 'Remove high-security MDM (Knox/Enterprise) from premium devices.', 80.00, 'Instant', 'fas fa-shield-alt', '#607D8B', 1, 31, 0, NOW()),

('Remote MDM Removal - Any iPhone/iPad', 'remote-mdm-ios', 'apple', 'We connect remotely to remove the MDM profile from your iOS device.', 60.00, '15-30 Mins', 'fas fa-laptop-medical', '#607D8B', 1, 32, 0, NOW()),

-- =============================================
-- 🇺🇸 CARRIER UNLOCKS (API Based - CAD Pricing)
-- =============================================
('AT&T USA - iPhone All Models (Clean IMEI)', 'att-usa-clean', 'apple', 'Factory unlock for Clean AT&T devices. 100% Success.', 45.00, '1-24 Hours', 'fas fa-flag-usa', '#009FDB', 1, 40, 0, NOW()),

('AT&T USA - iPhone (Premium/Unpaid)', 'att-usa-premium', 'apple', 'Unlock for devices with Unpaid Bills or Active Line. High success rate.', 160.00, '3-7 Days', 'fas fa-file-invoice-dollar', '#009FDB', 1, 41, 0, NOW()),

('T-Mobile USA - iPhone Unlock (Clean)', 'tmobile-usa-clean', 'apple', 'Factory Unlock for T-Mobile USA. Clean IMEI only.', 150.00, '5-12 Days', 'fas fa-mobile-alt', '#E20074', 1, 42, 0, NOW()),

('Verizon USA - iPhone Unlock (Clean/Financed)', 'verizon-usa-service', 'apple', 'Unlock for Verizon devices. Supports Clean and Financed.', 35.00, '1-24 Hours', 'fas fa-check', '#CD040B', 1, 43, 0, NOW()),

('Bell / Virgin Canada - iPhone Unlock', 'bell-canada-unlock', 'apple', 'Official unlock for Bell or Virgin Mobile Canada.', 40.00, '1-24 Hours', 'fab fa-canadian-maple-leaf', '#005CA8', 1, 50, 0, NOW()),

('Rogers / Fido Canada - iPhone Unlock', 'rogers-canada-unlock', 'apple', 'Official unlock for Rogers or Fido Canada.', 40.00, '1-24 Hours', 'fas fa-signal', '#DA291C', 1, 51, 0, NOW()),

('Telus / Koodo Canada - iPhone Unlock', 'telus-canada-unlock', 'apple', 'Official unlock for Telus or Koodo Canada.', 40.00, '1-24 Hours', 'fas fa-tree', '#4B2882', 1, 52, 0, NOW()),

-- =============================================
-- 🔍 CHECKS (Profit Generators)
-- =============================================
('Full GSX Report (Carrier + Simlock)', 'full-gsx-check', 'imei', 'Complete Apple report: Carrier, Lock Status, Warranty, Purchase Date.', 5.00, 'Instant', 'fas fa-clipboard-list', '#555555', 1, 60, 0, NOW()),

('Blacklist Status Check (Worldwide)', 'blacklist-check-pro', 'imei', 'Check if reported Lost/Stolen and by which carrier.', 4.00, 'Instant', 'fas fa-ban', '#D32F2F', 1, 61, 0, NOW()),

('Simlock Status Check (Locked/Unlocked)', 'simlock-status', 'imei', 'Simple check to see if the device is Locked or Unlocked.', 3.00, 'Instant', 'fas fa-unlock-alt', '#4CAF50', 1, 62, 0, NOW());

-- ============================================
-- Orders Table
-- ============================================
CREATE TABLE IF NOT EXISTS `orders` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` VARCHAR(20) NOT NULL,
    `user_id` INT(11) UNSIGNED NOT NULL,
    `service_id` INT(11) UNSIGNED NOT NULL,
    `imei` VARCHAR(30) NOT NULL,
    `carrier` VARCHAR(100) DEFAULT NULL,
    `model` VARCHAR(100) DEFAULT NULL,
    `notes` TEXT,
    `amount` DECIMAL(10,2) NOT NULL,
    `status` ENUM('pending', 'processing', 'completed', 'failed', 'refunded', 'cancelled') NOT NULL DEFAULT 'pending',
    `result` TEXT COMMENT 'Unlock code or result message',
    `admin_notes` TEXT,
    `api_order_id` VARCHAR(100) DEFAULT NULL COMMENT 'External API order reference',
    `paypal_order_id` VARCHAR(50) DEFAULT NULL,
    `paypal_capture_id` VARCHAR(50) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    `completed_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `order_id` (`order_id`),
    KEY `user_id` (`user_id`),
    KEY `service_id` (`service_id`),
    KEY `status` (`status`),
    KEY `created_at` (`created_at`),
    CONSTRAINT `orders_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `orders_service_fk` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Transactions Table
-- ============================================
CREATE TABLE IF NOT EXISTS `transactions` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) UNSIGNED NOT NULL,
    `type` ENUM('deposit', 'order', 'refund', 'bonus', 'adjustment') NOT NULL,
    `amount` DECIMAL(10,2) NOT NULL,
    `balance_before` DECIMAL(10,2) NOT NULL,
    `balance_after` DECIMAL(10,2) NOT NULL,
    `description` VARCHAR(255) DEFAULT NULL,
    `reference_id` VARCHAR(100) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `type` (`type`),
    CONSTRAINT `transactions_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Support Tickets Table
-- ============================================
CREATE TABLE IF NOT EXISTS `tickets` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `ticket_id` VARCHAR(20) NOT NULL,
    `user_id` INT(11) UNSIGNED NOT NULL,
    `order_id` INT(11) UNSIGNED DEFAULT NULL,
    `subject` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `status` ENUM('open', 'pending', 'answered', 'closed') NOT NULL DEFAULT 'open',
    `priority` ENUM('low', 'medium', 'high', 'urgent') NOT NULL DEFAULT 'medium',
    `created_at` DATETIME NOT NULL,
    `updated_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE KEY `ticket_id` (`ticket_id`),
    KEY `user_id` (`user_id`),
    CONSTRAINT `tickets_user_fk` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Activity Log (Security Audit)
-- ============================================
CREATE TABLE IF NOT EXISTS `activity_log` (
    `id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) UNSIGNED DEFAULT NULL,
    `action` VARCHAR(100) NOT NULL,
    `description` TEXT,
    `ip_address` VARCHAR(45) DEFAULT NULL,
    `user_agent` VARCHAR(500) DEFAULT NULL,
    `created_at` DATETIME NOT NULL,
    PRIMARY KEY (`id`),
    KEY `user_id` (`user_id`),
    KEY `action` (`action`),
    KEY `created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Index Optimization
-- ============================================
CREATE INDEX idx_orders_user_status ON orders(user_id, status);
CREATE INDEX idx_services_category_active ON services(category, active);

-- ============================================
-- QUICK UPDATE SCRIPTS (Run separately if needed)
-- ============================================

-- To set currency to CAD:
-- UPDATE `settings` SET `value` = 'CAD' WHERE `key` = 'currency';

-- To make a user admin:
-- UPDATE `users` SET `role` = 'admin' WHERE `email` = 'your-email@gmail.com';

-- To update API keys (encrypt in production):
-- UPDATE `api_providers` SET `api_key` = 'YOUR_KEY', `api_secret` = 'YOUR_SECRET' WHERE `slug` = 'iphoneunlockingstore';
