<script lang="ts">
    import type { PageData } from './$types';
    import { Button } from "$lib/components/ui/button"
    
    export let data: PageData;
</script>
<div class="grid gap-9 m-5">
    <h1 class="text-xl text-center">Something went wrong</h1>
    <Button class="max-w-sm mx-auto" href="/client-dash">Go Back</Button>
</div>