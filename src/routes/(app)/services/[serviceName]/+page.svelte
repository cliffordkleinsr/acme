<script>
	import Meta from '$lib/components/blocks/seo/meta.svelte';
    import { CldImage } from 'svelte-cloudinary'
    export let data
    $: data
    const props = {
		title: "Services | Intuitive Insights",
		description: 'Gather insightful feedback, analyze data, and make informed decisions.',
		type:"Website"
	}
</script>
<Meta {...props}/>

<section class="grid lg:grid-cols-2 py-10 sm:px-6 lg:px-8 lg:py-10 lg:ml-36 gap-16">
    <div class="py-8 px-4 mx-auto sm:py-8 lg:px-6">
        <div class="max-w-screen-md mb-8 lg:mb-16 gap-2">
            <h2 class="mb-4 text-4xl tracking-tight font-bold text-primary dark:text-white">{data.service.title}</h2>
            <p class="text-gray-500 sm:text-md dark:text-gray-400">{data.service.sub}</p>
        </div>
        <div class="space-y-8 md:grid md:gap-12 md:space-y-0 max-w-screen-md">
            {#each data.service.services as serve}
                <div>
                    <h3 class="mb-2 text-lg font-bold dark:text-white">{serve.Name}</h3>
                    <p class="text-gray-500 dark:text-gray-400">{serve.content}</p>
                </div>  
            {/each}
        </div>
    </div>
    <CldImage class="lg:my-24 rounded-xl max-w-sm lg:max-w-lg mx-auto lg:mx-0" width="auto" height="auto" src="{data.service.img}" alt="Description of my image" />
    <!-- <img class="lg:my-24 rounded-xl max-w-sm lg:max-w-lg mx-auto lg:mx-0" src={data.service.img} alt="s"> -->
</section>
