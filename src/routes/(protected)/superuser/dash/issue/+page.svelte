<script lang="ts">
    import type { PageData } from './$types';
	import SettingsTicket from './settings-ticket.svelte';
    
    export let data: PageData;
</script>

<SettingsTicket data={data.form} />
