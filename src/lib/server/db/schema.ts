import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { isodate } from './types/isodate'

export const traning = sqliteTable('traning', {
	id: text('id').primaryKey(),
	type: text('type', {enum: ['running', 'cycling', 'swimming', 'strength']}).notNull(),
	start: isodate('start').notNull(),
	duration: integer('duration').notNull(), // duration in ms 
	description: text('description'),
	iscompleted: integer('iscompleted', {mode: 'boolean'}).notNull().default(false)
});
