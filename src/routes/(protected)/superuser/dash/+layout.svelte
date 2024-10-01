<script lang="ts">
    // import type { LayoutData } from './$types'
  import UserCheck  from "lucide-svelte/icons/user-check";
  import Home from "lucide-svelte/icons/house";
  import LineChart from "lucide-svelte/icons/line-chart";
  import Package from "lucide-svelte/icons/package";
  import Package2 from "lucide-svelte/icons/package-2";
  import PanelLeft from "lucide-svelte/icons/panel-left";
  import FolderKanban  from "lucide-svelte/icons/folder-kanban";
  import Search from "lucide-svelte/icons/search";
  import Settings from "lucide-svelte/icons/settings";
  import ShoppingCart from "lucide-svelte/icons/shopping-cart";
  import Tags  from "lucide-svelte/icons/tags";
  import Tag  from "lucide-svelte/icons/tag";
  import UsersRound from "lucide-svelte/icons/users-round";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
	import SquareArrowRight from 'lucide-svelte/icons/square-arrow-right'
	import { enhance } from "$app/forms";
	import { page } from "$app/stores";
    // export let data: LayoutData;
</script>
<div class="flex min-h-screen w-full flex-col bg-muted/40">
    <aside class="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav class="flex flex-col items-center gap-4 px-2 sm:py-5">
        <a
          href="/superuser/dash"
          class="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 class="h-4 w-4 transition-all group-hover:scale-110" />
          <span class="sr-only">Int Insights</span>
        </a>
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <a
              href="/superuser/dash"
              class="flex h-9 w-9 items-center justify-center rounded-lg {$page.url.pathname === "/superuser/dash"? " bg-accent": ""} text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              use:builder.action
              {...builder}
            >
              <Home class="h-5 w-5" />
              <span class="sr-only">Dashboard</span>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">Dashboard</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <a
              href="/superuser/dash/management"
              class="flex h-9 w-9 items-center justify-center rounded-lg {$page.url.pathname === "/superuser/dash/management"? " bg-accent": ""} text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              use:builder.action
              {...builder}
            >
              <FolderKanban class="h-5 w-5" />
              <span class="sr-only">Survey Management</span>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">Survey Management</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <a
              href="/superuser/dash/clients"
              class="flex h-9 w-9 items-center justify-center rounded-lg {$page.url.pathname === "/superuser/dash/clients"? " bg-accent": ""} text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              use:builder.action
              {...builder}
            >
              <UserCheck class="h-5 w-5" />
              <span class="sr-only">Client Management</span>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">Client Management</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <a
              href="/superuser/dash/agents"
              class="flex h-9 w-9 items-center justify-center rounded-lg {$page.url.pathname === "/superuser/dash/agents"? " bg-accent": ""} text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              use:builder.action
              {...builder}
            >
              <UsersRound class="h-5 w-5" />
              <span class="sr-only">Agent Management</span>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">Agent Management</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <a
              href="/superuser/dash/issue"
              class="flex h-9 w-9 items-center justify-center rounded-lg {$page.url.pathname === "/superuser/dash/issue"? " bg-accent": ""} text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              use:builder.action
              {...builder}
            >
              <Tag class='size-5'/>
              <span class="sr-only">Create Ticket</span>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">Create Ticket</Tooltip.Content>
        </Tooltip.Root>
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <a
              href="/superuser/dash/issue/tickets"
              class="flex h-9 w-9 items-center justify-center rounded-lg {$page.url.pathname === "/superuser/dash/issue/tickets"? " bg-accent": ""} text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              use:builder.action
              {...builder}
            >
              <Tags class='size-5'/>
              <span class="sr-only">View Ticket</span>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">View Ticket</Tooltip.Content>
        </Tooltip.Root>
      </nav>
      <nav class="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <Tooltip.Root>
          <Tooltip.Trigger asChild let:builder>
            <a
              href="##"
              class="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
              use:builder.action
              {...builder}
            >
              <Settings class="h-5 w-5" />
              <span class="sr-only">Settings</span>
            </a>
          </Tooltip.Trigger>
          <Tooltip.Content side="right">Settings</Tooltip.Content>
        </Tooltip.Root>
      </nav>
    </aside>
    <div class="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <header
        class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
      >
        <Sheet.Root>
          <Sheet.Trigger asChild let:builder>
            <Button builders={[builder]} size="icon" variant="outline" class="sm:hidden">
              <PanelLeft class="h-5 w-5" />
              <span class="sr-only">Toggle Menu</span>
            </Button>
          </Sheet.Trigger>
          <Sheet.Content side="left" class="sm:max-w-xs">
            <nav class="grid gap-6 text-lg font-medium">
              <a
                href="##"
                class="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
              >
                <Package2 class="h-5 w-5 transition-all group-hover:scale-110" />
                <span class="sr-only">Int Insights</span>
              </a>
              <a
                href="/superuser/dash"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Home class="h-5 w-5" />
                Dashboard
              </a>
              <a
                href="/superuser/dash/management"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <FolderKanban class="h-5 w-5" />
                Survey Management
              </a>
              <a href="/superuser/dash/clients" class="flex items-center gap-4 px-2.5 text-muted-foreground">
                <UserCheck class="h-5 w-5" />
                Client Management
              </a>
              <a
                href="/superuser/dash/agents"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <UsersRound class="h-5 w-5" />
                Agent Management
              </a>
              <a
                href="/superuser/dash/issue"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Tags class="h-5 w-5" />
                Create Ticket
              </a>
              <a
                href="/superuser/dash/issue/tickets"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <Tags class="h-5 w-5" />
                View Ticket
              </a>
              <a
                href="##"
                class="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
              >
                <LineChart class="h-5 w-5" />
                Settings
              </a>
            </nav>
          </Sheet.Content>
        </Sheet.Root>
        <Breadcrumb.Root class="hidden md:flex">
          <Breadcrumb.List>
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/superuser/dash/issue/tickets">Support Tickets</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Link href="/superuser/dash/management">Survey Management</Breadcrumb.Link>
            </Breadcrumb.Item>
            <Breadcrumb.Separator />
            <Breadcrumb.Item>
              <Breadcrumb.Page>Dashboard</Breadcrumb.Page>
            </Breadcrumb.Item>
          </Breadcrumb.List>
        </Breadcrumb.Root>
        <div class="relative ml-auto flex-1 md:grow-0">
          <Search class="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            class="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button
              builders={[builder]}
              variant="outline"
              size="icon"
              class="overflow-hidden rounded-full"
            >
              <img
                src="https://www.shadcn-svelte.com/images/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                class="overflow-hidden rounded-full"
              />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Label>My Account</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Item>Settings</DropdownMenu.Item>
            <DropdownMenu.Item>Support</DropdownMenu.Item>
            <DropdownMenu.Separator />
            <form action="/superuser/logout/" method="post" use:enhance>
              <Button variant="link" type="submit">Logout <SquareArrowRight class=" ml-1 w-4 h-4"/></Button>
            </form>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </header>
      <slot/>
    </div>
</div>
