import type { RequestHandler } from './$types';

import { SECRET_CONSUMER_KEY, SECRET_CONSUMER} from '$env/static/private'

const getAccessToken = async () => {
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    
    const auth = "Basic " + Buffer.from(SECRET_CONSUMER_KEY + ":" + SECRET_CONSUMER).toString("base64")

    const res = await fetch(url, {
        method:'GET',
        headers:{
            'Authorization': auth
        }
    })

    if(!res.ok) {
        new Error(`HTTP error! status: ${res.status}`)
    }

    return await res.json()
 
}
export const GET: RequestHandler = async () => {
    const accessToken = await getAccessToken()

    return new Response(JSON.stringify({accessToken}), {status: 200});
};