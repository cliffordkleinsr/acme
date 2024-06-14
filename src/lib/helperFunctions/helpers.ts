import { DateFormatter } from "@internationalized/date"
import { tick } from "svelte"
import type { Cookies } from "@sveltejs/kit"
// import { PENDING_VERIFICATION_COOKIE, type pendingVerificationType } from "$lib/server/email"


let open:boolean
// Years from 1940 JSON
type Item = {
    value: number
    label: string
}
const items:Item[] = []
const currentYear:number = new Date().getFullYear()

for (let i = 0; i <= currentYear - 1940; i++) {
    const year = currentYear - i;
    items.push({ value: 365 * i, label: String(year) });
}

//Date formatter
const df = new DateFormatter("en-US", {
    dateStyle: "long"
})

//commandbox trigger
// We want to refocus the trigger button when the user selects
// an item from the list so users can continue navigating the
// rest of the form with the keyboard.

function closeAndFocusTrigger(triggerId: string) {
    open = false;
    tick().then(() => {
      document.getElementById(triggerId)?.focus();
    });
  }


function handleLoginRedirect(where : string , url: URL, notification:string='You Must Be logged In to view this page')
{
    const redirectTo = url.pathname + url.search

    return `${where}?redirectTo=${redirectTo}&notification=${notification}`
}

function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export {items, df, open,  closeAndFocusTrigger, handleLoginRedirect, capitalizeFirstLetter}