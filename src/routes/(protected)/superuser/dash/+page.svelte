<script lang="ts">
	import { Button } from "$lib/components/ui/button"
	import * as Card from "$lib/components/ui/card"
    import { Progress } from "$lib/components/ui/progress"
	import { ArrowUpRight } from "lucide-svelte"
    import Activity from "lucide-svelte/icons/activity"
    import * as Table from "$lib/components/ui/table"
    import { Badge } from "$lib/components/ui/badge"
    import * as Avatar from "$lib/components/ui/avatar"
    import * as Breadcrumb from "$lib/components/ui/breadcrumb"
</script>


<div class="flex flex-col p-4 gap-10 w-full mt-5">
      
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Card.Root
             data-x-chunk-name="dashboard-05-chunk-0"
             data-x-chunk-description="A card for an orders dashboard with a description and a button to create a new order.">
            <Card.Header class="pb-3">
                <Card.Title>Your Orders</Card.Title>
                <Card.Description class="max-w-lg text-balance leading-relaxed">
                    Introducing Our Dynamic Orders Dashboard for Seamless Management and
                    Insightful Analysis.
                </Card.Description>
            </Card.Header>
            <Card.Footer>
                <Button>Create New Order</Button>
            </Card.Footer>
        </Card.Root>
        <Card.Root
             data-x-chunk-name="dashboard-05-chunk-1"
             data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar.">
            <Card.Header class="pb-2">
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
             data-x-chunk-name="dashboard-05-chunk-2"
             data-x-chunk-description="A stats card showing this month's total sales in USD, the percentage difference from last month, and a progress bar.">
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
        <Card.Root
             data-x-chunk-name="dashboard-01-chunk-3"
             data-x-chunk-description="A card showing the total active users and the percentage difference from last hour."
        >
            <Card.Header
                class="flex flex-row items-center justify-between space-y-0 pb-2"
            >
                <Card.Title class="text-sm font-medium">Active Now</Card.Title>
                <Activity class="h-4 w-4 text-muted-foreground" />
            </Card.Header>
            <Card.Content>
                <div class="text-2xl font-bold">+573</div>
                <p class="text-xs text-muted-foreground">+201 since last hour</p>
            </Card.Content>
        </Card.Root>
    </div>
    <div class="grid gap-4 md:grid-cols-2 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
        <Card.Root
             class="xl:col-span-2"
             data-x-chunk-name="dashboard-01-chunk-4"
             data-x-chunk-description="A card showing a table of recent transactions with a link to view all transactions.">
            <Card.Header class="flex flex-row items-center">
                <div class="grid gap-2">
                    <Card.Title>Transactions</Card.Title>
                    <Card.Description>Recent transactions from your store.</Card.Description>
                </div>
                <Button href="##" size="sm" class="ml-auto gap-1">
                    View All
                    <ArrowUpRight class="h-4 w-4" />
                </Button>
            </Card.Header>
            <Card.Content>
                <Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Customer</Table.Head>
                            <Table.Head class="xl:table.-column hidden">Type</Table.Head>
                            <Table.Head class="xl:table.-column hidden">Status</Table.Head>
                            <Table.Head class="xl:table.-column hidden">Date</Table.Head>
                            <Table.Head class="text-right">Amount</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <div class="font-medium">Liam Johnson</div>
                                <div class="hidden text-sm text-muted-foreground md:inline">
                                    liam@example.com
                                </div>
                            </Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">
                                <Badge class="text-xs" variant="outline">Approved</Badge>
                            </Table.Cell>
                            <Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
                                2023-06-23
                            </Table.Cell>
                            <Table.Cell class="text-right">$250.00</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <div class="font-medium">Olivia Smith</div>
                                <div class="hidden text-sm text-muted-foreground md:inline">
                                    olivia@example.com
                                </div>
                            </Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">Refund</Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">
                                <Badge class="text-xs" variant="outline">Declined</Badge>
                            </Table.Cell>
                            <Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
                                2023-06-24
                            </Table.Cell>
                            <Table.Cell class="text-right">$150.00</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <div class="font-medium">Noah Williams</div>
                                <div class="hidden text-sm text-muted-foreground md:inline">
                                    noah@example.com
                                </div>
                            </Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">Subscription</Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">
                                <Badge class="text-xs" variant="outline">Approved</Badge>
                            </Table.Cell>
                            <Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
                                2023-06-25
                            </Table.Cell>
                            <Table.Cell class="text-right">$350.00</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <div class="font-medium">Emma Brown</div>
                                <div class="hidden text-sm text-muted-foreground md:inline">
                                    emma@example.com
                                </div>
                            </Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">
                                <Badge class="text-xs" variant="outline">Approved</Badge>
                            </Table.Cell>
                            <Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
                                2023-06-26
                            </Table.Cell>
                            <Table.Cell class="text-right">$450.00</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <div class="font-medium">Liam Johnson</div>
                                <div class="hidden text-sm text-muted-foreground md:inline">
                                    liam@example.com
                                </div>
                            </Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
                            <Table.Cell class="xl:table.-column hidden">
                                <Badge class="text-xs" variant="outline">Approved</Badge>
                            </Table.Cell>
                            <Table.Cell class="md:table.-cell xl:table.-column hidden lg:hidden">
                                2023-06-27
                            </Table.Cell>
                            <Table.Cell class="text-right">$550.00</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table.Root>
            </Card.Content>
        </Card.Root>     
        <Card.Root
            data-x-chunk-name="dashboard-01-chunk-5"
            data-x-chunk-description="A card showing a list of recent sales with customer names and email addresses."
        >
            <Card.Header>
                <Card.Title>Recent Sales</Card.Title>
            </Card.Header>
            <Card.Content
                 class="grid gap-8">
                <div class="flex items-center gap-4">
                    <Avatar.Root class="hidden h-9 w-9 sm:flex">
                        <Avatar.Image src="https://i.postimg.cc/43mhXrWn/01.png" alt="Avatar" />
                        <Avatar.Fallback>OM</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="grid gap-1">
                        <p class="text-sm font-medium leading-none">Olivia Martin</p>
                        <p class="text-sm text-muted-foreground">olivia.martin@email.com</p>
                    </div>
                    <div class="ml-auto font-medium">+$1,999.00</div>
                </div>
                <div class="flex items-center gap-4">
                    <Avatar.Root class="hidden h-9 w-9 sm:flex">
                        <Avatar.Image src="https://i.postimg.cc/DwCXk2dt/02.png" alt="Avatar" />
                        <Avatar.Fallback>JL</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="grid gap-1">
                        <p class="text-sm font-medium leading-none">Jackson Lee</p>
                        <p class="text-sm text-muted-foreground">jackson.lee@email.com</p>
                    </div>
                    <div class="ml-auto font-medium">+$39.00</div>
                </div>
                <div class="flex items-center gap-4">
                    <Avatar.Root class="hidden h-9 w-9 sm:flex">
                        <Avatar.Image src="https://i.postimg.cc/yYyRjhJ6/03.png" alt="Avatar" />
                        <Avatar.Fallback>IN</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="grid gap-1">
                        <p class="text-sm font-medium leading-none">Isabella Nguyen</p>
                        <p class="text-sm text-muted-foreground">isabella.nguyen@email.com</p>
                    </div>
                    <div class="ml-auto font-medium">+$299.00</div>
                </div>
                <div class="flex items-center gap-4">
                    <Avatar.Root class="hidden h-9 w-9 sm:flex">
                        <Avatar.Image src="https://i.postimg.cc/2SjZKqvQ/04.png" alt="Avatar" />
                        <Avatar.Fallback>WK</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="grid gap-1">
                        <p class="text-sm font-medium leading-none">William Kim</p>
                        <p class="text-sm text-muted-foreground">will@email.com</p>
                    </div>
                    <div class="ml-auto font-medium">+$99.00</div>
                </div>
                <div class="flex items-center gap-4">
                    <Avatar.Root class="hidden h-9 w-9 sm:flex">
                        <Avatar.Image src="https://i.postimg.cc/VL8MXZkH/05.png" alt="Avatar" />
                        <Avatar.Fallback>SD</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="grid gap-1">
                        <p class="text-sm font-medium leading-none">Sofia Davis</p>
                        <p class="text-sm text-muted-foreground">sofia.davis@email.com</p>
                    </div>
                    <div class="ml-auto font-medium">+$39.00</div>
                </div>
            </Card.Content>
        </Card.Root>
    </div>
</div>


