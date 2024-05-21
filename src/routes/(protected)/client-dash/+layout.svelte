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
  import Search from "lucide-svelte/icons/search"
  import Home from "lucide-svelte/icons/home"
  import Table from 'lucide-svelte/icons/table'
  import Users from "lucide-svelte/icons/users"
  import LineChart from "lucide-svelte/icons/line-chart"
  import CircleUser from "lucide-svelte/icons/circle-user"
  import CreditCard from 'lucide-svelte/icons/credit-card'
  import Bell from "lucide-svelte/icons/bell"
  import Sun from "lucide-svelte/icons/sun"
  import Moon from "lucide-svelte/icons/moon"
  import RadioTower from 'lucide-svelte/icons/radio-tower';
  import SquareArrowRight  from 'lucide-svelte/icons/square-arrow-right'
  import { Separator } from "$lib/components/ui/separator"
  

  import { page } from "$app/stores"
  import { enhance } from "$app/forms";
	import Tag  from "lucide-svelte/icons/tag"
  import CandlestickChart from "lucide-svelte/icons/candlestick-chart"
  import Coins from "lucide-svelte/icons/coins"
  import Settings from "lucide-svelte/icons/settings"
  import AlignStartVertical from 'lucide-svelte/icons/align-start-vertical'
  import SlidersVertical from 'lucide-svelte/icons/sliders-vertical'
	import { fade } from "svelte/transition";
	import { sineIn, sineInOut, sineOut } from "svelte/easing";
  import * as Tooltip from "$lib/components/ui/tooltip"
  
  export let data

  const clearNotifs = () => { data.notif = []}
</script>


<div class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
<div class="hidden border-r bg-muted/40 md:block">
<div class="flex h-full max-h-screen flex-col gap-2">
  <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
    <a href="/client-dash" class="flex items-center gap-2 font-semibold">
      <!-- <Package2 class="h-6 w-6" /> -->
      <span class="">Welcome {data.AuthedUser}</span>
    </a>
    <div class="flex ml-auto relative">
      <Tooltip.Root>
        <Tooltip.Trigger asChild let:builder>
          <Button builders={[builder]} size="icon" variant="outline" class="size-8">
          <Bell class="size-4" />
          <span class="sr-only">Toggle notifications</span>
          </Button>
        </Tooltip.Trigger>
        <Tooltip.Content class="space-y-3 w-72">
          {#if data.notif.filter((notif) => notif != undefined).length}
            {#each data.notif.filter((notif) => notif != undefined) as notif, ix}
              <p class="pl-5 font-mono">{ix+1}. {notif}</p>
              <Separator/>
            {/each}
            <Button variant="secondary" on:click={clearNotifs}>Clear Notifications</Button>
          {:else}
          <p class="pl-5 font-mono">No New Messages</p>
          {/if}
        </Tooltip.Content>
      </Tooltip.Root>
      {#if data.notif.filter((notif) => notif != undefined).length}
        <Badge class="size-5 justify-center absolute left-5 bottom-4">{data.notif.filter((notif) => notif != undefined).length}</Badge>
      {/if}
      
    </div>
   
  </div>
  <div class="flex-1">
    <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
      <a
        href="/client-dash"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground {$page.url.pathname === "/client-dash"?'text-primary bg-muted':''} transition-all hover:text-primary"
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
            href="/client-dash/surveys/create"
            class=" flex gap-1 text-muted-foreground transition-all hover:text-primary"
          >
          <AlignStartVertical class="size-4"/>
          Generate surveys
          </a>
          <Separator />
          <a
            href="/client-dash/surveys/questionnaire"
            class="flex gap-1 text-muted-foreground transition-all hover:text-primary"
          >
          <SlidersVertical class="size-4"/>
          Manage surveys
          </a>
          <Separator />
          <a
              href="/client-dash/surveys/live"
              class="flex gap-1 text-muted-foreground transition-all hover:text-primary"
            >
            <RadioTower class="size-4"/>
            Go Live
            </a>
          <Separator />
        </Collapsible.Content>
      </Collapsible.Root>
      <a
        href="##"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
      <Coins class="size-4"/>
        Account Credits
      </a>
      <a
        href="##"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <Users class="size-4" />
        Audience
      </a>
      <a
        href="##"
        class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
      >
        <LineChart class="size-4" />
        Analytics
      </a>
    </nav>
  </div>
  <div class="mt-auto p-4">
    <Card.Root
      data-x-chunk-name="dashboard-02-chunk-0"
      data-x-chunk-description="A card with a call to action"
    >
      <Card.Header class="p-2 pt-0 md:p-4">
        <Card.Title>Upgrade to Pro</Card.Title>
        <Card.Description>
          Unlock all features and get unlimited access to our support team.
        </Card.Description>
      </Card.Header>
      <Card.Content class="p-2 pt-0 md:p-4 md:pt-0">
        <Button size="sm" class="w-full">Upgrade</Button>
      </Card.Content>
    </Card.Root>
  </div>
</div>
</div>
<div class="flex flex-col">
<header class="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
  <Sheet.Root>
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
          href="##"
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
              href="/client-dash/surveys/create"
              class=" flex gap-1 text-muted-foreground transition-all hover:text-primary"
            >
            <AlignStartVertical class="size-5"/>
            Generate surveys
            </a>
            <Separator />
            <a
              href="/client-dash/surveys/questionnaire"
              class="flex gap-1 text-muted-foreground transition-all hover:text-primary"
            >
            <SlidersVertical class="size-5"/>
            Manage surveys
            </a>
            <Separator />
            <a
              href="/client-dash/surveys/live"
              class="flex gap-1 text-muted-foreground transition-all hover:text-primary"
            >
            <RadioTower class="size-5"/>
            Go Live
            </a>
            <Separator />
          </Collapsible.Content>
        </Collapsible.Root>
        <a
          href="##"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Coins class="size-5"/>
          Account Credits
        </a>
        <a
          href="##"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <Users class="h-5 w-5" />
          Audience
        </a>
        <a
          href="##"
          class="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
          <LineChart class="h-5 w-5" />
          Analytics
        </a>
      </nav>
      <div class="mt-auto">
        <Card.Root>
          <Card.Header>
            <Card.Title>Upgrade to Pro</Card.Title>
            <Card.Description>
              Unlock all features and get unlimited access to our support
              team.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Button size="sm" class="w-full">Upgrade</Button>
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
          placeholder="Search products..."
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
        <CircleUser class="h-5 w-5" />
        <span class="sr-only">Toggle user menu</span>
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end">
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item class="gap-3.5"><Settings class="size-4"/>Settings</DropdownMenu.Item>
      <DropdownMenu.Item class="gap-3.5"> <CandlestickChart class="size-4"/> Pricing Plans</DropdownMenu.Item>
      <DropdownMenu.Item class="gap-3.5"><CreditCard class="size-4" />Billing & Payments</DropdownMenu.Item>
      <DropdownMenu.Item class="gap-3.5"><Tag class="size-4"/>Support</DropdownMenu.Item>
      <DropdownMenu.Separator />
      <form action="/client/signout" method="post" use:enhance>
        <Form.Button variant="link" size="sm" class="">Logout <SquareArrowRight class=" ml-1 w-4 h-4"/></Form.Button>
     </form>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</header>
{#key data.url}
  <div 
  in:fade={{delay:300, duration:300, easing:sineIn}}
  out:fade={{duration:300, easing:sineOut}}
  >
    <slot />
  </div>
{/key}
</div>
</div>
