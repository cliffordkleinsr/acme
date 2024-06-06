<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    import { Separator } from '$lib/components/ui/separator';
    import { page } from '$app/stores';
    import { Button } from '$lib/components/ui/button';
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js"
    import { Checkbox } from "$lib/components/ui/checkbox"
    import { Label } from "$lib/components/ui/label"
    
    import Undo2 from 'lucide-svelte/icons/undo-2'
    export let data: PageData;
    const { questions} =data
</script>
<ScrollArea class=" h-[700px] w-full m-2">
<div class="flex flex-col m-4 gap-10">
    <h1 class="text-3xl font-semi-bold text-start font-mono ml-2 gap-1">
        History <br> <span class="text-sm">Survey Id :{$page.params.surveyId}</span>
        <Button class=" float-end" variant="destructive" href="/agent-dash/surveys/history"> <Undo2 class="size-4" /> Back</Button>
    </h1>
    
    <div class="grid lg:grid-cols-2 2xl:grid-cols-4 gap-3">
      {#each questions as qns, ix}
        <Card.Root>
          <Card.Header class="space-y-4">
            <Card.Title><span class="font-mono text-xl">{ix+1} </span>: {qns.question}</Card.Title>
            <Card.Description>ID : {qns.id}</Card.Description>
            <Separator />
          </Card.Header>
          <Card.Content class="lg:flex gap-7 mr-9">
            {#if qns.question_type === "Multiple"}
              <div class="grid grid-cols-3 gap-2">
                {#each qns.answer as ans}
                  <div class="flex gap-2">
                    <Checkbox disabled checked class="border-green-500 data-[state=checked]:bg-green-500"/>
                    <Label
                      for="option1"
                      class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-[3px]"
                    >
                      {ans}
                    </Label>
                  </div>
                {/each}
              </div>
            {:else}
              <h1 class="text-lg font-semibold font-mono">
                Your answer : <span class="text-green-500">{qns.answer}</span>
              </h1>
            {/if}
          </Card.Content>
          <Card.Footer class="flex flex-col gap-2 float-start space-y-2">
          </Card.Footer>
        </Card.Root>
        {/each}
    </div>
    <p class="lg:mr-24 text-end text-sm italic">your opinion matters</p>
</div>
</ScrollArea>