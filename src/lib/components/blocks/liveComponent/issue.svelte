<script>
	import * as Select from '$lib/components/ui/select';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root class=" 2xl:w-[450px]">
	<Card.Header class="space-y-2">
		<Card.Title>Report an issue</Card.Title>
		<Card.Description>What area are you having problems with?</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="grid grid-cols-2 gap-5">
			<div class="grid gap-2">
				<h1 class="text-sm font-semibold">Area</h1>
				<Select.Root>
					<Select.Trigger class="lg:w-32 2xl:w-48">
						<Select.Value placeholder="Billing" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="light">Billing</Select.Item>
						<Select.Item value="dark">Submission</Select.Item>
						<Select.Item value="system">Team</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2">
				<h1 class="text-sm font-semibold">Security Level</h1>
				<Select.Root>
					<Select.Trigger class="lg:w-32 2xl:w-48">
						<Select.Value placeholder="Severity" />
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="light">Severity 1</Select.Item>
						<Select.Item value="dark">Severity 2</Select.Item>
						<Select.Item value="system">Highest</Select.Item>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="grid gap-2 lg:w-64 2xl:w-96">
				<h1 class="text-sm font-semibold">Subject</h1>
				<Input placeholder="I need help with" />
				<h1 class=" text-sm font-semibold">Description</h1>
				<Textarea placeholder="Please include all information relevant to your issue" />
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="grid grid-cols-2 place-items-center gap-2">
		<Button variant="ghost" class="w-1/2">Cancel</Button>
		<Button variant="secondary" class="w-1/2">Submit</Button>
	</Card.Footer>
</Card.Root>
