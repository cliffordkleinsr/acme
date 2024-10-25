<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Button } from '$lib/components/ui/button';
	import SuperDebug, { type Infer, type SuperValidated, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import * as Form from '$lib/components/ui/form';
	import { amountSchema, type AmountSchema } from './paymt';
	import { toast } from 'svelte-sonner';
	import 'intro.js/minified/introjs.min.css';
	import introJs from 'intro.js';
	import { onMount } from 'svelte';

	onMount(() => {
		const theme = localStorage.getItem('mode-watcher-mode');
		if (theme === 'dark') {
			import('intro.js/themes/introjs-dark.css');
		}
		setTimeout(() => {
			introJs()
				.setOptions({
					dontShowAgain: true,
					dontShowAgainCookie: 'introjs-dontShowAgain8'
				})
				.start();
		}, 1500);
	});

	export let data: SuperValidated<Infer<AmountSchema>>;
	export let payable: number;
	const form = superForm(data, {
		validators: zodClient(amountSchema),
		onUpdated: () => {
			if (!$message) return;

			const { alertType, alertText } = $message;
			if (alertType === 'success') {
				toast.success(alertText);
			}
			if (alertType === 'error') {
				toast.error(alertText);
			}
			if (alertType === 'warning') {
				toast.warning(alertText);
			}
		}
	});
	const { form: formData, enhance, message, delayed } = form;
</script>

<form method="POST" class="m-4 mx-auto w-full max-w-2xl" use:enhance>
	<Card.Root
		data-position="right"
		data-intro="Ensure your phone number is correct before submitting a payout request. You can change your phone number by navigating to your <a class='underline' href='/agent-dash/settings'>Account section</a>"
	>
		<Card.Header>
			<Card.Title class="text-2xl">Checkout</Card.Title>
			<Card.Description class="text-md">Enter the amount you want to recieve.</Card.Description>
			<Card.Description class="text-md text-end text-muted-foreground"
				>Account Balance.</Card.Description
			>
			<Card.Title class=" text-end text-4xl text-muted-foreground">KES {payable}</Card.Title>
		</Card.Header>
		<Card.Content class="w-full space-y-2">
			<Form.Field {form} name="amount">
				<Form.Control let:attrs>
					<Form.Label>Amount</Form.Label>
					<div class="flex gap-2">
						<Input {...attrs} bind:value={$formData.amount} type="number" class="max-w-sm" />
						<p class="py-2 text-muted-foreground">KES</p>
						<img
							class="mx-auto w-[72px]"
							src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524"
							alt=""
						/>
					</div>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			{#if $delayed}
				<Button class="flex w-full gap-2 bg-black hover:bg-black/80">
					<span
						class="inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
						role="status"
						aria-label="loading"
					></span>
					Loading...
				</Button>
			{:else}
				<Form.Button class="w-full bg-black hover:bg-black/80">Proceed to Payment</Form.Button>
			{/if}
		</Card.Content>
	</Card.Root>
</form>
