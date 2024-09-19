<script lang="ts">
	import Hero from "$lib/components/blocks/frontendComponents/hero.svelte";
	import Newfeats from "$lib/components/blocks/frontendComponents/newfeats.svelte";
	import Meta from "$lib/components/blocks/seo/meta.svelte";
	const props = {
		title: 'Intuitive Insights KE',
		description: 'Gather Insightful feedback, analyze data, and make informed decisions.',
		type:"Website"
	}
</script>
<Meta {...props}/>
<Hero />
<Newfeats />
<!-- End Clients -->