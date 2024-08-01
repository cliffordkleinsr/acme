<script lang="ts">
    import type { PageData } from './$types';
	import * as Form from "$lib/components/ui/form"
    import { Input } from "$lib/components/ui/input"
    import { Label } from "$lib/components/ui/label"
    import * as RadioGroup from "$lib/components/ui/radio-group"
	import { Progress } from "$lib/components/ui/progress"
	import Badge from '$lib/components/ui/badge/badge.svelte';
	import CheckCheck from 'lucide-svelte/icons/check-check';
	import { Checkbox } from '$lib/components/ui/checkbox';
    import { Textarea } from "$lib/components/ui/textarea"
	import LikertComponent from '$lib/components/blocks/questionnareComponents/likertcomponent/LikertComponent.svelte';
	import StarComponent from '$lib/components/blocks/questionnareComponents/rating/StarComponent.svelte';
	import Ranker from '$lib/components/blocks/questionnareComponents/rankingComponent/Ranker.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import type { ZodError } from 'zod';
    
    export let data: PageData;
    export let form

    const { questions, question_cnt, count } = data

    // Percentages
    let cnt = count + 1
    const qns = questions
    const perc = Math.round((cnt / question_cnt) * 100)
    
    // checkbox Items
    let items:any[] = []
    function addItem(id: string) {
        items = [...items, id];
    }
    
    function removeItem(id: string) {
        items = items.filter((i) => i !== id);
    }
</script>

<Progress value={perc} />
{#if qns.question_type === "Single"}
    <form action="?/defaultAns" method="post" class="flex flex-col gap-5 m-5 lg:max-w-lg max-w-sm mx-auto mt-20">
        <Label for="answer">{qns.question}</Label>
        <Textarea name="answer" />
        {#if form?.errors?.answer}
            <p class=" text-destructive text-sm">{form?.errors?.answer}</p>
        {/if}
        <Badge class="max-w-44 bg-green-300 text-white" variant="outline">PLEASE WRITE IN THE BOX</Badge>
        <Form.Button class="mt-16 gap-4" variant="outline"> <CheckCheck class="text-green-400" /> Submit</Form.Button>
    </form>
{:else if qns.question_type === "Optional"}
    <form action="?/defaultAns" method="post" class="flex flex-col gap-5 m-5 lg:max-w-lg max-w-sm mx-auto mt-20">
        <Label for="question">{qns.question}</Label>
        <RadioGroup.Root>
            {#each qns.options as opt, i}
            {@const id = qns.optionid[i]}
                {#if opt !== null}
                    <div class="flex items-center space-x-2">
                        <RadioGroup.Item value={opt}/>
                        <Label for={opt}>{opt}</Label>
                    </div>
                {/if}
            {/each}
            <RadioGroup.Input name="answer"/>
            {#if form?.warnings?.message}
                <p class=" text-destructive text-sm">{form?.warnings?.message}</p>
            {/if}
        </RadioGroup.Root>
        <Form.Button class="mt-16 gap-4" variant="outline"> <CheckCheck class="text-green-400" /> Submit</Form.Button>
    </form>
{:else if qns.question_type === "Likert"}
    <form action="?/defaultAns" method="post" class="flex flex-col gap-5 m-5 lg:max-w-lg max-w-sm mx-auto mt-20">
        <Label for="question">{qns.question}</Label>
        <RadioGroup.Root>
            <LikertComponent likert_key={qns.likert_key} disabled={false}/>
            <RadioGroup.Input name="answer"/>
            {#if form?.errors?.answer}
                <p class=" text-destructive text-sm">{form?.errors?.answer}</p>
            {/if}
        </RadioGroup.Root>
        <Form.Button class="mt-16 gap-4" variant="outline"> <CheckCheck class="text-green-400" /> Submit</Form.Button>
    </form>
{:else if qns.question_type === "Rating"}
    <form action="?/addRatAns" method="post" class="flex flex-col gap-5 m-5 lg:max-w-lg max-w-sm mx-auto mt-20">
        <Label for="question">{qns.question}</Label>
        <StarComponent disabled={false}/>
        {#if form?.errors?.answer}
            <p class=" text-destructive text-sm">{form?.errors?.answer}</p>
        {/if}
        <Form.Button class="mt-16 gap-4" variant="outline"> <CheckCheck class="text-green-400" /> Submit</Form.Button>
    </form>
{:else if qns.question_type === "Ranking"}
    <form action="?/addRankAns" method="post" class="flex flex-col gap-5 m-5 lg:max-w-lg max-w-sm mx-auto mt-20">
        <Label for="question">{qns.question}</Label>
        <Ranker options={qns.options} />
        {#if form?.errors?.id}
            <p class=" text-destructive text-sm">{form?.errors?.id[0]}</p>
        {/if}
        <Form.Button class="mt-16 gap-4" variant="outline"> <CheckCheck class="text-green-400" /> Submit</Form.Button>
    </form>
{:else}
    <form action="?/addCheckAns" method="post" class="flex flex-col gap-5 m-5 lg:max-w-lg max-w-sm mx-auto mt-20">
        <Label for="question">{qns.question}</Label> 
        {#each qns.options as opt, i}
            {@const id = qns.optionid[i]}
            {#if opt !== null}
                <div class="flex gap-2">
                    <Checkbox
                        onCheckedChange={(v) => {
                            if (v) {
                                addItem(opt);
                            } else {
                                removeItem(opt);
                            }
                        }}
                    />
                    <Label
                        for="option1"
                        class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 py-[3px]"
                    >
                        {opt}
                    </Label>
                    <Input value={id}  name="optionId" class="hidden"/>
                    <input type="checkbox" bind:group={items} name="answer" value={opt} hidden/>
                </div>
            {/if}
        {/each}
        {#if form?.warnings?.message}
            <p class=" text-destructive text-sm">{form?.warnings?.message}</p>
        {/if}
        <!-- {#if form?.errors?.answer}
            <p class=" text-destructive text-sm">{form?.errors?.answer}</p>
        {/if} -->
        <Form.Button class="mt-16 gap-4" variant="outline"> <CheckCheck class="text-green-400" /> Submit</Form.Button>
    </form>
{/if}

<!-- {#if show_msg}
    <div class="mt-64 bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500 max-w-md mx-auto text-lg" role="alert" transition:fade={{ delay: 250, duration: 300 }}>
        <span class="font-bold">Danger</span> alert! Dont close this tab before answering all questions.
    </div>
{/if} -->
  
