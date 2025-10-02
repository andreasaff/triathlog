import { config } from '$lib/config/config';
import { createTraining, deleteTrainingById, getAllTraining, getTrainingById, getTraningByDate, updateTrainingById } from '$lib/server/db/queries/traning';
import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import type { Actions, PageServerLoad } from './$types';
import { trainingFormSchema } from './schema';


export const load: PageServerLoad = async () => {
    let trainings = await getAllTraining()
    let form = await superValidate(zod(trainingFormSchema))

    return {
        config: config,
        trainings: trainings,
        form: form
    };
};

const OVERLAPMESSAGE = 'Training overlaps with an already planned one';

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
            message: OVERLAPMESSAGE,
            path: ['startTime'],
        })
        ctx.addIssue({
            code: 'custom',
            message: OVERLAPMESSAGE,
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
        const isCompleted = (formData.isCompleted === 'true')

        if (!formData.id) {
            createTraining(uuidv4(), formData.type, date, parseInt(formData.startTime), parseInt(formData.duration), formData.description?.trim(), isCompleted)
            return { form };
        }

        const exists = getTrainingById(formData.id);

        if (!exists) {
            return fail(404);
        }

        updateTrainingById(formData.id, formData.type, parseInt(formData.startTime), parseInt(formData.duration), formData.description?.trim(), isCompleted)

        return { form };
    },

    deleteTraining: async ({ request }) => {
        const data = await request.formData()

        const id = data.get('id');

        if (!id || !uuidValidate(id.toString())) {
            return fail(400)
        }

        const ids = id.toString()

        const exists = getTrainingById(ids)

        if (!exists) {
            return fail(404)
        }

        deleteTrainingById(ids)
    }
};