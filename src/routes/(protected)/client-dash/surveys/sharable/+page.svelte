<script lang="ts">
    import type {
        PageData
    } from './$types';
    import * as Card from "$lib/components/ui/card"
    import {
        Button
    } from "$lib/components/ui/button"
    import * as HoverCard from "$lib/components/ui/hover-card"
    import { Input } from "$lib/components/ui/input"
    
    import Share from 'lucide-svelte/icons/share'
	import Socials from '$lib/components/blocks/sharerpw/Socials.svelte';
    import { copyText  } from 'svelte-copy'
    import Clipboard from 'lucide-svelte/icons/clipboard'
    import Check from 'lucide-svelte/icons/check'
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
	import { browser } from '$app/environment';

    export let data: PageData;
  
    const {
        sharable
    } = data

    let cicked = false
    let isDesktop = true
    
    if (browser) {
      isDesktop = window.innerWidth >= 768
    }
</script>
<div class="flex flex-col m-4 gap-10">
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {#each sharable as item}
        <Card.Root>
            <Card.Header>
                <Card.Title>{item.title}</Card.Title>
                <Card.Description>{item.desc}</Card.Description>
            </Card.Header>
            <Card.Content class='flex gap-3'>
                {#if isDesktop}
                <HoverCard.Root>
                  <HoverCard.Trigger let:builder asChild>
                    <Button builders={[builder]} class='bg-black hover:bg-black/85' size='icon'>
                        <Share class='size-5'/>
                    </Button>
                  </HoverCard.Trigger>
                  <HoverCard.Content side='right' class='flex gap-1 '>
                    <Input value={`/agent-dash/surveys/take/${item.id}?external=true`}/>
                    <Button variant='ghost' size='icon' on:click={() => {
                        copyText(`/agent-dash/surveys/take/${item.id}?external=true`)
                        cicked = !cicked
                    }}>
                        {#if cicked}
                            <Check class='size-4 text-muted-foreground '/>
                        {:else}
                            <Clipboard class='size-5 text-muted-foreground ' />
                        {/if}
                    </Button>
                  </HoverCard.Content>
                </HoverCard.Root>
                {:else}
                    <AlertDialog.Root>
                      <AlertDialog.Trigger let:builder asChild>
                        <Button builders={[builder]} class='bg-black hover:bg-black/85' size='icon'>
                            <Share class='size-5'/>
                        </Button>
                      </AlertDialog.Trigger>
                      <AlertDialog.Content>
                        <AlertDialog.Header>
                          <AlertDialog.Title></AlertDialog.Title>
                          <AlertDialog.Description class='flex gap-1'>
                            <Input value={`/agent-dash/surveys/take/${item.id}`}/>
                            <Button variant='ghost' size='icon' on:click={() => {
                                copyText(`/agent-dash/surveys/take/${item.id}`)
                                cicked = !cicked
                            }}>
                                {#if cicked}
                                    <Check class='size-4 text-muted-foreground '/>
                                {:else}
                                    <Clipboard class='size-5 text-muted-foreground ' />
                                {/if}
                            </Button>
                          </AlertDialog.Description>
                        </AlertDialog.Header>
                        <AlertDialog.Footer>
                          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
                        </AlertDialog.Footer>
                      </AlertDialog.Content>
                    </AlertDialog.Root>
                {/if}
                <div class="flex gap-2 flex-1 justify-end">
                    <Socials 
                        type='X'
                        quote= 'Partake in my survey'
                        url={`/agent-dash/surveys/take/${item.id}?external=true`}
                    />
                    <Socials 
                        type='FB'
                        quote='Svelte Share Buttons Component'
                        url={`/agent-dash/surveys/take/${item.id}?external=true`}
                    />
                    <Socials 
                        quote=''
                        type='IN'
                        url={`/agent-dash/surveys/take/${item.id}?external=true`}
                    />
                </div>
            </Card.Content>
        </Card.Root>        
        {/each}
    </div>
</div>