<script lang="ts">
    import type { PageData } from './$types';
    import { Button } from "$lib/components/ui/button"
	import * as Form from "$lib/components/ui/form"
    import { Input } from "$lib/components/ui/input"
    import { Label } from "$lib/components/ui/label"
    import * as RadioGroup from "$lib/components/ui/radio-group"
	import { applyAction, enhance } from '$app/forms';
	import { Progress } from "$lib/components/ui/progress"
    import { page } from '$app/stores';
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import CheckCheck from 'lucide-svelte/icons/check-check';
	import { invalidateAll } from '$app/navigation';
	import { Checkbox } from '$lib/components/ui/checkbox';
    
    
    export let data: PageData;
    export let form
    const { questions, question_cnt, count } = data
    let cnt = count + 1
    const qns = questions
    const { options } = qns
    const perc = Math.round((cnt / question_cnt) * 100)

    let items:any[] = []
    function addItem(id: string) {
        items = [...items, id];
    }
    
    function removeItem(id: string) {
        items = items.filter((i) => i !== id);
    }
 
</script>

<Progress value={perc} />
<!-- <h1>Checkboxes: {items.join(', ')}</h1> -->
<form action="" method="post" class="flex flex-col gap-5 m-5 lg:max-w-lg max-w-sm mx-auto mt-20">
    {#if qns.question_type === "Single"}
            <Label for="answer">{qns.question}</Label>
            
            <Input type="text" name="answer"/>
            {#if form?.errors?.answer}
                <p class=" text-destructive text-sm">{form?.errors?.answer}</p>
            {/if}
            <Badge class="max-w-44 bg-green-300 text-white" variant="outline">PLEASE WRITE IN THE BOX</Badge>
    {:else if qns.question_type === "Optional"}
        <Label for="question">{qns.question}</Label>
        <RadioGroup.Root>
            {#each qns.options as opt}
                {#if opt.name !== null}
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value={opt.name}/>
                        <Label for={opt.name}>{opt.name}</Label>
                    </div>
                {/if}
            {/each}
            <RadioGroup.Input name="answer"/>
            {#if form?.errors?.answer}
                <p class=" text-destructive text-sm">{form?.errors?.answer}</p>
            {/if}
        </RadioGroup.Root>
    {:else}
    <Label for="question">{qns.question}</Label> 
        {#each qns.options as opt}
            {#if opt.name !== null}
            <div class="flex gap-2">
                <Checkbox
                onCheckedChange={(v) => {
                    if (v) {
                      addItem(opt.name);
                    } else {
                      removeItem(opt.name);
                    }
                  }}
                />
                <Label
                for="option1"
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-[3px]"
                >
                {opt.name}
                </Label>
                <input type="checkbox" bind:group={items} name="answer" value={opt.name} />
            </div>
            {/if}
        {/each}
    {/if}   
    <Form.Button class="mt-16 gap-4" variant="outline"> <CheckCheck class="text-green-400" /> Submit</Form.Button>
</form>