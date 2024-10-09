<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let options = {
		// your mapopts
	};
	let el: HTMLDivElement;
	let map: any;

	onMount(async () => {
		if (browser) {
			await loadScripts();
			initMap();
		}
	});

	async function loadScripts() {
		await Promise.all([
			loadScript('https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js'),
			loadScript('https://cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js'),
			loadScript('/node_modules/datamaps/dist/datamaps.world.min.js')
		]);
	}

	function loadScript(src: string): Promise<void> {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.src = src;
			script.onload = () => resolve();
			script.onerror = reject;
			document.head.appendChild(script);
		});
	}

	function initMap() {
		if (typeof window.Datamap !== 'undefined' && el) {
			map = new window.Datamap({
				element: el,
				scope: 'world',
				...options
			});
		}
	}
</script>

<div class="relative h-[300px] w-[800px]" bind:this={el}></div>
