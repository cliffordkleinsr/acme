<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
    import { Button } from "$lib/components/ui/button"
	import { fade } from "svelte/transition";
	import { sineInOut } from "svelte/easing";
    import * as Form from "$lib/components/ui/form/index.js"

    export let form

</script>
<div class="flex flex-col m-16 gap-5">
<h1 class="text-2xl ml-3">Create a new project</h1>
<form method="post" class="grid grid-cols-2 gap-4 " transition:fade={{delay:150, duration:300, easing:sineInOut}}>
    <Card.Root class="col-span-2 max-w-4xl">
        <Card.Header>
            <Card.Title>Survey Details</Card.Title>
            <Card.Description>
                Lipsum dolor sit amet, consectetur adipiscing elit
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-6">
                <Label for="title">Survey Title</Label>
                <input class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" type="text" name="surveyTitle">
                <Label for="description">Description</Label>
                <textarea class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" name="surveyDescription"></textarea>
                {#if form?.message}
                    <Label class="text-red-600">{form.message}</Label>
                {/if}
                <Form.Button class="max-w-sm">Submit</Form.Button>
            </div>
        </Card.Content>
    </Card.Root>
    <Button class="max-w-md" variant="outline" href="/client-dash">Cancel</Button>
    
    <!-- <Button variant="outline" on:click={addData} on:click={() => active=false}>Save</Button> -->
</form>
</div>