<script lang='ts'>
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js"
    import * as Card from "$lib/components/ui/card"
    import * as Form from "$lib/components/ui/form/index.js"
    import { Input } from "$lib/components/ui/input"
    import { Button } from "$lib/components/ui/button"
	import { resetSchema, type ResetSchema } from "./schema";
    import { zodClient } from "sveltekit-superforms/adapters"
    import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms"
	import { toast } from "svelte-sonner";
	import Meta from "$lib/components/blocks/seo/meta.svelte";

    // KitLoad<MiddleWare>
    export let data:SuperValidated<Infer<ResetSchema>>

        const form = superForm(data, {
        validators: zodClient(resetSchema),
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
    const { form: formData, enhance, message, delayed } = form
    const props = {
		title: 'Password reset • Intuitive Insights KE',
		description: 'Gather Insightful feedback, analyze data, and make informed decisions.',
		type:"Website"
	}
</script>
<Meta {...props}/>

<div class="flex flex-1 justify-center mt-10 mb-5">
    <Breadcrumb.Root>
    <Breadcrumb.List>
        <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
        <Breadcrumb.Link href="/client/signin">Client SignIn</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
        <Breadcrumb.Page>Password Reset</Breadcrumb.Page>
        </Breadcrumb.Item>
    </Breadcrumb.List>
    </Breadcrumb.Root>
  </div>

  <form method="post" class="m-2 h-screen" use:enhance>
    <Card.Root class="mx-auto max-w-md">
        <Card.Header>
        <Card.Title class="text-xl">Reset Password</Card.Title>
        <Card.Description>Reset your password if you've forgotten it</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid gap-2">
                <Form.Field {form} name="email">
                    <Form.Control let:attrs>
                        <Form.Label>Email</Form.Label>
                        <Input {...attrs} type="email" bind:value={$formData.email} />
                    </Form.Control>
                    <Form.FieldErrors />
                </Form.Field>
            </div>
        </Card.Content>
        <Card.Footer>
            {#if $delayed}
                <Button class='flex gap-2 w-full'>
                    <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    Loading...
                </Button>
            {:else}
                <Form.Button class='w-full'>Reset</Form.Button>
            {/if}
        </Card.Footer>
    </Card.Root>
</form>
