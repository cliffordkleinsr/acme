<script lang="ts">
	import MoveHorizontal from 'lucide-svelte/icons/move-horizontal';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import { enhance } from '$app/forms';
	export let id: string;

	let loading = false;
	let open = false;
	let trig = false;
</script>

<DropdownMenu.Root bind:open={trig}>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<MoveHorizontal class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Item href="/superuser/dash/agents/{id}">Edit</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<AlertDialog.Root bind:open>
			<AlertDialog.Trigger asChild let:builder>
				<Button variant="ghost" builders={[builder]} class="-mx-1 text-start font-normal"
					>Deactivate</Button
				>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently deactivate this user.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<form
						action="?/deactivate"
						method="post"
						use:enhance={() => {
							loading = true;
							return async ({ result, update }) => {
								switch (true) {
									case result.type === 'failure':
										loading = false;
										await update();
										open = false;
										trig = false;
										break;
									case result.type === 'success':
										loading = true;
										await update();
										open = false;
										trig = false;
										break;
									default:
										break;
								}
							};
						}}
					>
						<Input type="text" value={id} class="hidden" name="id" />
						<Form.Button>
							{#if loading}
								<div class="flex gap-2">
									<span
										class="inline-block size-4 animate-spin rounded-full border-[3px] border-current border-t-transparent text-white"
										role="status"
										aria-label="loading"
									></span>
									Loading...
								</div>
							{:else}
								Deactivate User
							{/if}
						</Form.Button>
					</form>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
		<!-- <DropdownMenu.Item>View payment details</DropdownMenu.Item> -->
	</DropdownMenu.Content>
</DropdownMenu.Root>
