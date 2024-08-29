<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    
	  import DataTable from './(tableau)/data-table.svelte';
    
    export let data: PageData;
    const { clients, survs, subs } = data
</script>
<div class="flex flex-col p-4 gap-10 w-full mt-5"> 
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card.Root>
          <Card.Header>
            <Card.Title class="select-none">Total Clients</Card.Title>
          </Card.Header>
          <Card.Content class="text-4xl font-semibold text-primary text-start select-none">
            {clients.length}
          </Card.Content>
        </Card.Root>
        <Card.Root>
            <Card.Header>
              <Card.Title class="select-none">Total Surveys</Card.Title>
            </Card.Header>
            <Card.Content class="text-4xl font-semibold text-muted-foreground text-start select-none">
              {survs.length}
            </Card.Content>
        </Card.Root>
        <Card.Root>
            <Card.Header>
              <Card.Title class="select-none">Total Subscriptions</Card.Title>
              <Card.Description>
              </Card.Description>
            </Card.Header>
            <Card.Content class="text-4xl font-semibold text-green-500 text-start select-none">
              {subs.length}
            </Card.Content>
          </Card.Root>
    </div>
</div>

<DataTable data={clients}/>