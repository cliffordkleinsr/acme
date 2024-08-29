<script lang="ts">
    import type { PageData } from './$types';
	import SettingsFormReset from './settings-formReset.svelte';
   
    export let data: PageData
    
</script>
<SettingsFormReset data={data.form}/>
