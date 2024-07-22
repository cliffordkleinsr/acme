import { writable } from "svelte/store";
import { persisted } from 'svelte-persisted-store'

// export let msg = writable<string[]>([])

export const clientPackage = persisted('client_package', {
    plan: 'None',
    price: '0',
    priceId:'None'
})

export const notifications = persisted('client_notifs', {
    messages: ['test message']
})