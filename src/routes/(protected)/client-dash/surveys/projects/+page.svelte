<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Button } from "$lib/components/ui/button"
    import * as Select from "$lib/components/ui/select/index.js";
	import { fade } from "svelte/transition";
	import { sineInOut } from "svelte/easing";
	import { Content } from "$lib/components/ui/dialog";
	import { onMount } from "svelte";

    let active:boolean= false

    let name:string | "" = ""
    let content:string | "" = ""
    let nameEl:HTMLInputElement 
    let contEL: HTMLTextAreaElement
   
    // const addData = (event: KeyboardEvent) => {
    //     console.log(event.key)
    //     if (event.key !== 'Enter') return
    //     const nameEl = event.target as HTMLInputElement
    //     const contEL = event.target as HTMLTextAreaElement

    //     const text = [nameEl.value, contEL.value]

    //     name = text[0]
    //     content = text[1]

    // }
    const addData = () => {
        name = nameEl.value
        content = contEL.value

        nameEl.value = ''
        contEL.value = ''
        // Create an object to store the data
        const data = { name, content }
        // Convert the object to a JSON string
        const dataString = JSON.stringify(data);

        // Store the data in localStorage
        localStorage.setItem("surveys", dataString);
    }

    onMount(() => {
        const savedData = localStorage.getItem('surveys')

        if (savedData) {
            const data = JSON.parse(savedData)

            name = data.name;
            content = data.content;
        }
    })

</script>
<div class="flex flex-col gap-5 items-center mb-3">
    <h1 class="text-2xl">Create a new project</h1>
    <Button on:click={() => active=true} class="w-96">Generate Survey</Button>   
</div>
{#if active}
<div class="grid grid-cols-2 gap-4" transition:fade={{delay:150, duration:300, easing:sineInOut}}>
    <Card.Root class="col-span-2">
        <Card.Header>
            <Card.Title>Product Details</Card.Title>
            <Card.Description>
                Lipsum dolor sit amet, consectetur adipiscing elit
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-6">
                <div class="grid gap-3">
                    <Label for="name">Name</Label>
                    <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" type="text" name="name" id="name" bind:this={nameEl}>
                </div>
                <div class="grid gap-3">
                    <Label for="description">Description</Label>
                    <textarea class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" bind:this={contEL}></textarea>
                </div>
                
            </div>
        </Card.Content>
    </Card.Root>
    <Card.Root class="col-span-1">
        <Card.Header>
            <Card.Title>Product Status</Card.Title>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-6">
                <div class="grid gap-3">
                    <Label for="status">Status</Label>
                    <Select.Root>
                        <Select.Trigger id="status" aria-label="Select status">
                            <Select.Value placeholder="Select status" />
                        </Select.Trigger>
                        <Select.Content>
                            <Select.Item value="draft" label="Draft">Draft</Select.Item>
                            <Select.Item value="published" label="Active">Active</Select.Item>
                            <Select.Item value="archived" label="Archived">Archived</Select.Item
                            >
                        </Select.Content>
                    </Select.Root>
                </div>
            </div>
        </Card.Content>
    </Card.Root>
    <div class="grid gap-6 row-span-2">
        <Button variant="outline" class="border-primary max-w-xs hover:bg-primary" href="/client-dash">Cancel</Button>
        <Button variant="outline" class="border-primary max-w-xs hover:bg-primary" on:click={addData}>Save</Button>
    </div>
</div>
{/if}

<Card.Root>
    <Card.Header>
      <Card.Title></Card.Title>
      <Card.Description>Draft</Card.Description>
    </Card.Header>
    <Card.Content>
        <div class="grid gap-3">
            <Label for="name">Name</Label>
            <Input type="text" value={name}/>
            <Label for="content">Content</Label>
            <Input type="text" value={content}/>
        </div>
    </Card.Content>
</Card.Root>
