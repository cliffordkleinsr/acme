<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import DataTable from "./(tableu)/data-table.svelte";

    export let data
    const { survs } = data
</script>

<Card.Root class='m-3'>
	<Card.Header class="px-7">
		<Card.Title>Surveys</Card.Title>
		<Card.Description>A list of all created surveys.</Card.Description>
	</Card.Header>
	<Card.Content>
			<DataTable data={survs} />
	</Card.Content>
</Card.Root>
