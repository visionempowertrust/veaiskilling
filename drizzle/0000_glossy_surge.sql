CREATE TABLE `completions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`score` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `feedback` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`state` text NOT NULL,
	`school` text NOT NULL,
	`role` text NOT NULL,
	`facilitator` text NOT NULL,
	`confidence` integer NOT NULL,
	`verify` integer NOT NULL,
	`useful` integer NOT NULL,
	`responsible` integer NOT NULL,
	`inclusive` integer NOT NULL,
	`went_well` text NOT NULL,
	`improve` text NOT NULL,
	`next_topics` text NOT NULL,
	`recommend` text NOT NULL,
	`other` text DEFAULT '',
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
