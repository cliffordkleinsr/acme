<script lang="ts">
    import { readable } from 'svelte/store'
    import { createTable, Render, Subscribe, createRender } from "svelte-headless-table"
    import * as Table from "$lib/components/ui/table"
    import { 
        addPagination, addSortBy , addTableFilter, addHiddenColumns, 
        addSelectedRows,
    } from "svelte-headless-table/plugins"
    import ArrowUpDown from "lucide-svelte/icons/arrow-up-down"
    import DataTableActions from "./data-table-actions.svelte"
    import ChevronDown from "lucide-svelte/icons/chevron-down"
    import { Button, buttonVariants } from "$lib/components/ui/button"
    import { Input } from "$lib/components/ui/input"
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
    import ArrowUpRight from "lucide-svelte/icons/arrow-up-right"
	import { page } from '$app/stores';
    import { Badge } from "$lib/components/ui/badge"
    import ChevronLast from 'lucide-svelte/icons/chevron-last'
    import ChevronFirst from 'lucide-svelte/icons/chevron-first'
    
    type Tickets = {
        id: string
        name: string
        category: string
        priority: string,
        status:string,
        since: string,
        createdat:string
    }
    export let data:Tickets[]
 

    const table = createTable(readable(data), {
        page: addPagination({
            initialPageSize: 5
        }),
        sort: addSortBy(),
        filter: addTableFilter({
            fn: ({ filterValue, value }) =>
                value.toLowerCase().includes(filterValue.toLowerCase()),
        }),
        hide: addHiddenColumns(),
        select: addSelectedRows(),
    })
    const columns = table.createColumns([
        table.column({
            accessor: ({ id }) => id,
            cell: ({ value }) => {
                return createRender(DataTableActions, { id: value });
            },
            header: '',
            plugins: {
                sort: {
                    disable: true,
                },
                filter: {
                    exclude: true,
                },
            },
        }),
        table.column({
            accessor: "name",
            header: "Client Name",
        }),
        table.column({
            accessor: "category",
            header: "Category",
            plugins: {
                sort: {
                    disable: true,
                },
                filter: {
                    exclude: false,
                },
            },
        }),
        table.column({
            accessor: "priority",
            header: "Priority",
            plugins: {
                sort: {
                    disable: true,
                },
                filter: {
                    exclude: false,
                },
            },
        }),
        table.column({
            accessor: "status",
            header: "Status",
            plugins: {
                sort: {
                    disable: true,
                },
                filter: {
                    exclude: false,
                },
            },
        }),
        table.column({
            accessor: "since",
            header: "Open Since(Mins)",
        }),
        table.column({
            accessor: "createdat",
            header: "Created At",
        }),
        table.column({
            accessor: 'id',
            header: "View Ticket",
            plugins: {
                sort: {
                    disable: true,
                },
                filter: {
                    exclude: true,
                },
            },
        }),
    ])

    const { 
        headerRows,
        pageRows,
        tableAttrs,
        tableBodyAttrs,
        pluginStates,
        flatColumns,
        rows,
    } = table.createViewModel(columns)
    const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page
    const { filterValue } = pluginStates.filter
    const { hiddenColumnIds } = pluginStates.hide
    const { selectedDataIds } = pluginStates.select

    const ids = flatColumns.map((col) => col.id);
    let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
    
    $: $hiddenColumnIds = Object.entries(hideForId)
        .filter(([, hide]) => !hide)
        .map(([id]) => id);
 
  const hidableCols = ["name", "priority"]
  
</script>

<div class="m-5">
    <!-- <h1 class="text-sm ">
        Select your predifined action using the <span class="italic font-bold">Actions</span> tab
   </h1> -->
   
    <div class="flex items-center py-4">
        <Input
          class="max-w-sm"
          placeholder="Search Users..."
          type="text"
          bind:value={$filterValue}
        />
       
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
    <div class="rounded-md border select-none">
        <Table.Root {...$tableAttrs}>
        <Table.Header>
            {#each $headerRows as headerRow}
            <Subscribe rowAttrs={headerRow.attrs()}>
                <Table.Row>
                {#each headerRow.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props    >
                    <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                        {#if cell.id === "name"}
                            <Button variant="ghost" on:click={props.sort.toggle}>
                                <Render of={cell.render()} />
                                <ArrowUpDown class={"ml-2 h-4 w-4"} />
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
                <Table.Row 
                    {...rowAttrs}
                    data-state={$selectedDataIds[row.id] && "selected"}
                >
                {#each row.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs>
                    <Table.Cell {...attrs}>
                        {#if cell.id === "id"}
                            <a href="##" class="{buttonVariants({ variant : 'secondary'})}">View <ArrowUpRight class="size-4"/></a>
                        {:else if cell.id === 'priority'}
                            <Badge 
                                class={
                                    cell.render() === 'Low' ? 'bg-accent hover:bg-accent text-black' :
                                    cell.render() === 'Medium' ? 'bg-black hover:bg-black' :
                                    cell.render() === 'High' ? 'bg-red-400 hover:bg-red-400' :
                                    'bg-destructive'
                                }>
                                    <Render of={cell.render()} />
                            </Badge>
                        {:else if cell.id === 'status'}
                            <Badge 
                                variant='{cell.render() ==='Open'? 'outline': 'default'}'
                                class={
                                    cell.render() === 'Open' ? '' :
                                    cell.render() === 'In Progress' ? 'bg-green-500 hover:bg-green-500' :
                                    cell.render() === 'Closed' ? '' :
                                    'bg-destructive'
                                }>
                                    <Render of={cell.render()} />
                            </Badge>
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
            {Object.keys($selectedDataIds).length} of{" "}
            {$rows.length} row(s) selected.
        </div>
        <Button
          variant="outline"
          size="sm"
          on:click={() => ($pageIndex = $pageIndex - 1)}
          disabled={!$hasPreviousPage}><ChevronFirst class='size-4'/></Button
        >
        <Button
          variant="outline"
          size="sm"
          disabled={!$hasNextPage}
          on:click={() => ($pageIndex = $pageIndex + 1)}><ChevronLast class='size-4'/></Button
        >
    </div>
</div>
