<script lang="ts">
    // SHADCN UI
    import * as Card from "$lib/components/ui/card/index.js"
    import * as Form from "$lib/components/ui/form/index.js"
    import { Input } from "$lib/components/ui/input/index.js"

        // SUPER FORMS
    import type { Infer, SuperValidated } from "sveltekit-superforms"
    import SuperDebug, { superForm } from "sveltekit-superforms"
    import { zodClient } from "sveltekit-superforms/adapters"
	import { emailVerificationSchema, type EmailVerificationSchema } from "./schema";
	import { toast } from "svelte-sonner";
    
    import { enhance } from "$app/forms"

    // KitLoad<MiddleWare>
    export let formdata:SuperValidated<Infer<EmailVerificationSchema>>
    export let userdata:string


    const form = superForm(formdata, {
        resetForm:false,
        taintedMessage: null,
        validators: zodClient(emailVerificationSchema),
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

    const { form: formData, enhance:verifyCodeEnhance, delayed, message } = form
</script>

<div class="w-full place-content-center mb-56">
    <SuperDebug data={$formData}/>
        <Card.Root class="mx-auto max-w-sm lg:max-w-sm lg:mx-auto">
            <Card.Header>
                <Card.Title class="text-xl">Email Verification Code</Card.Title>
                <Card.Description>
                    Welcome aboard 🎉! To complete your registration, please enter the verification code we've sent to
	                your email:{userdata}
                </Card.Description>
            </Card.Header>
            <Card.Content>
                <div class="grid gap-2">
                    <form action="?/verifyCode" method="POST" use:verifyCodeEnhance>
                        <Form.Field {form} name="verificationCode">
                            <Form.Control let:attrs>
                                <Form.Label>Verification Code</Form.Label>
                                <Input {...attrs} type="text" bind:value={$formData.verificationCode} />
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                        <Form.Button disabled={$delayed}>Verify</Form.Button>
                    </form>
                </div>
                <div class="grid gap-2 py-5">
                    <form action="?/sendNewCode" method="POST" 
                        use:enhance={() => {
                            return async ({ result }) => {
                                switch (result.type) {
                                    case "success":
                                        toast.success('A new verification code has been sent to your email')
                                    case "failure":
                                        toast.error('Failed to send the verification code')
                                        break;
                                    default:
                                        break;
                                
                                }
                            }
                        }
                    }>
                        <Form.Button>Send New Code</Form.Button>
                    </form>
                </div>
            </Card.Content>
        </Card.Root>
    
</div>

