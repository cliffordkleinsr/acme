<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from "$lib/components/ui/card"
  import { Button } from "$lib/components/ui/button"
	import Undo2 from 'lucide-svelte/icons/undo-2';
  import { Label } from "$lib/components/ui/label"
  import { Input } from "$lib/components/ui/input"
  import * as Form from "$lib/components/ui/form/index.js"
  import * as Popover from "$lib/components/ui/popover"
  import * as AlertDialog from "$lib/components/ui/alert-dialog"
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Separator from '$lib/components/ui/separator/separator.svelte';
  import { Checkbox } from "$lib/components/ui/checkbox"
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js"
  import Trash2 from 'lucide-svelte/icons/trash-2'  
	import QuestionComponent from '$lib/components/blocks/questionComponent.svelte';
  import * as RadioGroup from "$lib/components/ui/radio-group"
  
  export let data: PageData;
  const { surveydata, surveyqns } = data


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
    <img class="w-52" src="https://pollbase.tech/client/assets/graphics/question.png" alt="s">
    <Card.Root class="lg:col-span-2 2xl:col-span-1">
        <Card.Header class="space-y-5">
            <Card.Title class="">Survey Questionaire</Card.Title>
            <Card.Description>Add questions and select the type of answer to be given. The Questions Format will be displayed below.</Card.Description>
        </Card.Header>
        <Card.Content class="grid lg:grid-cols-2 gap-3">
         <QuestionComponent />
        </Card.Content>
    </Card.Root>
</div>
<h1 class="text-center mt-10 text-2xl pr-16 pb-6 underline underline-offset-4">Question List</h1>
<div class="grid lg:grid-cols-2 gap-4 ">
{#each surveyqns as qns, id}
<Card.Root class="lg:w-[87%]">
  <Card.Header>
    <Card.Description class="text-xs font-thin">{qns.id}</Card.Description>
  </Card.Header>
  <Card.Content class="space-y-5">
    <h1 class="text-md">{id+1}. {qns.question}</h1>
    {#if qns.question_type === "Optional"}
          <RadioGroup.Root value="option-one" class="grid grid-cols-4 max-w-md">
            {#each qns.options as option, id}
              {#if option != null}
                <div class="flex items-center space-x-2">
                  <RadioGroup.Item value="{option}" disabled/>
                  <Label for={option}>{option}</Label>
                </div>
                {/if}
            {/each}
          </RadioGroup.Root>
      {:else if qns.question_type === "Multiple"}
        <div class="grid grid-cols-3 gap-2">
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
      {:else}
        <Input type="text" class="w-1/2" disabled/>
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