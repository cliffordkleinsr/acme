<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';

	import DataTable from './(tableau)/data-table.svelte';

	export let data: PageData;
	const { clients, survs, subs } = data;
</script>

<div class="mt-5 flex w-full flex-col gap-10 p-4">
	<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
		<Card.Root>
			<Card.Header>
				<Card.Title class="select-none">Total Clients</Card.Title>
			</Card.Header>
			<Card.Content class="select-none text-start text-4xl font-semibold text-primary">
				{clients.length}
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title class="select-none">Total Surveys</Card.Title>
			</Card.Header>
			<Card.Content class="select-none text-start text-4xl font-semibold text-muted-foreground">
				{survs.length}
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title class="select-none">Total Subscriptions</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="select-none text-start text-4xl font-semibold text-green-500">
				{subs.length}
			</Card.Content>
		</Card.Root>
	</div>
</div>

<DataTable data={clients} />
