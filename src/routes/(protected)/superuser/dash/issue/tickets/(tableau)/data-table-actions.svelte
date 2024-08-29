<script lang="ts">
    import MoveHorizontal  from "lucide-svelte/icons/move-horizontal";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
	  import { Input } from "$lib/components/ui/input";
    import * as Form from "$lib/components/ui/form/index.js"
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
    export let id: string;
    

  </script>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="ghost"
        builders={[builder]}
        size="icon"
        class="relative h-8 w-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <MoveHorizontal  class="h-4 w-4" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Item href="/superuser/dash/clients/{id}">
          Resolve
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <AlertDialog.Root>
        <AlertDialog.Trigger asChild let:builder>
          <Button variant="ghost" builders={[builder]} class="-mx-1 text-start font-normal">Deactivate</Button>
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
            <!-- <form action="?/deactivate" method="post">
              <Input type="text" value={id} class="hidden" name="id"/>
              <Form.Button>Deactivate User</Form.Button>
            </form> -->
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <!-- <DropdownMenu.Item>View payment details</DropdownMenu.Item> -->
    </DropdownMenu.Content>
  </DropdownMenu.Root>