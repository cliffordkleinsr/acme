<script lang="ts">
	// Store
	// SHADCN UI
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area';
	import * as Select from '$lib/components/ui/select';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	// sonner
	import { toast } from 'svelte-sonner';

	// Lucid Icons
	import Check from 'lucide-svelte/icons/check';
	import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';

	// UI variants
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import { cn } from '$lib/utils';

	// SUPER FORMS
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';

	// ZOD SCHEMA
	import { counties, registerCSchema, type RegisterCSchema } from './schema';

	// Local Variables
	import { closeAndFocusTrigger } from '$lib/helperFunctions/helpers';
	import { sectors } from '$lib/json/index';
	import Meta from '$lib/components/blocks/seo/meta.svelte';
	import { countyMap } from '$lib/json/subcountis';

	// KitLoad<MiddleWare>
	export let data: SuperValidated<Infer<RegisterCSchema>>;

	const form = superForm(data, {
		validators: zodClient(registerCSchema),
		onUpdated: () => {
			if (!$message) return;

			const { alertType, alertText } = $message;
			if (alertType === 'success') {
				toast.error(alertText);
			}
			if (alertType === 'error') {
				toast.error(alertText);
			}
		}
	});
	const { form: formData, enhance, message, delayed } = form;

	// command
	let open: boolean = false;

	// County
	let previousCounty = '';

	$: if ($formData.county !== previousCounty) {
		$formData.subctys = 'Select your area sub-county';
		previousCounty = $formData.county;
	}
	$: selectedSector = $formData.sector
		? {
				label: $formData.sector,
				value: $formData.sector
			}
		: undefined;
	$: selectedScty = $formData.subctys
		? {
				label: $formData.subctys,
				value: $formData.subctys
			}
		: undefined;

	const props = {
		title: 'Client Sign Up • Intuitive Insights KE',
		description: 'Gather insightful feedback, analyze data, and make informed decisions.',
		type: 'Website'
	};
</script>

<Meta {...props} />
<div class="mb-5 mt-10 flex flex-1 justify-center">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator></Breadcrumb.Separator>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/client/signin">Client SignIn</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator></Breadcrumb.Separator>
			<Breadcrumb.Item>
				<Breadcrumb.Page>Client Registration</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>

