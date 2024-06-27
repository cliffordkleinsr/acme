<script lang="ts">
    import * as Table from "$lib/components/ui/table"
    import { Badge } from "$lib/components/ui/badge"

    type ClientSubs = {
        name:string
        email:string
    }
    export let subscriptions:ClientSubs[] =[]
    const arbitrary_vals = [ 60, 200, 500, 2000, 5000]
</script>
<Table.Root>
    <Table.Header>
        <Table.Row>
            <Table.Head>Customer</Table.Head>
            <Table.Head class="text-right">Amount</Table.Head>
        </Table.Row>
    </Table.Header>
    <Table.Body>
        <Table.Row>
            {#each subscriptions as sub}
            <Table.Cell>
                <div class="font-medium">{sub.name}</div>
                <div class="hidden text-sm text-muted-foreground md:inline">
                    {sub.email}
                </div>
            </Table.Cell>
            <Table.Cell class="text-right">${arbitrary_vals[Math.floor(Math.random() * arbitrary_vals.length)]}</Table.Cell>
            {/each}
        </Table.Row>
    </Table.Body>
</Table.Root>