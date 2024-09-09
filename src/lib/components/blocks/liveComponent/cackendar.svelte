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
    import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
    import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";
    import * as Popover from "$lib/components/ui/popover/index.js";
    import Flame from "lucide-svelte/icons/flame";
	  import { enhance } from "$app/forms";
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
	  import Input from "../../ui/input/input.svelte";
    import * as Select from "$lib/components/ui/select"
    import * as Collapsible from "$lib/components/ui/collapsible"
    import Clipboard from 'lucide-svelte/icons/clipboard'
    import Share2 from 'lucide-svelte/icons/share-2'
    import { goto, invalidateAll } from '$app/navigation'
	  import { toast } from "svelte-sonner";
    import { Switch } from "$lib/components/ui/switch";

    let today = new Date()
    let dd = today.getDate()
    let mm = today.getMonth() + 1
    let yyyy = today.getFullYear()


    export let user
    export let form
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
      {label: "All", value:'0-100'}
    ]
    let target_age_group:string='0-100'
    let selected_age_group = {label:'Select Age' , value:'0-100'}

    let gender = [
      {label: "Both", value: 'any'},
      {label: "Male", value: 'male'},
      {label: "Female", value: 'female'},
      {label: "Attack Helicopter", value: 'helicopter'},
    ]
    let target_gender:string='any'
    let selected_gender = {label:'Select Gender', value:'any'}
    let startValue: DateValue | undefined = undefined;

    export let default_txt = 'Go Live'
    let dialog = false
    let loading = false
    let sh_loading= false
    let checked = false
  </script>

<div class="flex gap-2">
  <Switch id="share" bind:checked={checked} />
  <p class="text-sm"> Share to your demographics</p>
</div>
<div class="grid gap-3 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
  <div class="grid gap-2">
    <Popover.Root openFocus>
      <Popover.Trigger asChild let:builder>
          <Button
            variant="outline"
            class={cn(
              "w-full max-w-[280px] justify-start text-left font-normal",
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
    {#if form?.error.from}
      <p class="text-destructive">{form?.error.from}</p>
    {/if}
  </div>
  {#if !checked}
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
      <div class="hidden lg:block"></div>
    {/if}
  {/if}
  <AlertDialog.Root bind:open={dialog}>
    <AlertDialog.Trigger asChild let:builder>
      <Button builders={[builder]} class="w-full" ><Flame class="size-4 mr-2"/>{default_txt}</Button>
    </AlertDialog.Trigger>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
        <AlertDialog.Description>
          This action cannot be undone. This will permanently mark your survey as live
          and cannot be further edited. {checked? '': 'Kindly confirm you have added the correct daterange, gender and age for your survey before proceeding.'}
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
        {#if checked}
          <form action="?/shareLive" method="post" use:enhance = {
            () => {
              sh_loading = true
              return async({ result, update}) => {
                if (result.type === 'redirect') {
                  dialog = false
                  await invalidateAll()
                  goto(result.location)
                  sh_loading =false
                  toast.success('Marked as live')
                }
                else {
                  sh_loading=false
                  await update()
                }
              }
            }
          }>
            <Input value={value?.start} name="from" class="hidden"/>
            <Input value={value?.end} name="to" class="hidden"/>
            <Button variant="secondary" type='submit' disabled={sh_loading}>
              {#if sh_loading}
                <div class="flex gap-2">
                    <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent rounded-full" role="status" aria-label="loading"></span>
                    Loading...
                </div>
              {:else}
                Share the survey
              {/if}
            </Button>
          </form>
        {:else}
          <form action="?/goLive" method="post" use:enhance={
            () => {
              loading = true
              return async({result, update}) => {
                switch (true) {
                  case result.type === 'failure':
                    loading = false
                    await update()
                    break;
                  case result.type === 'success':
                    loading = true
                    await update()
                    break;
                    case result.type === 'redirect':
                      loading = true
                      await update()
                      break;
                  default:
                    break;
                }
              }
            }
          }>
            <Input value={value?.start} name="from" class="hidden"/>
            <Input value={value?.end} name="to" class="hidden"/>
            <Input value={target} name="target" class="hidden"/>
            <Input value={target_age_group} name="target_age_group" class="hidden"/>
            <Input value={target_gender} name="target_gender" class="hidden"/>
            <Button type="submit"  disabled={loading}>
              {#if loading}
                <div class="flex gap-2">
                    <span class="animate-spin inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>
                    Loading...
                </div>
              {:else}
              Use Our Database
              {/if}
              </Button>
          </form>
        {/if}
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
  </div>