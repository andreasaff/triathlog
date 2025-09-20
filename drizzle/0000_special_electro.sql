CREATE TABLE `traning` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`start` text NOT NULL,
	`duration` integer NOT NULL,
	`description` text,
	`iscompleted` integer DEFAULT false NOT NULL
);
