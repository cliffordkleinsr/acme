<script lang="ts">
	// SHADCN UI
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';

	// SUPER FORMS
	import type { Infer, SuperValidated } from 'sveltekit-superforms';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	// ZOD SCHEMA
	import { signinASchema, type SigninASchema } from './schema';

	// sonner
	import { toast } from 'svelte-sonner';
	// app stores
	import { page } from '$app/stores';
	// custom toaster
	import Pretoast from '$lib/components/blocks/pretoast.svelte';

	import { sineInOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';

	// KitLoad<MiddleWare>
	export let data: SuperValidated<Infer<SigninASchema>>;

	const form = superForm(data, {
		validators: zodClient(signinASchema),
		onUpdated: () => {
			if (!$message) return;

			const { alertType, alertText } = $message;
			if (alertType === 'success') {
				toast.success(alertText);
			}
			if (alertType === 'error') {
				toast.error(alertText);
			}
		}
	});

	const { form: formData, enhance, message, delayed } = form;

	// custom param message
	let msg: string;
	let visible = true;

	setTimeout(() => {
		visible = false;
	}, 2000);

	$: msg = $page.url.searchParams.get('notification') ?? '';
</script>

{#if visible && msg}
	<div transition:fade={{ delay: 200, duration: 300, easing: sineInOut }}>
		<Pretoast message={msg} type="warning" />
	</div>
{/if}
<div class="mb-10 mt-10 flex flex-1 justify-center">
	<Breadcrumb.Root>
		<Breadcrumb.List>
			<Breadcrumb.Item>
				<Breadcrumb.Link href="/">Home</Breadcrumb.Link>
			</Breadcrumb.Item>
			<Breadcrumb.Separator></Breadcrumb.Separator>
			<Breadcrumb.Item>
				<Breadcrumb.Page>SuperUser💎</Breadcrumb.Page>
			</Breadcrumb.Item>
		</Breadcrumb.List>
	</Breadcrumb.Root>
</div>
<div class="mb-56 w-full place-content-center">
	<!-- <SuperDebug data={$formData}/> -->
	<form method="post" use:enhance>
		<Card.Root class="mx-auto max-w-sm lg:mx-auto lg:max-w-sm">
			<Card.Header>
				<Card.Title class="text-xl">Login</Card.Title>
				<Card.Description>Super-User Login</Card.Description>
			</Card.Header>
			<Card.Content>
				<div class="grid gap-2">
					<Form.Field {form} name="username">
						<Form.Control let:attrs>
							<Form.Label>Username</Form.Label>
							<Input {...attrs} type="text" bind:value={$formData.username} />
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<div class="grid gap-2">
						<Form.Field {form} name="password">
							<Form.Control let:attrs>
								<Form.Label>Password</Form.Label>
								<Input {...attrs} type="password" bind:value={$formData.password} />
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
						<Form.Button>Login</Form.Button>
					{/if}
				</div>
			</Card.Content>
		</Card.Root>
	</form>
</div>
