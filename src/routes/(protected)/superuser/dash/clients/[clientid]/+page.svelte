<script lang="ts">
    import type { PageData } from './$types';
    import UserRound from 'lucide-svelte/icons/user-round'
    import * as Card from "$lib/components/ui/card"
    import { Label } from "$lib/components/ui/label"
    import { Input } from "$lib/components/ui/input"
    import { Button } from "$lib/components/ui/button"
	import { generateId } from 'lucia';
    import Undo2 from 'lucide-svelte/icons/undo-2';
    
    export let data: PageData;
    const {client} = data
    let uuid = ""
</script>

<div class="flex flex-col gap-3 m-5">
    <div class="flex gap-3">
        <UserRound class="size-8"/> 
        <p class="text-2xl font-semibold">{client.name}</p>
    </div>
    <p class="text-sm mx-11">{client.email}</p>
    <div class="grid lg:grid-cols-2 gap-5 lg:max-w-6xl">
        <Card.Root>
        <Card.Header>
            <Card.Title>Personal Information</Card.Title>
            <Card.Description>Update client personal details.</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid grid-cols-2 gap-5">
                <div class="grid gap-3">
                    <Label for="name">Name</Label>
                    <Input value={client.name}/>
                </div>
                <div class="grid gap-3">
                    <Label for="email">Email</Label>
                    <Input value={client.email}/>
                </div>
                <div class="grid gap-3 col-span-2">
                    <Label for="email">Phone</Label>
                    <Input value={client.phone}/>
                </div>
                <div class="grid gap-3 col-span-2">
                    <Label for="email">Age</Label>
                    <Input value={client.age??"N/A"}/>
                </div>
            </div>
        </Card.Content>
        </Card.Root>
        <!-- End -->
        <Card.Root>
        <Card.Header>
            <Card.Title>Password</Card.Title>
            <Card.Description>Reset client password</Card.Description>
        </Card.Header>
        <Card.Content class="grid grid-cols-2 gap-5">
            <div class="grid gap-3 col-span-2">
                <!-- <Label for="email">New Password</Label>
                <Input type="password" value={uuid}/> -->
            </div>
            <div class="grid gap-3 col-span-2">
                <Label for="email">New Password</Label>
                <Input type="password" value={uuid}/>
            </div>
            <Button variant="secondary" on:click={() => uuid = generateId(15)}>Generate Password</Button>
        </Card.Content>
        </Card.Root>
        <div class=""></div>
        <Button class="">Save Changes</Button>
    </div>
    
   

  
</div>