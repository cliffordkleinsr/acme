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

let likert_options = new Map();

likert_options.set('Agreement', [
  {option: "Strongly agree"},
  {option: "Agree"},
  {option: "Somewhat agree"},
  {option: "Neither agree or disagree"},
  {option: "Somewhat disagree"},
  {option: "Disagree"},
  {option: "Strongly disagree"},
]);

likert_options.set('Frequency', [
  {option: "Every time"},
  {option: "Usually (about 90% of the time)"},
  {option: "Frequently (about 70% of time)"},
  {option: "Sometimes (about 50% of the time)"},
  {option: "Occasionally (about 30% of the time)"},
  {option: "Rarely (less than 10% of the time)"},
  {option: "Never"},
]);

likert_options.set('Appropriateness', [
  {option: "Absolutely appropriate"},
  {option: "Appropriate"},
  {option: "Slightly appropriate"},
  {option: "Neutral"},
  {option: "Slightly inappropriate"},
  {option: "Inappropriate"},
  {option: "Absolutely inappropriate"},
]);

likert_options.set('Satisfaction', [
  {option: "Very satisfied"},
  {option: "Satisfied"},
  {option: "Slightly satisfied"},
  {option: "Neutral"},
  {option: "Slightly dissatisfied"},
  {option: "Dissatisfied"},
  {option: "Very dissatisfied"},
]);

likert_options.set('Reflective of me', [
  {option: "Very true of me"},
  {option: "True of me"},
  {option: "Somewhat true of me"},
  {option: "Neutral"},
  {option: "Somewhat untrue of me"},
  {option: "Untrue of me"},
  {option: "Very untrue of me"},
]);

likert_options.set('Level of difficulty', [
  {option: "Very hard"},
  {option: "Hard"},
  {option: "Somewhat hard"},
  {option: "Neutral"},
  {option: "Somewhat easy"},
  {option: "Easy"},
  {option: "Very easy"},
]);

likert_options.set('Priority', [
  {option: "Essential priority"},
  {option: "High priority"},
  {option: "Moderate priority"},
  {option: "Neutral"},
  {option: "Somewhat a priority"},
  {option: "Low priority"},
  {option: "Not a priority"},
]);

likert_options.set('Quality', [
  {option: "Excellent"},
  {option: "Good"},
  {option: "Above Average"},
  {option: "Average"},
  {option: "Below average"},
  {option: "Poor"},
  {option: "Very poor"},
]);

likert_options.set('Importance', [
  {option: "Very important"},
  {option: "Important"},
  {option: "Slightly important"},
  {option: "Neutral"},
  {option: "Slightly unimportant"},
  {option: "Unimportant"},
  {option: "Very unimportant"},
]);
export {items, df, open, likert_options, closeAndFocusTrigger, handleLoginRedirect, capitalizeFirstLetter}