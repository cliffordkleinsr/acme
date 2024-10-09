<script lang="ts">
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input';
	import { Button } from '$lib/components/ui/button';
	import { updateSchema, type UpdateSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';

	// KitLoad<MiddleWare>
	export let data: SuperValidated<Infer<UpdateSchema>>;

	const form = superForm(data, {
		validators: zodClient(updateSchema),
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
</script>

<form method="post" class="m-5 h-screen" use:enhance>
	<Card.Root class="mx-auto max-w-md">
		<Card.Header>
			<Card.Title class="text-xl">Change Your Password</Card.Title>
			<Card.Description>Reset your password if you've forgotten it</Card.Description>
		</Card.Header>
		<Card.Content>
			<div class="grid gap-2">
				<Form.Field {form} name="password">
					<Form.Control let:attrs>
						<Form.Label>Password</Form.Label>
						<Input {...attrs} type="password" bind:value={$formData.password} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			<div class="mb-3 grid gap-2">
				<Form.Field {form} name="passwordConfirm">
					<Form.Control let:attrs>
						<Form.Label>Confirm Password</Form.Label>
						<Input {...attrs} type="password" bind:value={$formData.passwordConfirm} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</div>
			{#if $delayed}
				<Button class="flex w-full gap-2">
					<span
						class="inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
						role="status"
						aria-label="loading"
					></span>
					Loading...
				</Button>
			{:else}
				<Form.Button class="w-full">Update Password</Form.Button>
			{/if}
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</form>
