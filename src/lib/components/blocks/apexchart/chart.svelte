<script lang="ts">
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';
	import type { HTMLAnchorAttributes } from 'svelte/elements';
	export let options = {}; // Options for the chart
	let chart: ApexCharts;
	let el: HTMLDivElement; // Reference to the container element
	let className: HTMLAnchorAttributes['class'] = undefined;
	export { className as class };
	onMount(async () => {
		const module = await import('apexcharts');
		const ApexCharts = module.default;
		chart = new ApexCharts(el, options);
		chart.render();
	});

	$: {
		if (chart) {
			chart.updateOptions(options);
		}
	}
</script>

<div bind:this={el} class={cn('', className)}></div>
