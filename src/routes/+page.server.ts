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

        let formData = form.data
        let date = new Date(formData.date)

        let id = uuidv4()

        createTraning(id, formData.type, date, parseInt(formData.startTime), parseInt(formData.duration), formData.description)

        return {
            form,
        };
    },
};