<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    import { Button } from "$lib/components/ui/button"
    
    export let data: PageData;
    const { email } =data
</script>
<div class="flex flex-col gap-2 m-3 items-center h-screen">
    <Card.Root class='max-w-xl w-full m-3'>
      <Card.Header>
        <Card.Title>Pending Verification</Card.Title>
        <Card.Description></Card.Description>
      </Card.Header>
      <Card.Content>
        <p>
            Please check your email account for a message to confirm your email address for verification.
            If you did not receive the email click the button below to resend the email
        </p>
      </Card.Content>
      <Card.Footer>
        <Button class='w-full' href='/client/verify/resend-{encodeURIComponent(email)}'>
            Resend Email
        </Button>
      </Card.Footer>
    </Card.Root>
</div>