<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import Undo2 from 'lucide-svelte/icons/undo-2';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import QuestionComponent from '$lib/components/blocks/questionnareComponents/base/questionComponent.svelte';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import CheckCheck from 'lucide-svelte/icons/check-check';
	import Target from 'lucide-svelte/icons/target';
	import Webcam from 'lucide-svelte/icons/webcam';
	import StarComponent from '$lib/components/blocks/questionnareComponents/rating/StarComponent.svelte';
	import Star from 'lucide-svelte/icons/star';
	import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal';
	import LikertComponent from '$lib/components/blocks/questionnareComponents/likertcomponent/LikertComponent.svelte';
	import Lightbulb from 'lucide-svelte/icons/lightbulb';
	import { onMount } from 'svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import BarChart4 from 'lucide-svelte/icons/bar-chart-4';
	import Questiontype from '$lib/components/blocks/questionnareComponents/questiontype.svelte';
	import { enhance } from '$app/forms';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import { cn } from '$lib/utils';
	// let arr = [1,2,3,4]
	// let disabl = [false,false,false,false]
	// const setRank = (index: number, rank: number)=> {

	// }

	export let data: PageData;
	export let form: ActionData;

	$: ({
		surveydata,
		surveyqns,
		features: { maxqns }
	} = data);
	// let rankings:any = []
	// for (const { options } of surveyqns) {
	//   rankings = options.map(()=>0)
	// }
	// function setRank(index:number, rank:number) {
	//   if (rankings[index] === rank) {
	//     // If the same rank is clicked again, unset it
	//     rankings[index] = 0;
	//   } else {
	//     // Clear the rank from any other option
	//     rankings = rankings.map((r:number) => (r === rank ? 0 : r));
	//     // Set the new rank for the selected option
	//     rankings[index] = rank;
	//   }
	//   rankings = [...rankings];
	// }
	// function isRankDisabled(rank:number) {
	//   return rankings.includes(rank);
	// }
	// Existing in DB
</script>

