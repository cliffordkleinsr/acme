<script lang="ts">
	  import { browser } from "$app/environment";
    import * as Dialog from "$lib/components/ui/dialog"
    import * as Drawer from "$lib/components/ui/drawer"
    import { Button, buttonVariants } from "$lib/components/ui/button"
    import { Label } from "$lib/components/ui/label"
    import { Input } from "$lib/components/ui/input"
    import CheckCheck from 'lucide-svelte/icons/check-check'
    import Target from 'lucide-svelte/icons/target'
    import Webcam from "lucide-svelte/icons/webcam"
    import Star from 'lucide-svelte/icons/star'
    import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal'
    import * as Select from "$lib/components/ui/select"
    import BarChart4 from 'lucide-svelte/icons/bar-chart-4'
    import { applyAction, enhance } from "$app/forms";
    import { toast } from "svelte-sonner";
    import { goto, invalidateAll } from "$app/navigation";
    import { options, rankers, multiples, multiplesDisabled, multiplesOther, optionsDisabled, optionsOther, rankersDisabled, rankersOther } from './state'

    export let form
    let isDesktop = true
    
    if (browser) {
      isDesktop = window.innerWidth >= 768
    }
    let target:string ='agreement'
    let likert_key = [
      {label: "Agreement", value: 'agreement'},
      {label: 'Frequency', value: 'frequency'},
      {label: 'Appropriateness', value: 'appropriateness'},
      {label: 'Satisfaction', value: 'satisfaction'},
      {label: 'Reflective of me', value: 'reflective'},
      {label: 'Level of difficulty', value: 'lod'},
      {label: 'Priority', value: 'priority'},
      {label: 'Quality', value: 'quality'},
      {label: 'Importance', value: 'importance'}
    ]

    let selected_lks = {label:'Select target likert scale' , value:'agreement'}

    let singledialog = false
    let multidialog = false
    let optidialog = false
    let stardialog = false
    let likertdialog = false
    let rankdialog = false
</script>

