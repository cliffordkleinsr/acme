<script lang="ts">
	import DataTable from './(tableau)/data-table.svelte';

    export let data
    const { surv } = data
</script>

<DataTable data={surv} />