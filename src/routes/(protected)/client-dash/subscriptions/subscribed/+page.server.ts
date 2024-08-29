import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getSession } from '$lib/server/stripe/services';
import { db } from '$lib/server/db';
import { clientData, clientPackages } from '$lib/server/schema';
import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';

export const load: PageServerLoad = async ({url, locals}) => {
    const sessionId = url.searchParams.get("session_id")
    if (sessionId == null) {
        redirect(303, "/client-dash/subscriptions/cancel")
    }

    const session = await getSession(sessionId)
    if (session?.payment_status != "paid") {
        redirect(303, "/client-dash/subscriptions/cancel")
    }

    /**
     * If everything worked we need to save the payment information for that
     * particular user, though if we can't find the user we should roll back the
     * charge. This rollback has not been implemented.
     *
     */
    const prod_Id = session.subscription as Stripe.Subscription
    const productid = prod_Id.items.data[0].plan.product
    const typeid =  prod_Id.items.data[0].plan.id
    const at = prod_Id.created* 1000
    const expires = prod_Id.current_period_end *1000

    // logic to set true
    // TBA
    const [res] = await db.select({
        desc: clientPackages.packageDesc
    })
    .from(clientPackages)
    .where(
        eq(clientPackages.packageid, productid as string)
    )

    await db
    .update(clientData)
    .set({
        packageid:productid as string,
        typeid: typeid as string,
        payment_status:true,
        processed_at: new Date(at),
        expires_at: new Date(expires),
        onetime: res.desc === 'One-time'? true : false
    })
    .where(eq(clientData.clientId, locals.user?.id as string))

};