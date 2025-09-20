import { db } from '../index'
import { traning } from '../schema'
import { v4 as uuidV4 } from 'uuid'

export async function createTraning(type: 'running' | 'cycling' | 'swimming' | 'strength', start: Date, duration: number, description?: string) {
    const id = uuidV4()
    const result = await db.insert(traning).values({
        id,
        type,
        start, 
        duration,
        description,
    }).returning();
    return result;
}