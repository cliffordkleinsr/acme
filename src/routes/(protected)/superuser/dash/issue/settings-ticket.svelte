<script lang="ts">
        import * as Card from "$lib/components/ui/card"
        import * as Form from "$lib/components/ui/form"
        import { toast } from "svelte-sonner";
        import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms";
        import { zodClient } from "sveltekit-superforms/adapters";
	    import { ticketSchema, type TicketSchema } from "$lib/common/schema";
        import { Input } from "$lib/components/ui/input"
        import { Textarea } from "$lib/components/ui/textarea"
        import * as Select from "$lib/components/ui/select"
        import { Button } from "$lib/components/ui/button"
        


        // KitLoad<MiddleWare>
        export let data:SuperValidated<Infer<TicketSchema>>

        const form = superForm(data, {
        validators: zodClient(ticketSchema),
        onUpdated: () => {
            if (!$message) return

            const { alertType, alertText } = $message;

            if (alertType === 'success') {
            toast.success(alertText);
            }

            if (alertType === 'error') {
            toast.error(alertText);
            }
        }
        })

        const { form: formData, enhance, message, delayed } = form

        // select controls
        $: selectedIssue = $formData.issue
           ? {
                label: $formData.issue,
                value: $formData.issue
           }
           : undefined
        $: selectedPriority = $formData.priority
           ? {
                label: $formData.priority,
                value: $formData.priority
           }
           : undefined

</script>

<div class="grid gap-2 max-w-lg w-full mx-auto m-2">
    <form method="POST" use:enhance>
    <Card.Root>
        <Card.Header>
            <Card.Title class="text-3xl">Create New Ticket</Card.Title>
            <Card.Description>
                Enter the details of the client's issue to create a new ticket.
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid grid-cols-2 gap-3">
                <Form.Field {form} name="client">
                    <Form.Control let:attrs>
                        <Form.Label>Client Name</Form.Label>
                        <Input {...attrs} bind:value="{$formData.client}" />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <Form.Field {form} name="email">
                    <Form.Control let:attrs>
                        <Form.Label>Client Email</Form.Label>
                        <Input {...attrs} bind:value="{$formData.email}" />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <div class="grid gap-2 col-span-2 w-1/2">
                    <Form.Field {form} name="phoneno">
                        <Form.Control let:attrs>
                            <Form.Label>Phone number</Form.Label>
                            <Input {...attrs} bind:value="{$formData.phoneno}" />
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                </div>
                <Form.Field {form} name="issue">
                    <Form.Control let:attrs>
                        <Form.Label>Issue Category</Form.Label>
                        <Select.Root
                            selected={selectedIssue}
                            onSelectedChange={(v) => {
                                v && ($formData.issue = v.value)
                            }}
                        >
                          <Select.Trigger {...attrs}>
                            <Select.Value placeholder="" />
                          </Select.Trigger>
                          <Select.Content>
                            <Select.Item value="Technical" label="Technical">Technical</Select.Item>
                            <Select.Item value="Billing" label="Billing">Billing</Select.Item>
                            <Select.Item value="General Inquiry" label="General Inquiry">General Inquiry</Select.Item>
                          </Select.Content>
                        </Select.Root>
                        <Input class="hidden" {...attrs} bind:value="{$formData.issue}" />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <Form.Field {form} name="priority">
                    <Form.Control let:attrs>
                        <Form.Label>Issue Category</Form.Label>
                        <Select.Root
                            selected={selectedPriority}
                            onSelectedChange={(v) => {
                                v && ($formData.priority = v.value)
                            }}
                        >
                          <Select.Trigger {...attrs}>
                            <Select.Value placeholder="" />
                          </Select.Trigger>
                          <Select.Content>
                            <Select.Item value="Low" label="Low">Low</Select.Item>
                            <Select.Item value="Medium" label="Medium">Medium</Select.Item>
                            <Select.Item value="High" label="High">High</Select.Item>
                            <Select.Item value="Urgent" label="Urgent">Urgent</Select.Item>
                          </Select.Content>
                        </Select.Root>
                        <Input class="hidden" {...attrs} bind:value="{$formData.priority}" />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
                <div class="grid gap-2 col-span-2">
                    <Form.Field {form} name="description">
                        <Form.Control let:attrs>
                            <Form.Label>Description of the Issue</Form.Label>
                            <Textarea {...attrs} bind:value="{$formData.description}" placeholder='Describe the issue in detail'/>
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                </div>
            </div>
              
        </Card.Content>
        <Card.Footer>
            {#if $delayed}
                <Button class='flex gap-2 bg-black hover:bg-black/80 w-full'>
                    <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    Loading...
                </Button>
            {:else}
                <Form.Button class='bg-black hover:bg-black/80 w-full'>Create Ticket</Form.Button>
            {/if}
        </Card.Footer>
    </Card.Root>
</form>
</div>
