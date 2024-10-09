<script lang="ts">
	import type { PageData } from './$types';
	import SettingsUpdateformA from './settings-updateformA.svelte';

	export let data: PageData;
</script>

<SettingsUpdateformA data={data.form} />
