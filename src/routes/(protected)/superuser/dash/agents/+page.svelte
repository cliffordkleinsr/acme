<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './(tableau)/data-table.svelte';
	import * as Card from '$lib/components/ui/card';
	export let data: PageData;
	const { agents, total } = data;
</script>

<div class="mt-5 flex w-full flex-col gap-10 p-4">
	<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
		<Card.Root>
			<Card.Header>
				<Card.Title class="select-none">Total Agents</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="select-none text-start text-4xl font-semibold text-primary">
				{agents.length}
			</Card.Content>
		</Card.Root>
		<Card.Root>
			<Card.Header>
				<Card.Title class="select-none">Total Surveys Answered</Card.Title>
				<Card.Description></Card.Description>
			</Card.Header>
			<Card.Content class="select-none text-start text-4xl font-semibold text-green-500">
				{total}
			</Card.Content>
		</Card.Root>
	</div>
</div>
<DataTable data={agents} />
