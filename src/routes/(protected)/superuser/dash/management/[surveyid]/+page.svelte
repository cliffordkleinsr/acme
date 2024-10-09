<script lang="ts">
	import type { ActionData, PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import QuestionComponent from '$lib/components/blocks/questionnareComponents/base/questionComponent.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import Undo2 from 'lucide-svelte/icons/undo-2';
	import Target from 'lucide-svelte/icons/target';
	import CheckCheck from 'lucide-svelte/icons/check-check';
	import Star from 'lucide-svelte/icons/star';
	import { Label } from '$lib/components/ui/label';
	import * as RadioGroup from '$lib/components/ui/radio-group';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { Input } from '$lib/components/ui/input';
	import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal';
	import LikertComponent from '$lib/components/blocks/questionnareComponents/likertcomponent/LikertComponent.svelte';
	import FolderOpen from 'lucide-svelte/icons/folder-open';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import StarComponent from '$lib/components/blocks/questionnareComponents/rating/StarComponent.svelte';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import Separator from '$lib/components/ui/separator/separator.svelte';
	import Cackender from '$lib/components/blocks/liveComponent/cackendar.svelte';
	import { CalendarDate, parseDate } from '@internationalized/date';
	import * as Dialog from '$lib/components/ui/dialog';

	export let data: PageData;
	export let form: ActionData;
	let dates;
	const { surv_data, surveyqns, role } = data;
	if (surv_data.from) {
		const [smm, sdd, syyyy] = Array.from(
			new Date(surv_data.from).toLocaleDateString().split('/'),
			Number
		);
		const [emm, edd, eyyyy] = Array.from(
			new Date(surv_data.to).toLocaleDateString().split('/'),
			Number
		);

		dates = {
			start: new CalendarDate(syyyy, smm, sdd),
			end: new CalendarDate(eyyyy, emm, edd)
		};
	} else {
		let today = new Date();
		let dd = today.getDate();
		let mm = today.getMonth() + 1;
		let yyyy = today.getFullYear();
		dates = {
			start: new CalendarDate(yyyy, mm, dd),
			end: new CalendarDate(yyyy, mm, dd).add({ days: 10 })
		};
	}

	// checkbox Items

	let items: string[] = [];
	function addItem(id: string) {
		items = [...items, id];
	}

	function removeItem(id: string) {
		items = items.filter((i) => i !== id);
	}
</script>

<div class="m-4">
	<div class="grid gap-4">
		<div class="grid gap-3">
			<Card.Root class="lg:col-span-2 lg:w-11/12">
				<Card.Header class="space-y-4">
					<Card.Title><span class="font-mono text-xl">Name</span>: {surv_data.title}</Card.Title>
					<Card.Description>
						Status: {surv_data.status}
					</Card.Description>
					<Card.Description>
						<Button class="float-end" href="/superuser/dash/management" variant="outline"
							><Undo2 class="size-4" /> Back</Button
						>
					</Card.Description>
					<Separator />
				</Card.Header>
				<Card.Content class="mr-9 gap-7 lg:flex">
					<img class="w-52" src="https://i.postimg.cc/TY3g7WHD/vector3.png" alt="s" />
					<div class="mt-16 flex flex-col space-y-4">
						<h1 class="font-mono text-xl font-semibold">Description</h1>
						<p class="text-lg">{surv_data.desc}</p>
					</div>
				</Card.Content>
				<Card.Footer class="float-start flex flex-col gap-2 space-y-2">
					{#if surv_data.status === 'Live'}
						<Dialog.Root>
							<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
								DRAFT THIS SURVEY
							</Dialog.Trigger>
							<Dialog.Content>
								<form action="?/draftSurvey" method="post" class="space-y-2">
									<Dialog.Header>
										<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
										<Dialog.Description>
											This action cannot be undone. This will permanently delete all analytics
											received from this survey.
										</Dialog.Description>
									</Dialog.Header>
									<Button class="w-full" variant="destructive" type="submit">CONSENT</Button>
								</form>
							</Dialog.Content>
						</Dialog.Root>
					{:else}
						<p class="text-start lg:mr-64">Pick a start and end time for your survey</p>
						<Cackender
							user={role}
							value={dates}
							default_txt={'Set as Live'}
							age_act={true}
							gen_act={true}
							{form}
						/>
					{/if}
				</Card.Footer>
			</Card.Root>
		</div>
	</div>
	<h1 class="mt-10 pb-6 pr-16 text-center text-xl font-medium">Question List</h1>
	<form action="?/deleteMulti" method="post">
		{#if surv_data.status === 'Draft'}
			{#if surveyqns.length > 0}
				<Button type="submit" class="m-2" variant="destructive">DELETE SELECTED</Button>
			{/if}
		{/if}
		<div class="grid gap-3">
			{#each surveyqns as qns, id}
				<Card.Root class="auto-rows-auto lg:w-full">
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
							{:else}
								<div class="flex gap-2">
									<p class=" font-semibold">{id + 1}.</p>
									<FolderOpen class="size-4" />
								</div>
							{/if}
						</Card.Description>
					</Card.Header>
					<Card.Content class="space-y-3">
						<div class="flex gap-2">
							{#if surv_data.status === 'Draft'}
								<Checkbox
									onCheckedChange={(v) => {
										if (v) {
											addItem(qns.id);
										} else {
											removeItem(qns.id);
										}
									}}
								/>
								<input type="checkbox" bind:group={items} name="items" value={qns.id} hidden />
							{/if}
							{#if surv_data.status === 'Draft'}
								<p class="-py-4 font-semibold text-red-500">SELECT TO DELETE MULTIPLE</p>
							{/if}
						</div>
						<h1 class="text-md">{qns.question}</h1>
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
								<p class="text-xs text-muted-foreground">(Select all that apply)</p>
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
							<div class="grid gap-1">
								<p class="text-xs text-muted-foreground">
									(With 1 being the most important and 5 being the least important)
								</p>
								{#each qns.options as option, id}
									<p class="text-muted-foreground">{option}</p>
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
						{:else}
							<Input class="max-h-full w-1/2" disabled />
						{/if}
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
											<Button type="submit">Save</Button>
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
										This action cannot be undone. This will permanently delete this question and
										remove your data from our servers.
									</AlertDialog.Description>
								</AlertDialog.Header>
								<AlertDialog.Footer>
									<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
									<form action="?/deleteSurvQns" method="post">
										<Input type="text" value={qns.id} class="hidden" name="questionId" />
										<Button type="submit">Continue</Button>
									</form>
								</AlertDialog.Footer>
							</AlertDialog.Content>
						</AlertDialog.Root>
					</Card.Footer>
				</Card.Root>
			{/each}
		</div>
	</form>
</div>
