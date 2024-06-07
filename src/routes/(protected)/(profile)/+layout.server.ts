import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';

export const load: LayoutServerLoad = async ({locals :{user}, cookies, url}) => {
    if (!user) {
        // redirect('/client/signin', {type: "error", message:"You Must Be logged In to view this page"}, cookies)
        redirect(302, handleLoginRedirect('/client/signin', url))
        // console.log(fromUrl)
    }
    if (user.role === "RESP") {
        redirect(302, handleLoginRedirect('/respondent-dash', url, "Not Authorised"))
    }
    return {
        AuthedUser: user.fullname,
        url: url.pathname, 
    }
}