<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import { Badge, badgeVariants } from '$lib/components/ui/badge/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import Grid from 'gridjs-svelte';
	import { h, html } from 'gridjs';
	import 'gridjs/dist/theme/mermaid.min.css';
	export let data;
	const { payment_requests } = data;

	const columns = [
		{
			id: 'name',
			name: 'Agent'
		},
		{
			id: 'status',
			name: 'Status',
			formatter: (cell: string) => {
				return h(
					'div',
					{
						className: badgeVariants({ variant: 'outline' })
					},
					cell
				);
			}
		},
		{
			id: 'amount',
			name: 'Amount (KES)',
			formatter: (cell: string) => `KES${cell}`
		},
		{
			id: 'requestedat',
			name: 'Date'
		},
		{
			name: 'Actions',
			id: 'id',
			formatter: (cell: string) =>
				html(
					`
				<div class='flex gap-2'>
				<form method='post'>
					<input type='text' name='payoutId' value=${cell} hidden/>
					<button type='submit' class='${buttonVariants({ variant: 'secondary' })}'>Pay</button>
					<button class='${buttonVariants({ variant: 'destructive' })}'>Decline</button>
				</div>
				`
				)
		}
	];
</script>

<Card.Root class="m-3">
	<Card.Header class="space-y-3">
		<Card.Title>Standing Orders</Card.Title>
		<Card.Description>
			Here you will be able to manage subsequent standing orders and incoming requests from agents.
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<Grid
			{columns}
			data={payment_requests}
			pagination={{
				enable: true,
				limit: 7
			}}
			className={{
				td: 'text-sm',
				pagination: 'text-sm'
			}}
		/>
	</Card.Content>
	<Card.Footer></Card.Footer>
</Card.Root>
