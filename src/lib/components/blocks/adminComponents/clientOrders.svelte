<script lang="ts">
    import * as Table from "$lib/components/ui/table"
    import * as Pagination from "$lib/components/ui/pagination"
	import { browser } from "$app/environment";
    import { Button } from "$lib/components/ui/button"

    type ClientSubs = {
        name:string
        email:string
        amt:string
    }
    let isDesktop = true
    
    if (browser) {
      isDesktop = window.innerWidth >= 768
    }
    export let subscriptions:ClientSubs[] =[]
    let count = subscriptions.length
    $: perPage = isDesktop ? 3 : 8;
    $: siblingCount = isDesktop ? 1 : 0;
</script>
<Table.Root>
    <Table.Header>
        <Table.Row>
            <Table.Head>Customer</Table.Head>
            <Table.Head class="text-right">Amount</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        {#if subscriptions.length > 5}
        {@const items = subscriptions.slice(0, 5)}
        {#each items as sub}
        <Table.Row>
            <Table.Cell>
                <div class="font-medium">{sub.name}</div>
                <div class="hidden text-sm text-muted-foreground md:inline">
                    {sub.email}
                </div>
            </Table.Cell>
            <Table.Cell class="text-right">${sub.amt}</Table.Cell>
        </Table.Row>
        {/each}
        {/if}
        
    </Table.Body>
</Table.Root>


