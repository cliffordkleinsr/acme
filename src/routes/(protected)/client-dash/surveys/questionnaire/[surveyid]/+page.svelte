<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from "$lib/components/ui/card"
  import { Button } from "$lib/components/ui/button"
	import Undo2 from 'lucide-svelte/icons/undo-2';
  import { Label } from "$lib/components/ui/label"
  import { Input } from "$lib/components/ui/input"
  import * as Form from "$lib/components/ui/form/index.js"
  import * as AlertDialog from "$lib/components/ui/alert-dialog"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import Trash2 from 'lucide-svelte/icons/trash-2'  
	import QuestionComponent from '$lib/components/blocks/questionnareComponents/base/questionComponent.svelte';
  import * as RadioGroup from "$lib/components/ui/radio-group"
  import CheckCheck from 'lucide-svelte/icons/check-check'
  import Target from 'lucide-svelte/icons/target'
  import FolderOpen from "lucide-svelte/icons/folder-open";
	import StarComponent from '$lib/components/blocks/questionnareComponents/rating/StarComponent.svelte';
  import Star from 'lucide-svelte/icons/star'
  import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal'
	import LikertComponent from '$lib/components/blocks/questionnareComponents/likertcomponent/LikertComponent.svelte';
  import { onMount } from "svelte";
    import 'intro.js/minified/introjs.min.css'
    import introJs from "intro.js";

    onMount(() => {
      setTimeout(() => {
        introJs().setOptions({
          "dontShowAgain": true,
          "dontShowAgainCookie": "introjs-dontShowAgain3"
        }).start()
      }, 1500)
    })
  // let arr = [1,2,3,4]
  // let disabl = [false,false,false,false] 
  // const setRank = (index: number, rank: number)=> {
    
  // }
  
  export let data: PageData;
  const { surveydata, surveyqns, features:{maxqns} } = data

  // let rankings:any = []
  // for (const { options } of surveyqns) {
  //   rankings = options.map(()=>0)
  // }
  // function setRank(index:number, rank:number) {
  //   if (rankings[index] === rank) {
  //     // If the same rank is clicked again, unset it
  //     rankings[index] = 0;
  //   } else {
  //     // Clear the rank from any other option
  //     rankings = rankings.map((r:number) => (r === rank ? 0 : r));
  //     // Set the new rank for the selected option
  //     rankings[index] = rank;
  //   }
  //   rankings = [...rankings];
  // }
  // function isRankDisabled(rank:number) {
  //   return rankings.includes(rank);
  // }
  // Existing in DB
