<script lang="ts">
	import { page } from "$app/stores";
	import Pretoast from "$lib/components/blocks/pretoast.svelte";
	import { Button } from "$lib/components/ui/button";
	import { sineInOut } from "svelte/easing";
	import { fade } from "svelte/transition";

	   // custom param message
	let msg: string
    let visible = true

    setTimeout(() => {
        visible = false
    }, 2000)

    $: msg= $page.url.searchParams.get("notification") ?? ""
</script>
{#if visible && msg}
<div transition:fade={{delay:200, duration:300, easing:sineInOut}}>
    <Pretoast message={msg} type="warning"/>
</div>
{/if}
<div
	class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
	data-x-chunk-name="dashboard-02-chunk-1"
	data-x-chunk-description="An empty state showing no products with a heading, description and a call to action to add a product."
>
	<div class="flex flex-col items-center gap-1 text-center">
		<h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
		<p class="text-sm text-muted-foreground">
			You can start selling as soon as you add a product.
		</p>
		<Button class="mt-4">Add Product</Button>
	</div>
</div>
