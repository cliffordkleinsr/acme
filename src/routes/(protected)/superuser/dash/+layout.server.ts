import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { handleLoginRedirect } from '$lib/helperFunctions/helpers';

export const load: LayoutServerLoad = async ({locals :{user}, cookies, url}) => {
    if (!user) {
        // redirect('/client/signin', {type: "error", message:"You Must Be logged In to view this page"}, cookies)
        redirect(302, handleLoginRedirect('/superuser', url, "Not Authorised"))
        // console.log(fromUrl)
    }
};