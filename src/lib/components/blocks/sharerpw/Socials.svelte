<script lang="ts">
    import { Button } from "$lib/components/ui/button"
    
    let href: string | undefined
    export let type: string
    let classes: string = '';
    export let url: string;
    export let quote: string
    export let hashtags: string = '';
    export let via: string = '';
    export let related: string = '';
    export let icon: string = ''
    export { classes as class }

    $: {
        switch (true) {
            case type ==='FB':
                href = encodeURI(`https://facebook.com/sharer/sharer.php?u=${url}&quote=${quote}`)
                icon = `
                    <svg 
                        class="w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path fill="currentColor" 
                            fill-rule="evenodd"
                            d="M10.488 3.788A5.25 5.25 0 0 1 14.2 2.25h2.7a.75.75 0 0 1 .75.75v3.6a.75.75 0 0 1-.75.75h-2.7a.15.15 0 0 0-.15.15v1.95h2.85a.75.75 0 0 1 .728.932l-.9 3.6a.75.75 0 0 1-.728.568h-1.95V21a.75.75 0 0 1-.75.75H9.7a.75.75 0 0 1-.75-.75v-6.45H7a.75.75 0 0 1-.75-.75v-3.6A.75.75 0 0 1 7 9.45h1.95V7.5a5.25 5.25 0 0 1 1.538-3.712M14.2 3.75a3.75 3.75 0 0 0-3.75 3.75v2.7a.75.75 0 0 1-.75.75H7.75v2.1H9.7a.75.75 0 0 1 .75.75v6.45h2.1V13.8a.75.75 0 0 1 .75-.75h2.114l.525-2.1H13.3a.75.75 0 0 1-.75-.75V7.5a1.65 1.65 0 0 1 1.65-1.65h1.95v-2.1z"
                            clip-rule="evenodd" 
                        />
                    </svg>
                `
                break;
            case type === 'X':
                href = encodeURI(`https://x.com/intent/tweet/?text=${quote}&hashtags=${hashtags}&via=${via}&related=${related}&url=${url}`)
                icon = `
                    <svg 
                        class="w-5
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 16 16">
                        <path 
                            fill="currentColor"
                            d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z" 
                        />
                    </svg>
                `
                break
            case type === 'IN':
                href = encodeURI(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`)
                icon = `
                    <svg 
                        class='w-6'
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path 
                            fill="currentColor" 
                            fill-rule="evenodd"
                            d="M9.429 8.969h3.714v1.85c.535-1.064 1.907-2.02 3.968-2.02c3.951 0 4.889 2.118 4.889 6.004V22h-4v-6.312c0-2.213-.535-3.461-1.897-3.461c-1.889 0-2.674 1.345-2.674 3.46V22h-4zM2.57 21.83h4V8.799h-4zM7.143 4.55a2.53 2.53 0 0 1-.753 1.802a2.57 2.57 0 0 1-1.82.748a2.6 2.6 0 0 1-1.818-.747A2.55 2.55 0 0 1 2 4.55c0-.677.27-1.325.753-1.803A2.58 2.58 0 0 1 4.571 2c.682 0 1.336.269 1.819.747s.753 1.126.753 1.803"
                            clip-rule="evenodd" 
                        />
                    </svg>
                `
                break
            default:
                break;
        }
    }
</script>

<Button 
    size='icon' 
    variant='ghost' 
    class={classes}
    {href}
    target="_blank"
>
    {@html icon}
</Button>