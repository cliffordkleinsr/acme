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
    
    const df = new DateFormatter("en-US", {
     dateStyle: "medium"
    });
    
    export let from = ""
    let today = from.length > 0 ? new Date(from) : new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()

    export let to =""
    let tommorow = to.length > 0 ? new Date(to) : new Date()
    let tdd = tommorow.getDate()
    let tmm = tommorow.getMonth() + 1
    let tyyyy = tommorow.getFullYear()

    let value: DateRange | undefined = {
     start: new CalendarDate(yyyy, mm, dd),
     end: to.length > 0 ? new CalendarDate(tyyyy, tmm, tdd) : new CalendarDate(tyyyy, tmm, tdd).add({ days: 7 })
    };
    
    let startValue: DateValue | undefined = undefined;
   </script>
    
<div class="grid gap-2 max-w-md">
    <Popover.Root openFocus>
        <Popover.Trigger asChild let:builder>
            <Button variant="outline" class={cn( "w-[300px] justify-start text-left font-normal" , !value
                && "text-muted-foreground" )} builders={[builder]}>
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
        <Popover.Content class="w-auto p-0" align="start">
        <RangeCalendar
            bind:value
            bind:startValue
            initialFocus
            numberOfMonths={1}
            placeholder={value?.start}
        />
        </Popover.Content>
</Popover.Root>
</div>