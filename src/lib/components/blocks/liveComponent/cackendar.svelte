<script lang="ts">
    import CalendarIcon from "lucide-svelte/icons/calendar";
    import type { DateRange } from "bits-ui";
    import {
      CalendarDate,
      DateFormatter,
      type DateValue,
      getLocalTimeZone
    } from "@internationalized/date";
    import { cn } from "$lib/utils.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import Flame from "lucide-svelte/icons/flame";
	  import { enhance } from "$app/forms";
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
	  import Input from "../../ui/input/input.svelte";
    import * as Select from "$lib/components/ui/select"


    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()


    export let user
    export let gen_act: boolean
    export let age_act: boolean
    export let target:number=10
    export let value: DateRange | undefined = {
      start: new CalendarDate(yyyy, mm, dd),
      end: new CalendarDate(yyyy, mm, dd).add({ days: 10 })
    }

    const df = new DateFormatter("en-US", {
      dateStyle: "medium"
    });

    let selected_agents = {label:'Select Agents' , value:10}

    let age_group = [
      {label: "20 - 30", value: '20-30'},
      {label: "30 - 50", value: '30-50'},
      {label: "50 - 70", value: '50-70'},

    ]
    let target_age_group:string='20-30'
    let selected_age_group = {label:'Select Age Group' , value:'20-30'}

    let gender = [
      {label: "male", value: 'male'},
      {label: "female", value: 'female'},
      {label: "Any", value: 'any'},
      {label: "Attack Helicopter", value: 'helicopter'},
    ]
    let target_gender:string='male'
    let selected_gender = {label:'Select Prefered Gender Demographic', value:'male'}
    let startValue: DateValue | undefined = undefined;

    export let default_txt = 'Go Live'
  </script>

  <div class=" grid lg:grid-cols-3 gap-3 space-x-2">
  <div class="grid gap-2">
    <Popover.Root openFocus>
      <Popover.Trigger asChild let:builder>
        <Button
          variant="outline"
          class={cn(
            "w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
          builders={[builder]}
        >
          <CalendarIcon class="mr-2 h-4 w-4" />
          {#if value && value.start}
            {#if value.end}
              {df.format(value.start.toDate(getLocalTimeZone()))} - {df.format(
                value.end.toDate(getLocalTimeZone())
              )}
            {:else}
              {df.format(value.start.toDate(getLocalTimeZone()))}
            {/if}
          {:else if startValue}
            {df.format(startValue.toDate(getLocalTimeZone()))}
          {:else}
            Pick a date
          {/if}
        </Button>
      </Popover.Trigger>
      <Popover.Content class="w-auto p-0" align="start" side="bottom">
        <RangeCalendar
          bind:value
          bind:startValue
          initialFocus
          numberOfMonths={1}
          maxValue={startValue?.add({weeks: 3})}
          placeholder={value?.start}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
  {#if user === 'ADMIN'}
  <Select.Root
  selected={selected_agents}
  onSelectedChange={(v) => {
    v && (target = v.value);
  }}
>
    <Select.Trigger>
      <Select.Value placeholder="Select Target Agents" />
    </Select.Trigger>
    <Select.Content>
      <Select.Item value=10>10 Agents</Select.Item>
      <Select.Item value=20>20 Agents</Select.Item>
      <Select.Item value=30>30 Agents</Select.Item>
    </Select.Content>
  </Select.Root>
  {/if}
  {#if age_act}
    <Select.Root
      selected={selected_age_group}
      onSelectedChange={(v) => {
        v && (target_age_group = v.value);
      }}
    >
        <Select.Trigger>
          <Select.Value placeholder="Select Target Agents" />
        </Select.Trigger>
        <Select.Content>
          {#each age_group as grp}
          <Select.Item value={grp.value}>{grp.label}</Select.Item>
          {/each}
        </Select.Content>
      </Select.Root> 
  {/if}
  {#if gen_act}
    <Select.Root
      selected={selected_gender}
      onSelectedChange={(v) => {
        v && (target_gender = v.value);
      }}
    >
        <Select.Trigger>
          <Select.Value placeholder="Select Target Agents" />
        </Select.Trigger>
        <Select.Content>
          {#each gender as grp}
          <Select.Item value={grp.value}>{grp.label}</Select.Item>
          {/each}
        </Select.Content>
    </Select.Root>
  {/if}
  {#if user === 'ADMIN'}
    <div class=""></div>
  {/if}
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild let:builder>
      <Button builders={[builder]}><Flame class="size-4"/>{default_txt}</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently mark your survey as live
          and cannot be further edited.
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        <form action="?/goLive" method="post" use:enhance>
          <Input value={value?.start} name="from" class="hidden"/>
          <Input value={value?.end} name="to" class="hidden"/>
          <Input value={target} name="target" class="hidden"/>
          <Input value={target_age_group} name="target_age_group" class="hidden"/>
          <Input value={target_gender} name="target_gender" class="hidden"/>
          <Button type="submit">Proceed</Button>
        </form>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
  </div>