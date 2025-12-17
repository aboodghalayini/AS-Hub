-- ============================================
-- Migration: Add service_type and tier to pricing_plans
-- Date: 2025-12-08
-- Description: Adds service_type and tier columns to support
--              categorization of pricing plans by service and level
-- ============================================

-- Add service_type column
ALTER TABLE `pricing_plans` 
ADD COLUMN `service_type` ENUM('website', 'app', 'both') NOT NULL DEFAULT 'website' 
AFTER `language`;

-- Add tier column
ALTER TABLE `pricing_plans` 
ADD COLUMN `tier` ENUM('basic', 'professional', 'enterprise') NOT NULL DEFAULT 'basic' 
AFTER `service_type`;

-- Add indexes for better query performance
ALTER TABLE `pricing_plans` 
ADD INDEX `idx_service_type` (`service_type`),
ADD INDEX `idx_tier` (`tier`);

-- Add unique constraint to prevent duplicate plans
-- (same language + service_type + tier combination)
ALTER TABLE `pricing_plans` 
ADD UNIQUE KEY `unique_plan` (`language`, `service_type`, `tier`);

-- ============================================
-- Verification Query
-- ============================================
-- Run this to verify the changes:
-- DESCRIBE pricing_plans;
-- SHOW INDEX FROM pricing_plans;
