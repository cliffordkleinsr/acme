<script lang="ts">
    import type { PageData } from './$types';
    import { PUBLIC_STRIPE_KEY } from '$env/static/public';
    import { loadStripe } from "@stripe/stripe-js"
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

    export let data: PageData;

    onMount(async() => {
        const stripe  = await loadStripe(PUBLIC_STRIPE_KEY)
        const clientSecret = data.clientSecret
        if (stripe && clientSecret) {
            const checkout = await stripe.initEmbeddedCheckout({
                clientSecret,
            })

            if (checkout) {
                checkout.mount("#checkout")
                return
            }
        }
         // If everything above fails, then reroute to the error page
         goto("/client-dash/subscriptions/cancel")
        
    })
</script>

<div id="checkout" class="m-10"></div>
