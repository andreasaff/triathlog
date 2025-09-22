import { db } from '../index';
import { traning } from '../schema';

export async function createTraning(id: string, type: 'Running' | 'Cycling' | 'Swimming' | 'Strength', start: Date, end: Date, duration: number, description?: string) {
    const result = await db.insert(traning).values({
        id: id,
        type: type,
        start: start, // Pass the timestamp correctly
        end: end,
        duration: duration,
        description,
    }).returning();
    return result;
}