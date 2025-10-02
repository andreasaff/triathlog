import * as z from 'zod';
import { config } from '$lib/config/config';

const MAX_DESCRIPTION_LENGTH = 255;

const trainingTypes = config.map(c => c.type) as [string, ...string[]];

export const trainingFormSchema = z.object({
    id: z.string().trim().uuid().optional(),
    date: z.string().trim(),
    startTime: z.string().trim().min(1, "Invalid starttime"),
    duration: z.string().trim().min(1, "Invalid duration"),
    type: z.enum(trainingTypes),
    description: z.string().max(MAX_DESCRIPTION_LENGTH, `Description may not exceeed ${MAX_DESCRIPTION_LENGTH} characters`).optional(),
    isCompleted: z.string().trim().default("false"),
}).refine(schema => {
    const start = parseInt(schema.startTime, 10);
    const duration = parseInt(schema.duration, 10);
    return !isNaN(start) && !isNaN(duration) && (start + duration) <= 24 * 60;
}, { message: "Trainings can't wrap past midnight", path: ['duration'] });

export type TrainingFormSchema = typeof trainingFormSchema;