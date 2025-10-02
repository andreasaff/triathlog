CREATE TABLE `training` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`date` text NOT NULL,
	`start_min` integer NOT NULL,
	`duration_min` integer NOT NULL,
	`description` text,
	`is_completed` integer DEFAULT false NOT NULL
);
