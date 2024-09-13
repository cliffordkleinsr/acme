<script lang="ts">
	import { page } from "$app/stores";
    import favicon from '/static/favicon.ico'

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
    <meta name="keywords" content="Intuitive insights, data analysis, informed decisions, feedback gathering">
    <meta name="author" content="Intuitive insights">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{base}">
    {@html
    `
        <script type="application/ld+json">
            {
                "@context": "https://schema.org/",
                "@type": "${type}",
                "url": "${base}",
                "name": "${title} • int-insights.com",
                "description": "${description}"
                "logo": ${favicon}
            }
        </script>
    `
    }
</svelte:head>