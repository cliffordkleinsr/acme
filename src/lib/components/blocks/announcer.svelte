<script>
	import { Button } from '$lib/components/ui/button';
	export let img;
</script>

<!-- Features -->
<div class="mx-auto max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
	<!-- Grid -->
	<div class="md:grid md:grid-cols-2 md:items-center md:gap-12 xl:gap-32">
		<div>
			<img class="rounded-xl" src={img} alt="" />
		</div>
		<!-- End Col -->

		<div class="mt-5 sm:mt-10 lg:mt-0">
			<div class="space-y-6 sm:space-y-8">
				<!-- Title -->
				<div class="space-y-2 md:space-y-4">
					<h2 class="text-3xl font-bold text-gray-800 dark:text-neutral-200 lg:text-4xl">
						We tackle the challenges start-ups face
					</h2>
					<p class="text-gray-500 dark:text-neutral-500">
						Besides working with start-up enterprises as a partner for digitalization, we have built
						enterprise products for common pain points that we have encountered in various products
						and projects.
					</p>
				</div>
				<!-- End Title -->

				<!-- List -->
				<ul class="space-y-2 sm:space-y-4">
					<li class="flex space-x-3">
						<span
							class="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500"
						>
							<svg
								class="size-3.5 flex-shrink-0"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
							>
						</span>

						<span class="text-sm text-gray-500 dark:text-neutral-500 sm:text-base">
							<span class="font-bold">Easy & fast</span> questionnaires
						</span>
					</li>

					<li class="flex space-x-3">
						<span
							class="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500"
						>
							<svg
								class="size-3.5 flex-shrink-0"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
							>
						</span>

						<span class="text-sm text-gray-500 dark:text-neutral-500 sm:text-base">
							Powerful <span class="font-bold">features</span>
						</span>
					</li>

					<li class="flex space-x-3">
						<span
							class="mt-0.5 flex size-5 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-800/30 dark:text-blue-500"
						>
							<svg
								class="size-3.5 flex-shrink-0"
								xmlns="http://www.w3.org/2000/svg"
								width="24"
								height="24"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"><polyline points="20 6 9 17 4 12" /></svg
							>
						</span>

						<span class="text-sm text-gray-500 dark:text-neutral-500 sm:text-base">
							Capture User Experience
						</span>
					</li>
				</ul>
				<!-- End List -->
				<Button href="/client/signin">Get Started</Button>
			</div>
		</div>
		<!-- End Col -->
	</div>
	<!-- End Grid -->
</div>
<!-- End Features -->
