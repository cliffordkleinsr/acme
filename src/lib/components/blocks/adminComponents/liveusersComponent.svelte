<script lang="ts">
    import * as Avatar from "$lib/components/ui/avatar"
	import Separator from "$lib/components/ui/separator/separator.svelte";

    type Usr =  {
        name: string;
        email: string;
        role: "ADMIN" | "CLIENT" | "RESP";
        gender: string | null;
        at: string;
    }
    export let users:Usr[] = []
    const fem_images = [
        'https://i.postimg.cc/43mhXrWn/01.png',
        'https://i.postimg.cc/yYyRjhJ6/03.png',
        'https://i.postimg.cc/VL8MXZkH/05.png'
    ]
    const ml_images = [
        'https://i.postimg.cc/DwCXk2dt/02.png',
        'https://i.postimg.cc/2SjZKqvQ/04.png',
    ]

    const retInitials = (name: string): string => {
        const fullName = name.split(' ');
        if (fullName.length < 2) {
            // If there's only one word, return its first letter
            return name.charAt(0).toUpperCase();
        }
        const first = fullName.shift();
        const last = fullName.pop();
        if (first && last) {
            const initials = first.charAt(0) + last.charAt(0);
            return initials.toUpperCase();
        }
        // Fallback in case of unexpected input
        return '';
    }
    
    function timeAgo(timeString: string): string {
        const [hours, minutes] = timeString.split(':').map(Number);
        const givenTime = new Date();
        givenTime.setHours(hours, minutes, 0, 0);
        
        const now = new Date();
        const diffInMinutes = Math.floor((now.getTime() - givenTime.getTime()) / (1000 * 60));

        if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
        return 'More than a day ago';
    }
</script>

{#if users.length === 0}
    <p class="italic text-sm">No users curently active</p>
    <p class="italic text-sm">This pane will fill up with information showing all users currently active</p>
{:else}
{#each users as usr}
    <div class="flex items-center gap-4">
        {#if usr?.gender === 'male'}
            {@const item = ml_images[Math.floor(Math.random()*ml_images.length)]}
            <Avatar.Root class="hidden h-9 w-9 sm:flex">
                <Avatar.Image src="{item}" alt="Avatar" />
                <Avatar.Fallback>{retInitials(usr?.name)}</Avatar.Fallback>
            </Avatar.Root>
            <span class="relative right-14 bottom-3 flex h-3 w-3 z-10">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
        {:else}
            {@const item = fem_images[Math.floor(Math.random()*fem_images.length)]}
            
            <Avatar.Root class="hidden h-9 w-9 sm:flex">
                <Avatar.Image src="{item}" alt="Avatar" />
                {#if usr?.name !== undefined}
                    <Avatar.Fallback>{retInitials(usr?.name)}</Avatar.Fallback>
                {/if}
            </Avatar.Root>
            <span class="relative right-14 bottom-3 flex h-3 w-3 z-10">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
        {/if}
        <div class="grid gap-1">
            <p class="text-sm font-medium leading-none">{usr?.name}</p>
            <p class="text-sm text-muted-foreground">{usr?.email}</p>
        </div>
        <div class="ml-auto font-medium text-sm">Active {timeAgo(usr.at)}</div>
    </div>
    <Separator />
{/each}
{/if}