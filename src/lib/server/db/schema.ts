import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { isodate } from './types/isodate'

export const traning = sqliteTable('traning', {
	id: text('id').primaryKey(),
	type: text('type', { enum: ['Running', 'Cycling', 'Swimming', 'Strength'] }).notNull(),
	start: isodate('start').notNull(),
	end: isodate('end'),
	duration: integer('duration').notNull(), // duration in minutes
	description: text('description'),
	iscompleted: integer('iscompleted', { mode: 'boolean' }).notNull().default(false)
});
