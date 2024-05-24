import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({locals :{user}, cookies, url}) => {
    if (!user) {
        redirect(302, handleLoginRedirect('/agent/signin', url))
        // redirect('/respondent/signin', {type: "error", message:"You Must Be logged In to view this page"}, cookies)
    }
    if (user.role === "CLIENT") {
        redirect(302, handleLoginRedirect('/client-dash', url, "Not Authorised"))
    }
    return {
        url: url.pathname, 
        AuthedUser: user.fullname,    
    }
}