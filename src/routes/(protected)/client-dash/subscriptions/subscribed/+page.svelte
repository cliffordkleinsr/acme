<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { confetti } from '@neoconfetti/svelte';
	import { onMount, tick } from 'svelte';

	onMount(() => {
		localStorage.removeItem('client_package');
	});
</script>

<div class="flex justify-center">
	<div
		use:confetti={{ particleCount: 200, duration: 3000, stageWidth: 1800, stageHeight: 950 }}
	></div>
</div>
<h1 class="mt-5 text-center text-xl font-bold lg:ml-48">Welcome On Board</h1>
<p class="text-center text-sm lg:ml-48">A new insightful journey awaits</p>

<img
	class="-mx-24 lg:mx-auto"
	src="https://i.postimg.cc/3RRzs1mf/original-ea83f90331767ab60e5eb641984115ed-removebg-preview.png"
	alt=""
/>
<div class="mt-24 flex flex-1 justify-center lg:ml-48">
	<Button href="/client-dash/surveys/create">Create Survey</Button>
</div>

<!-- <style lang="css">
    :global(body) {
		overflow: hidden;
	}
</style> -->
