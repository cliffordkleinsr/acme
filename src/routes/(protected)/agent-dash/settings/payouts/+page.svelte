<script lang="ts">
	import { badgeVariants } from "$lib/components/ui/badge";
	import { html } from "gridjs";
	import { cn } from "tailwind-variants";
    import Grid from "gridjs-svelte"
    import type { PageData } from './$types';
    import "gridjs/dist/theme/mermaid.min.css"

    export let data: PageData;

    const { payouts } = data
    const columns = [
            {
                id:'id',
                name: 'Payout Identifier',
            },
            {
                id: 'payout',
                name: 'Amount in Kshs',
                formatter: (cell:string) => `KES${cell}`
            },
            {
                id: 'status',
                name: 'Status',
                formatter: (cell:string) => html(`
                    <div class='${cn(badgeVariants({ variant: 'outline'}), 'dark:text-black')}'>${cell}</div>
                `)
            },
            {
                id: 'requested',
                name: 'Date Requested'
            },
            {
                id: 'processed',
                name: 'Date Requested'
            },
        ]   
</script>
{#if payouts.length > 0}
<div class="m-4 max-w-[23rem] lg:max-w-full prose">
    <h3>Payout Request History</h3>
    <Grid
            {columns}
            data={payouts}
            pagination={{
                enable:true,
                limit: 7
            }}
            className={{
                td: 'text-sm',
                pagination: 'text-sm'
            }}
        />
</div>
{/if}