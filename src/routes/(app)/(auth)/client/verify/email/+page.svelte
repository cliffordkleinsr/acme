<script lang="ts">
	import type { PageData } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	export let data: PageData;
	const { email } = data;
</script>

<div class="m-3 flex h-screen flex-col items-center gap-2">
	<Card.Root class="m-3 w-full max-w-xl">
		<Card.Header>
			<Card.Title>Pending Verification</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content>
			<p>
				Please check your email account for a message to confirm your email address for
				verification. If you did not receive the email click the button below to resend the email
			</p>
		</Card.Content>
		<Card.Footer>
			<Button class="w-full" href="/client/verify/resend-{encodeURIComponent(email)}">
				Resend Email
			</Button>
		</Card.Footer>
	</Card.Root>
</div>
