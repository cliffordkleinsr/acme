<script lang="ts">
	import type { PageData } from './$types';
	import DataTable from './(tableau)/data-table.svelte';

	export let data: PageData;
	const { history } = data;
</script>

<DataTable data={history} />
