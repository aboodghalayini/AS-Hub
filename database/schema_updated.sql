-- AS Hub Database Schema (UPDATED)
-- Database: u643694170_Abood
-- Character Set: utf8mb4
-- Collation: utf8mb4_unicode_ci
-- Last Updated: 2025-12-08

-- ============================================
-- Table: admins
-- ============================================
CREATE TABLE IF NOT EXISTS `admins` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_is_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: services
-- ============================================
CREATE TABLE IF NOT EXISTS `services` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `language` ENUM('en', 'ar') NOT NULL DEFAULT 'en',
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `icon` VARCHAR(255) NULL,
  `description` TEXT NULL,
  `features` JSON NULL COMMENT 'Array of feature bullet points',
  `order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_language` (`language`),
  INDEX `idx_slug` (`slug`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_order` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: pricing_plans (UPDATED)
-- ============================================
CREATE TABLE IF NOT EXISTS `pricing_plans` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `language` ENUM('en', 'ar') NOT NULL DEFAULT 'en',
  `service_type` ENUM('website', 'app', 'both') NOT NULL DEFAULT 'website',
  `tier` ENUM('basic', 'professional', 'enterprise') NOT NULL DEFAULT 'basic',
  `name` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `price_monthly` DECIMAL(10, 2) NOT NULL,
  `price_yearly` DECIMAL(10, 2) NOT NULL,
  `features` JSON NULL COMMENT 'Array of features',
  `is_popular` TINYINT(1) DEFAULT 0,
  `order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_language` (`language`),
  INDEX `idx_service_type` (`service_type`),
  INDEX `idx_tier` (`tier`),
  INDEX `idx_slug` (`slug`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_order` (`order`),
  UNIQUE KEY `unique_plan` (`language`, `service_type`, `tier`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: features
-- ============================================
CREATE TABLE IF NOT EXISTS `features` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `language` ENUM('en', 'ar') NOT NULL DEFAULT 'en',
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NULL,
  `icon` VARCHAR(255) NULL,
  `order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_language` (`language`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_order` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: testimonials
-- ============================================
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `language` ENUM('en', 'ar') NOT NULL DEFAULT 'en',
  `client_name` VARCHAR(255) NOT NULL,
  `client_position` VARCHAR(255) NULL,
  `client_company` VARCHAR(255) NULL,
  `client_avatar` VARCHAR(255) NULL,
  `testimonial` TEXT NOT NULL,
  `rating` TINYINT UNSIGNED DEFAULT 5,
  `order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_language` (`language`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_order` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: faq
-- ============================================
CREATE TABLE IF NOT EXISTS `faq` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `language` ENUM('en', 'ar') NOT NULL DEFAULT 'en',
  `question` TEXT NOT NULL,
  `answer` TEXT NOT NULL,
  `category` VARCHAR(100) NULL,
  `order` INT DEFAULT 0,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_language` (`language`),
  INDEX `idx_category` (`category`),
  INDEX `idx_is_active` (`is_active`),
  INDEX `idx_order` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: leads
-- ============================================
CREATE TABLE IF NOT EXISTS `leads` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NULL,
  `company` VARCHAR(255) NULL,
  `message` TEXT NOT NULL,
  `plan` VARCHAR(100) NULL,
  `source` VARCHAR(100) DEFAULT 'website',
  `status` ENUM('new', 'contacted', 'qualified', 'converted', 'closed') DEFAULT 'new',
  `is_processed` TINYINT(1) DEFAULT 0,
  `processed_at` TIMESTAMP NULL,
  `processed_by` BIGINT UNSIGNED NULL,
  `notes` TEXT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_email` (`email`),
  INDEX `idx_status` (`status`),
  INDEX `idx_is_processed` (`is_processed`),
  INDEX `idx_created_at` (`created_at`),
  FOREIGN KEY (`processed_by`) REFERENCES `admins`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: settings
-- ============================================
CREATE TABLE IF NOT EXISTS `settings` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `language` ENUM('en', 'ar') NOT NULL DEFAULT 'en',
  `key` VARCHAR(255) NOT NULL,
  `value` TEXT NULL,
  `type` ENUM('text', 'textarea', 'json', 'boolean', 'number') DEFAULT 'text',
  `group` VARCHAR(100) DEFAULT 'general',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY `unique_language_key` (`language`, `key`),
  INDEX `idx_group` (`group`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table: media
-- ============================================
CREATE TABLE IF NOT EXISTS `media` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `filename` VARCHAR(255) NOT NULL,
  `original_name` VARCHAR(255) NOT NULL,
  `mime_type` VARCHAR(100) NOT NULL,
  `size` BIGINT UNSIGNED NOT NULL COMMENT 'Size in bytes',
  `path` VARCHAR(500) NOT NULL,
  `url` VARCHAR(500) NOT NULL,
  `alt_text` VARCHAR(255) NULL,
  `title` VARCHAR(255) NULL,
  `uploaded_by` BIGINT UNSIGNED NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_mime_type` (`mime_type`),
  INDEX `idx_uploaded_by` (`uploaded_by`),
  FOREIGN KEY (`uploaded_by`) REFERENCES `admins`(`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Insert Default Admin
-- ============================================
INSERT INTO `admins` (`name`, `email`, `password`, `is_active`) VALUES
('Admin', 'admin@ashub.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 1)
ON DUPLICATE KEY UPDATE `name` = 'Admin';
-- Default password: Admin@123

-- ============================================
-- Insert Default Settings
-- ============================================
INSERT INTO `settings` (`language`, `key`, `value`, `type`, `group`) VALUES
('en', 'site_name', 'AS Hub', 'text', 'general'),
('ar', 'site_name', 'AS Hub', 'text', 'general'),
('en', 'site_tagline', 'Your Digital Transformation Partner', 'text', 'general'),
('ar', 'site_tagline', 'شريكك في التحول الرقمي', 'text', 'general'),
('en', 'contact_email', 'info@ashub.com', 'text', 'contact'),
('ar', 'contact_email', 'info@ashub.com', 'text', 'contact'),
('en', 'contact_phone', '+1 (555) 123-4567', 'text', 'contact'),
('ar', 'contact_phone', '+1 (555) 123-4567', 'text', 'contact'),
('en', 'contact_address', '123 Business St, Tech City, TC 12345', 'text', 'contact'),
('ar', 'contact_address', '123 شارع الأعمال، مدينة التقنية، TC 12345', 'text', 'contact'),
('en', 'social_facebook', 'https://facebook.com/ashub', 'text', 'social'),
('en', 'social_twitter', 'https://twitter.com/ashub', 'text', 'social'),
('en', 'social_linkedin', 'https://linkedin.com/company/ashub', 'text', 'social'),
('en', 'social_instagram', 'https://instagram.com/ashub', 'text', 'social'),
('en', 'hero_title', 'Transform Your Business with AS Hub', 'text', 'hero'),
('ar', 'hero_title', 'حوّل عملك مع AS Hub', 'text', 'hero'),
('en', 'hero_subtitle', 'Professional web and mobile solutions tailored to your needs', 'text', 'hero'),
('ar', 'hero_subtitle', 'حلول ويب وموبايل احترافية مصممة خصيصاً لاحتياجاتك', 'text', 'hero')
ON DUPLICATE KEY UPDATE `value` = VALUES(`value`);

-- ============================================
-- Sample Pricing Plans (UPDATED with service_type and tier)
-- ============================================
INSERT INTO `pricing_plans` 
(`language`, `service_type`, `tier`, `name`, `slug`, `description`, `price_monthly`, `price_yearly`, `features`, `is_popular`, `order`, `is_active`) 
VALUES
-- Website Plans
('en', 'website', 'basic', 'Basic Website', 'basic-website', 'Perfect for small businesses and startups', 299.00, 2990.00, 
 '["Responsive Design", "5 Pages", "Contact Form", "Basic SEO", "1 Month Support"]', 0, 1, 1),
('en', 'website', 'professional', 'Professional Website', 'professional-website', 'Ideal for growing businesses', 599.00, 5990.00, 
 '["Responsive Design", "10 Pages", "Advanced Forms", "SEO Optimization", "CMS Integration", "3 Months Support"]', 1, 2, 1),
('en', 'website', 'enterprise', 'Enterprise Website', 'enterprise-website', 'Complete solution for large organizations', 1299.00, 12990.00, 
 '["Custom Design", "Unlimited Pages", "Advanced Features", "Full SEO Package", "Custom CMS", "12 Months Support", "Priority Support"]', 0, 3, 1),

-- App Plans
('en', 'app', 'basic', 'Basic Mobile App', 'basic-mobile-app', 'Simple app for your business', 799.00, 7990.00, 
 '["iOS & Android", "5 Screens", "Basic Features", "Push Notifications", "2 Months Support"]', 0, 4, 1),
('en', 'app', 'professional', 'Professional Mobile App', 'professional-mobile-app', 'Feature-rich mobile solution', 1499.00, 14990.00, 
 '["iOS & Android", "15 Screens", "Advanced Features", "API Integration", "Push Notifications", "Analytics", "6 Months Support"]', 1, 5, 1),
('en', 'app', 'enterprise', 'Enterprise Mobile App', 'enterprise-mobile-app', 'Complete mobile platform', 2999.00, 29990.00, 
 '["iOS & Android", "Unlimited Screens", "Custom Features", "Backend Development", "Advanced Analytics", "Cloud Integration", "12 Months Support", "Priority Support"]', 0, 6, 1),

-- Package Plans (Website + App)
('en', 'both', 'basic', 'Basic Package', 'basic-package', 'Website + App combo for startups', 999.00, 9990.00, 
 '["Responsive Website (5 Pages)", "Mobile App (5 Screens)", "Unified Design", "Basic Features", "3 Months Support"]', 0, 7, 1),
('en', 'both', 'professional', 'Professional Package', 'professional-package', 'Complete digital presence', 1899.00, 18990.00, 
 '["Professional Website (10 Pages)", "Professional App (15 Screens)", "Unified Branding", "Advanced Features", "API Integration", "6 Months Support"]', 1, 8, 1),
('en', 'both', 'enterprise', 'Enterprise Package', 'enterprise-package', 'Full-scale digital transformation', 3999.00, 39990.00, 
 '["Enterprise Website (Unlimited)", "Enterprise App (Unlimited)", "Custom Design & Features", "Full Backend", "Advanced Analytics", "Cloud Infrastructure", "12 Months Support", "Dedicated Team"]', 0, 9, 1),

-- Arabic Plans
('ar', 'website', 'basic', 'موقع أساسي', 'basic-website-ar', 'مثالي للشركات الصغيرة والناشئة', 299.00, 2990.00, 
 '["تصميم متجاوب", "5 صفحات", "نموذج اتصال", "تحسين محركات البحث الأساسي", "دعم لمدة شهر"]', 0, 1, 1),
('ar', 'website', 'professional', 'موقع احترافي', 'professional-website-ar', 'مثالي للشركات المتنامية', 599.00, 5990.00, 
 '["تصميم متجاوب", "10 صفحات", "نماذج متقدمة", "تحسين محركات البحث", "نظام إدارة محتوى", "دعم لمدة 3 أشهر"]', 1, 2, 1),
('ar', 'website', 'enterprise', 'موقع مؤسسي', 'enterprise-website-ar', 'حل كامل للمؤسسات الكبيرة', 1299.00, 12990.00, 
 '["تصميم مخصص", "صفحات غير محدودة", "ميزات متقدمة", "حزمة SEO كاملة", "نظام إدارة مخصص", "دعم لمدة 12 شهر", "دعم ذو أولوية"]', 0, 3, 1)
ON DUPLICATE KEY UPDATE `name` = VALUES(`name`);