<!-- <SuperDebug data={$formData}/> -->
<form method="post" class="m-2" use:enhance>
	<Card.Root class="mx-auto max-w-lg">
		<Card.Header>
			<Card.Title class="text-xl text-primary">Sign Up</Card.Title>
			<Card.Description>Create a Client account to begin gathering insights</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-4">
				<div class="grid gap-4 lg:grid-cols-2">
					<div class="grid gap-2">
						<Form.Field {form} name="fullname">
							<Form.Control let:attrs>
								<Form.Label>Full Name</Form.Label>
								<Input {...attrs} bind:value={$formData.fullname} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
					<div class="grid gap-2">
						<Form.Field {form} name="email">
							<Form.Control let:attrs>
								<Form.Label>Email</Form.Label>
								<Input {...attrs} type="email" bind:value={$formData.email} />
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>
				</div>
				<div class="grid gap-4">
					<div class="grid gap-4 lg:grid-cols-2">
						<div class="grid gap-2">
							<Form.Field {form} name="company">
								<Form.Control let:attrs>
									<Form.Label>Company Name</Form.Label>
									<Input {...attrs} bind:value={$formData.company} />
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div class="grid gap-2">
							<Form.Field {form} name="phoneno">
								<Form.Control let:attrs>
									<Form.Label>Phone Number</Form.Label>
									<Input {...attrs} bind:value={$formData.phoneno} />
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
				</div>

				<div class="grid gap-2">
					<div class="grid gap-4 lg:grid-cols-2">
						<div class="grid gap-2">
							<Form.Field {form} name="county">
								<Popover.Root bind:open let:ids>
									<Form.Control let:attrs>
										<Form.Label>Company Location</Form.Label>
										<Popover.Trigger
											class={cn(
												buttonVariants({ variant: 'outline' }),
												'w-[200px] justify-between',
												!$formData.county && 'text-muted-foreground'
											)}
											role="combobox"
											{...attrs}
										>
											{counties.find((f) => f.name === $formData.county)?.name ?? 'Select a County'}
											<ChevronsUpDown class="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Popover.Trigger>
										<input hidden value={$formData.county} name={attrs.name} />
									</Form.Control>
									<Popover.Content class="w-auto p-0" side="bottom">
										<Command.Root>
											<Command.Input autofocus placeholder="Search County..." class="h-9" />
											<Command.Empty>No County found.</Command.Empty>
											<Command.Group>
												<ScrollArea class="h-[200px] lg:h-96">
													{#each counties as cty}
														<Command.Item
															value={cty.name}
															onSelect={() => {
																$formData.county = cty.name;
																closeAndFocusTrigger(ids.trigger);
																open = !open;
															}}
														>
															{cty.name}
															<Check
																class={cn(
																	'ml-auto h-4 w-4',
																	cty.name !== $formData.county && 'text-transparent'
																)}
															/>
														</Command.Item>
													{/each}
												</ScrollArea>
											</Command.Group>
										</Command.Root>
									</Popover.Content>
								</Popover.Root>
								<Form.FieldErrors />
							</Form.Field>
						</div>
						<div class="grid gap-2">
							<Form.Field {form} name="subctys">
								<Form.Control let:attrs>
									<Form.Label>Sub-County</Form.Label>
									<Select.Root
										selected={selectedScty}
										onSelectedChange={(v) => {
											v && ($formData.subctys = v.value);
										}}
									>
										<Select.Trigger {...attrs}>
											<Select.Value placeholder="Select your area sub-county" />
										</Select.Trigger>
										<Select.Content>
											{#if countyMap.has($formData.county)}
												{@const ctys = countyMap.get($formData.county)}
												{#each ctys as ct}
													<Select.Item value={ct} label={ct}></Select.Item>
												{/each}
											{/if}
										</Select.Content>
									</Select.Root>
									<input hidden bind:value={$formData.subctys} name={attrs.name} />
								</Form.Control>
								<Form.FieldErrors />
							</Form.Field>
						</div>
					</div>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="sector">
						<Form.Control let:attrs>
							<Form.Label>Sectors</Form.Label>
							<Select.Root
								selected={selectedSector}
								onSelectedChange={(v) => {
									v && ($formData.sector = v.value);
								}}
							>
								<Select.Trigger {...attrs}>
									<Select.Value placeholder="Select a Sector" />
								</Select.Trigger>
								<Select.Content side="bottom">
									<ScrollArea class="h-[200px] lg:h-96">
										{#each sectors as sector}
											<Select.Item value={sector.value} label={sector.label}></Select.Item>
										{/each}
									</ScrollArea>
								</Select.Content>
							</Select.Root>
							<input hidden bind:value={$formData.sector} name={attrs.name} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="password">
						<Form.Control let:attrs>
							<Form.Label>Password</Form.Label>
							<Input {...attrs} type="password" bind:value={$formData.password} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				<div class="grid gap-2">
					<Form.Field {form} name="passwordConfirm">
						<Form.Control let:attrs>
							<Form.Label>Confirm Password</Form.Label>
							<Input {...attrs} type="password" bind:value={$formData.passwordConfirm} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
				</div>
				{#if $delayed}
					<Button class="flex gap-2">
						<span
							class="inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
							role="status"
							aria-label="loading"
						></span>
						Loading...
					</Button>
				{:else}
					<Form.Button>Create an account</Form.Button>
				{/if}
				<!-- <Button type="submit" class="w-full">t</Button> -->
				<!-- <Button variant="outline" class="w-full">Sign up with Google</Button> -->
			</div>
			<div class="mt-4 text-center text-sm">
				Already have an account?
				<a href="/client/signin" class="underline hover:text-primary"> Sign in </a>
			</div>
		</Card.Content>
	</Card.Root>
</form>
