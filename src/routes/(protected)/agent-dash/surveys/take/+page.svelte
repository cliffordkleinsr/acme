<script lang="ts">
    import DataTable from "./data-table.svelte"
    export let data
    const { available_qns }= data

</script>

<DataTable data={available_qns}/>