<script lang="ts">
    import * as Card from "$lib/components/ui/card"
	  import { Separator } from '$lib/components/ui/separator'
    import Cackender from "$lib/components/blocks/cackendar.svelte"
    import { confetti } from '@neoconfetti/svelte'
	  import Issue from "$lib/components/blocks/issue.svelte"
    import { tick } from 'svelte'
    import { Button } from "$lib/components/ui/button/index.js";
    
	
      
    export let data
    const { survey_data } = data
    
    let isVisible = false
    const celeBration = async () => {
        isVisible = false
        await tick()
        isVisible = true
    }
</script>
<!-- If is premium -->
{#if isVisible}
  <div class="flex justify-center">
    <div use:confetti={{particleCount: 200, force: 0.3 }} />
  </div>
{/if}
<div class="flex flex-col m-4 gap-10">
    <h1 class="text-3xl font-semi-bold text-start font-mono ml-2">
        Going live
    </h1>
    <div class="grid lg:grid-cols-3 gap-3">
      {#each survey_data as s}
        <Card.Root class="lg:w-[800px] lg:col-span-2">
          <Card.Header class="space-y-4">
            <Card.Title><span class="font-mono text-xl">Name</span>: {s.title}</Card.Title>
            <Card.Description>ID : {s.id}</Card.Description>
            <Separator />
          </Card.Header>
          <Card.Content class="lg:flex gap-7 mr-9">
            <img class="w-52" src="https://i.postimg.cc/TY3g7WHD/vector3.png" alt="s">
            <div class="flex flex-col space-y-4 mt-16 ">
              <h1 class="text-xl font-semibold font-mono">
                Description
              </h1>
              <p class="text-lg">{s.desc}</p>
            </div>
            
          </Card.Content>
          <Card.Footer class="flex flex-col gap-2 float-start space-y-2">
            <p class="lg:mr-24 text-start">Pick a start and end time for your survey</p>
              <Cackender />
          </Card.Footer>
        </Card.Root>
        {/each}
        <Issue />
        <p class="font-mono text-sm m-2">All rights reserved Acme Inc</p>
    </div>
</div>