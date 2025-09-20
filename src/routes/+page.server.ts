import { createTraning } from "$lib/server/db/queries/traning"
import type { Actions } from "@sveltejs/kit"

export const actions: Actions = {
    default: async() => {
        // just for testing 
        const date = new Date()
        await createTraning('running', date, 3600000, "just a quick and dirty test")
        
    }
}