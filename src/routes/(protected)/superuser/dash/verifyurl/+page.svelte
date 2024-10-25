<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Form from '$lib/components/ui/form';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { urlveriSchema, type UrlVeriSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input';
	import type { PageData } from './$types';

	// KitLoad<MiddleWare>
	export let data: PageData;

	const form = superForm(data.form, {
		validators: zodClient(urlveriSchema),
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
</script>

<div class="m-5 mx-auto grid w-full max-w-lg">
	<form action="" method="post" use:enhance>
		<Card.Root>
			<Card.Header>
				<Card.Title>Verify URLs</Card.Title>
				<Card.Description
					>This verifies c2b urls. Dont do anything if you do not understand what this does</Card.Description
				>
			</Card.Header>
			<Card.Content class="grid gap-3">
				<Form.Field {form} name="validationURL">
					<Form.Control let:attrs>
						<Form.Label>Validation URL</Form.Label>
						<Input {...attrs} bind:value={$formData.validationURL} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="confirmationURL">
					<Form.Control let:attrs>
						<Form.Label>Confirmation URL</Form.Label>
						<Input {...attrs} bind:value={$formData.confirmationURL} />
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</Card.Content>
			<Card.Footer>
				<Form.Button class="w-full" variant="black" type="submit">Verify</Form.Button>
			</Card.Footer>
		</Card.Root>
	</form>
</div>
