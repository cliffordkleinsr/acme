<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import DataTable from "./(tableu)/data-table.svelte";

    export let data
    const { survs } = data
</script>

<div class="m-3 space-y-2">
	<h1 class="text-xl font-semibold">Surveys</h1>
	<p class="text-muted-forgeground text-sm">A list of all created surveys.</p>
</div>
<DataTable data={survs} />
