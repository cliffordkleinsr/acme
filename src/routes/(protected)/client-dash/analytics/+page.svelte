<script lang="ts">
  import * as Card from "$lib/components/ui/card"
  import ChartPie from 'lucide-svelte/icons/pie-chart'
  import UsersRound from "lucide-svelte/icons/users-round";
  import { Button } from "$lib/components/ui/button"
  import ArrowUpRight from "lucide-svelte/icons/arrow-up-right"
	import { Separator } from "$lib/components/ui/separator/index.js";
  import { Skeleton } from "$lib/components/ui/skeleton"
  
  export let data
  const { overview } = data


  const hashOut = (id:string) => {
    const visiblePart = id.slice(-4); // Get the last 4 characters
    const hashedPart = '•'.repeat(id.length - 4); // Hash out the rest
    
    return hashedPart + visiblePart
  }
</script>
<h1 class="text-3xl text-center m-2 text-muted-foreground">Historical Entries</h1>
<div class="grid lg:grid-cols-3 gap-4 m-3 w-full">
  {#if overview.length  > 0}
  {#each overview as view, ix}
    <Card.Root>
      <Card.Header class="space-y-3">
        <Card.Title class="text-muted-foreground">{ix+1}. Entry Title: {view.title}
          <ChartPie class="size-4 float-end"/>
        </Card.Title>
        
        <Card.Description class="gap-4 divide-y-[1px]">
          <p class="text-end">ID: {hashOut(view.id)}</p>
          <p class="text-end">Created On: {view.at}</p>
        </Card.Description>
      </Card.Header>
      <Card.Content class="space-y-3">
        <p class="text-muted-foreground">Total Agents</p>
        <div class="flex gap-3 text-muted-foreground">
          <UsersRound class="size-6"/> {view.tot_resp}
        </div>
        <Separator />
      </Card.Content>
      <Card.Footer>
        <Button href="/client-dash/analytics/{view.id}" size="sm" class="ml-auto gap-1" variant="secondary">
          View Analytics
          <ArrowUpRight class="h-4 w-4" />
      </Button>
      </Card.Footer>
    </Card.Root>
  {/each}
  {:else}
  <div class="m-5 w-full">
    <p class="italic text-sm">These statistics will grow as more people answer your surveys</p>
    <div class="flex flex-col gap-4 m-4">
      <Skeleton class="w-[200px] h-[20px] rounded-full" />
      <Skeleton class="w-[300px] h-[10px] rounded-full" />
    </div>
    <div class="md:flex gap-6 w-full space-x-4 ">
      <Skeleton class="size-40 rounded-full" />
      <div class="grid gap-1">
        <Skeleton class="w-[400px] h-[20px] rounded-full" />
        <Skeleton class="w-[400px] h-[20px] rounded-full" />
        <Skeleton class="w-[400px] h-[20px] rounded-full" />
      </div>
    </div>
  </div>
  {/if}

</div>
