<script lang="ts">
    import type { PageData } from './$types';
	import SettingsSms from './settings-sms.svelte';
    
    export let data: PageData;
    const { number } = data
</script>

<SettingsSms formdata={data.form} num={number}/>