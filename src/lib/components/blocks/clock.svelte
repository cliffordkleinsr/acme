<script>
	import { onMount } from 'svelte';

	let time = new Date();

	// these automatically update when `time`
	// changes, because of the `$:` prefix
	$: hours = time.getHours();
	$: minutes = time.getMinutes();
	$: seconds = time.getSeconds();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svg viewBox="-50 -50 100 100" class="size-64">
	<circle class="fill-white stroke-[#333] stroke-[1]" r="48" />

	<!-- markers -->
	{#each [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55] as minute}
		<line class=" stroke-[#333] stroke-1" y1="35" y2="45" transform="rotate({30 * minute})" />

		{#each [1, 2, 3, 4] as offset}
			<line class=" stroke-[#999] stroke-[0.5]" y1="42" y2="45" transform="rotate({6 * (minute + offset)})" />
		{/each}
	{/each}

	<!-- hour hand -->
	<line class="stroke-[#333]" y1="2" y2="-20" transform="rotate({30 * hours + minutes / 2})" />

	<!-- minute hand -->
	<line class="stroke-[#666]" y1="4" y2="-30" transform="rotate({6 * minutes + seconds / 10})" />

	<!-- second hand -->
	<g transform="rotate({6 * seconds})">
		<line class="stroke-1 stroke-[rgb(180,0,0)] " y1="10" y2="-38" />
		<line class="stroke-[rgb(180,0,0)] stroke-[3]" y1="10" y2="2" />
	</g>
</svg>
