<script lang="ts">
	import Pricer from '$lib/components/blocks/pricingComponent/pricer.svelte';
	import { get } from 'svelte/store';
	import { clientPackage } from '$lib/store';
	import * as Card from '$lib/components/ui/card';
	import ShoppingBag from 'lucide-svelte/icons/shopping-bag';
	import { Badge } from '$lib/components/ui/badge';
	import * as Popover from '$lib/components/ui/popover';
	import { Button } from '$lib/components/ui/button';
	import { Separator } from '$lib/components/ui/separator';
	import { checkout } from '$lib/helperFunctions/helpers';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import { Input } from '$lib/components/ui/input';
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Pretoast from '$lib/components/blocks/pretoast.svelte';
	import { fade } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	export let data;

	const {
		features: { plan }
	} = data;
	let date = new Date();

	// custom param message
	let msg: string;
	let visible = true;

	setTimeout(() => {
		visible = false;
	}, 2000);

	$: msg = $page.url.searchParams.get('notification') ?? '';
	// add a day
	let newDate = new Date(date.setMonth(date.getMonth() + 1));
	const pricerProps = {
		Message: 'Upgrade',
		href: '',
		table: false,
		applyLogic: true,
		selected_plan: plan
	};
</script>

{#if visible && msg}
	<div transition:fade={{ delay: 200, duration: 300, easing: sineInOut }}>
		<Pretoast message={msg} type="info" />
	</div>
{/if}
<Popover.Root>
	<Popover.Trigger asChild let:builder>
		<Button
			builders={[builder]}
			class="absolute right-8 top-20 text-muted-foreground"
			variant="ghost"
			size="icon"><ShoppingBag /></Button
		>
	</Popover.Trigger>
	<Popover.Content>
		<form action="?/subscribe" method="post" class="space-y-3">
			{#if parseInt($clientPackage.price) > 0}
				<p>
					Starting {newDate.toDateString()} you will be charged ${$clientPackage.price} for the {$clientPackage.plan}
					package
				</p>
				<Separator />
				<p class="text-sm">Total: ${$clientPackage.price}</p>
			{/if}
			<Input type="text" name="plan" value={$clientPackage.plan} class="hidden" />
			<Input type="text" name="priceId" value={$clientPackage.priceId} class="hidden" />
			<Button
				variant="secondary"
				size="icon"
				on:click={() => {
					localStorage.removeItem('client_package');
					window.location.reload();
				}}
				disabled={parseInt($clientPackage.price) > 0 ? false : true}
			>
				<Trash2 class="size-5" />
			</Button>

			<Button
				variant="secondary"
				class="float-end flex gap-2"
				type="submit"
				disabled={parseInt($clientPackage.price) > 0 ? false : true}
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="size-8" viewBox="0 0 512 214"
					><path
						fill="#635bff"
						d="M512 110.08c0-36.409-17.636-65.138-51.342-65.138c-33.85 0-54.33 28.73-54.33 64.854c0 42.808 24.179 64.426 58.88 64.426c16.925 0 29.725-3.84 39.396-9.244v-28.445c-9.67 4.836-20.764 7.823-34.844 7.823c-13.796 0-26.027-4.836-27.591-21.618h69.547c0-1.85.284-9.245.284-12.658m-70.258-13.511c0-16.071 9.814-22.756 18.774-22.756c8.675 0 17.92 6.685 17.92 22.756zm-90.31-51.627c-13.939 0-22.899 6.542-27.876 11.094l-1.85-8.818h-31.288v165.83l35.555-7.537l.143-40.249c5.12 3.698 12.657 8.96 25.173 8.96c25.458 0 48.64-20.48 48.64-65.564c-.142-41.245-23.609-63.716-48.498-63.716m-8.534 97.991c-8.391 0-13.37-2.986-16.782-6.684l-.143-52.765c3.698-4.124 8.818-6.968 16.925-6.968c12.942 0 21.902 14.506 21.902 33.137c0 19.058-8.818 33.28-21.902 33.28M241.493 36.551l35.698-7.68V0l-35.698 7.538zm0 10.809h35.698v124.444h-35.698zm-38.257 10.524L200.96 47.36h-30.72v124.444h35.556V87.467c8.39-10.951 22.613-8.96 27.022-7.396V47.36c-4.551-1.707-21.191-4.836-29.582 10.524m-71.112-41.386l-34.702 7.395l-.142 113.92c0 21.05 15.787 36.551 36.836 36.551c11.662 0 20.195-2.133 24.888-4.693V140.8c-4.55 1.849-27.022 8.391-27.022-12.658V77.653h27.022V47.36h-27.022zM35.982 83.484c0-5.546 4.551-7.68 12.09-7.68c10.808 0 24.461 3.272 35.27 9.103V51.484c-11.804-4.693-23.466-6.542-35.27-6.542C19.2 44.942 0 60.018 0 85.192c0 39.252 54.044 32.995 54.044 49.92c0 6.541-5.688 8.675-13.653 8.675c-11.804 0-26.88-4.836-38.827-11.378v33.849c13.227 5.689 26.596 8.106 38.827 8.106c29.582 0 49.92-14.648 49.92-40.106c-.142-42.382-54.329-34.845-54.329-50.774"
					/></svg
				>
				Subscribe
			</Button>
			<Button
				variant="secondary"
				class="float-end flex gap-2"
				disabled={parseInt($clientPackage.price) > 0 ? false : true}
			>
				<img
					class="w-9"
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png?20191120100524"
					alt=""
				/>
				Subscribe
			</Button>
		</form>
	</Popover.Content>
</Popover.Root>

{#if parseInt($clientPackage.price) > 0}
	<span class="absolute right-14 top-20 flex h-3 w-3">
		<span
			class="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"
		></span>
		<span class="relative inline-flex h-3 w-3 rounded-full bg-orange-500"></span>
	</span>
{/if}
<Pricer {...pricerProps} />
