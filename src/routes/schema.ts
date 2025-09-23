import * as z from 'zod';

const MAX_DESCRIPTION_LENGTH = 255;

export const traningFormSchema = z.object({
    date: z.string().trim(), //todo security
    startTime: z.string().trim().min(1, "Invalid starttime"),
    duration: z.string().trim().min(1, "Invalid duration"),
    type: z.enum(['Running', 'Cycling', 'Swimming', 'Strength']),
    description: z.string().trim().max(MAX_DESCRIPTION_LENGTH, `Description may not exceeed ${MAX_DESCRIPTION_LENGTH} characters`).optional(),
    isCompleted: z.boolean().optional().default(false),
}).refine(schema => {
    const start = parseInt(schema.startTime, 10);
    const duration = parseInt(schema.duration, 10);
    return !isNaN(start) && !isNaN(duration) && (start + duration) <= 24 * 60;
}, { message: "Traning can't wrap past midnight", path: ['duration'] });

export type TraningFormSchema = typeof traningFormSchema;