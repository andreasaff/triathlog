import { eq } from 'drizzle-orm';
import { db } from '../index';
import { training } from '../schema';

// C
export async function createTraining(id: string, type: string, date: Date, startMin: number, durationMin: number, description?: string, isCompleted?: boolean): Promise<Training> {
    const result = await db.insert(training).values({
        id: id,
        type: type,
        date: date,
        startMin: startMin,
        durationMin: durationMin,
        description,
        isCompleted
    }).returning();
    return result[0];
}

// U
export async function updateTrainingById(id: string, type: string, startMin: number, durationMin: number, description?: string, isCompleted?: boolean): Promise<Training> {
    const result = await db.update(training).set({
        type: type,
        startMin: startMin,
        durationMin: durationMin,
        description: description,
        isCompleted: isCompleted
    }).where(eq(training.id, id)).returning();
    return result[0];
}

// R
export async function getAllTraining(): Promise<Training[]> {
    return await db.select().from(training);
}

export async function getTraningByDate(date: Date): Promise<Training[]> {
    return await db.query.training.findMany({
        where: eq(training.date, date)
    });
}

export async function getTrainingById(id: string): Promise<Training | undefined> {
    return await db.query.training.findFirst({
        where: eq(training.id, id)
    });
}

// D
export async function deleteTrainingById(id: string): Promise<void> {
    await db.delete(training).where(eq(training.id, id));
}

export type Training = typeof training.$inferSelect;