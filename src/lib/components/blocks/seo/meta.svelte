<script lang="ts">
	import { page } from "$app/stores";


    export let title
    export let description
    export let type

    $: base = $page.url.href
</script>
<svelte:head>
	<title>{title}</title>
	<meta 
        name="description" 
        content="{description}"
    />
    {@html
    `
        <script type="application/ld+json">
            {
                "@context": "${base}",
                "@type": "${type}",
                "url": "${base}",
                "name": "${title}",
                "description": "${description}"
            }
        </script>
    `
    }
</svelte:head>