<div class="m-2 w-full max-w-7xl">
	<div class="grid gap-4 backdrop-blur lg:grid-cols-3">
		<!-- Survey Title and Description Card -->
		<div class="lg:col-span-2">
			<Card.Root class="h-full">
				<Card.Header>
					<Card.Title>Title: {surveydata.title}</Card.Title>
				</Card.Header>
				<Card.Content>
					<p><span class="font-semibold">Description:</span> {surveydata.desc}</p>
				</Card.Content>
				<Card.Footer class="float-end mt-auto">
					<Button href="/client-dash/surveys/questionnaire" variant="outline"
						><Undo2 class="size-4" /> Back</Button
					>
				</Card.Footer>
			</Card.Root>
		</div>

		<!-- Types of Questions Card -->
		<Card.Root class="lg:row-span-2">
			<Card.Header>
				<Card.Title>Types of Questions</Card.Title>
				<Card.Description
					>Description on the types of questions that can be generated</Card.Description
				>
			</Card.Header>
			<Card.Content class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 2xl:grid-cols-2">
				<Questiontype />
			</Card.Content>
		</Card.Root>

		<!-- Survey Questionnaire Card -->
		<Card.Root class="lg:col-span-2">
			<Card.Header class="space-y-5">
				<Card.Title class="flex items-center justify-between">
					<p>Survey Questionnaire</p>
					<Tooltip.Root>
						<Tooltip.Trigger let:builder asChild>
							<Button builders={[builder]} variant="ghost" size="icon" class="relative float-end">
								<a href="/howto"><Lightbulb class="size-5 text-muted-foreground" /></a>
								<span class="absolute end-1 top-1 -me-1.5 -mt-1.5 flex size-3">
									<span
										class="absolute inline-flex size-full animate-ping rounded-full bg-orange-400 opacity-75 dark:bg-orange-600"
									></span>
									<span class="relative inline-flex size-3 rounded-full bg-orange-500"></span>
								</span>
							</Button>
							<Tooltip.Content>
								<p>Writing survey questions?</p>
								<p>Click to learn the best practices when generating a survey</p>
							</Tooltip.Content>
						</Tooltip.Trigger>
					</Tooltip.Root>
				</Card.Title>
				<Card.Description
					>Add questions and select the type of answer to be given. The Questions Format will be
					displayed below.</Card.Description
				>
			</Card.Header>
			<Card.Content class="grid gap-3 lg:grid-cols-2">
				{#if surveyqns.length === maxqns}
					<div
						class="rounded-lg border border-yellow-200 bg-yellow-100 p-4 text-sm text-yellow-800 dark:border-yellow-900 dark:bg-yellow-800/10 dark:text-yellow-500"
						role="alert"
					>
						<span class="font-bold">Warning</span> alert! You have exceeded the maximum available questions
						for your plan
					</div>
				{:else}
					<QuestionComponent {form} />
				{/if}
			</Card.Content>
		</Card.Root>
	</div>
	<h1 class="m-5 text-start text-xl font-medium">Question List</h1>
	<div class="mx-5 grid gap-3">
		{#each surveyqns as qns, id}
			<Card.Root>
				<Card.Header>
					<Card.Description class="text-xs font-thin">
						{#if qns.question_type === 'Optional'}
							<div class="flex gap-2">
								<p class=" font-semibold">{id + 1}.</p>
								<Target class="size-4" />
							</div>
						{:else if qns.question_type === 'Multiple'}
							<div class="flex gap-2">
								<p class=" font-semibold">{id + 1}.</p>
								<CheckCheck class="size-4" />
							</div>
						{:else if qns.question_type === 'Rating'}
							<div class="flex gap-2">
								<p class=" font-semibold">{id + 1}.</p>
								<Star class="size-4" />
							</div>
						{:else if qns.question_type === 'Likert'}
							<div class="flex gap-2">
								<p class=" font-semibold">{id + 1}.</p>
								<SlidersHorizontal class="size-4" />
							</div>
						{:else if qns.question_type === 'Ranking'}
							<div class="flex gap-2">
								<p class=" font-semibold">{id + 1}.</p>
								<BarChart4 class="size-4" />
							</div>
						{:else}
							<div class="flex gap-2">
								<p class=" font-semibold">{id + 1}.</p>
								<Webcam class="size-4" />
							</div>
						{/if}
					</Card.Description>
				</Card.Header>
				<Card.Content class="space-y-3">
					<h1 class="text-md">{qns.question}</h1>
					<Collapsible.Root>
						<div class="flex gap-1">
							<Collapsible.Trigger
								class={cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'size-8')}
							>
								<ChevronsUpDown class="size-4" />
							</Collapsible.Trigger>
							<h1 class="mx-1 my-1 text-sm text-muted-foreground">Options</h1>
						</div>
						<Collapsible.Content class="my-2">
							{#if qns.question_type === 'Optional'}
								<RadioGroup.Root value="option-one" class="grid grid-cols-2 2xl:grid-cols-3">
									{#each qns.options as option, id}
										{#if option != null}
											<div class="flex items-center space-x-2">
												<RadioGroup.Item value={option} disabled />
												<Label for={option} class="text-muted-foreground">{option}</Label>
											</div>
										{/if}
									{/each}
								</RadioGroup.Root>
							{:else if qns.question_type === 'Multiple'}
								<div class="grid grid-cols-2 gap-2 2xl:grid-cols-3">
									{#each qns.options as option, id}
										{#if option != null}
											<div class="flex gap-2">
												<Checkbox disabled />
												<Label
													for="option1"
													class="py-[3px] text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
												>
													{option}
												</Label>
											</div>
										{/if}
									{/each}
								</div>
							{:else if qns.question_type === 'Rating'}
								<StarComponent />
							{:else if qns.question_type === 'Likert'}
								<RadioGroup.Root
									value="option-one"
									class="grid grid-cols-2 space-y-1 2xl:grid-cols-3"
								>
									<LikertComponent likert_key={qns.likert_key} />
								</RadioGroup.Root>
							{:else if qns.question_type === 'Ranking'}
								<ScrollArea class="h-[180px] rounded-md border" orientation="both">
									<div class="grid gap-1">
										{#each qns.options as option, id}
											<p class="text-muted-foreground">{option}</p>
											<p class="text-muted-foreground">
												(With 1 being the most important and 5 being the least important)
											</p>
											<div class="grid max-w-lg grid-cols-5 gap-1">
												{#each [1, 2, 3, 4, 5] as rank}
													<div class="flex flex-col gap-2">
														<Button variant="secondary" size="icon" disabled>
															{rank}
														</Button>
														{#if rank === 1}
															<p class="ml-2 text-xs text-muted-foreground">High</p>
														{:else if rank === 5}
															<p class="ml-2 text-xs text-muted-foreground">Low</p>
														{/if}

														<!-- <Button
                      
                        variant="secondary"
                        size="icon"
                        class="{rankings[id] === rank?'bg-primary': 'bg-muted'}"
                        on:click={() => setRank(id, rank)}
                        disabled={rankings[id] !== rank && isRankDisabled(rank)}
                      >
                      {rank}
                    </Button> -->
													</div>
												{/each}
											</div>
										{/each}
									</div>
								</ScrollArea>
							{:else}
								<Input class="max-h-full lg:w-1/2" disabled />
							{/if}
						</Collapsible.Content>
					</Collapsible.Root>
				</Card.Content>
				<Card.Footer class="float-end gap-10">
					<AlertDialog.Root>
						<AlertDialog.Trigger asChild let:builder>
							<Button builders={[builder]} variant="outline">Edit</Button>
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
									<div class="flex w-full flex-col gap-2">
										<Label>Question</Label>
										<Input type="text" value={qns.question} name="question" />
										<Input type="text" value={qns.id} class="hidden" name="questionId" />
										{#if qns.question_type === 'Optional' || qns.question_type === 'Multiple'}
											<Label>Options</Label>
											{#each qns.options as option, i}
												{@const id = qns.optionid[i]}
												{#if option != null}
													<div class="flex gap-4">
														<Input type="text" value={option} name="option" />
														<Input type="text" value={id} name="optionId" class="hidden" />
														<form action="?/deleteOpt" method="post">
															<Input type="text" value={id} name="optionId" class="hidden" />
															<Button size="icon" variant="secondary" type="submit"
																><Trash2 class="size-4 text-destructive" /></Button
															>
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
						<AlertDialog.Trigger class={buttonVariants({ variant: 'default' })}>
							Delete
						</AlertDialog.Trigger>
						<AlertDialog.Content>
							<AlertDialog.Header>
								<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
								<AlertDialog.Description>
									This action cannot be undone. This will permanently delete this question and
									remove your data from our servers.
								</AlertDialog.Description>
							</AlertDialog.Header>
							<AlertDialog.Footer>
								<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
								<form action="?/deleteSurvQns" method="post" use:enhance>
									<Input type="text" value={qns.id} class="hidden" name="questionId" />
									<Input type="text" value={qns.question_type} class="hidden" name="questionType" />
									<Form.Button class="w-full">Continue</Form.Button>
								</form>
							</AlertDialog.Footer>
						</AlertDialog.Content>
					</AlertDialog.Root>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
