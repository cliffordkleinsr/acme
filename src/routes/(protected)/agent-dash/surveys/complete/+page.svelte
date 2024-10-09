<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { confetti } from '@neoconfetti/svelte';
	import { onMount, tick } from 'svelte';
</script>

<div class="flex justify-center">
	<div
		use:confetti={{ particleCount: 340, duration: 4000, stageWidth: 1800, stageHeight: 950 }}
	></div>
</div>
<h1 class="mt-5 text-center text-xl font-bold lg:ml-48">Thank You</h1>
<p class="text-center text-sm lg:ml-48">for your time</p>
<img
	class="-mx-24 lg:mx-auto"
	src="https://i.postimg.cc/3RRzs1mf/original-ea83f90331767ab60e5eb641984115ed-removebg-preview.png"
	alt=""
/>
<div class="mt-24 flex flex-1 justify-center lg:ml-48">
	<Button href="/agent-dash/surveys/take">Explore More Surveys</Button>
</div>

<style lang="css">
	:global(body) {
		overflow: hidden;
	}
</style>
