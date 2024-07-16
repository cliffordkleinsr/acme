<script lang="ts">
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import ChevronRight from "lucide-svelte/icons/chevron-right";
	import Copy from "lucide-svelte/icons/copy";
	import CreditCard from "lucide-svelte/icons/credit-card";
	import EllipsisVertical from "lucide-svelte/icons/ellipsis-vertical";
	import Truck from "lucide-svelte/icons/truck";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Pagination from "$lib/components/ui/pagination/index.js";
	import { Separator } from "$lib/components/ui/separator/index.js";
	import type { PageData } from "./$types";
	import { getInitials } from "$lib/helperFunctions/helpers";
	import FileText from 'lucide-svelte/icons/file-text'

    
    export let data: PageData;

    const{ client_pack, AuthedUser, email } = data
    let date: string[]= [new Date(client_pack.at!).toDateString(), new Date(client_pack.at!).toLocaleTimeString()]
	const price = client_pack.plan!
	const vat = Math.round(parseInt(price) * 0.16)

	
    
</script>

{#if client_pack.payment_status}
<div id='printable' class="w-full">
<Card.Root class="overflow-hidden m-4 w-1/2">
	<Card.Header class="flex flex-row items-start bg-muted/50">
		<div class="grid gap-0.5">
			<Card.Title class="group flex items-center gap-2 text-lg">
				Package {client_pack.desc} 
				<Button
					size="icon"
					variant="outline"
					class="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<Copy class="h-3 w-3" />
					<span class="sr-only">Copy Order ID</span>
				</Button>
			</Card.Title>
			<Card.Description>Subscribed at: {date} </Card.Description>
		</div>
		<div class="ml-auto flex items-center gap-1" id="non-printable">
			<Button size="sm" variant="outline" class="h-8 gap-1">
				<Truck class="h-3.5 w-3.5" />
				<span class="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
					Modify Package
				</span>
			</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger asChild let:builder>
					<Button
						builders={[builder]}
						size="icon"
						variant="ghost"
						class="relative h-8 w-8"
					>
						<EllipsisVertical class="h-3.5 w-3.5" />
						<span class="sr-only">More</span>
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content align="end">
					<div class="" id="non-printable">
                	<Button variant='ghost' 
						class='w-full gap-3' 
						on:click={() => window.print()} 
					> 
						<FileText class="size-4"/>
						Export
					</Button>
					</div>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</div>
	</Card.Header>
	<Card.Content class="p-6 text-sm">
		<div class="grid gap-3">
			<div class="font-semibold">Order Details</div>
			<ul class="grid gap-3">
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">
						package id: {client_pack.packageid} 
					</span>
					<span>${Math.round(parseInt(price) - vat)}</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">
						VAT 
					</span>
					<span>${vat}</span>
				</li>
			</ul>
			<Separator class="my-2" />
			<ul class="grid gap-3">
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Subtotal</span>
					<span>${price}</span>
				</li>
				<li class="flex items-center justify-between">
					<span class="text-muted-foreground">Tax</span>
					<span>Inclusive</span>
				</li>
				<li class="flex items-center justify-between font-semibold">
					<span class="text-muted-foreground">Total</span>
					<span>${price}</span>
				</li>
			</ul>
		</div>
		<Separator class="my-4" />
		<div class="grid grid-cols-2 gap-4">
			<div class="grid gap-3">
				<div class="font-semibold">Customer Information</div>
				<address class="grid gap-0.5 not-italic text-muted-foreground">
					<span>{AuthedUser}</span>
					<span>{client_pack.count}.</span>
					<span>{client_pack.count}, {getInitials(client_pack.count)} 12345</span>
				</address>
			</div>
			<div class="grid auto-rows-max gap-3">
				<div class="font-semibold">Billing Information</div>
				<div class="text-muted-foreground">Same as shipping address</div>
			</div>
		</div>
		<Separator class="my-4" />
		<div class="grid gap-3">
			<div class="font-semibold">Customer Information</div>
			<dl class="grid gap-3">
				<div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Customer</dt>
					<dd>{AuthedUser}</dd>
				</div>
				<div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Email</dt>
					<dd>
						<a href="mailto:">{email}</a>
					</dd>
				</div>
				<div class="flex items-center justify-between">
					<dt class="text-muted-foreground">Phone</dt>
					<dd>
						<a href="tel:">{client_pack.Phone}</a>
					</dd>
				</div>
			</dl>
		</div>
		<Separator class="my-4" />
		<div class="grid gap-3">
			<div class="font-semibold">Payment Information</div>
			<dl class="grid gap-3">
				<div class="flex items-center justify-between">
					<dt class="flex items-center gap-1 text-muted-foreground">
						<CreditCard class="h-4 w-4" />
						Visa
					</dt>
					<dd>**** **** **** 4532</dd>
				</div>
			</dl>
		</div>
	</Card.Content>
	<Card.Footer
		class="flex flex-row items-center border-t bg-muted/50 px-6 py-3"
	>
		<div class="text-xs text-muted-foreground">
			Updated {new Date().toDateString()} {new Date().toLocaleTimeString()}
		</div>
		<Pagination.Root count={10} class="ml-auto mr-0 w-auto">
			<Pagination.Content>
				<Pagination.Item>
					<Button size="icon" variant="outline" class="h-6 w-6">
						<ChevronLeft class="h-3.5 w-3.5" />
						<span class="sr-only">Previous Order</span>
					</Button>
				</Pagination.Item>
				<Pagination.Item>
					<Button size="icon" variant="outline" class="h-6 w-6">
						<ChevronRight class="h-3.5 w-3.5" />
						<span class="sr-only">Next Order</span>
					</Button>
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</Card.Footer>
</Card.Root>
</div>
<style lang="css">
    @media print {
        :global(body) {
            visibility: hidden;
        }
        #non-printable { display: none; }
        #printable { display: block; }
    }
</style>
{:else}
	<h1 class="text-3xl m-4 text-center">You have not subscribed to any plan yet!</h1>
	<p class="text-xl text-center"> Subscribe to a plan in order to go live</p>
	<img class="w-1/2 mx-auto" src="https://i.postimg.cc/jjMJt36P/coming-soon.png" alt="soon">
{/if}