<!-- Single Question -->
{#if isDesktop}
  <Dialog.Root bind:open={singledialog} >
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
      <p class="text-xs">Add an open ended question</p>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header class="space-y-3">
        <Dialog.Title>Open ended Question</Dialog.Title>
        <Dialog.Description>
            Enter Question (This question will have a single answer option)
        </Dialog.Description>
        </Dialog.Header>
        <form action="?/addSingleQns" method="post" class="grid items-start gap-4" use:enhance={
          () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    singledialog = false
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
        }>
        <div class="grid gap-2">
            <Label for="question">Question</Label>
            <Input type="text" name="single_question"/>
        </div>
        {#if form?.errors?.single_question}
            <p class=" text-destructive text-sm">{form?.errors?.single_question}</p>
        {/if}
        <Button type="submit">Save changes</Button>
        </form>
    </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={singledialog}>
    <Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
      <div class="flex gap-2">
        <Webcam class="size-4"/> Add an open ended question
      </div>
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Header class="text-left space-y-3">
        <Drawer.Title>Open ended Question</Drawer.Title>
        <Drawer.Description>
          Enter Question (This question will have a single answer option)
        </Drawer.Description>
      </Drawer.Header>
      <form action="?/addSingleQns" method="post" class="grid items-start gap-4 px-4"
        use:enhance={
          () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    singledialog = false
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
        }>
        <div class="grid gap-2">
          <Label for="question">Question</Label>
          <Input type="text" name="single_question"/>
        </div>
        {#if form?.errors?.single_question}
            <p class=" text-destructive text-sm">{form?.errors?.single_question}</p>
        {/if}
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
<!-- Multiple Selection -->
{#if isDesktop}
  <Dialog.Root bind:open={multidialog}>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    <div class="flex gap-2 text-xs">
      <CheckCheck class="size-4" />Add multiple selection question
    </div>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Multiple Selection Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question can have multiple answers which can be ticked)
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/addMultiQns" method="post" class="grid items-start gap-4" use:enhance= {
       () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    multidialog = false
                    multiples.reset()
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
    }>
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
        {#if form?.errors?.question}
          <p class=" text-destructive text-sm">{form?.errors?.question}</p>
        {/if}
        {#each $multiples as v}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.option} name="option"/>
        {/each}
      </div>
      {#if form?.errors?.option}
        <p class=" text-destructive text-sm">{form?.errors?.option}</p>
      {/if}
      <Button variant="secondary" on:click={multiples.add} disabled={$multiplesDisabled}>Add Option</Button>
      <Button variant="secondary" on:click={multiples.remove} disabled={$multiplesOther}>Remove Option</Button>
      <Button type="submit">Save changes</Button>
      
    </form>
  </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={multidialog}>
  <Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
    <div class="flex gap-2">
      <CheckCheck class="size-4" />Add multiple selection question
    </div>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Multiple Selection Question</Drawer.Title>
      <Drawer.Description>
        Enter Question (This question can have multiple answers which can be ticked)
      </Drawer.Description>
    </Drawer.Header>
    <form action="?/addMultiQns" method="post" class="grid items-start gap-4 px-4" 
      use:enhance= {
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    multidialog = false
                    multiples.reset()
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
    }>
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
        {#if form?.errors?.question}
          <p class=" text-destructive text-sm">{form?.errors?.question}</p>
        {/if}
        {#each $multiples as v}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.option} name="option"/>
        {/each}
      </div>
        {#if form?.errors?.option}
          <p class="text-destructive text-sm">{form?.errors?.option}</p>
        {/if}
      <Button variant="secondary" on:click={multiples.add} disabled={$multiplesDisabled}>Add Option</Button>
      <Button variant="secondary" on:click={multiples.remove} disabled={$multiplesOther}>Remove Option</Button>
      <Button type="submit">Save changes</Button>
    </form>
    <Drawer.Footer class="pt-2">
      <Drawer.Close class={buttonVariants({ variant: "outline" })}>
        Cancel
      </Drawer.Close>
    </Drawer.Footer>
  </Drawer.Content>
  </Drawer.Root>
{/if}
<!-- single selection -->
{#if isDesktop}
  <Dialog.Root bind:open={optidialog}>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}>
    <div class="flex gap-2 text-xs">
       <Target class="size-4"/> Add a single selection question
    </div>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Single Selection Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question will have one optional answer with multiple selections)
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/addOptQns" method="post" class="grid items-start gap-4"
      use:enhance={
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    optidialog = false
                    options.reset()
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
      }
    >
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="radio_question"/>
        {#if form?.errors?.radio_question}
          <p class=" text-destructive text-sm">{form?.errors?.radio_question}</p>
        {/if}
        {#each $options as v}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.option} name="radio_option"/>
        {/each}
      </div>
      {#if form?.errors?.radio_option}
        <p class="text-destructive text-sm">{form?.errors?.radio_option}</p>
      {/if}
      <Button variant="secondary" on:click={options.add} disabled={$optionsDisabled}>Add Option</Button>
      <Button variant="secondary" on:click={options.remove} disabled={$optionsOther}>Remove Option</Button>
      <Button type="submit">Save changes</Button>
    </form>
  </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={optidialog}>
  <Drawer.Trigger class={buttonVariants({ variant: "outline" })}>
    <div class="flex gap-2">
       <Target class="size-4"/> Add a single selection question
    </div>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Single Selection Question</Drawer.Title>
      <Drawer.Description>
        Enter Question (This question will have one optional answer with multiple selections)
      </Drawer.Description>
    </Drawer.Header>
    <form action="?/addOptQns" method="post" class="grid items-start gap-4 px-4"
      use:enhance={
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    optidialog = false
                    options.reset()
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
      }
    >
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="radio_question"/>
        {#if form?.errors?.radio_question}
          <p class=" text-destructive text-sm">{form?.errors?.radio_question}</p>
        {/if}
        {#each $options as v}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.option} name="radio_option"/>
        {/each}
      </div>
      {#if form?.errors?.radio_option}
        <p class="text-destructive text-sm">{form?.errors?.radio_option}</p>
      {/if}
      <Button variant="secondary" on:click={options.add} disabled={$optionsDisabled}>Add Option</Button>
      <Button variant="secondary" on:click={options.remove} disabled={$optionsOther}>Remove Option</Button>
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
<!-- Rating -->
{#if isDesktop}
  <Dialog.Root bind:open={stardialog}>
  <Dialog.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]} class="text-xs flex gap-2 text-center"><Star class="size-4"/> Add a rating question</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Rating Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question will have 5 stars to choose from)
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/addStarQns" method="post" class="grid items-start gap-4"
      use:enhance={
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    stardialog = false
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
      }
    >
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="rating_question"/>
      </div>
      {#if form?.errors?.rating_question}
        <p class=" text-destructive text-sm">{form?.errors?.rating_question}</p>
      {/if}
      <Button type="submit">Save changes</Button>
    </form>
  </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={stardialog}>
  <Drawer.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]} class="flex gap-2"> <Star class="size-4"/> Add rating question</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Rating Question</Drawer.Title>
      <Drawer.Description>
        Enter Question (This question will have 5 stars to choose from)
      </Drawer.Description>
    </Drawer.Header>
    <form action="?/addStarQns" method="post" class="grid items-start gap-4 px-4"
      use:enhance={
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    stardialog = false
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
      }
    >
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="rating_question"/>
      </div>
      {#if form?.errors?.rating_question}
        <p class=" text-destructive text-sm">{form?.errors?.rating_question}</p>
      {/if}
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
<!-- Likert -->
{#if isDesktop}
  <Dialog.Root bind:open={likertdialog}>
  <Dialog.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]} class="text-xs flex gap-2"> <SlidersHorizontal class="size-4"/> Add a likert question</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Likert Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question will have one optinionative selection)
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/addLikQns" method="post" class="grid items-start gap-4"
      use:enhance={
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    likertdialog = false
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
      }
    >
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
        {#if form?.errors?.question}
          <p class=" text-destructive text-sm">{form?.errors?.question}</p>
        {/if}
        <Select.Root
            selected={selected_lks}
            onSelectedChange={(v) => {
              v && (target = v.value);
            }}
        >
          <Select.Trigger>
            <Select.Value placeholder="Select Target Agents" />
          </Select.Trigger>
          <Select.Content>
            {#each likert_key as lks}
            <Select.Item value={lks.value}>{lks.label}</Select.Item>
            {/each}
          </Select.Content>
      </Select.Root>
        <Input value={target} name="target" class="hidden"/>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={likertdialog}>
  <Drawer.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]} class="flex gap-2"> <SlidersHorizontal class="size-4"/> Add a likert question</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Likert Question</Drawer.Title>
      <Drawer.Description>
        Enter Question (This question will have one optinionative selection)
      </Drawer.Description>
    </Drawer.Header>
    <form action="?/addLikQns" method="post" class="grid items-start gap-4 px-4"
      use:enhance={
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    likertdialog = false
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
      }
    >
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
        {#if form?.errors?.question}
          <p class=" text-destructive text-sm">{form?.errors?.question}</p>
        {/if}
        <Select.Root
            selected={selected_lks}
            onSelectedChange={(v) => {
              v && (target = v.value);
            }}
        >
            <Select.Trigger>
              <Select.Value placeholder="Select Target Agents" />
            </Select.Trigger>
            <Select.Content>
              {#each likert_key as lks}
              <Select.Item value={lks.value}>{lks.label}</Select.Item>
              {/each}
            </Select.Content>
        </Select.Root>
        <Input value={target} name="target" class="hidden"/>
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
<!-- Rankers -->
{#if isDesktop}
  <Dialog.Root bind:open={rankdialog}>
  <Dialog.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]} class="text-xs flex gap-2"> <BarChart4  class="size-4"/> Add a ranking question</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Ranking Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question will have a rank of 1 to 5)
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/addRnkQns" method="post" class="grid items-start gap-4"
      use:enhance = {
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    rankdialog = false
                    rankers.reset()
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
      }
    >
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="rnk_question"/>
        {#if form?.errors?.rnk_question}
          <p class=" text-destructive text-sm">{form?.errors?.rnk_question}</p>
        {/if}
        {#each $rankers as v}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.option} name="rnk_option"/>
        {/each}
      </div>
      {#if form?.errors?.rnk_option}
        <p class=" text-destructive text-sm">{form?.errors?.rnk_option}</p>
      {/if}
      <Button variant="secondary" on:click={rankers.add} disabled={$rankersDisabled}>Add Option</Button>
      <Button variant="secondary" on:click={rankers.remove} disabled={$optionsOther}>Remove Option</Button>
      <Button type="submit">Save changes</Button>
    </form>
  </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root bind:open={rankdialog}>
  <Drawer.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]} class="flex gap-2"> <BarChart4 class="size-4"/> Add a ranking question</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Ranking Question</Drawer.Title>
      <Drawer.Description>
        Enter Question (This question will have a rank of 1 to 5)
      </Drawer.Description>
    </Drawer.Header>
    <form action="?/addRnkQns" method="post" class="grid items-start gap-4 px-4"
      use:enhance = {
        () => {
              return async ({ result, update }) => {
                  if (result.type === "redirect") {
                    rankdialog = false
                    rankers.reset()
                    await invalidateAll()
                    goto(result.location);      
                  }
                  else {
                    await update();
                  }
              }
          }
      }
    >
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
        {#if form?.errors?.question}
          <p class=" text-destructive text-sm">{form?.errors?.question}</p>
        {/if}
        {#each $rankers as v}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.option} name="option"/>
        {/each}
      </div>
      {#if form?.errors?.option}
        <p class=" text-destructive text-sm">{form?.errors?.option}</p>
      {/if}
      <Button variant="secondary" on:click={rankers.add} disabled={$rankersDisabled}>Add Option</Button>
      <Button variant="secondary" on:click={rankers.remove} disabled={$rankersOther}>Remove Option</Button>
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

