<script lang="ts">
  import type { PageData } from './$types';
  import * as Card from "$lib/components/ui/card"
  import { Button } from "$lib/components/ui/button"
	import Undo2 from 'lucide-svelte/icons/undo-2';
  import * as Dialog from "$lib/components/ui/dialog"
  import * as Drawer from "$lib/components/ui/drawer"
  import { Label } from "$lib/components/ui/label"
  import { Input } from "$lib/components/ui/input"
  import * as Form from "$lib/components/ui/form/index.js"
  import * as Popover from "$lib/components/ui/popover"
  import * as AlertDialog from "$lib/components/ui/alert-dialog"
	import { browser } from '$app/environment';
	import { enhance } from '$app/forms';
	import Separator from '$lib/components/ui/separator/separator.svelte';
  import { Checkbox } from "$lib/components/ui/checkbox"
  
    
  export let data: PageData;
  export let form
  const { surveydata, surveyqns } = data

  let open = false;
  let disabled = false
  let other = true
  let isDesktop = true
  let values = [
    {option: ''}
  ]

  // Blank Values
  $: length = values.length
  
  $: switch (true) {
    case length >= 3:
      disabled = true
      break;
  
    default:
      disabled = false;
      break;
  }
  $: switch (true) {
    case length >= 1:
      other = false
      break;
  
    default:
      other = true
      break;
  }
  const addOption = () => {
    values = [...values, {option: ''}]
  }
  const remOption = () => {
      values = values.slice(0, values.length-1)
    }

  // Existing in DB

  
  
  if (browser) {
      isDesktop = window.innerWidth >= 768
  }
