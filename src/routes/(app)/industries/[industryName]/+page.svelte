<script lang="ts">
	import Meta from '$lib/components/blocks/seo/meta.svelte';

	// import Features from '$lib/components/blocks/features.svelte';
	import {Separator} from '$lib/components/ui/separator';
	import type { PageData } from './$types';
  import { CldImage } from 'svelte-cloudinary'
  export let data: PageData
  // console.log(data)
  $: data 
  const props = {
		title: `Industries • Intuitive Insights • ${data.industry.title}`,
		description: 'Gather insightful feedback, analyze data, and make informed decisions.',
		type:"Website"
	}
</script>
<Meta {...props}/>
<div class="max-w-[86rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-24 mx-auto place-content-evenly">
    <div class="lg:flex gap-32">
      <div class="flex flex-col gap-2 lg:max-w-5xl space-y-5">
          <h2 class="text-2xl font-bold md:text-4xl text-primary dark:text-white mb-1">{data.industry.title}</h2>
          <p class="text-md text-gray-800 dark:text-neutral-200"><span class="font-bold">The challenge:</span> {data.industry.challenge}</p>
          <p class="text-md text-gray-800 dark:text-neutral-200 lg:max-w-5xl"><span class="font-bold">The solution:</span> {data.industry.solution}</p>
          {#each data.industry.checks as check}
             <ul class="space-y-4 sm:space-y-4 max-w-4xl mt-3">
                <li class="flex space-x-3">
                    <span class="mt-0.5 size-5 flex justify-center items-center rounded-full bg-orange-50 text-primary dark:bg-orange-800/30 dark:text-primary">
                      <svg class="flex-shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </span>
                    <span class="text-sm sm:text-base">
                    {check.content}.
                    </span>
                </li>
            </ul>
          {/each}
      </div>
      <CldImage class="lg:h-[35em] rounded-lg mt-20 dark:shadow-lg dark:shadow-orange-500/50" width="auto" height="auto" src="{data.industry.image}" alt="industries" />
      <!-- <img class="lg:h-[35em] rounded-lg mt-20 dark:shadow-lg dark:shadow-orange-500/50" src={data.industry.image} alt=""> -->
    </div>
    <Separator class="mt-10" />
    <h1 class="text-lg font-bold antialiased mt-5">
      Example:
    </h1>
    <p class="text-md text-gray-800 dark:text-neutral-200 mt-3 w-full text-wrap overflow-hidden truncate">{data.industry.examples}</p>
</div>
<Separator />
<!-- <Features />  -->