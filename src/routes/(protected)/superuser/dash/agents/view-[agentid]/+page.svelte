<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    import UserRound from 'lucide-svelte/icons/user-round'
	import { Separator } from '$lib/components/ui/separator';
    export let data: PageData;
    const {agent, pending} = data
</script>

<div class="grid gap-2 m-5 lg:max-w-xl max-w-md select-none">
    <div class="flex gap-3">
        <UserRound class="size-8" />
        <p class="text-2xl font-semibold">{agent.name}</p>
    </div>
    <p class="text-sm mx-11">{agent.email}</p>
    <div class="grid lg:grid-cols-2 gap-5">
        <div class="flex gap-2">
            <h1 class="text-lg font-semibold">
                Name:
            </h1>
            <p class="py-[7px] text-sm text-muted-foreground underline">
                {agent.name}
            </p>
        </div>
        <div class="flex gap-2">
            <h1 class="text-lg font-semibold">
                Email:
            </h1>
            <p class="py-[7px] text-sm text-muted-foreground underline">
                {agent.email}
            </p>
        </div>
        <div class="flex gap-2">
            <h1 class="text-lg font-semibold">
                Phone:
            </h1>
            <p class="py-[7px] text-sm text-muted-foreground underline">
                +{agent.phone}
            </p>
        </div>
        <div class="flex gap-2">
            <h1 class="text-lg font-semibold">
                Age:
            </h1>
            <p class="py-[7px] text-sm text-muted-foreground underline">
                {agent.age}
            </p>
        </div>
    </div>
    <Separator class='mt-4' />
        <h1 class="text-3xl m-5 text-end font-bold">Summary Statistics</h1>
        <div class="grid grid-cols-2 gap-2">
            <div class="grid gap-2">
                <h1 class="text-xl font-semibold text-muted-foreground">
                    Completed Surveys
                </h1>
                <p class="text-green-500 text-4xl font-bold">{agent.completes}</p>
            </div>
            <div class="grid gap-2">
                <h1 class="text-xl font-semibold text-muted-foreground">
                    Pending Surveys
                </h1>
                <p class="text-destructive text-4xl font-bold">{pending}</p>
            </div>
        </div>
    <Separator class='mt-4' />
    <div class="flex flex-1 justify-end">
        <p class="text-xs text-muted-foreground">{agent.id}</p>
        {#if agent.gender === 'female'}
            <svg xmlns="http://www.w3.org/2000/svg" class='w-9' viewBox="0 0 24 24"><path fill="none" stroke="currentColor" d="M12 15.5a7.5 7.5 0 1 1 0-15a7.5 7.5 0 0 1 0 15Zm0 0V24m-4-4h8"/></svg>
        {:else}
            <svg xmlns="http://www.w3.org/2000/svg" class='w-9' viewBox="0 0 256 256"><path fill="currentColor" d="M216 36h-48a4 4 0 0 0 0 8h38.35l-51.53 51.52a76 76 0 1 0 5.66 5.66L212 49.66V88a4 4 0 0 0 8 0V40a4 4 0 0 0-4-4m-63.93 164.11a68 68 0 1 1 0-96.18a68.08 68.08 0 0 1 0 96.18"/></svg>
        {/if}
    </div>
</div>

