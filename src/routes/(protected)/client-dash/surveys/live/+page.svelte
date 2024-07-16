<script lang="ts">
	import DataTable from '$lib/components/base_table/data-table.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
    const { draft_surveys, payment } = data
</script>
<DataTable data={draft_surveys} payment_stat={payment.status}/>