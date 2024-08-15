<script lang="ts">
	import { Button } from "$lib/components/ui/button";
    import { confetti } from '@neoconfetti/svelte'
	import { onMount, tick } from "svelte";

	onMount(() => {
		localStorage.removeItem('client_package')
	})
</script>
<div class="flex justify-center" >
	<div use:confetti={{  particleCount: 200, duration: 3000, stageWidth:1800, stageHeight: 950 }}></div>
</div>   
<h1 class="text-xl font-bold text-center mt-5 lg:ml-48">
    Welcome On Board
</h1>
<p class="text-sm text-center lg:ml-48">A new insightful journey awaits</p>

<img class="lg:mx-auto -mx-24" src="https://i.postimg.cc/3RRzs1mf/original-ea83f90331767ab60e5eb641984115ed-removebg-preview.png" alt="">
<div class="flex flex-1 justify-center mt-24 lg:ml-48">
    <Button href="/client-dash/surveys/create">Create Survey</Button>
</div>

<!-- <style lang="css">
    :global(body) {
		overflow: hidden;
	}
</style> -->