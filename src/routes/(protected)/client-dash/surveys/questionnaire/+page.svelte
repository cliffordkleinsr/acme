<script lang="ts">
	import DataTable from './data-table.svelte';

    export let data
    const { surv } = data
</script>

<DataTable data={surv} />