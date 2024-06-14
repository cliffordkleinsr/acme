<script lang="ts">
	  import { browser } from "$app/environment";
    import * as Dialog from "$lib/components/ui/dialog"
    import * as Drawer from "$lib/components/ui/drawer"
    import { Button } from "$lib/components/ui/button"
    import { Label } from "$lib/components/ui/label"
    import { Input } from "$lib/components/ui/input"
    import CheckCheck from 'lucide-svelte/icons/check-check'
    import Target from 'lucide-svelte/icons/target'
    import FolderOpen from "lucide-svelte/icons/folder-open";
    import Star from 'lucide-svelte/icons/star'
    import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal'
    import * as Select from "$lib/components/ui/select"
    
    import BarChart4 from 'lucide-svelte/icons/bar-chart-4'

    let isDesktop = true
    let open = false;
    let disabled = false
    let other = true

    let disabled_rank = false
    let other_rank = true
    
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

    let values = [
      {option: ''}
    ]
    let rankers = [
      {opts: ''}
    ]

  // Blank Values
  $: length = values.length
  $: length_rank = rankers.length

  // for Multiplechoice
  $: switch (true) {
    case length >= 7:
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

  // for ranker
  $: switch (true) {
    case length_rank >= 5:
      disabled_rank = true
      break;
  
    default:
      disabled_rank = false;
      break;
  }
  $: switch (true) {
    case length >= 1:
      other_rank = false
      break;
  
    default:
      other_rank = true
      break;
  }
  const addOption = () => {
    values = [...values, {option: ''}]
  }
  const remOption = () => {
      values = values.slice(0, values.length-1)
  }

  const addOption2 = () => {
    rankers = [...rankers, {opts: ''}]
  }
  const remOption2 = () => {
    rankers = rankers.slice(0, rankers.length-1)
  }
</script>

{#if isDesktop}
  <Dialog.Root bind:open>
    <Dialog.Trigger asChild let:builder>
        <Button variant="outline" builders={[builder]} class="text-xs flex gap-2"><FolderOpen class="size-4"/> Add open ended question</Button>
    </Dialog.Trigger>
    <Dialog.Content class="sm:max-w-[425px]">
        <Dialog.Header class="space-y-3">
        <Dialog.Title>Open ended Question</Dialog.Title>
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
      <Button variant="outline" builders={[builder]} class="flex gap-2"><FolderOpen class="size-4"/> Add open ended question</Button>
    </Drawer.Trigger>
    <Drawer.Content>
      <Drawer.Header class="text-left space-y-3">
        <Drawer.Title>Open ended Question</Drawer.Title>
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
    <Button variant="outline" builders={[builder]} class="text-xs flex gap-2"><CheckCheck class="size-4" />Add multiple selection question</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Multiple Selection Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question can have multiple answers which can be ticked)
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/addMultiQns" method="post" class="grid items-start gap-4">
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
        {#each values as v, i}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.option} name="option"/>
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
    <Button variant="outline" builders={[builder]} class="flex gap-2"><CheckCheck class="size-4" /> Add checkbox question</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Checkbox Question</Drawer.Title>
      <Drawer.Description>
        Enter Question (This question can have multiple answers which can be ticked)
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
      <Button variant="secondary" on:click={addOption}>Add Option</Button>
      <Button variant="secondary" on:click={remOption}>Remove Option</Button>
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
    <Button variant="outline" builders={[builder]} class="text-xs flex gap-2"> <Target class="size-4"/> Add multiple choice question</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Multiple Choice Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question will have one optional answer with multiple selections)
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/addOptQns" method="post" class="grid items-start gap-4">
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
    <Button variant="outline" builders={[builder]} class="flex gap-2"> <Target class="size-4"/> Add multiple choice question</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Multiple Choice Question</Drawer.Title>
      <Drawer.Description>
        Enter Question (This question will have one optional answer with multiple selections)
      </Drawer.Description>
    </Drawer.Header>
    <form action="?/addOptQns" method="post" class="grid items-start gap-4 px-4">
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
{#if isDesktop}
  <Dialog.Root>
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
    <form action="?/addStarQns" method="post" class="grid items-start gap-4">
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root>
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
    <form action="?/addStarQns" method="post" class="grid items-start gap-4 px-4">
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
    <Button variant="outline" builders={[builder]} class="text-xs flex gap-2"> <SlidersHorizontal class="size-4"/> Add a likert question</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Likert Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question will have one optinionative selection)
      </Dialog.Description>
    </Dialog.Header>
    <form action="?/addLikQns" method="post" class="grid items-start gap-4">
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
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
  <Drawer.Root>
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
    <form action="?/addLikQns" method="post" class="grid items-start gap-4 px-4">
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>

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
{#if isDesktop}
  <Dialog.Root>
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
    <form action="?/addRnkQns" method="post" class="grid items-start gap-4">
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
        {#each rankers as v, i}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.opts} name="option_{i}"/>
        {/each}
      </div>
      <Button variant="secondary" on:click={addOption2} bind:disabled={disabled_rank}>Add Option</Button>
      <Button variant="secondary" on:click={remOption2} bind:disabled={other_rank}>Remove Option</Button>
      <Button type="submit">Save changes</Button>
    </form>
  </Dialog.Content>
  </Dialog.Root>
{:else}
  <Drawer.Root>
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
    <form action="?/addRnkQns" method="post" class="grid items-start gap-4 px-4">
      <div class="grid gap-2">
        <Label for="question">Question</Label>
        <Input type="text" name="question"/>
        {#each rankers as v, i}
          <Label for="option">Enter Option</Label>
          <Input type="text" bind:value={v.opts} name="option_{i}"/>
        {/each}
      </div>
      <Button variant="secondary" on:click={addOption2} bind:disabled={disabled_rank}>Add Option</Button>
      <Button variant="secondary" on:click={remOption2} bind:disabled={other_rank}>Remove Option</Button>
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
