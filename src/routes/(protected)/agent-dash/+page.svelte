<script lang="ts">
	import { page } from "$app/stores";
	import Pretoast from "$lib/components/blocks/pretoast.svelte";
	import { Button } from "$lib/components/ui/button";
	import { sineInOut } from "svelte/easing";
	import { fade } from "svelte/transition";
	import * as Card from "$lib/components/ui/card"
	import { Progress } from "$lib/components/ui/progress"
	import * as Breadcrumb from "$lib/components/ui/breadcrumb" 
	import { onMount } from "svelte";
	   // custom param message
	let msg: string
    let visible = true
    export let data
    const { history} = data
    console.log(history)
    setTimeout(() => {
        visible = false
    }, 2000)
    
    let dat = []
    let cat = []
    for (const {taken, count} of history) {
        let cate = taken.toLocaleTimeString()
        dat.push(count)
        cat.push(cate)
    }
    $: msg= $page.url.searchParams.get("notification") ?? ""
    let chartEl: HTMLDivElement
    let options = {
            chart: {
                type: 'area',
            },
            colors: ['#F97316'],
            legend: {
                position: 'top',
                show: true
            },
            series: [{
                name: 'count of answers',
                data: dat
            }],
            xaxis: {
                name: 'date',
                categories: cat
            },
            title: {
                text: "Count of Answers over Time", 
            }
  
        } 
    onMount(async () => {
        // let ApexCharts = await import('apexcharts')
        const module = await import('apexcharts');
        const ApexCharts = module.default
        const chart = new ApexCharts(chartEl, options)
        chart.render()
    })  
    
</script>
{#if visible && msg}
<div transition:fade={{delay:200, duration:300, easing:sineInOut}}>
    <Pretoast message={msg} type="warning"/>
</div>
{/if}
<div class="flex flex-col p-4 gap-10  mt-2">
    <div class="ml-5 pb-2">
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
        <Card.Root
            class="sm:col-span-1 space-y-5"
            data-x-chunk-name="dashboard-05-chunk-0"
            data-x-chunk-description="A card for an orders dashboard with a description and a button to create a new order."
        >
            <Card.Header class="pb-3">
                <Card.Title>My Survey History</Card.Title>
				<Card.Description></Card.Description>
            </Card.Header>
            <Card.Footer>
                <Button variant="default" href="/agent-dash/surveys/history">View history</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
            class="max-w-lg"
            data-x-chunk-name="dashboard-05-chunk-1"
            data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
        >
            <Card.Header class="pb-2 ">
                <Card.Description>This Week</Card.Description>
                <Card.Title class="text-4xl">10</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+25% from last week</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={25} aria-label="{25}% increase" />
            </Card.Footer>
        </Card.Root>
        <Card.Root
            class="lg:max-w-sm"
            data-x-chunk-name="dashboard-05-chunk-2"
            data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar."
        >
            <Card.Header class="pb-2">
                <Card.Description>This Month</Card.Description>
                <Card.Title class="text-3xl">20</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+10% from last month</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={12} aria-label="12% increase" />
            </Card.Footer>
        </Card.Root>            
    </div>
</div>
<div class=" max-w-2xl" bind:this={chartEl}></div>
