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
    import DataTableCheckbox from "./data-table-checkbox.svelte"
    import ChevronDown from "lucide-svelte/icons/chevron-down"
    import { Button } from "$lib/components/ui/button"
    import { Input } from "$lib/components/ui/input"
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
    import 'intro.js/minified/introjs.min.css'
    

    import introJs from 'intro.js'
	import { onMount } from 'svelte';
    
    onMount(async() => {
        const theme = localStorage.getItem('mode-watcher-mode')
        if (theme === 'dark') {
           await import('intro.js/themes/introjs-dark.css')
        }
        setTimeout(()=>{
            introJs().setOptions({
                    "dontShowAgain":true,
                    "dontShowAgainCookie":"introjs-dontShowAgain1"
            }).start();
        }, 1500)
      
    })
    type Survey = {
        id: string;
        title: string;
        created: Date;
    }
    export let data:Survey[]
 

    const table = createTable(readable(data), {
        page: addPagination(),
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
            accessor: "id",
            header: (_, { pluginStates }) => {
                const { allPageRowsSelected } = pluginStates.select;
                return createRender(DataTableCheckbox, {
                checked: allPageRowsSelected,
                });
            },
            cell: ({ row }, { pluginStates }) => {
                const { getRowState } = pluginStates.select;
                const { isSelected } = getRowState(row);
        
                return createRender(DataTableCheckbox, {
                checked: isSelected,
                });
            },
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
            accessor: "title",
            header: "Survey Title",
        }),
        table.column({
            accessor: "created",
            header: "Created At",
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
            accessor: ({ id }) => id,
            header: "Actions",
            cell: ({ value }) => {
                return createRender(DataTableActions, { id: value });
            },
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
 
  const hidableCols = ["created"]
</script>

<div class="m-5">
    <!-- <h1 class="text-sm ">
        Select your predifined action using the <span class="italic font-bold">Actions</span> tab
   </h1> -->
    <div class="flex items-center py-4">
        <Input
          class="max-w-sm"
          placeholder="Filter Surveys..."
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
    <div class="rounded-md border" data-intro='Here are all the surveys you"ve generated'>
        <Table.Root {...$tableAttrs}>
        <Table.Header>
            {#each $headerRows as headerRow}
            <Subscribe rowAttrs={headerRow.attrs()}>
                <Table.Row>
                {#each headerRow.cells as cell (cell.id)}
                    <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props    >
                    <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                        {#if cell.id === "title"}
                            <Button variant="ghost" on:click={props.sort.toggle}>
                                <Render of={cell.render()} />
                                <ArrowUpDown class={"ml-2 h-4 w-4"} />
                            </Button>  
                        {:else if cell.id !== "id" && cell.id !== "created" && cell.id !== "title"} 
                            <div data-intro='Below you will find the actions available to modify your survey'>
                                <Render of={cell.render()} />
                            </div>
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
                        {#if cell.id !== "id" && cell.id !== "created" && cell.id !== "title"}
                            <div data-intro='Click on the elipse to create questions or delete the survey entirely'>
                                <Render of={cell.render()} />
                            </div>
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
