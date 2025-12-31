-- ============================================
-- iTechMobile - Service Update Script
-- Run this in phpMyAdmin to update your services
-- Currency: CAD (Canadian Dollars)
-- ============================================

-- 1. Set Store Currency to CAD
UPDATE `settings` SET `value` = 'CAD' WHERE `key` = 'currency';

-- 2. Clear Previous Services
TRUNCATE TABLE services;

-- 3. Insert Complete Service List (CAD Pricing)
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
-- Verify: Check service count
-- ============================================
SELECT COUNT(*) as total_services FROM services;
SELECT category, COUNT(*) as count FROM services GROUP BY category;
