<script lang="ts">
	import Ellipsis from "lucide-svelte/icons/ellipsis";
	import { Badge } from "$lib/components/ui/badge/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
	import * as Table from "$lib/components/ui/table/index.js";

    const arbitrary_data = [
        {name: 'Christine Opadoh', status: 'pending', value: '$4.99',  points: '60', at:'2024-07-12 10:42 AM'},
        {name: 'Austine Kiptoo', status: 'complete', value: '$2.99',  points: '30', at:'2024-09-12 12:42 PM'},
    ]
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
                {#each arbitrary_data as arb}
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
                        
						<Badge variant="outline">{arb.status}</Badge>
					</Table.Cell>
					<Table.Cell class="hidden md:table-cell">{arb.value}</Table.Cell>
					<Table.Cell class="hidden md:table-cell">{arb.points}</Table.Cell>
					<Table.Cell class="hidden md:table-cell">
						{arb.at}
					</Table.Cell>
					<Table.Cell>
						<DropdownMenu.Root>
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
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
                {/each}
			</Table.Body>
		</Table.Root>
	</Card.Content>
	<Card.Footer>
		<div class="text-xs text-muted-foreground">
			Showing <strong>1-10</strong> of <strong>32</strong> products
		</div>
	</Card.Footer>
</Card.Root>
