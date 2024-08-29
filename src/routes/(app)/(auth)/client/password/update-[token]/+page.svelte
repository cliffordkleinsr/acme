<script lang="ts">
    import type { PageData } from './$types';
	import SettingsUpdateform from './settings-updateform.svelte';
    
    export let data: PageData;
</script>

<SettingsUpdateform data={data.form}/>