<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
	  import QuestionComponent from '$lib/components/blocks/questionnareComponents/base/questionComponent.svelte';
    import { Button } from "$lib/components/ui/button"
    import Undo2 from 'lucide-svelte/icons/undo-2';
    import Target from 'lucide-svelte/icons/target'
    import CheckCheck from 'lucide-svelte/icons/check-check'
    import Star from 'lucide-svelte/icons/star'
    import { Label } from "$lib/components/ui/label"
    import * as RadioGroup from "$lib/components/ui/radio-group"
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
    import { Input } from "$lib/components/ui/input"
    import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal'
	  import LikertComponent from '$lib/components/blocks/questionnareComponents/likertcomponent/LikertComponent.svelte';
    import FolderOpen from "lucide-svelte/icons/folder-open";
    import { Checkbox } from "$lib/components/ui/checkbox"
    import StarComponent from '$lib/components/blocks/questionnareComponents/rating/StarComponent.svelte';
    import Trash2 from 'lucide-svelte/icons/trash-2' 
	  import Separator from '$lib/components/ui/separator/separator.svelte';
    import Cackender from "$lib/components/blocks/cackendar.svelte"
	  import { CalendarDate, parseDate } from '@internationalized/date';

    export let data: PageData;
    const { surv_data, surveyqns } = data
    const  [smm, sdd, syyyy] = Array.from(new Date(surv_data.from).toLocaleDateString().split('/'), Number)
    const  [emm, edd, eyyyy] = Array.from(new Date(surv_data.to).toLocaleDateString().split('/'), Number)
    
    const dates = {
      start: new CalendarDate(syyyy, smm, sdd ),
      end: new CalendarDate(eyyyy, emm, edd )
    }

</script>
<div class="m-4">
    <div class="grid gap-4">       
        <div class="grid gap-3">
            <Card.Root class="lg:w-11/12 lg:col-span-2">
            <Card.Header class="space-y-4">
                <Card.Title><span class="font-mono text-xl">Name</span>: {surv_data.title}</Card.Title>
                <Card.Description>
                  Status: {surv_data.status}
                </Card.Description>
                <Button href="/client-dash/surveys/questionnaire" variant="outline"><Undo2 class="size-4"/> Back</Button>
                <Separator />
            </Card.Header>
            <Card.Content class="lg:flex gap-7 mr-9">
                <img class="w-52" src="https://i.postimg.cc/TY3g7WHD/vector3.png" alt="s">
                <div class="flex flex-col space-y-4 mt-16 ">
                <h1 class="text-xl font-semibold font-mono">
                    Description
                </h1>
                <p class="text-lg">{surv_data.desc}</p>
                </div>
            </Card.Content>
            <Card.Footer class="flex flex-col gap-2 float-start space-y-2">
                <p class="lg:mr-64 text-start">Pick a start and end time for your survey</p>
                <Cackender value={dates} default_txt={'Set as Live'}/>
            </Card.Footer>
            </Card.Root>
        </div>
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
              <Button type='submit'>Save</Button>
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
                <Button type='submit'>Continue</Button>
              </form>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
      </Card.Footer>
    </Card.Root>
    {/each}
    </div>
    </div>