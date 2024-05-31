<script lang="ts">
    import * as Card from "$lib/components/ui/card"
	import Clock from 'lucide-svelte/icons/clock';
	import { Button } from '$lib/components/ui/button';
    import { Label } from "$lib/components/ui/label"
    import { Input } from "$lib/components/ui/input"
    import * as Form from "$lib/components/ui/form"
    import * as RadioGroup from "$lib/components/ui/radio-group"
    
    import { page } from "$app/stores"

    export let data
    const { questions } = data
    console.log(questions)
</script>
<!-- {#if hidden} -->
<div class="flex flex-col max-w-sm mx-auto mt-6">
    <h1 class="text-sm text-center antialiased"> Share your opinions on things that matter</h1>
    <Card.Root class="mt-5">
    <Card.Header class="bg-yellow-300 text-center rounded-t-lg">
        <Card.Title class="text-neutral-500 text-xl">Total Survey Questions</Card.Title>
        <Card.Title class="text-neutral-500 text-sm">ID: {$page.params.surveyId}</Card.Title>
        <Card.Description>
            <Button variant="ghost" class="hover:bg-inherit hover:text-neutral-400" size="icon"><Clock class="size-5"/> {data.question_cnt}'</Button>
        </Card.Description>
    </Card.Header>
    <Card.Content class="mt-14 text-center">
        <Button variant="outline" class="rounded-xl" size="lg" href='{$page.url.pathname}/{questions[0].id}'>Start the survey</Button>
    </Card.Content>
    <Card.Footer class="mt-7">
        <div class="flex flex-col gap-2 text-center">
            <h1 class="text-xs font-bold font-mono text-neutral-600 dark:text-slate-300">Your responses are completely anonymous</h1>
            <p class="font-mono text-neutral-600 text-xs tracking-tight dark:text-slate-400">
                By accepting to take this survey, a specific set of user's device data will be collected and potentially combined with answers to the questionnaires,
                in order for Acme to better understand the user and improve targeting of future surveys.
            </p>  
        </div>
    </Card.Footer>
    </Card.Root>
    <p class="text-xs text-center pt-72">By taking this survey you agree to the <a href="##" class=" text-blue-400 hover:underline underline-offset-1">Terms & Conditions</a></p>
</div>
<!-- {:else}
<form action="" method="post" class="flex flex-col gap-5 m-7 lg:max-w-lg max-w-sm">
    {#each questions as qns ,ix}
        {#if qns.question_type === "Single"}
            <Label for="question">{ix}. {qns.question}</Label>
            <Input type="text" name={qns.id}/>
        {:else}
            <Label for="question">{ix}. {qns.question}</Label>
            <RadioGroup.Root>
                {#each  qns.options as opt}
                    {#if opt != null}
                        <div class="flex items-center space-x-2">
                            <RadioGroup.Item value={opt.name}/>
                            <Label for={opt.name}>{opt.name}</Label>
                        </div>
                    {/if}
                {/each}
                <RadioGroup.Input name={qns.id}/>
            </RadioGroup.Root>   
        {/if}   
    {/each}
    <Form.Button>Submit</Form.Button>
</form>
{/if} -->