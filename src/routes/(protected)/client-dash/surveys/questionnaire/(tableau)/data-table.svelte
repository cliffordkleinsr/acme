<script lang="ts">
	import { readable } from 'svelte/store';
	import { createTable, Render, Subscribe, createRender } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import {
		addPagination,
		addSortBy,
		addTableFilter,
		addHiddenColumns,
		addSelectedRows
	} from 'svelte-headless-table/plugins';
	import ArrowUpDown from 'lucide-svelte/icons/arrow-up-down';
	import DataTableActions from './data-table-actions.svelte';
	import DataTableCheckbox from './data-table-checkbox.svelte';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import 'intro.js/minified/introjs.min.css';
	import * as AlertDialog from '$lib/components/ui/alert-dialog';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import Trash2 from 'lucide-svelte/icons/trash-2';
	import introJs from 'intro.js';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';

	onMount(async () => {
		const theme = localStorage.getItem('mode-watcher-mode');
		if (theme === 'dark') {
			await import('intro.js/themes/introjs-dark.css');
		}
		setTimeout(() => {
			introJs()
				.setOptions({
					dontShowAgain: true,
					dontShowAgainCookie: 'introjs-dontShowAgain1'
				})
				.start();
		}, 1500);
	});
	type Survey = {
		id: string;
		title: string;
		created: Date;
	};
	export let data: Survey[];

	const table = createTable(readable(data), {
		page: addPagination(),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows()
	});
	const columns = table.createColumns([
		table.column({
			accessor: ({ id }) => id,
			header: 'Options',
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'title',
			header: 'Survey Title'
		}),
		table.column({
			accessor: 'created',
			header: 'Created At',
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		}),
		table.column({
			accessor: 'id',
			header: 'Actions',
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: true
				}
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
		table.createViewModel(columns);
	const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
	const { filterValue } = pluginStates.filter;
	const { hiddenColumnIds } = pluginStates.hide;
	const { selectedDataIds } = pluginStates.select;

	const ids = flatColumns.map((col) => col.id);
	let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

	$: $hiddenColumnIds = Object.entries(hideForId)
		.filter(([, hide]) => !hide)
		.map(([id]) => id);

	const hidableCols = ['created'];
</script>

<div class="m-5">
	<!-- <h1 class="text-sm ">
        Select your predifined action using the <span class="italic font-bold">Actions</span> tab
   </h1> -->
	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Filter Surveys..." type="text" bind:value={$filterValue} />

		<DropdownMenu.Root>
			<DropdownMenu.Trigger asChild let:builder>
				<Button variant="outline" class="ml-auto" builders={[builder]}>
					Columns <ChevronDown class="ml-2 h-4 w-4" />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content>
				{#each flatColumns as col}
					{#if hidableCols.includes(col.id)}
						<DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
							{col.header}
						</DropdownMenu.CheckboxItem>
					{/if}
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
	<div class="rounded-md border" data-intro="Here are all the surveys you've generated">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowAttrs={headerRow.attrs()}>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
									<Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
										{#if cell.id === 'title'}
											<Button variant="ghost" on:click={props.sort.toggle}>
												<Render of={cell.render()} />
												<ArrowUpDown class={'ml-2 h-4 w-4'} />
											</Button>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Head>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Header>
			<Table.Body {...$tableBodyAttrs}>
				{#each $pageRows as row (row.id)}
					<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
						<Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && 'selected'}>
							{#each row.cells as cell (cell.id)}
								<Subscribe attrs={cell.attrs()} let:attrs>
									<Table.Cell {...attrs}>
										{#if cell.id === 'id'}
											<AlertDialog.Root>
												<AlertDialog.Trigger
													class={buttonVariants({ variant: 'destructive', size: 'icon' })}
												>
													<Trash2 class="size-4" />
												</AlertDialog.Trigger>
												<AlertDialog.Content>
													<AlertDialog.Header>
														<AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
														<AlertDialog.Description>
															This action cannot be undone. This will permanently delete this survey
															and remove your data from our servers.
														</AlertDialog.Description>
													</AlertDialog.Header>
													<AlertDialog.Footer>
														<AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
														<form action="?/deleteSurvey" method="post">
															<Input type="text" value={cell.render()} class="hidden" name="id" />
															<Button type="submit">Delete Survey</Button>
														</form>
													</AlertDialog.Footer>
												</AlertDialog.Content>
											</AlertDialog.Root>
										{:else if cell.id === 'Options'}
											<a
												class={buttonVariants({ variant: 'secondary' })}
												href="/client-dash/surveys/questionnaire/{cell.render()}"
											>
												Questions
												<ArrowUpRight class="size-4" />
											</a>
										{:else}
											<Render of={cell.render()} />
										{/if}
									</Table.Cell>
								</Subscribe>
							{/each}
						</Table.Row>
					</Subscribe>
				{/each}
			</Table.Body>
		</Table.Root>
	</div>
	<div class="flex items-center justify-end space-x-4 py-4">
		<div class="flex-1 text-sm text-muted-foreground">
			{Object.keys($selectedDataIds).length} of{' '}
			{$rows.length} row(s) selected.
		</div>
		<Button
			variant="outline"
			size="sm"
			on:click={() => ($pageIndex = $pageIndex - 1)}
			disabled={!$hasPreviousPage}>{$pageIndex}</Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}>{$pageIndex + 1}</Button
		>
	</div>
</div>
