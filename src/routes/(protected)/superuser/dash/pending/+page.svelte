<script lang="ts">
	import Ellipsis from "lucide-svelte/icons/ellipsis";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Table from "$lib/components/ui/table/index.js";
	import  CreditCard  from "lucide-svelte/icons/credit-card";
	export let data
	const { payment_requests } = data

</script>

<Card.Root class='m-3'>
	<Card.Header class="space-y-3">
		<Card.Title>Standing Orders</Card.Title>
		<Card.Description>
			Here you will be able to manage subsequent standing orders
            and incoming requests from agents.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="hidden w-[100px] sm:table-cell">
						<span class="sr-only">Image</span>
					</Table.Head>
					<Table.Head>User</Table.Head>
					<Table.Head>Status</Table.Head>
					<Table.Head class="hidden md:table-cell">Value</Table.Head>
					<Table.Head class="hidden md:table-cell">Total Points</Table.Head>
					<Table.Head class="hidden md:table-cell">Requested at</Table.Head>
					<Table.Head>
						<span class="sr-only">Actions</span>
					</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
                {#each payment_requests as arb}
				<Table.Row>                
                    <Table.Cell class="hidden sm:table-cell">
						<img
							alt="Product example"
							class="aspect-square rounded-md object-cover"
							height="64"
							src="https://www.shadcn-svelte.com/images/placeholder.svg"
							width="64"
						/>
					</Table.Cell>
					<Table.Cell class="font-medium">{arb.name}</Table.Cell>
					<Table.Cell>
						<Badge variant="outline" class="{arb.status ==="complete"?"bg-primary": ""}">{arb.status}</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">KES {arb.amount}</Table.Cell>
					<Table.Cell class="hidden md:table-cell">{arb.amount}</Table.Cell>
					<Table.Cell class="hidden md:table-cell">
						{arb.requestedat}
					</Table.Cell>
					<Table.Cell>
						<!-- <DropdownMenu.Root>
							<DropdownMenu.Trigger asChild let:builder>
								<Button
									aria-haspopup="true"
									size="icon"
									variant="ghost"
									builders={[builder]}
								>
									<Ellipsis class="h-4 w-4" />
									<span class="sr-only">Toggle menu</span>
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content align="end">
								<DropdownMenu.Label>Actions</DropdownMenu.Label>
								<DropdownMenu.Item>Pay</DropdownMenu.Item>
								<DropdownMenu.Item>Reject</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root> -->
						<Button size="icon" variant="secondary" on:click={() => alert("Paid")}>Pay</Button>
						<Button variant="destructive" on:click={() => alert("Declined")}>Decline</Button>
					</Table.Cell>
				</Table.Row>
                {/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<div class="text-xs text-muted-foreground">
			Showing <strong>1-10</strong> of <strong>{payment_requests.length}</strong> requests
		</div>
	</Card.Footer>
</Card.Root>
