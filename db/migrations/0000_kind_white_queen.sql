CREATE TABLE `faq_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`question_bg` text NOT NULL,
	`question_en` text NOT NULL,
	`answer_bg` text NOT NULL,
	`answer_en` text NOT NULL,
	`display_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `faq_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `inquiries` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_slug` varchar(255) NOT NULL,
	`service_title_bg` text NOT NULL,
	`service_title_en` text NOT NULL,
	`names` varchar(255) NOT NULL,
	`phone` varchar(64) NOT NULL,
	`city` varchar(255) NOT NULL DEFAULT '',
	`desired_date` varchar(64) NOT NULL DEFAULT '',
	`message` text NOT NULL DEFAULT (''),
	`status` enum('new','read','archived') NOT NULL DEFAULT 'new',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `inquiries_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_items` (
	`id` int AUTO_INCREMENT NOT NULL,
	`service_id` int NOT NULL,
	`label_bg` text NOT NULL,
	`label_en` text NOT NULL,
	`display_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `service_items_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `services` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(255) NOT NULL,
	`title_bg` text NOT NULL,
	`title_en` text NOT NULL,
	`description_bg` text NOT NULL,
	`description_en` text NOT NULL,
	`image_path` varchar(512) NOT NULL,
	`image_alt_bg` varchar(512) NOT NULL DEFAULT '',
	`image_alt_en` varchar(512) NOT NULL DEFAULT '',
	`display_order` int NOT NULL DEFAULT 0,
	CONSTRAINT `services_id` PRIMARY KEY(`id`),
	CONSTRAINT `services_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `site_settings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`key` varchar(255) NOT NULL,
	`value` text NOT NULL DEFAULT (''),
	`label` varchar(255) NOT NULL DEFAULT '',
	`group_name` varchar(255) NOT NULL DEFAULT 'general',
	CONSTRAINT `site_settings_id` PRIMARY KEY(`id`),
	CONSTRAINT `site_settings_key_unique` UNIQUE(`key`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`name` varchar(255),
	`role` enum('admin','client') NOT NULL DEFAULT 'client',
	`created_at` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `service_items` ADD CONSTRAINT `service_items_service_id_services_id_fk` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE cascade ON UPDATE no action;