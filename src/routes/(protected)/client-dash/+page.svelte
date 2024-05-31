<script lang="ts">
	import { page } from "$app/stores"
	import Pretoast from "$lib/components/blocks/pretoast.svelte"
	import * as Breadcrumb from "$lib/components/ui/breadcrumb"
	import { Button } from "$lib/components/ui/button"
	import * as Card from "$lib/components/ui/card"
	import { Progress } from "$lib/components/ui/progress"
	import { sineInOut } from "svelte/easing"
	import { fade } from "svelte/transition"
    import * as Tabs from "$lib/components/ui/tabs"
    import DataTable from "$lib/components/base_table/data-table.svelte"
    import CandlestickChart from "lucide-svelte/icons/candlestick-chart"
    export let data
    const {all_surv, draft_surv, live_surv, closed_surv, count } = data

    // custom param message
    let msg: string
    let visible = true
    
    setTimeout(() => {
        visible = false 
    }, 2000)

    $: msg= $page.url.searchParams.get("notification") ?? ""
</script>
{#if visible && msg}
<div transition:fade={{delay:200, duration:300, easing:sineInOut}}>
    <Pretoast message={msg} type="warning"/>
</div>
{/if}
<div class="flex flex-col m-4 gap-10 mt-2">
    <div class="ml-5 mb-2">
        <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="##">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="##">Analytics</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Page>Dashboard</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    </div>
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">     
        <Card.Root>
            <Card.Header>
                <Card.Title><CandlestickChart class="size-6 text-primary"/></Card.Title>
                <Card.Description class="text-balance leading-relaxed">
                    Create beautiful and engaging surveys to impress your audience:
                </Card.Description>
            </Card.Header>
            <Card.Footer>
                <Button variant="default" href="/client-dash/surveys/create">Create New Survey</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
            class="max-w-lg"
            data-x-chunk-name="dashboard-05-chunk-1"
            data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
        >
            <Card.Header class="pb-2 ">
                <Card.Description>Total surveys</Card.Description>
                <Card.Title class="text-4xl">{all_surv.length}</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+{all_surv.length}% all time</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={all_surv.length} aria-label="{all_surv.length}% increase" />
            </Card.Footer>
        </Card.Root>
        <Card.Root
            class="lg:max-w-sm"
            data-x-chunk-name="dashboard-05-chunk-2"
            data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar."
        >
            <Card.Header class="pb-2">
                <Card.Description>Total agents</Card.Description>
                <Card.Title class="text-3xl">{count}</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+{count/100}% from last month</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={count} aria-label="{count/100}% increase" />
            </Card.Footer>
        </Card.Root>            
    </div>
</div>

<Tabs.Root value="draft" class="lg:w-full w-96 mx-auto">
    <Tabs.List class="grid w-80 lg:w-[35rem] grid-cols-3 mx-5">
      <Tabs.Trigger value="draft">Draft</Tabs.Trigger>
      <Tabs.Trigger value="running">Running</Tabs.Trigger>
      <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="draft">
        <DataTable data={draft_surv} type ={"Draft"}/>
    </Tabs.Content>
    <Tabs.Content value="running">
        <DataTable data={live_surv} type={"Live"}/>
    </Tabs.Content>
    <Tabs.Content value="completed">
        <DataTable data={closed_surv} type={"Closed"}/>
    </Tabs.Content>
</Tabs.Root>  