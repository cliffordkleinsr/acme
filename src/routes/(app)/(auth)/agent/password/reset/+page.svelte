<script lang="ts">
	import type { PageData } from './$types';
	import SettingsResetFormA from './settings-resetFormA.svelte';

	export let data: PageData;
</script>

<SettingsResetFormA data={data.form} />
