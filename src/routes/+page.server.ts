import type { PageServerLoad, Actions } from './$types'
import { superValidate } from 'sveltekit-superforms';
import { trainingFormSchema as trainingFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { createTraning, getAllTraning, getTraningByDate } from '$lib/server/db/queries/traning';
import { v4 as uuidv4 } from 'uuid'
import { start } from 'repl';
import { duration } from 'drizzle-orm/gel-core';

export const load: PageServerLoad = async () => {
    let tranings = await getAllTraning()
    let form = await superValidate(zod(trainingFormSchema))

    return {
        tranings: tranings,
        form: form
    };
};

const serverTrainingFormSchema = trainingFormSchema.refine(async schema => {
    const startMin = parseInt(schema.startTime)
    const endMin = startMin + parseInt(schema.duration)
    const onDay = await getTraningByDate(new Date(schema.date))
    return onDay.filter((t) => (t.startMin < endMin && startMin < (t.startMin + t.durationMin))).length == 0
}, { message: "Can't add colliding trainings", path: ['startTime'] })

export const actions: Actions = {
    addTraning: async (event) => {
        const form = await superValidate(event, zod(serverTrainingFormSchema));

        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        let formData = form.data
        let date = new Date(formData.date)

        let id = uuidv4()

        createTraning(id, formData.type, date, parseInt(formData.startTime), parseInt(formData.duration), formData.description)

        return {
            form,
        };
    },
};