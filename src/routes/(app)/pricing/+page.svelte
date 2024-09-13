<script lang="ts">
	import Pricer from "$lib/components/blocks/pricingComponent/pricer.svelte";
	import Meta from "$lib/components/blocks/seo/meta.svelte";
	const props = {
		title: "Pricing • Intuitive Insights",
		description: 'Gather insightful feedback, analyze data, and make informed decisions.',
		type:"Website"
	}
</script>
<Meta {...props}/>
<Pricer />