</script>
<div class="m-4">
<div class="grid lg:grid-cols-3 gap-4">
    {#each surveydata as data}
    <Card.Root class="lg:col-span-2">
        <Card.Header>
            <Card.Title class="">Title : {data.title}</Card.Title>
        </Card.Header>
        <Card.Content>
            <p><span class=" font-semibold ">Description:</span> {data.desc}</p>
        </Card.Content>
        <Card.Footer class="lg:float-end">
            <Button href="/client-dash/surveys/questionnaire" variant="outline"><Undo2 class="size-4"/> Back</Button>
        </Card.Footer>
    </Card.Root>         
    {/each}
    <img class="w-52" src="https://i.postimg.cc/QCtG9jMc/image.png" alt="s">
    <Card.Root class="lg:col-span-2 2xl:col-span-1" data-intro=" This section allows you to generate questions">
        <Card.Header class="space-y-5">
            <Card.Title class="">Survey Questionaire</Card.Title>
            <Card.Description>Add questions and select the type of answer to be given. The Questions Format will be displayed below.</Card.Description>
        </Card.Header>
        <Card.Content class="grid lg:grid-cols-2 gap-3">
          {#if surveyqns.length === maxqns}
            <div class="bg-yellow-100 border border-yellow-200 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500" role="alert">
              <span class="font-bold">Warning</span> alert! You have exceeded the maximum available questions for your plan
            </div>
          {:else}
            <QuestionComponent />
         {/if}
        </Card.Content>
    </Card.Root>
</div>
<h1 class="text-center mt-10 text-xl font-medium pr-16 pb-6">Question List</h1>
<div class="grid gap-3">
{#each surveyqns as qns, id}
<Card.Root class="lg:w-full auto-rows-auto">
  <Card.Header>
    <Card.Description class="text-xs font-thin">
      {#if qns.question_type === "Optional"}
      <div class="flex gap-2">
        <p class=" font-semibold">{id+1}.</p>
        <Target class="size-4"/>
      </div>
      {:else if qns.question_type === "Multiple"}
      <div class="flex gap-2">
        <p class=" font-semibold">{id+1}.</p>
        <CheckCheck class="size-4" />
      </div>
      {:else if qns.question_type === "Rating"}
      <div class="flex gap-2">
        <p class=" font-semibold">{id+1}.</p>
        <Star class="size-4" />
      </div>
      {:else if qns.question_type === "Likert"}
      <div class="flex gap-2">
        <p class=" font-semibold">{id+1}.</p>
        <SlidersHorizontal class="size-4" />
      </div>
      {:else}
      <div class="flex gap-2">
        <p class=" font-semibold">{id+1}.</p>
        <FolderOpen class="size-4"/>
      </div>
      {/if}
    </Card.Description>
  </Card.Header>
  <Card.Content class="space-y-3">
    <h1 class="text-md">{qns.question}</h1>
    {#if qns.question_type === "Optional"}
          <RadioGroup.Root value="option-one" class="grid grid-cols-2 2xl:grid-cols-3">
            {#each qns.options as option, id}
              {#if option != null}
                <div class="flex items-center space-x-2">
                  <RadioGroup.Item value="{option}" disabled/>
                  <Label for={option} class="text-muted-foreground">{option}</Label>
                </div>
                {/if}
            {/each}
          </RadioGroup.Root>
      {:else if qns.question_type === "Multiple"}
        <div class="grid grid-cols-2 2xl:grid-cols-3 gap-2">
        {#each qns.options as option, id}
            {#if option != null}
            <div class="flex gap-2">
            <Checkbox disabled/>
              <Label
                for="option1"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-[3px]"
              >
                {option}
              </Label>
            </div>
              {/if}
        {/each}
      </div>
      {:else if qns.question_type === "Rating"}
        <StarComponent/>
      {:else if qns.question_type === "Likert"}
        <RadioGroup.Root value="option-one" class="grid grid-cols-2 2xl:grid-cols-3 space-y-1">
          <LikertComponent  likert_key={qns.likert_key} />
        </RadioGroup.Root>
      {:else if qns.question_type === "Ranking"}
      <div class="grid gap-1">
        {#each qns.options as option, id} 
           <p class="text-muted-foreground">{option}</p> 
           <div class="grid grid-cols-5 gap-1 max-w-lg">
            {#each [1, 2, 3, 4, 5] as rank}
            <div class="flex flex-col gap-2">
              <Button
                variant="secondary"
                size="icon"
                disabled
              >
                {rank}
              </Button>
              {#if rank === 1}
              <p class="text-muted-foreground text-xs ml-2">High</p>
              {:else if rank === 5}
              <p class="text-muted-foreground text-xs ml-2">Low</p>
              {/if}
              
              <!-- <Button
               
                variant="secondary"
                size="icon"
                class="{rankings[id] === rank?'bg-primary': 'bg-muted'}"
                on:click={() => setRank(id, rank)}
                disabled={rankings[id] !== rank && isRankDisabled(rank)}
              >
              {rank}
            </Button> -->
            </div>
            {/each}
            </div>
        {/each}
      </div>
      {:else}
        <Input class="w-1/2 max-h-full" disabled/>
      {/if}
  </Card.Content>
  <Card.Footer class="float-end gap-10">
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild let:builder>
        <Button builders={[builder]} variant="outline">Edit </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Edit your Question</AlertDialog.Title>
          <AlertDialog.Description>
            This action will edit your survey.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <form action="?/editSurvQns" method="post">
        <AlertDialog.Footer>
          <div class="flex flex-col gap-2 w-full">
            <Label>Question </Label>
            <Input type="text" value={qns.question} name="question"/>
            <Input type="text" value={qns.id} class="hidden" name="questionId"/>
            {#if qns.question_type === "Optional" || qns.question_type ===  "Multiple"}
              <Label>Options </Label>
              {#each qns.options as option, i}
              {@const id = qns.optionid[i]}
                {#if option != null}
                  <div class="flex gap-4">
                  <Input type="text" value={option} name="option"/>
                  <Input type="text" value={id} name="optionId" class="hidden"/>
                <form action="?/deleteOpt" method="post">
                  <Input type="text" value={id} name="optionId" class="hidden"/>
                  <Button size="icon" variant="secondary" type="submit"><Trash2 class="size-4 text-destructive"/></Button>
                </form>
              </div>
                {/if}
              {/each}
            {/if}
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <Form.Button>Save</Form.Button>
        </div>
        </AlertDialog.Footer>
      </form>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild let:builder>
        <Button builders={[builder]}>Delete</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete this question
            and remove your data from our servers.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <form action="?/deleteSurvQns" method="post">
            <Input type="text" value={qns.id} class="hidden" name="questionId"/>
            <Form.Button>Continue</Form.Button>
          </form>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  </Card.Footer>
</Card.Root>
{/each}
</div>
</div>