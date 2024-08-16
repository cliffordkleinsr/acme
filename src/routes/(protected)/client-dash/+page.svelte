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
    import LineChart from "lucide-svelte/icons/line-chart"
    import 'intro.js/minified/introjs.min.css'
    import introJs from 'intro.js'
	import { onMount } from "svelte";
    import ArrowUpRight from "lucide-svelte/icons/arrow-up-right"
    export let data

    const {all_surv, draft_surv, live_surv, closed_surv, count, payment, share } = data
   
    // custom param message
    let msg: string
    let visible = true
    
    onMount(async ()=>{
        const theme = localStorage.getItem('mode-watcher-mode')
        if (theme === 'dark') {
           await import('intro.js/themes/introjs-dark.css')
        }
        setTimeout(()=> {
            introJs().setOptions({
                "dontShowAgain": true,
                "disableInteraction":true
        }).start();
        }, 1500)
        
    })

    setTimeout(() => {
        visible = false 
    }, 2000)

    $: msg = $page.url.searchParams.get("notification") ?? ""
</script>
{#if visible && msg}
<div transition:fade={{delay:200, duration:300, easing:sineInOut}}>
    <Pretoast message={msg} type="warning"/>
</div>
{/if}
<div class="flex flex-col m-4 gap-10 mt-2" data-title="Welcome {data.AuthedUser}" data-intro='This is your dashboard'>
    <div class="ml-5 mb-2">
        <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/client-dash/audience">Audience</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/client-dash/analytics">Analytics</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Page>Dashboard</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    </div>
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:{share > 0? 'grid-cols-4':'grid-cols-3'}">     
        <Card.Root data-intro='Create new surveys by clicking here'>
            <Card.Header>
                <Card.Title><LineChart class="size-6 text-primary"/></Card.Title>
                <Card.Description class="text-balance leading-relaxed">
                    Create engaging surveys to improve your audience:
                </Card.Description>
            </Card.Header>
            <Card.Footer>
                <Button variant="default" href="/client-dash/surveys/create">Create New Survey</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
            data-intro='This displays your total surveys'
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
            data-intro='These are the total people who have taken a survey that you"ve created'
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
        {#if share > 0}    
            <Card.Root
                data-intro='These are the total people who have taken a survey that you"ve created'
                class="lg:max-w-sm"
                data-x-chunk-name="dashboard-05-chunk-2"
                data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar."
            >
                <Card.Header class="pb-2">
                    <Card.Description>Total Sharable Surveys</Card.Description>
                    <Card.Title class="text-3xl"></Card.Title>
                </Card.Header>
                <Card.Content class="text-3xl font-semibold">
                    {share}
                </Card.Content>
                <Card.Footer>
                    <Button href="/client-dash/surveys/sharable" size="default" variant='default' class="ml-auto gap-1 w-full">
                        View sharable surveys
                        <ArrowUpRight class="h-4 w-4" />
                    </Button>
                </Card.Footer>
            </Card.Root>    
        {/if}       
    </div>
</div>
<Tabs.Root value="draft" class="lg:w-full w-96 mx-auto">
    <Tabs.List class="grid w-80 lg:w-[35rem] grid-cols-3 mx-5">
      <Tabs.Trigger value="draft" data-intro='This tab shows draft surveys.'>Draft</Tabs.Trigger>
      <Tabs.Trigger value="running" data-intro='This tab shows surveys that are live.'>Running</Tabs.Trigger>
      <Tabs.Trigger value="completed" data-intro='This tab shows surveys that have been completed.'>Completed</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="draft">
        <DataTable data={draft_surv} payment_stat={payment.status} status ="Draft"/>
    </Tabs.Content>
    <Tabs.Content value="running">
        <DataTable data={live_surv} payment_stat={payment.status} status="Live"/>
    </Tabs.Content>
    <Tabs.Content value="completed">
        <DataTable data={closed_surv} payment_stat={payment.status} status="Closed"/>
    </Tabs.Content>
</Tabs.Root>  