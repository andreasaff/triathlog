import { eq } from 'drizzle-orm';
import { db } from '../index';
import { training } from '../schema';

// C
export async function createTraining(id: string, type: 'Running' | 'Cycling' | 'Swimming' | 'Strength', date: Date, startMin: number, durationMin: number, description?: string) {
    const result = await db.insert(training).values({
        id: id,
        type: type,
        date: date,
        startMin: startMin,
        durationMin: durationMin,
        description,
    }).returning();
    return result;
}

// U
export async function updateTrainingById(id: string, type: 'Running' | 'Cycling' | 'Swimming' | 'Strength', startMin: number, durationMin: number, description?: string) {
    const result = await db.update(training).set({
        type: type,
        startMin: startMin,
        durationMin: durationMin,
        description: description
    }).where(eq(training.id, id)).returning()
    return result;
}

export async function updateTrainingdoneById(id: string, isCompleted: boolean) {
    const result = await db.update(training).set({
        isCompleted: isCompleted
    })
}

// R
export async function getAllTraining() {
    return await db.select().from(training)
}

export async function getTraningByDate(date: Date) {
    return await db.query.training.findMany({
        where: eq(training.date, date)
    });
}

// D
export async function deleteTrainingById(id: string) {
    return await db.delete(training).where(eq(training.id, id))
}

export type Traning = typeof training.$inferSelect