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
	import Chart from "$lib/components/blocks/chart.svelte";
	import { browser } from "$app/environment";
	import { adjustDivider } from "$lib/helperFunctions/helpers.js";
	   // custom param message
	let msg: string
    let visible = true
    export let data

    let mwacher:string|null =''
    if (browser) {
        mwacher = localStorage.getItem('mode-watcher-mode')
    }
    const { history, total_points, total_paid, total_payable} = data 
    setTimeout(() => {
        visible = false
    }, 2000)
    function formatter(val:Date) {
        return "Week of\n" + new Date(val).toLocaleDateString();
    }



    $: msg= $page.url.searchParams.get("notification") ?? ""

    const taken = history.map(item => formatter(item.week))
    const count = history.map(item=> item.count)
    let options = {
            theme: {
                    mode: mwacher, 
                    palette: 'palette1', 
                    monochrome: {
                        enabled: false,
                        color: '#255aee',
                        shadeTo: 'light',
                        shadeIntensity: 0.65
                    },
                },
            chart: {
                type: 'bar',
                height: 150,
            },
            colors: ['#F97316'],
            legend: {
                position: 'top',
                show: true
            },
            series: [{
                name: 'total answers',
                data: count
            }],
            xaxis: {
                name: 'date',
                categories: taken,
                axisTicks: {
                    show: true
                },
                // tickAmount:'dataPoints',
                tickPlacement: 'on',
                max:20
            },
            
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    borderRadiusApplication: 'end',
                    horizontal: true
                }
            },
            dataLabels: {
                enabled: false
            },
            title: {
                text: "Total Answers Weekly", 
            }
  
        }
        
        let divider: number = 500;
        divider = adjustDivider(total_points, divider)
        let mod = total_points/divider * 100 
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
                <Breadcrumb.Link href="/agent-dash/surveys/take">Questions</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/agent-dash/surveys/history">History</Breadcrumb.Link>
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
            class="max-w-lg"
        >
            <Card.Header class="pb-2 ">
                <Card.Description class="flex gap-16">
                    <p>Total Points Earned</p>
                    <p>Total Points Paid</p>
                    <p>Total Points Payable</p>
                </Card.Description>
                <Card.Title class="text-4xl flex gap-28">
                    <p>{total_points}</p> 
                    <p>{total_paid}</p>
                    <p>{total_payable}</p>
                </Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+{mod}% Progress to next payout</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={mod} aria-label="{mod}% increase" />
            </Card.Footer>
        </Card.Root>   
        <Card.Root
            class="sm:col-span-1 space-y-5"
        >
            <Card.Header class="pb-3">
                <Card.Title></Card.Title>
				<Card.Description>My Survey History</Card.Description>
            </Card.Header>
            <Card.Footer>
                <Button variant="default" href="/agent-dash/surveys/history">View history</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
            class="lg:max-w-sm"
        >
            <Card.Header class="pb-2">
                <Card.Description>Total surveys answered this week</Card.Description>
                <Card.Title class="text-3xl">{[history[0].week].length}</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+{history[history.length - 1].count}% from last week</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={history.length} aria-label="12% increase" />
            </Card.Footer>
        </Card.Root>            
    </div>
</div>
{#if count.length > 0}
    <Chart class="max-w-2xl ml-5 mt-5" options={options} />
{:else}
<p class="m-5 italic text-sm">take a survey to see your stats grow</p>
{/if}

