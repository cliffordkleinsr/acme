<script lang="ts">
	import type { PageData } from './$types';
	import { createUploader } from '$lib/upload-configs/config';
	import { error } from '@sveltejs/kit';
	import { UploadButton, UploadDropzone, Uploader } from '@uploadthing/svelte';
	import { toast } from 'svelte-sonner';
	import * as Avatar from '$lib/components/ui/avatar';
	import { Button } from '$lib/components/ui/button';
	import { Label } from '$lib/components/ui/label';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form';
	import { settingsSchema, type SettingsSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { superForm } from 'sveltekit-superforms/client';
	import Trash2 from 'lucide-svelte/icons/trash-2';

	export let data: PageData;
	let { img } = data;
	const uploader = createUploader('imageUploader', {
		onClientUploadComplete: (res) => {
			img = res[0]?.url;
			// console.log(`onClientUploadComplete`, res)
			toast.success('Upload Completed');
		},
		onUploadError: (error: Error) => {
			toast.error(`ERROR! ${error.message} please try again`);
		}
	});

	const form = superForm(data.form, {
		validators: zodClient(settingsSchema),
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

<div class="m-4 grid gap-1 lg:w-4/6 lg:grid-cols-2">
	<div class="grid gap-2">
		<h1 class="text-2xl font-bold">Account</h1>
		<p class=" font-semibold text-muted-foreground">
			Manage your account settings and preferences.
		</p>
		<p class="text-md mt-2 font-semibold">Preview</p>
		<Avatar.Root class="size-40">
			<Avatar.Image src={img} alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
		<div class="grid max-w-sm">
			<UploadDropzone {uploader} />
		</div>
	</div>
	<div class="grid h-1/2 gap-2">
		<div class=""></div>
		<form method="POST" class="grid h-1/2 max-w-md gap-2" use:enhance>
			<Form.Field {form} name="profile">
				<Form.Control let:attrs>
					<Form.Label>Current Profile Picture</Form.Label>
					<div class="flex gap-2">
						<Input {...attrs} value={img} />
						<Button variant="destructive" size="icon" on:click={() => (img = null)}>
							<Trash2 class="size-5" />
						</Button>
					</div>
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
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
				<Form.Button>Save</Form.Button>
			{/if}
		</form>
	</div>
</div>
<!-- <div class="ut-flex ut-flex-col ut-items-center ut-justify-center ut-gap-4">
<span class="ut-text-center ut-text-4xl ut-font-bold">
</span> -->

<!-- </div>  -->
