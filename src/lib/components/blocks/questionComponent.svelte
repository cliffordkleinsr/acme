<script lang="ts">
	import { browser } from "$app/environment";
    import * as Dialog from "$lib/components/ui/dialog"
    import * as Drawer from "$lib/components/ui/drawer"
    import { Button } from "$lib/components/ui/button"
    import { Label } from "$lib/components/ui/label"
    import { Input } from "$lib/components/ui/input"
    import { ScrollArea } from "$lib/components/ui/scroll-area"
    
    let isDesktop = true
    let open = false;
    let disabled = false
    let other = true
    if (browser) {
      isDesktop = window.innerWidth >= 768
    }

    let values = [
    {option: ''}
  ]

  // Blank Values
  $: length = values.length
  
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
  const addOption = () => {
    values = [...values, {option: ''}]
  }
  const remOption = () => {
      values = values.slice(0, values.length-1)
    }
</script>

{#if isDesktop}
  <Dialog.Root bind:open>
    <Dialog.Trigger asChild let:builder>
        <Button variant="outline" builders={[builder]} class="text-xs">Add Question With Single Answer</Button>
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
    <Button variant="outline" builders={[builder]} class="text-xs">Add Question With Multiple Answers</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Multiple Answer Question</Dialog.Title>
      <Dialog.Description>
        Enter Question (This question will have multiple answers)
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
    <Button variant="outline" builders={[builder]}>Add Question With Multiple Answers</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Multiple Answer Question</Drawer.Title>
      <Drawer.Description>
        Enter Question (This question will have multiple answers)
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
{#if isDesktop}
  <Dialog.Root>
  <Dialog.Trigger asChild let:builder>
    <Button variant="outline" builders={[builder]} class="text-xs">Add Question With Optional Answers</Button>
  </Dialog.Trigger>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header class="space-y-3">
      <Dialog.Title>Multiple Answer Question</Dialog.Title>
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
    <Button variant="outline" builders={[builder]}>Add Question With Optional Answers</Button>
  </Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header class="text-left space-y-3">
      <Drawer.Title>Optional Answer Question</Drawer.Title>
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
