import type { PageServerLoad, Actions } from './$types'
import { superValidate } from 'sveltekit-superforms';
import { traningFormSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';
import { createTraning } from '$lib/server/db/queries/traning';
import { v4 as uuidv4 } from 'uuid'

export const load: PageServerLoad = async () => {
    return {
        form: await superValidate(zod(traningFormSchema)),
    };
};

export const actions: Actions = {
    addTraning: async (event) => {

        const form = await superValidate(event, zod(traningFormSchema));

        if (!form.valid) {
            return fail(400, {
                form,
            });
        }

        console.log(form)

        let date = new Date(form.data.date)
        let duration = parseInt(form.data.duration);
        let startDateTime = new Date(date.setTime(parseInt(form.data.startTime) * 60 * 1000))
        let endDateTime = new Date(date.setTime(parseInt((form.data.startTime) + duration) * 60 * 1000))

        let id = uuidv4()

        createTraning(id, form.data.type, startDateTime, endDateTime, duration, form.data.description)

        return {
            form,
        };
    },
};