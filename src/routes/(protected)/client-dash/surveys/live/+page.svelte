<script lang="ts">
	import DataTable from '$lib/components/base_table/data-table.svelte';
    import type { PageData } from './$types';
    
    export let data: PageData;
    const { all_surveys } = data
</script>
<DataTable data={all_surveys} type={"Draft"} />