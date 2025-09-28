import { createTraining, getAllTraining, getTrainingById, getTraningByDate, updateTrainingById } from '$lib/server/db/queries/traning';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { v4 as uuidv4 } from 'uuid';
import type { Actions, PageServerLoad } from './$types';
import { trainingFormSchema } from './schema';

export const load: PageServerLoad = async () => {
    let trainings = await getAllTraining()
    let form = await superValidate(zod(trainingFormSchema))

    return {
        trainings: trainings,
        form: form
    };
};

const serverTrainingFormSchema = trainingFormSchema.superRefine(async (schema, ctx) => {
    const startMin = parseInt(schema.startTime)
    const endMin = startMin + parseInt(schema.duration)

    const onDay = await getTraningByDate(new Date(schema.date))

    const hasOverlap = onDay
        .filter(t => schema.id !== t.id)
        .some(t => t.startMin < endMin && startMin < (t.startMin + t.durationMin))

    if (hasOverlap) {
        ctx.addIssue({
            code: 'custom',
            message: 'Training overlaps with an already planned one',
            path: ['startTime'],
        })
        ctx.addIssue({
            code: 'custom',
            message: 'Training overlaps with an already planned one',
            path: ['duration'],
        })
    }
})
export const actions: Actions = {
    saveTraining: async (event) => {
        const form = await superValidate(event, zod(serverTrainingFormSchema));

        if (!form.valid) {
            return fail(400, {
                form
            });
        }

        const formData = form.data
        const date = new Date(formData.date)

        if (!formData.id) {
            createTraining(uuidv4(), formData.type, date, parseInt(formData.startTime), parseInt(formData.duration), formData.description)
            return { form };
        }

        const exists = getTrainingById(formData.id);

        if (!exists) {
            return fail(404);
        }

        updateTrainingById(formData.id, formData.type, parseInt(formData.startTime), parseInt(formData.duration), formData.description)

        return { form };
    },
};