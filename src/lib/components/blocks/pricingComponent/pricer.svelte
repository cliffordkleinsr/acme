<script lang="ts">
	import { Label } from "$lib/components/ui/label";
    import * as Table from "$lib/components/ui/table";
    import * as Card from "$lib/components/ui/card";
	import { Switch } from "$lib/components/ui/switch";
	import { Button } from "$lib/components/ui/button";
    import Check from 'lucide-svelte/icons/check';
    import Minus from 'lucide-svelte/icons/minus'
    import { clientPackage } from '$lib/store'
	import type { CartItems } from "$lib/helperFunctions/helpers";


    let checked = false
    export let table:boolean= true
    export let applyLogic:boolean = false
    export let href:string='/client/register'
    export let Message:string='Sign Up'
    // pricing cards
    export let cardItems: CartItems=  [
            {
                subtitles: 'Basic',
                prices: '60',
                offers: '54',
                comments: 'Entry-level option to attract small businesses or clients with modest needs',
                features: [
                    'Up to 2 surveys per month',
                    'Up to 5 questions per survey.',
                    'Access to a limited respondent pool (100 respondents per survey)',
                    'Email support.'
                ]
            },
            {
                subtitles: 'Standard Business',
                prices: '200',
                offers: '180',
                comments: 'Entry-level option to attract small businesses or clients with modest needs',
                features: [
                    'Up to 4 surveys per month.',
                    'Up to 15 questions per survey.',
                    'Access to a expanded respondent pool (250 respondents per survey)',
                    'Advanced demographic segmentation (income, education level).',
                    'Analytics and reporting.',
                    'Email support.'
                ]
            },
            {
                subtitles: 'Premium Business',
                prices: '2000',
                offers: '1800',
                comments: 'Entry-level option to attract small businesses or clients with modest needs',
                features: [
                    'Up to 6 surveys per month.',
                    'Up to 30 questions per survey.',
                    'Access to a large  respondent pool (500 respondents per survey)',
                    'Advanced demographic segmentation (income, education level).',
                    'Analytics and reporting.',
                    'On demand technical support.'
                ]
            },
            {
                subtitles: 'Enterprise',
                prices: 'Custom',
                offers: 'Custom',
                comments: 'Entry-level option to attract small businesses or clients with modest needs',
                features: [
                    'Unlimited users',
                    'Unlimited Plan features',
                    'Unlimited Product support'
                ]
            },
        ]

    // comparator table
    // export let tableItems: {

    // }
    // export let subtitles:[]
    // export let prices:[]
    // export let offers:[]
    // export let comments:[]
    // export let features:[]



