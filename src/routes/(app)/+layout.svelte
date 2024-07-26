<script lang="ts">
	import Footer from "$lib/components/blocks/frontendComponents/footer.svelte"
	import Navbar from "$lib/components/blocks/navbar.svelte"
	import { sineIn, sineOut } from "svelte/easing";
	import { fly } from "svelte/transition";
	
	export let data
</script>

<Navbar/>
{#key data.url}
<div 
in:fly={{x: -100, delay:300, duration:300, easing:sineIn}}
out:fly={{x: 100, duration:300, easing:sineOut}}
>
<slot/>	
</div>
{/key}
<Footer/>