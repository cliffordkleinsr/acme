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
	  import Input from "../ui/input/input.svelte";
    
    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()
    const df = new DateFormatter("en-US", {
      dateStyle: "medium"
    });
    
    let value: DateRange | undefined = {
      start: new CalendarDate(yyyy, mm, dd),
      end: new CalendarDate(yyyy, mm, dd).add({ days: 10 })
    }
   
    let startValue: DateValue | undefined = undefined;
  </script>
  <div class="flex flex-col lg:flex-row gap-3">
  <div class="grid gap-2">
    <Popover.Root openFocus>
      <Popover.Trigger asChild let:builder>
        <Button
          variant="outline"
          class={cn(
            "w-[300px] justify-start text-left font-normal",
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
          numberOfMonths={2}
          placeholder={value?.start}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
  <AlertDialog.Root>
    <AlertDialog.Trigger asChild let:builder>
      <Button builders={[builder]}><Flame class="size-4"/> Go Live</Button>
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
          <Button type="submit">Proceed</Button>
        </form>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
  </div>