<script lang="ts">
	import DataTable from './(tableau)/data-table.svelte';
	export let data;
	const { available_qns } = data;
</script>

<DataTable data={available_qns} />
