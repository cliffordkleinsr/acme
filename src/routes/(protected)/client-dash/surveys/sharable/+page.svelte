<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import { Input } from '$lib/components/ui/input';

	import Share from 'lucide-svelte/icons/share';
	import Socials from '$lib/components/blocks/sharerpw/Socials.svelte';
	import { copyText } from 'svelte-copy';
	import Clipboard from 'lucide-svelte/icons/clipboard';
	import Check from 'lucide-svelte/icons/check';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { browser } from '$app/environment';
	import FileX2 from 'lucide-svelte/icons/file-x-2';
	import { dev } from '$app/environment';

	export let data: PageData;

	const { sharable } = data;

	let cicked = false;
	let isDesktop = true;

	if (browser) {
		isDesktop = window.innerWidth >= 768;
	}
	const BASE_URL = dev ? 'http://localhost:5173' : 'https://int-insights.com';
</script>

{#if sharable.length > 0}
	<div class="m-4 flex flex-col gap-10">
		<div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
			{#each sharable as item}
				<Card.Root>
					<Card.Header>
						<Card.Title>{item.title}</Card.Title>
						<Card.Description>{item.desc}</Card.Description>
					</Card.Header>
					<Card.Content class="flex gap-3">
						{#if isDesktop}
							<HoverCard.Root>
								<HoverCard.Trigger let:builder asChild>
									<Button builders={[builder]} class="bg-black hover:bg-black/85" size="icon">
										<Share class="size-5" />
									</Button>
									<div class="my-3 text-sm italic">Hover over me</div>
								</HoverCard.Trigger>
								<HoverCard.Content side="right" class="flex gap-1 ">
									<Input
										value={`${BASE_URL}/agent-dash/surveys/take/${item.id}?external=${item.id}`}
									/>
									<Button
										variant="ghost"
										size="icon"
										on:click={() => {
											copyText(
												`${BASE_URL}/agent-dash/surveys/take/${item.id}?external=${item.id}`
											);
											cicked = !cicked;
										}}
									>
										{#if cicked}
											<Check class="size-4 text-muted-foreground " />
										{:else}
											<Clipboard class="size-5 text-muted-foreground " />
										{/if}
									</Button>
								</HoverCard.Content>
							</HoverCard.Root>
						{:else}
							<AlertDialog.Root>
								<AlertDialog.Trigger let:builder asChild>
									<Button builders={[builder]} class="bg-black hover:bg-black/85" size="icon">
										<Share class="size-5" />
									</Button>
								</AlertDialog.Trigger>
								<AlertDialog.Content>
									<AlertDialog.Header>
										<AlertDialog.Title></AlertDialog.Title>
										<AlertDialog.Description class="flex gap-1">
											<Input
												value={`${BASE_URL}/agent-dash/surveys/take/${item.id}?external=${item.id}`}
											/>
											<Button
												variant="ghost"
												size="icon"
												on:click={() => {
													copyText(
														`${BASE_URL}/agent-dash/surveys/take/${item.id}?external=${item.id}`
													);
													cicked = !cicked;
												}}
											>
												{#if cicked}
													<Check class="size-4 text-muted-foreground " />
												{:else}
													<Clipboard class="size-5 text-muted-foreground " />
												{/if}
											</Button>
										</AlertDialog.Description>
									</AlertDialog.Header>
									<AlertDialog.Footer>
										<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
									</AlertDialog.Footer>
								</AlertDialog.Content>
							</AlertDialog.Root>
						{/if}
						<div class="flex flex-1 justify-end gap-2">
							<Socials
								type="X"
								quote="Please have a look at my survey on {item.title}"
								url={`${BASE_URL}/agent-dash/surveys/take/${item.id}?external=${item.id}`}
							/>
							<Socials
								type="FB"
								quote="Please have a look at my survey on {item.title}"
								url={`${BASE_URL}/agent-dash/surveys/take/${item.id}?external=${item.id}`}
							/>
							<Socials
								quote={item.title}
								type="IN"
								url={`${BASE_URL}/agent-dash/surveys/take/${item.id}?external=${item.id}`}
							/>
						</div>
					</Card.Content>
				</Card.Root>
			{/each}
		</div>
	</div>
{:else}
	<div class="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
		<div class="space-y-6 text-center">
			<FileX2 class="mx-auto h-24 w-24 text-muted-foreground" />
			<h1 class="text-3xl font-bold tracking-tight">Nothing to show here</h1>
			<p class="mx-auto max-w-sm text-muted-foreground">
				It looks like there's no data to display at the moment. Try reloading or check back later.
			</p>
		</div>
	</div>
{/if}
