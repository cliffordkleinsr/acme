<script lang="ts">
  // Shadcn UI
  import * as Form from "$lib/components/ui/form/index.js"
  import { toggleMode } from "mode-watcher"
  import * as Card  from "$lib/components/ui/card"
  import { Badge } from "$lib/components/ui/badge"
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu"
  import { Input } from "$lib/components/ui/input"
  import * as Sheet from "$lib/components/ui/sheet"
  import { Button } from "$lib/components/ui/button"
  import * as Collapsible from "$lib/components/ui/collapsible"
  
  // Lucide Svelte
  import Menu from "lucide-svelte/icons/menu"
  import Package2 from "lucide-svelte/icons/package-2"
  import Search from "lucide-svelte/icons/search"
  import Home from "lucide-svelte/icons/house"
  import Table from 'lucide-svelte/icons/table'
  import ShoppingCart from 'lucide-svelte/icons/shopping-cart'
  import Users from "lucide-svelte/icons/users"
  import LineChart from "lucide-svelte/icons/line-chart"
  import Package from "lucide-svelte/icons/package"
  import CircleUser from "lucide-svelte/icons/circle-user"
  import CreditCard from 'lucide-svelte/icons/credit-card'
  import Bell from "lucide-svelte/icons/bell"
  import Sun from "lucide-svelte/icons/sun"
  import Moon from "lucide-svelte/icons/moon"
  import SquareArrowRight  from 'lucide-svelte/icons/square-arrow-right'
  import { Separator } from "$lib/components/ui/separator"
  

  import { page } from "$app/stores"
  import { enhance } from "$app/forms";
  import Power from 'lucide-svelte/icons/power'
	import Tag  from "lucide-svelte/icons/tag"
  import CandlestickChart from "lucide-svelte/icons/candlestick-chart"
  import HandCoins  from "lucide-svelte/icons/hand-coins"
  import Settings from "lucide-svelte/icons/settings"
  import SquarePen  from 'lucide-svelte/icons/square-pen'
  import FileClock  from 'lucide-svelte/icons/file-clock'
	import { fade } from "svelte/transition";
	import { sineIn, sineInOut, sineOut } from "svelte/easing";
  import * as Avatar from "$lib/components/ui/avatar"
  
  export let data
 
 let dialogOpen = false
</script>


<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
<div class="sticky top-0 h-svh overflow-y-auto hidden border-r bg-muted/40 md:block">
<div class="flex h-full max-h-screen flex-col gap-2">
  <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
    <a href="/client-dash" class="flex items-center gap-2 font-semibold">
      <!-- <Package2 class="h-6 w-6" /> -->
      <span class="">Welcome {data.AuthedUser}</span>
    </a>
    <Button variant="outline" size="icon" class="ml-auto h-8 w-8">
      <Bell class="size-4" />
      <span class="sr-only">Toggle notifications</span>
    </Button>
  </div>
  <div class="flex-1">
    <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
      <a
        href="/agent-dash"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground {$page.url.pathname === "/agent-dash"?'text-primary bg-muted':''} transition-all hover:text-primary"
      >
        <Home class="h-4 w-4" />
        Dashboard
      </a>
      <Collapsible.Root class="space-y-2">
        <Collapsible.Trigger class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
          <Table class="size-4" />
          Surveys
        </Collapsible.Trigger>
        <Collapsible.Content class="flex flex-col gap-3 ml-10">
          <Separator />
          <a
            href="/agent-dash/surveys/take" 
            class=" flex gap-1 text-muted-foreground transition-all hover:text-primary"
          >
          <SquarePen  class="size-4"/>
          Take survey
          </a>
          <Separator />
          <a
            href="/agent-dash/surveys/history"
            class="flex gap-1 text-muted-foreground transition-all hover:text-primary"
          >
          <FileClock  class="size-4"/>
          Survey History
          </a>
          <Separator />
        </Collapsible.Content>
      </Collapsible.Root>
      <a
        href="/agent-dash/statement"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground {$page.url.pathname === "/agent-dash/statement"?'text-primary bg-muted':''} transition-all hover:text-primary"
      >
      <HandCoins class="size-4"/>
        Account Statement
      </a>
    </nav>
  </div>
  <div class="mt-auto p-4">
    <Card.Root
      data-x-chunk-name="dashboard-02-chunk-0"
      data-x-chunk-description="A card with a call to action"
    >
      <Card.Header class="p-2 pt-0 md:p-4">
        <Card.Title>Account Statement</Card.Title>
        <Card.Description>
         Check your Account Balance.
        </Card.Description>
      </Card.Header>
      <Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" class="w-full" href="/agent-dash/statement">View Details</Button>
      </Card.Content>
    </Card.Root>
  </div>
