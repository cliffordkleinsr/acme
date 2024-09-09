<script lang="ts">
	import { page } from "$app/stores";
	import Pretoast from "$lib/components/blocks/pretoast.svelte";
	import { Button } from "$lib/components/ui/button";
	import { sineInOut } from "svelte/easing";
	import { fade } from "svelte/transition";
	import * as Card from "$lib/components/ui/card"
	import { Progress } from "$lib/components/ui/progress"
	import * as Breadcrumb from "$lib/components/ui/breadcrumb" 
	// import { onMount } from "svelte";
	import Chart from "$lib/components/blocks/apexchart/chart.svelte";
	import { browser } from "$app/environment";
	import { adjustDivider } from "$lib/helperFunctions/helpers.js";
    import ArrowUpRight from "lucide-svelte/icons/arrow-up-right"
    import Grid from "gridjs-svelte"
    import "gridjs/dist/theme/mermaid.min.css"
	import { html } from "gridjs";
	import { badgeVariants } from "$lib/components/ui/badge";
	import { cn } from "$lib/utils.js";
	   // custom param message
	let msg: string
    let visible = true
    export let data

    let mwacher:string|null =''
    if (browser) {
        mwacher = localStorage.getItem('mode-watcher-mode')
    }
    const { history, total_points, total_paid, total_payable, complete, pending, payouts} = data 
    setTimeout(() => {
        visible = false
    }, 2000)
    function formatter(val:Date) {
        return "Week of\n" + new Date(val).toLocaleDateString();
    }



    $: msg= $page.url.searchParams.get("notification") ?? ""

    let taken:any[] = []
    let count:any[] = []
    if (history.length > 0) {
        taken = history.map(item => formatter(item.week))
        count = history.map(item=> item.count)
    }
   
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
            class="max-w-xl space-y-3"
        >
            <Card.Header class="mb-2 ">
                <Card.Description class="flex gap-16">
                    <p>Total Points Earned</p>
                    <p>Total Points Paid</p>
                    <p>Total Points Payable</p>
                </Card.Description>
                <Card.Title class="text-4xl grid grid-cols-3 gap-10">
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
            <Card.Header class="mb-3">
                <Card.Title></Card.Title>
				<Card.Description>My Survey History</Card.Description>
            </Card.Header>
            <Card.Content>
                <p class="text-4xl text-green-500 font-semibold">{complete} <span class="text-xl text-muted-foreground">Completed</span></p>
            </Card.Content>
            <Card.Footer>
                <Button variant="outline" href="/agent-dash/surveys/history" class='flex gap-2 w-full bg-green-500 text-white hover:bg-green-500/80 hover:text-white'>
                    View history
                    <ArrowUpRight class='size-4'/>
                </Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
            class="lg:max-w-sm"
        >
            <Card.Header class="mb-2">
                <Card.Description >Cumulative Surveys</Card.Description>
                <Card.Title class="text-4xl text-green-500">{complete + pending}</Card.Title>
                <Card.Description >Eligible Surveys</Card.Description>
                <Card.Title class="text-4xl text-destructive">{pending}</Card.Title>
                <Card.Content >
                    <Button class='w-full flex gap-2' variant="secondary" href="/agent-dash/surveys/take">
                        Take a survey
                        <ArrowUpRight class='size-4'/>
                    </Button>
                </Card.Content>
            </Card.Header>
        </Card.Root>        
    </div>
    {#if count.length > 0}
    <Chart class="max-w-2xl ml-5 mt-5" options={options} />
    {:else}
    <p class="m-5 italic text-sm">take a survey to see your stats grow</p>
    {/if}
    
</div>
{#if payouts.length > 0}
<div class="m-4 max-w-[23rem] lg:max-w-full prose">
    <h2>Payout Request History</h2>
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
