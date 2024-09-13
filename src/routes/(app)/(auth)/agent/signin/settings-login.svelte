<script lang="ts">
    import { Button } from "$lib/components/ui/button/index.js"
    import * as Card from "$lib/components/ui/card/index.js"
    import { Input } from "$lib/components/ui/input/index.js"
    import * as Form from "$lib/components/ui/form/index.js"
    import type { Infer, SuperValidated } from "sveltekit-superforms"
    import { superForm } from "sveltekit-superforms"
    import { zodClient } from "sveltekit-superforms/adapters"
	import { signinRSchema, type SigninRSchema } from "./schema"
    import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js"
	import { page } from "$app/stores";
	import Pretoast from "$lib/components/blocks/pretoast.svelte";
	import { sineInOut } from "svelte/easing";
	import { fade } from "svelte/transition";
	import Meta from "$lib/components/blocks/seo/meta.svelte";
    
    // KitLoad<MiddleWare>
    export let data:SuperValidated<Infer<SigninRSchema>>

    const form = superForm(data, {
        validators: zodClient(signinRSchema),
    })

    const { form: formData, enhance, delayed } = form

    // custom param message
    let msg: string
    let visible = true

    setTimeout(() => {
        visible = false
    }, 2000)

    $: msg= $page.url.searchParams.get("notification") ?? ""
	const props = {
		title: "Agent Sign In • Intuitive Insights",
		description: 'Gather insightful feedback, analyze data, and make informed decisions.',
		type:"Website"
	}
</script>
<Meta {...props}/>

{#if visible && msg}
<div transition:fade={{delay:200, duration:300, easing:sineInOut}}>
    <Pretoast message={msg} type="warning"/>
</div>
{/if}
<div class="flex flex-1 justify-center mt-10 mb-10">
    <Breadcrumb.Root>
    <Breadcrumb.List>
        <Breadcrumb.Item>
        <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
        <Breadcrumb.Link href="/agent/register">Agent Registration</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator>
        </Breadcrumb.Separator>
        <Breadcrumb.Item>
        <Breadcrumb.Page>Agent Login</Breadcrumb.Page>
        </Breadcrumb.Item>
    </Breadcrumb.List>
    </Breadcrumb.Root>
</div>
<div class="w-full place-content-center mb-56">
    <!-- <SuperDebug data={$formData}/> -->
    <form action="?/login" method="POST" use:enhance>
        <Card.Root class="mx-auto max-w-sm lg:max-w-sm lg:mx-auto mb-16">
            <Card.Header>
                <Card.Title class="text-xl text-primary">Login</Card.Title>
                <Card.Description>Login To The Agent DashBoard</Card.Description>
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
                    <div class="grid gap-2">
                        <Form.Field {form} name="password">
                            <Form.Control let:attrs>
                                <Form.Label>Password</Form.Label>
                                <Input {...attrs} type="password" bind:value={$formData.password} />
                            </Form.Control>
                            <Form.FieldErrors />
                        </Form.Field>
                    </div>
                    {#if $delayed}
                        <Button class='flex gap-2'>
                            <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                            Loading...
                        </Button>
                    {:else}
                        <Form.Button>Login</Form.Button>
                    {/if}
                    <!-- <Button type="submit" class="w-full">t</Button> -->
                    <!-- <Button variant="outline" class="w-full">Sign up with Google</Button> -->
                </div>
                <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <a href="/agent/register" class="underline hover:text-primary"> Register </a>
                </div>
                <div class="mt-4 text-center text-sm">
                    <a href="/client/password/reset" class="underline hover:text-primary">Forgot Password?</a>
                </div>
            </Card.Content>
        </Card.Root>
    </form>
</div>



