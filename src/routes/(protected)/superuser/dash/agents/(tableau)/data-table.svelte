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
	import ChevronFirst from 'lucide-svelte/icons/chevron-first';
	import ChevronLast from 'lucide-svelte/icons/chevron-last';
	import { Button, buttonVariants } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import * as Dialog from '$lib/components/ui/dialog';
	import { goto, preloadData, pushState } from '$app/navigation';
	import ProfilePage from '../view-[agentid]/+page.svelte';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import { page } from '$app/stores';

	type Survey = {
		id: string;
		name: string;
		email: string;
		createdat: Date;
	};
	export let data: Survey[];

	const table = createTable(readable(data), {
		page: addPagination({
			initialPageSize: 5
		}),
		sort: addSortBy(),
		filter: addTableFilter({
			fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
		}),
		hide: addHiddenColumns(),
		select: addSelectedRows()
	});
	const columns = table.createColumns([
		table.column({
			accessor: 'id',
			header: '',
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
			accessor: 'name',
			header: 'Name'
		}),
		table.column({
			accessor: 'email',
			header: 'Email',
			plugins: {
				sort: {
					disable: true
				},
				filter: {
					exclude: false
				}
			}
		}),
		table.column({
			accessor: 'createdat',
			header: 'Created At'
		}),
		table.column({
			accessor: ({ id }) => id,
			header: 'Actions',
			cell: ({ value }) => {
				return createRender(DataTableActions, { id: value });
			},
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

	const hidableCols = ['name', 'email'];

	async function onprofileLinkClick(e: MouseEvent & { currentTarget: HTMLAnchorElement }) {
		if (e.metaKey || e.ctrlKey) return;
		e.preventDefault();

		const { href } = e.currentTarget;
		const result = await preloadData(href);

		if (result.type === 'loaded' && result.status === 200) {
			//@ts-ignore
			pushState(href, { profile: result.data });
		} else {
			goto(href);
		}
	}
	let open = false;
	$: if ($page.state.profile) {
		open = true;
	} else {
		open = false;
	}
</script>

<div class="m-5">
	<!-- <h1 class="text-sm ">
        Select your predifined action using the <span class="italic font-bold">Actions</span> tab
   </h1> -->

	<div class="flex items-center py-4">
		<Input class="max-w-sm" placeholder="Search Users..." type="text" bind:value={$filterValue} />

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
	<div class="select-none rounded-md border">
		<Table.Root {...$tableAttrs}>
			<Table.Header>
				{#each $headerRows as headerRow}
					<Subscribe rowProps={headerRow.props()} let:rowProps>
						<Table.Row>
							{#each headerRow.cells as cell (cell.id)}
								<Subscribe props={cell.props()} let:props>
									<Table.Head {...props} class="[&:has([role=checkbox])]:pl-3">
										{#if cell.id === 'name'}
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
											<a
												class={buttonVariants({ variant: 'secondary' })}
												on:click={onprofileLinkClick}
												href="/superuser/dash/agents/view-{cell.render()}"
											>
												View Profile
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
					<!-- {$selectedDataIds[row.id]} -->
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
			disabled={!$hasPreviousPage}><ChevronFirst class="size-4" /></Button
		>
		<Button
			variant="outline"
			size="sm"
			disabled={!$hasNextPage}
			on:click={() => ($pageIndex = $pageIndex + 1)}><ChevronLast class="size-4" /></Button
		>
	</div>
</div>

<Dialog.Root
	{open}
	onOpenChange={(open) => {
		if (!open) {
			history.back();
		}
	}}
>
	<Dialog.Content class="max-w-md lg:max-w-2xl">
		<ProfilePage data={$page.state.profile} />
	</Dialog.Content>
</Dialog.Root>
