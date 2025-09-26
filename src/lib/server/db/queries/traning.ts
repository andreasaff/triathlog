import { eq } from 'drizzle-orm';
import { db } from '../index';
import { traning } from '../schema';

export async function createTraning(id: string, type: 'Running' | 'Cycling' | 'Swimming' | 'Strength', date: Date, startMin: number, durationMin: number, description?: string) {
    const result = await db.insert(traning).values({
        id: id,
        type: type,
        date: date,
        startMin: startMin,
        durationMin: durationMin,
        description,
    }).returning();
    return result;
}

export async function getAllTraning() {
    return await db.select().from(traning)
}

export async function getTraningByDate(date: Date) {
    return await db.query.traning.findMany({
        where: eq(traning.date, date)
    });
}

export type Traning = typeof traning.$inferSelect