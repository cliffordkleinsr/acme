<script lang="ts">
    // SHADCN UI
    import * as Card from "$lib/components/ui/card/index.js"
    import * as Form from "$lib/components/ui/form/index.js"
    import { Input } from "$lib/components/ui/input/index.js"
    import { Button } from "$lib/components/ui/button"
    
    // SUPER FORMS
    import type { Infer, SuperValidated } from "sveltekit-superforms"
    import SuperDebug, { superForm } from "sveltekit-superforms"
    import { zodClient } from "sveltekit-superforms/adapters"
	import { smsVerificationSchema, type SMSVerificationSchema } from "./schema";
	import { toast } from "svelte-sonner";

    // KitLoad<MiddleWare>
    export let formdata:SuperValidated<Infer<SMSVerificationSchema>>
    export let num

    const form = superForm(formdata, {
        resetForm:false,
        taintedMessage: null,
        validators: zodClient(smsVerificationSchema),
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
    })

    const { form: formData, enhance, delayed, message } = form
</script>

<div class="w-full h-screen m-5">
    <!-- <SuperDebug data={$formData}/> -->
    <Card.Root class="mx-auto max-w-sm lg:max-w-sm lg:mx-auto">
        <Card.Header>
            <Card.Title class="text-xl">Verify Your Identity</Card.Title>
            <Card.Description>
                Welcome aboard 🎉! To complete your registration, Check your phone for an <strong>OTP</strong>
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-3">
                <form method="POST" use:enhance>
                    <Form.Field {form} name="verificationCode">
                        <Form.Control let:attrs>
                            <Form.Label>We've sent a text message to:</Form.Label>
                            <Input value='Phone ending in {num.slice(-4)}' disabled/>
                            
                            <Input {...attrs} type='text' bind:value={$formData.verificationCode} />
                        </Form.Control>
                        <Form.FieldErrors />
                    </Form.Field>
                    {#if $delayed}
                        <Button class='flex gap-2 w-full'>
                            <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                            Loading...
                        </Button>
                    {:else}
                        <Form.Button disabled={$delayed} class='w-full'>Verify</Form.Button>
                    {/if}
                </form>
                <p class="text-sm text-center">Didn't receive a code? <a data-sveltekit-preload-data='tap' class="underline" href="/agent/verify/resend-{btoa(num)}">Resend</a></p>
            </div>
        </Card.Content>
    </Card.Root>
</div>

