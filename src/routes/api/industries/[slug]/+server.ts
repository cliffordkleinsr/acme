import { industries } from "$lib/server/endpoints";

export const GET = async ({params}) => {
    if (params) {
        
        const insustry = industries.find((item) => item.industryName === params.slug )

        return new Response(JSON.stringify(insustry) ,{status: 200})
    }
};