<script lang="ts">
	import { Separator } from '$lib/components/ui/separator';
	import type { PageData } from './$types';
	import UserRound from 'lucide-svelte/icons/user-round';
	export let data: PageData;

	const { clients } = data;
</script>

<div class="m-5 grid max-w-md select-none gap-2 lg:max-w-xl">
	<div class="flex gap-3">
		<UserRound class="size-8" />
		<p class="text-2xl font-semibold">{clients.name}</p>
	</div>
	<p class="mx-11 text-sm">{clients.email}</p>
	<div class="grid gap-5 lg:grid-cols-2">
		<div class="flex gap-2">
			<h1 class="text-lg font-semibold">Name:</h1>
			<p class="py-[7px] text-sm text-muted-foreground underline">
				{clients.name}
			</p>
		</div>
		<div class="flex gap-2">
			<h1 class="text-lg font-semibold">Email:</h1>
			<p class="py-[7px] text-sm text-muted-foreground underline">
				{clients.email}
			</p>
		</div>
		<div class="flex gap-2">
			<h1 class="text-lg font-semibold">Phone:</h1>
			<p class="py-[7px] text-sm text-muted-foreground underline">
				+{clients.phone}
			</p>
		</div>
		<div class="flex gap-2">
			<h1 class="text-lg font-semibold">Company:</h1>
			<p class="py-[7px] text-sm text-muted-foreground underline">
				{clients.company}
			</p>
		</div>
	</div>
	<Separator class="mt-4" />
	<h1 class="m-5 text-end text-3xl font-bold">Summary Statistics</h1>
	<div class="grid grid-cols-2 gap-2">
		<div class="grid gap-2">
			<h1 class="text-xl font-semibold text-muted-foreground">Total Surveys</h1>
			<p class="text-4xl font-bold text-green-500">{clients.surveys}</p>
		</div>
		<div class="grid gap-2">
			<h1 class="text-xl font-semibold text-muted-foreground">Client Subscription</h1>
			<p class="text-4xl font-bold text-green-600">{clients.packagetype}</p>
		</div>
		<!-- <div class="grid gap-1">
            <h1 class="text-xl font-semibold text-muted-foreground">
                Active
            </h1>
            <p class="text-4xl font-bold {clients.active?'text-green-600': 'text-red-600'} ">{clients.active}</p>
        </div> -->
	</div>
</div>
