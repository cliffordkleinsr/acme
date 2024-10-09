<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import Cackender from '$lib/components/blocks/liveComponent/cackendar.svelte';
	import { CldImage } from 'svelte-cloudinary';

	export let data;
	export let form;
	const { Role, survey_data, features } = data;

	let Props = {
		user: Role,
		gen_act: features?.gender_active!,
		age_act: features?.ages!,
		target: features?.maxagents!,
		form
	};
</script>

<!-- If is premium -->
<div class="m-4 flex flex-col gap-10">
	<h1 class="font-semi-bold ml-2 text-start font-mono text-3xl">Going live</h1>
	<div class="grid gap-3 lg:grid-cols-3">
		{#each survey_data as s}
			<Card.Root class="lg:col-span-2 lg:w-11/12">
				<Card.Header class="space-y-4">
					<Card.Title><span class="font-mono text-xl">Name</span>: {s.title}</Card.Title>
					<Card.Description>ID : {s.id}</Card.Description>
					<Separator />
				</Card.Header>
				<Card.Content class="mr-9 gap-7 lg:flex">
					<CldImage width="200" height="200" src="anfir41re6vnhxecg52s" alt="Going Live" />
					<!-- <img class="w-52" src="https://i.postimg.cc/TY3g7WHD/vector3.png" alt="s"> -->
					<div class="mt-16 flex flex-col space-y-4">
						<h1 class="font-mono text-xl font-semibold">Description</h1>
						<p class="text-lg">{s.desc}</p>
					</div>
				</Card.Content>
				<Card.Footer class="float-start flex flex-col gap-2 space-y-2">
					<Cackender {...Props} />
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