</div>
</div>
<div class="flex flex-col">
<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
  <Sheet.Root bind:open={dialogOpen}>
    <Sheet.Trigger asChild let:builder>
      <Button
        variant="outline"
        size="icon"
        class="shrink-0 md:hidden"
        builders={[builder]}
      >
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle navigation menu</span>
      </Button>
    </Sheet.Trigger>
    <Sheet.Content side="left" class="flex flex-col">
      <nav class="grid gap-2 text-lg font-medium">
        <a href="##" class="flex items-center gap-2 text-lg font-semibold">
          <!-- <Package2 class="h-6 w-6" /> -->
          <span class="sr-only">Welcome {data.AuthedUser}</span>
        </a>
        <a
          href="/agent-dash"
          on:click={() => dialogOpen = !dialogOpen}
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Home class="h-5 w-5" />
          Dashboard
        </a>
        <Collapsible.Root class="space-y-2">
          <Collapsible.Trigger class="flex items-center gap-4 px-1 py-2 text-muted-foreground transition-all hover:text-primary">
            <Table class="size-5" />
            Surveys
          </Collapsible.Trigger>
          <Collapsible.Content class="flex flex-col gap-3 ml-10">
            <Separator />
            <a
              on:click={() => dialogOpen = !dialogOpen}
              href="/agent-dash/surveys/take"
              class=" flex gap-1 text-muted-foreground transition-all hover:text-primary"
            >
            <SquarePen class="size-5"/>
            Take survey
            </a>
            <Separator />
            <a
              on:click={() => dialogOpen = !dialogOpen}
              href="/agent-dash/surveys/history"
              class="flex gap-1 text-muted-foreground transition-all hover:text-primary"
            >
            <FileClock  class="size-5"/>
            Survey History
            </a>
            <Separator />
          </Collapsible.Content>
        </Collapsible.Root>
        <a
        on:click={() => dialogOpen = !dialogOpen}
          href="/agent-dash/statement"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <HandCoins class="size-5"/>
          Account Statement
        </a>
      </nav>
      <div class="mt-auto">
        <Card.Root
          data-x-chunk-name="dashboard-02-chunk-0"
          data-x-chunk-description="A card with a call to action"
        >
          <Card.Header class="p-2 pt-0 md:p-4">
            <Card.Title>Account Statement</Card.Title>
            <Card.Description>
            Check your Account Balance.
            </Card.Description>
          </Card.Header>
          <Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
            <Button size="sm" class="w-full" on:click={() => dialogOpen = !dialogOpen} href="/agent-dash/statement">View Details</Button>
          </Card.Content>
        </Card.Root>
      </div>
    </Sheet.Content>
  </Sheet.Root>
  <div class="w-full flex-1">
    <form>
      <div class="relative">
        <Search class="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Goto ..."
          class="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
        />
      </div>
    </form>
  </div>
  <Button on:click={toggleMode} variant="ghost" size="icon" class="float-end">
    <Sun
        class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
    />
    <Moon
        class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
    />
    <span class="sr-only">Toggle theme</span>
</Button>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        builders={[builder]}
        variant="secondary"
        size="icon"
        class="rounded-full"
      >
        {#if data.profile}
          <Avatar.Root>
            <Avatar.Image src="{data.profile}" alt="@shadcn" />
            <Avatar.Fallback>CN</Avatar.Fallback>
          </Avatar.Root>
        {:else}
          <CircleUser class="h-5 w-5" />
        {/if}
        
        <span class="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item 
        class="gap-3.5"
        href="/agent-dash/settings"
      > 
        <Settings class="size-4"/>
         Settings
      </DropdownMenu.Item>
      <DropdownMenu.Item 
        class="gap-3.5"
        href="/agent-dash/settings/payouts"
      >
        <CreditCard class="size-4" />
        Payout Requests
      </DropdownMenu.Item>
      <DropdownMenu.Item 
        class="gap-3.5"
        href="/agent-dash/settings/support"
      >
        <Tag class="size-4" />
        Support
      </DropdownMenu.Item>
      <DropdownMenu.Separator />
      <form action="/agent/signout" method="post" use:enhance>
        <Form.Button variant="link" size="sm" class="">Logout <SquareArrowRight class=" ml-1 w-4 h-4"/></Form.Button>
     </form>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</header>
{#key data.url}
  <div 
  in:fade={{delay:500, duration:300, easing:sineIn}}
  out:fade={{duration:300, easing:sineOut}}
  >
    <slot />
  </div>
{/key}
</div>
</div>
