<script lang="ts">
    import DataTable from "./data-table.svelte"
    export let data
    const {live_surv}= data
</script>

<DataTable data={live_surv}/>