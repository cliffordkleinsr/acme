<script lang="ts">
    import type { PageData } from './$types';
	import DataTable from './(tableau)/data-table.svelte';
    import * as Card from "$lib/components/ui/card"
    export let data: PageData;
    const { agents, total } = data
</script>
<div class="flex flex-col p-4 gap-10 w-full mt-5"> 
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card.Root>
          <Card.Header>
            <Card.Title class="text-3xl select-none">Total Agents</Card.Title>
            <Card.Description>
            </Card.Description>
          </Card.Header>
          <Card.Content class="text-3xl font-semibold text-black text-start select-none">
            {agents.length}
          </Card.Content>
        </Card.Root>
        <Card.Root>
            <Card.Header>
              <Card.Title class="text-3xl select-none">Total Surveys Answered</Card.Title>
              <Card.Description>
              </Card.Description>
            </Card.Header>
            <Card.Content class="text-3xl font-semibold text-black text-start select-none">
              {total}
            </Card.Content>
        </Card.Root>
    </div>
</div>  
<DataTable data={agents}/>