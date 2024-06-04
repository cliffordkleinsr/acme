import { writable } from "svelte/store";

export let msg = writable<string[]>([])