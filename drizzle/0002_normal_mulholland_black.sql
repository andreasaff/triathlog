PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_traning` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`date` text NOT NULL,
	`start_min` integer NOT NULL,
	`duration_min` integer NOT NULL,
	`description` text,
	`is_completed` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_traning`("id", "type", "date", "start_min", "duration_min", "description", "is_completed") SELECT "id", "type", "date", "start_min", "duration_min", "description", "is_completed" FROM `traning`;--> statement-breakpoint
DROP TABLE `traning`;--> statement-breakpoint
ALTER TABLE `__new_traning` RENAME TO `traning`;--> statement-breakpoint
PRAGMA foreign_keys=ON;