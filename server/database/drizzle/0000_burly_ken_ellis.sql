CREATE TABLE `tasks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`done` integer DEFAULT false NOT NULL,
	`createdAt` integer,
	`updatedAt` integer
);
