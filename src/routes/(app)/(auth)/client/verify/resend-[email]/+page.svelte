<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;
	const { heading, message } = data;
</script>

<div class="prose m-5 mx-auto h-screen space-y-3">
	{#if heading}
		<h1>{heading}</h1>
	{/if}
	{#if message}
		<p>{@html message}</p>
	{/if}
	<Button href="/client/verify/email" variant="secondary">Back</Button>
</div>
