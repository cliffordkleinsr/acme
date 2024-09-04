import { createRouteHandler } from 'uploadthing/server';
import type { RequestHandler } from './$types';
import { ourFileRouter } from '$lib/server/uploadthing';
import { UPLOADTHING_APP_ID, UPLOADTHING_SECRET } from '$env/static/private';

const { GET,  POST } = createRouteHandler({
    router: ourFileRouter,
    config: {
        uploadthingId: UPLOADTHING_APP_ID,
        uploadthingSecret: UPLOADTHING_SECRET
    }
})

export { GET, POST}