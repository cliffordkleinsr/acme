<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    import { Input } from "$lib/components/ui/input"
    import { Label } from "$lib/components/ui/label"
    import { Button } from "$lib/components/ui/button"
    import SuperDebug, {
        type Infer,
        type SuperValidated,
        superForm
    } from "sveltekit-superforms"
    import { zodClient } from "sveltekit-superforms/adapters"
    import * as Form from "$lib/components/ui/form"
    import { amountSchema, type AmountSchema} from './paymt'
    import { toast } from "svelte-sonner";

    export let data: SuperValidated<Infer<AmountSchema>>;
    export let payable:number
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
            toast.warning(alertText)
          }
        }
    })
    const { form: formData, enhance, message } = form
</script>


<form method="POST" class="m-4 w-full max-w-2xl mx-auto" use:enhance>
    <Card.Root>
    <Card.Header>
        <Card.Title class="text-2xl">Checkout</Card.Title>
        <Card.Description class="text-md">Enter the amount you want to recieve.</Card.Description>
        <Card.Description class="text-md text-end text-muted-foreground">Account Balance.</Card.Description>
        <Card.Title class=" text-4xl text-end text-muted-foreground"> KES {payable}</Card.Title>
    </Card.Header>
    <Card.Content class="space-y-2 w-full">
        <Form.Field {form} name="amount">
            <Form.Control let:attrs>
                <Form.Label>Amount</Form.Label>
                <div class="flex gap-2">
                    <Input {...attrs} bind:value={$formData.amount} type="number" class="max-w-sm"/>
                    <p class="text-muted-foreground py-2">KES</p>
                    <img class="w-[72px] mx-auto" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524" alt="">
                </div>
              </Form.Control>
              <Form.FieldErrors />
        </Form.Field>
        <Form.Button class="bg-black hover:bg-black/80 w-full">Proceed to Payment</Form.Button>
    </Card.Content>
    </Card.Root>
</form>