import type { Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
    
}

export const actions: Actions = {
    submitDraft: async ({request}) => {
       const form = Object.fromEntries(await request.formData()) 
       console.log(form)
    }
}