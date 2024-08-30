<script lang="ts">
    import type { PageData } from './$types';
	import DataTable from './(tableau)/data-table.svelte';
    
    export let data: PageData;
    const { draft_surveys, payment } = data
</script>
<DataTable data={draft_surveys} />