</script>
<div class="lg:flex gap-5 m-4 space-y-3 lg:space-y-0">
    {#each surveydata as data}
    <Card.Root class="lg:w-1/3">
        <Card.Header>
            <Card.Title class="font-mono ">Title : {data.title}</Card.Title>
        </Card.Header>
        <Card.Content>
            <p><span class=" font-semibold ">Description:</span> {data.desc}</p>
        </Card.Content>
        <Card.Footer class="lg:float-end">
            <Button href="/client-dash/surveys/questionnaire" variant="outline"><Undo2 class="size-4"/> Back</Button>
        </Card.Footer>
    </Card.Root>         
    {/each}
    <Card.Root>
        <Card.Header class="space-y-5">
            <Card.Title class="font-mono">Survey Questionaire</Card.Title>
            <Card.Description>Add questions and select the type of answer to be given. The Questions Format will be displayed below.</Card.Description>
        </Card.Header>
        <Card.Content class="lg:flex gap-6 py-8 space-y-3 lg:space-y-0">
            {#if isDesktop}
            <Dialog.Root bind:open>
              <Dialog.Trigger asChild let:builder>
                <Button variant="outline" builders={[builder]}>Add Question With Single Answer</Button>
              </Dialog.Trigger>
              <Dialog.Content class="sm:max-w-[425px]">
                <Dialog.Header class="space-y-3">
                  <Dialog.Title>Single Answer Question</Dialog.Title>
                  <Dialog.Description>
                    Enter Question (This question will have a single answer option)
                  </Dialog.Description>
                </Dialog.Header>
                <form action="?/addSingleQns" method="post" class="grid items-start gap-4">
                  <div class="grid gap-2">
                    <Label for="question">Question</Label>
                    <Input type="text" name="question"/>
                  </div>
                  <Button type="submit">Save changes</Button>
                </form>
              </Dialog.Content>
            </Dialog.Root>
          {:else}
            <Drawer.Root bind:open>
              <Drawer.Trigger asChild let:builder>
                <Button variant="outline" builders={[builder]}>Add Question With Single Answer</Button>
              </Drawer.Trigger>
              <Drawer.Content>
                <Drawer.Header class="text-left space-y-3">
                  <Drawer.Title>Single Answer Question</Drawer.Title>
                  <Drawer.Description>
                    Enter Question (This question will have a single answer option)
                  </Drawer.Description>
                </Drawer.Header>
                <form action="?/addSingleQns" method="post" class="grid items-start gap-4 px-4">
                  <div class="grid gap-2">
                    <Label for="question">Question</Label>
                    <Input type="text" name="question"/>
                  </div>
                  <Button type="submit">Save changes</Button>
                </form>
                <Drawer.Footer class="pt-2">
                  <Drawer.Close asChild let:builder>
                    <Button variant="outline" builders={[builder]}>Cancel</Button>
                  </Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Root>
          {/if}
          {#if isDesktop}
          <Dialog.Root>
            <Dialog.Trigger asChild let:builder>
              <Button variant="outline" builders={[builder]}>Add Question With Multiple Answers</Button>
            </Dialog.Trigger>
            <Dialog.Content class="sm:max-w-[425px]">
              <Dialog.Header class="space-y-3">
                <Dialog.Title>Multiple Answer Question</Dialog.Title>
                <Dialog.Description>
                  Enter Question (This question will have multiple answers) There is only a max of 3 options
                </Dialog.Description>
              </Dialog.Header>
              <form action="?/addMultiQns" method="post" class="grid items-start gap-4">
                <div class="grid gap-2">
                  <Label for="question">Question</Label>
                  <Input type="text" name="question"/>
                  {#each values as v, i}
                    <Label for="option">Enter Option</Label>
                    <Input type="text" bind:value={v.option} name="option_{i}"/>
                  {/each}
                </div>
                <Button variant="secondary" on:click={addOption} bind:disabled>Add Option</Button>
                <Button variant="secondary" on:click={remOption} bind:disabled={other}>Remove Option</Button>
                <Button type="submit">Save changes</Button>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        {:else}
          <Drawer.Root>
            <Drawer.Trigger asChild let:builder>
              <Button variant="outline" builders={[builder]}>Add Question With Multiple Answers</Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header class="text-left space-y-3">
                <Drawer.Title>Multiple Answer Question</Drawer.Title>
                <Drawer.Description>
                  Enter Question (This question will have multiple answers) There is only a max of 3 options
                </Drawer.Description>
              </Drawer.Header>
              <form action="?/addMultiQns" method="post" class="grid items-start gap-4 px-4">
                <div class="grid gap-2">
                  <Label for="question">Question</Label>
                  <Input type="text" name="question"/>
                  {#each values as v, i}
                    <Label for="option">Enter Option</Label>
                    <Input type="text" bind:value={v.option} name="option_{i}"/>
                  {/each}
                </div>
                <Button variant="secondary" on:click={addOption} bind:disabled>Add Option</Button>
                <Button variant="secondary" on:click={remOption} bind:disabled={other}>Remove Option</Button>
                <Button type="submit">Save changes</Button>
              </form>
              <Drawer.Footer class="pt-2">
                <Drawer.Close asChild let:builder>
                  <Button variant="outline" builders={[builder]}>Cancel</Button>
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        {/if}
        </Card.Content>
    </Card.Root>
    <img class="w-52" src="https://pollbase.tech/client/assets/graphics/question.png" alt="s">
</div>
<h1 class="text-center mt-10 text-2xl pr-16 pb-2 underline underline-offset-4 font-mono">Question List</h1>
<div class="grid lg:grid-cols-2 gap-4 m-4 ">
{#each surveyqns as qns, id}
<Card.Root class="lg:w-[87%]">
  <Card.Header>
    <Card.Description>ID : {qns.id}</Card.Description>
  </Card.Header>
  <Card.Content class="space-y-5">
    <h1 class="text-md">{id}. {qns.question}</h1>
    {#if qns.question_type === "Optional"}
    <div class="flex gap-3 w-full">
      {#each qns.options as option}
        {#if option.name != null}
        <Checkbox />
          <Label
            for="option1"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {option.name}
          </Label>
        {/if}
      {/each}
    </div>
    {:else}
      <Input type="text" class="w-1/2"></Input>
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
            {#if qns.question_type === "Optional"}
              <Label>Options </Label>
              {#each qns.options as option, i}
                {#if option.name != null}
                <Input type="text" value={option.name} name="option{i}"/>
                {/if}
              {/each}
            {#if form?.message}
              <span class="text-red-400">{form.message}</span>
            {/if}
            <Button variant="secondary" bind:disabled>Add More</Button>
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
{/each}</div>