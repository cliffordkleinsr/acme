<script lang="ts">
	import { page } from "$app/stores"
	import Pretoast from "$lib/components/blocks/pretoast.svelte"
	import * as Breadcrumb from "$lib/components/ui/breadcrumb"
	import { Button } from "$lib/components/ui/button"
	import * as Card from "$lib/components/ui/card"
	import { Progress } from "$lib/components/ui/progress"
	import { sineInOut } from "svelte/easing"
	import { fade } from "svelte/transition"
    // Shadcn UI
	import { Badge } from "$lib/components/ui/badge"
	import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
	import * as Table from "$lib/components/ui/table"
    import * as Tabs from "$lib/components/ui/tabs"

    // Lucide Svelte
    import Ellipsis from "lucide-svelte/icons/ellipsis"
    // custom param message
    let msg: string
    let visible = true
    
    setTimeout(() => {
        visible = false 
    }, 2000)

    $: msg= $page.url.searchParams.get("notification") ?? ""
</script>
{#if visible && msg}
<div transition:fade={{delay:200, duration:300, easing:sineInOut}}>
    <Pretoast message={msg} type="warning"/>
</div>
{/if}
<div class="flex flex-col p-4 gap-10 w-full mt-2">
    <div class="ml-5 pb-2">
        <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="##">Home</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Link href="##">Analytics</Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
              <Breadcrumb.Item>
                <Breadcrumb.Page>Dashboard</Breadcrumb.Page>
              </Breadcrumb.Item>
            </Breadcrumb.List>
        </Breadcrumb.Root>
    </div>
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3">     
        <Card.Root
            class="sm:col-span-1"
            data-x-chunk-name="dashboard-05-chunk-0"
            data-x-chunk-description="A card for an orders dashboard with a description and a button to create a new order."
        >
            <Card.Header class="pb-3">
                <Card.Title>Your Orders</Card.Title>
                <Card.Description class="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless Management and
                    Insightful Analysis.
                </Card.Description>
            </Card.Header>
            <Card.Footer>
                <Button variant="default">Create New Survey</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
            class="max-w-lg"
            data-x-chunk-name="dashboard-05-chunk-1"
            data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
        >
            <Card.Header class="pb-2 ">
                <Card.Description>This Week</Card.Description>
                <Card.Title class="text-4xl">$1329</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+25% from last week</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={25} aria-label="{25}% increase" />
            </Card.Footer>
        </Card.Root>
        <Card.Root
            class="max-w-sm"
            data-x-chunk-name="dashboard-05-chunk-2"
            data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar."
        >
            <Card.Header class="pb-2">
                <Card.Description>This Month</Card.Description>
                <Card.Title class="text-3xl">$5,329</Card.Title>
            </Card.Header>
            <Card.Content>
                <div class="text-xs text-muted-foreground">+10% from last month</div>
            </Card.Content>
            <Card.Footer>
                <Progress value={12} aria-label="12% increase" />
            </Card.Footer>
        </Card.Root>            
    </div>
</div>

<Tabs.Root value="all" class="lg:w-full lg:m-5">
    <Tabs.List class="grid w-[35rem] grid-cols-5">
      <Tabs.Trigger value="all">All</Tabs.Trigger>
      <Tabs.Trigger value="draft">Draft</Tabs.Trigger>
      <Tabs.Trigger value="running">Running</Tabs.Trigger>
      <Tabs.Trigger value="paused">Paused</Tabs.Trigger>
      <Tabs.Trigger value="completed">Completed</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="all">
        <Card.Root class="lg:mr-9">
            <Card.Header>
            </Card.Header>
            <Card.Content>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head class="w-[300px]">Name</Table.Head>
                            <Table.Head>Status</Table.Head>
                            <Table.Head class="hidden md:table-cell">Total Responses</Table.Head>
                            <Table.Head class="hidden md:table-cell">Created at</Table.Head>
                            <Table.Head class="hidden md:table-cell">End Date</Table.Head>
                            <Table.Head>
                                <span class="sr-only">Actions</span>
                            </Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>

                            <Table.Cell class="font-medium">Laser Lemonade Machine</Table.Cell>
                            <Table.Cell>
                                <Badge variant="outline">Draft</Badge>
                            </Table.Cell>
                            <Table.Cell class="hidden md:table-cell">10</Table.Cell>
                            <Table.Cell class="hidden md:table-cell">2024-03-16 11:42 AM</Table.Cell>
                            <Table.Cell class="hidden md:table-cell">
                                2024-07-12 10:42 AM
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger asChild let:builder>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                            builders={[builder]}
                                        >
                                            <Ellipsis class="h-4 w-4" />
                                            <span class="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content align="end">
                                        <DropdownMenu.Label>Actions</DropdownMenu.Label>
                                        <DropdownMenu.Item>Edit</DropdownMenu.Item>
                                        <DropdownMenu.Item>Delete</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Card.Content>
            <Card.Footer>
                <div class="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
            </Card.Footer>
        </Card.Root>
    </Tabs.Content>
    <Tabs.Content value="draft">
        <Card.Root class="lg:mr-9">
            <Card.Header>
            </Card.Header>
            <Card.Content>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head class="w-[300px]">Name</Table.Head>
                            <Table.Head>Status</Table.Head>
                            <Table.Head class="hidden md:table-cell">Total Responses</Table.Head>
                            <Table.Head class="hidden md:table-cell">Created at</Table.Head>
                            <Table.Head class="hidden md:table-cell">End Date</Table.Head>
                            <Table.Head>
                                <span class="sr-only">Actions</span>
                            </Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>

                            <Table.Cell class="font-medium">Laser Lemonade Machine</Table.Cell>
                            <Table.Cell>
                                <Badge variant="outline">Draft</Badge>
                            </Table.Cell>
                            <Table.Cell class="hidden md:table-cell">10</Table.Cell>
                            <Table.Cell class="hidden md:table-cell">2024-03-16 11:42 AM</Table.Cell>
                            <Table.Cell class="hidden md:table-cell">
                                2024-07-12 10:42 AM
                            </Table.Cell>
                            <Table.Cell>
                                <DropdownMenu.Root>
                                    <DropdownMenu.Trigger asChild let:builder>
                                        <Button
                                            aria-haspopup="true"
                                            size="icon"
                                            variant="ghost"
                                            builders={[builder]}
                                        >
                                            <Ellipsis class="h-4 w-4" />
                                            <span class="sr-only">Toggle menu</span>
                                        </Button>
                                    </DropdownMenu.Trigger>
                                    <DropdownMenu.Content align="end">
                                        <DropdownMenu.Label>Actions</DropdownMenu.Label>
                                        <DropdownMenu.Item>Edit</DropdownMenu.Item>
                                        <DropdownMenu.Item>Delete</DropdownMenu.Item>
                                    </DropdownMenu.Content>
                                </DropdownMenu.Root>
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Card.Content>
            <Card.Footer>
                <div class="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> products
                </div>
            </Card.Footer>
        </Card.Root>
    </Tabs.Content>
</Tabs.Root>  