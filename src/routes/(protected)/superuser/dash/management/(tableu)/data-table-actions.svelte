<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	export let id: string;
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="z-10">
		<!-- <DropdownMenu.Group>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item href = '/superuser/dash/management/{id}' >
          Edit Survey
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator /> -->
		<AlertDialog.Root>
			<AlertDialog.Trigger asChild let:builder>
				<Button variant="ghost" builders={[builder]} class="-mx-1 text-start font-normal"
					>Delete</Button
				>
			</AlertDialog.Trigger>
			<AlertDialog.Content>
				<AlertDialog.Header>
					<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
					<AlertDialog.Description>
						This action cannot be undone. This will permanently delete this survey and remove your
						data from our servers.
					</AlertDialog.Description>
				</AlertDialog.Header>
				<AlertDialog.Footer>
					<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
					<form action="?/deleteSurvey" method="post">
						<Input type="text" value={id} class="hidden" name="id" />
						<Form.Button>Delete Survey</Form.Button>
					</form>
				</AlertDialog.Footer>
			</AlertDialog.Content>
		</AlertDialog.Root>
		<!-- <DropdownMenu.Separator />
      <DropdownMenu.Item href="/agent-dash/surveys/history/{id}">History</DropdownMenu.Item> -->
	</DropdownMenu.Content>
</DropdownMenu.Root>
