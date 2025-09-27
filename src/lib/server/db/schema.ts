import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { isodate } from './types/isodate'

export const training = sqliteTable('training', {
	id: text('id').primaryKey(),
	type: text('type', { enum: ['Running', 'Cycling', 'Swimming', 'Strength'] }).notNull(),
	date: isodate().notNull(),
	startMin: integer('start_min').notNull(), // start time in minutes since midnight
	durationMin: integer('duration_min').notNull(), // duration in minutes
	description: text('description'),
	isCompleted: integer('is_completed', { mode: 'boolean' }).notNull().default(false)
});