</script>
<!-- Pricing -->
<div class="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
    <!-- Title -->
    <div class="max-w-2xl mx-auto text-center mb-10 lg:mb-14">
      <h2 class="text-2xl font-bold md:text-4xl md:leading-tight dark:text-white">Pricing</h2>
      <p class="mt-1 text-gray-600 dark:text-neutral-400">Whatever your status, our offers evolve according to your needs.</p>
    </div>
    <!-- End Title -->
  
    <!-- Switch -->
    <div class="flex justify-center items-center">
      <Label class="min-w-14 text-sm text-gray-500 me-3 dark:text-neutral-400" for="airplane-mode">Monthly</Label>
      <Switch id="annual" bind:checked={checked}/>
      <Label class="relative min-w-14 text-sm text-gray-500 ms-3 dark:text-neutral-400" for="airplane-mode">Annual
        <span class="absolute -top-10 start-auto -end-28">
          <span class="flex items-center">
            <svg class="w-14 h-8 -me-6" width="45" height="25" viewBox="0 0 45 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M43.2951 3.47877C43.8357 3.59191 44.3656 3.24541 44.4788 2.70484C44.5919 2.16427 44.2454 1.63433 43.7049 1.52119L43.2951 3.47877ZM4.63031 24.4936C4.90293 24.9739 5.51329 25.1423 5.99361 24.8697L13.8208 20.4272C14.3011 20.1546 14.4695 19.5443 14.1969 19.0639C13.9242 18.5836 13.3139 18.4152 12.8336 18.6879L5.87608 22.6367L1.92723 15.6792C1.65462 15.1989 1.04426 15.0305 0.563943 15.3031C0.0836291 15.5757 -0.0847477 16.1861 0.187863 16.6664L4.63031 24.4936ZM43.7049 1.52119C32.7389 -0.77401 23.9595 0.99522 17.3905 5.28788C10.8356 9.57127 6.58742 16.2977 4.53601 23.7341L6.46399 24.2659C8.41258 17.2023 12.4144 10.9287 18.4845 6.96211C24.5405 3.00476 32.7611 1.27399 43.2951 3.47877L43.7049 1.52119Z" fill="currentColor" class="fill-gray-300 dark:fill-neutral-700"/>
            </svg>
            <span class="mt-3 inline-block whitespace-nowrap text-[11px] leading-5 font-semibold tracking-wide uppercase bg-orange-600 text-white rounded-full py-1 px-2.5">Save up to 10%</span>
          </span>
        </span>
      </Label>
    </div>
    <!-- End Switch -->
  
    <!-- Grid -->
    <div class="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:items-center">

      <!-- Card -->
    {#each cardItems as item}       
    <Card.Root class="{item.subtitles === 'Standard Business'? 'border-primary': ''} dark:shadow-lg hover:dark:shadow-orange-500/50 transition duration-1000">
        <Card.Header>
            {#if item.subtitles === 'Standard Business'}
                <Button class="w-32 h-6 mx-auto" disabled>MOST POPULAR</Button>
            {/if}
            <Card.Title class="font-bold text-center pb-5">{item.subtitles}</Card.Title>
            {#if checked}
                <Card.Title class="text-5xl font-bold text-center pb-2">${item.offers}</Card.Title>
            {:else}
                <Card.Title class="text-5xl font-bold text-center pb-2">{item.subtitles === 'Enterprise'? '': '$'}{item.prices}</Card.Title>
            {/if}
            <Card.Description class="text-center">{item.comments}</Card.Description>
        </Card.Header>
        <Card.Content>
            <ul class="mt-7 space-y-2.5 text-sm">
                {#each item.features as feat}
                <li class="flex space-x-2">
                    <svg class="flex-shrink-0 mt-0.5 size-4 text-blue-600 dark:text-blue-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    <span class="text-gray-800 dark:text-neutral-400">
                      {feat}
                    </span>
                  </li>
                {/each}
        </Card.Content>
        <Card.Footer>
            {#if item.subtitles === 'Enterprise'}
                <Button variant="outline" class="w-full">Contact Support</Button>  
            {:else}
                {#if applyLogic}
                    <Button variant="outline" class="w-full" on:click={()=> clientPackage.set({plan : item.subtitles, price : checked !== true? item.prices: String(parseInt(item.offers)*12)})} {href}>{Message}</Button>
                {:else}
                    <Button variant="outline" class="w-full" {href}>{Message}</Button>
                {/if}
            {/if}
            
        </Card.Footer>
    </Card.Root>
    {/each}
    <!-- End Card -->
    </div>
    <!-- End Grid -->
  
    <!-- Comparison table -->
     {#if table}
    <div class="mt-20 lg:mt-32">
        <div class="lg:text-center mb-10 lg:mb-20">
            <h3 class="text-2xl font-semibold dark:text-white">Compare plans</h3>
        </div>
        <Table.Root class="table-auto">
            <Table.Header>
                <Table.Row class="text-lg font-semibold dark:bg-neutral-900">
                    <Table.Head class="dark:text-white w-[23rem] text-black">Plans</Table.Head>
                    <Table.Head class="dark:text-white px-6 text-black">Basic</Table.Head>
                    <Table.Head class="dark:text-white text-black">Standard</Table.Head>
                    <Table.Head class="dark:text-white text-black">Premium</Table.Head>
                    <Table.Head class="dark:text-white text-black">Enterprise</Table.Head>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                <Table.Row class="font-bold bg-gray-100 dark:bg-neutral-700">
                    <Table.Cell>Survey Platform</Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>High Volume Survey Generation</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Sample Size</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Specific target respondents</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row class="font-bold bg-gray-100 dark:bg-neutral-700">
                    <Table.Cell>Social data</Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Sharable link</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Data Access</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Statistics</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row class="font-bold bg-gray-100 dark:bg-neutral-700">
                    <Table.Cell>On-chain data</Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Target Demographics</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Total circulation (beta)</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Mystery Shopper</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row class="font-bold bg-gray-100 dark:bg-neutral-700">
                    <Table.Cell>On Demand Support</Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                    <Table.Cell>
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Billing Statements</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell>Customer Support</Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Minus class=" text-neutral-700 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                    <Table.Cell>
                        <!-- Check -->
                        <Check class="text-orange-600 w-5 h-5" />
                    </Table.Cell>
                </Table.Row>

            </Table.Body>
        </Table.Root>
    </div>
    {/if}
</div>    
