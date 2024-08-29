<script lang="ts">
	import { Button } from "$lib/components/ui/button"
	import * as Card from "$lib/components/ui/card"
    import { Progress } from "$lib/components/ui/progress"
	import ArrowUpRight from "lucide-svelte/icons/arrow-up-right"
    import Activity from "lucide-svelte/icons/activity"
    import RotateCw from "lucide-svelte/icons/rotate-cw"
	import LiveusersComponent from "$lib/components/blocks/adminComponents/liveusersComponent.svelte";
	import ClientOrders from "$lib/components/blocks/adminComponents/clientOrders.svelte";
	import { page } from "$app/stores";
	import { invalidateAll } from "$app/navigation";
	import { browser } from "$app/environment";
	import { onMount } from "svelte";
	import { applyAction, enhance } from "$app/forms";
	import Footer from "$lib/components/blocks/frontendComponents/footer.svelte";
    import ChevronLeft from 'lucide-svelte/icons/chevron-left'
    import ChevronRight from 'lucide-svelte/icons/chevron-right'
    export let data
    let clicked = false
    const { recent_users, client_subs, count_survs, week , live_cnt, pen_cnt, clo_cnt} = data

    

    const refresh = () => {
        clicked = true
        setTimeout(async () => {
            clicked = false
            if(browser) {
                window.location.reload()
            }

        }, 1500)
    }

   const tot_week =  week.filter(el => el.toime !== false)
</script>


<div class="flex flex-col p-4 gap-10 w-full mt-5">
      
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card.Root
            class="space-y-3"
             data-x-chunk-name="dashboard-05-chunk-0"
             data-x-chunk-description="A card for an orders dashboard with a description and a button to create a new order.">
            <Card.Header class="pb-3">
                <Card.Title class='text-3xl'>Pending Requests</Card.Title>
                <Card.Description class="max-w-lg text-balance leading-relaxed">
                    This is a list of requests to authorise agent payments
                </Card.Description>
            </Card.Header>
            <Card.Footer>
                <Button href='/superuser/dash/pending' variant='secondary' class='flex gap-2'>
                    View Pending Requests
                    <ArrowUpRight class='size-4'/>
                </Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
             data-x-chunk-name="dashboard-05-chunk-1"
             data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar.">
            <Card.Header class="pb-2">
                <Card.Description>Total Payments Sent Out</Card.Description>
                <Card.Title class="text-4xl">$1329</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+25% out of $5000</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={25} aria-label="{25}% increase" />
            </Card.Footer>
        </Card.Root>
        <Card.Root 
             data-x-chunk-name="dashboard-05-chunk-2"
             data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar.">
            <Card.Header class='grid gap-1'>
                <div class="grid grid-cols-3 gap-2">
                    <Card.Description>Closed Surveys</Card.Description>
                    <Card.Description>Active Surveys</Card.Description>
                    <Card.Description>Pending Surveys</Card.Description>
                    
                    <Card.Title class="text-4xl text-primary">{clo_cnt}</Card.Title>
                    <Card.Title class="text-4xl text-green-500">{live_cnt}</Card.Title>
                    <Card.Title class="text-4xl text-muted-foreground">{pen_cnt}</Card.Title>
                    
                </div>
                
            </Card.Header>
            <Card.Content>
                <Button class='w-full' variant='secondary' href='/superuser/dash/management'><ArrowUpRight class='size-4'/></Button>
            </Card.Content>
        </Card.Root>
        <Card.Root
             data-x-chunk-name="dashboard-01-chunk-3"
             data-x-chunk-description="A card showing the total active users and the percentage difference from last hour."
        >
            <Card.Header
                class="flex flex-row items-center justify-between space-y-0 pb-2"
            >
                <Card.Description>Total Surveys</Card.Description>
                <Activity class="h-4 w-4 text-muted-foreground" />
            </Card.Header>
            <Card.Content>
                <div class="text-4xl font-semibold">+{count_survs}</div>
            </Card.Content>
            <Card.Footer>
                <p class="text-xs text-muted-foreground">+{tot_week.length } since last week</p>
            </Card.Footer>
        </Card.Root>
    </div>
    <Card.Root class="lg:w-1/2 lg:ml-auto h-full">
    <Card.Header>
        <Card.Title class="place-content-evenly">
            Active Users
            <Button 
                size="icon" 
                variant="secondary" 
                class="float-end" 
                on:click={refresh} 
                disabled={clicked}
            >
                <RotateCw class="size-4 {clicked ? 'animate-spin' : ''}" />
            </Button>
        </Card.Title>
        
    </Card.Header>
    <Card.Content class="grid gap-8">
          <LiveusersComponent users={recent_users} />  
    </Card.Content>
</Card.Root>
</div>
<Card.Root class="m-4">
    <Card.Header class="flex flex-row items-center">
        <div class="grid gap-2">
            <Card.Title>Subscriptions</Card.Title>
            <Card.Description>Recent subscriptions from your clients.</Card.Description>
        </div>
    </Card.Header>
    <Card.Content>
        <ClientOrders subscriptions={client_subs}/>
    </Card.Content>
</Card.Root>


