<script lang="ts">
	export let message: string;
	export let type: string;
</script>

{#if type === 'soft-grey'}
	<!-- Toast -->
	<div
		class=" absolute right-9 top-20 max-w-xs rounded-lg border border-gray-200 bg-gray-100 text-sm text-gray-800 dark:border-white/20 dark:bg-white/10 dark:text-white"
		role="alert"
	>
		<div class="flex p-4">
			{message}
		</div>
	</div>
	<!-- End Toast -->
{:else if type === 'dark-grey'}
	<!-- Toast -->
	<div
		class=" absolute right-9 top-20 max-w-xs rounded-lg border border-gray-200 bg-gray-50 text-sm text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-neutral-400"
		role="alert"
	>
		<div class="flex p-4">
			{message}
		</div>
	</div>
	<!-- End Toast -->
{:else if type === 'info'}
	<!-- Toast -->
	<div
		class="absolute right-9 top-20 max-w-xs rounded-xl border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
		role="alert"
	>
		<div class="flex p-4">
			<div class="flex-shrink-0">
				<svg
					class="mt-0.5 size-4 flex-shrink-0 text-blue-500"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"
					></path>
				</svg>
			</div>
			<div class="ms-3">
				<p class="text-sm text-gray-700 dark:text-neutral-400">
					{message}
				</p>
			</div>
		</div>
	</div>
	<!-- End Toast -->
{:else if type === 'success'}
	<!-- Toast -->
	<div
		class="absolute right-9 top-20 max-w-xs rounded-xl border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
		role="alert"
	>
		<div class="flex p-4">
			<div class="flex-shrink-0">
				<svg
					class="mt-0.5 size-4 flex-shrink-0 text-teal-500"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"
					></path>
				</svg>
			</div>
			<div class="ms-3">
				<p class="text-sm text-gray-700 dark:text-neutral-400">
					{message}
				</p>
			</div>
		</div>
	</div>
	<!-- End Toast -->
{:else if type === 'error'}
	<!-- Toast -->
	<div
		class="absolute right-9 top-20 max-w-xs rounded-xl border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
		role="alert"
	>
		<div class="flex p-4">
			<div class="flex-shrink-0">
				<svg
					class="mt-0.5 size-4 flex-shrink-0 text-red-500"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"
					></path>
				</svg>
			</div>
			<div class="ms-3">
				<p class="text-sm text-gray-700 dark:text-neutral-400">
					{message}
				</p>
			</div>
		</div>
	</div>
	<!-- End Toast -->
{:else}
	<!-- Toast Warning -->
	<div
		class="absolute right-9 top-20 max-w-xs rounded-xl border border-gray-200 bg-white shadow-lg dark:border-neutral-700 dark:bg-neutral-800"
		role="alert"
	>
		<div class="flex p-4">
			<div class="flex-shrink-0">
				<svg
					class="mt-0.5 size-4 flex-shrink-0 text-yellow-500"
					xmlns="http://www.w3.org/2000/svg"
					width="16"
					height="16"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
					></path>
				</svg>
			</div>
			<div class="ms-3">
				<p class="text-sm text-gray-700 dark:text-neutral-400">
					{message}
				</p>
			</div>
		</div>
	</div>
	<!-- End Toast -->
{/if}
