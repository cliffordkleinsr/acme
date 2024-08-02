<script lang="ts">
  import * as Card from "$lib/components/ui/card"
  import { Button } from "$lib/components/ui/button"
  import Undo2 from 'lucide-svelte/icons/undo-2';
  import { Label } from "$lib/components/ui/label"
  import { Input } from "$lib/components/ui/input"
  import * as Form from "$lib/components/ui/form/index.js"
  import * as AlertDialog from "$lib/components/ui/alert-dialog"
  import { Checkbox } from "$lib/components/ui/checkbox"
  import Trash2 from 'lucide-svelte/icons/trash-2'  
  import QuestionComponent from '$lib/components/blocks/questionnareComponents/base/questionComponent.svelte';
  import * as RadioGroup from "$lib/components/ui/radio-group"
  import CheckCheck from 'lucide-svelte/icons/check-check'
  import Target from 'lucide-svelte/icons/target'
  import Webcam  from "lucide-svelte/icons/webcam";
  import StarComponent from '$lib/components/blocks/questionnareComponents/rating/StarComponent.svelte';
  import Star from 'lucide-svelte/icons/star'
  import SlidersHorizontal from 'lucide-svelte/icons/sliders-horizontal'
  import LikertComponent from '$lib/components/blocks/questionnareComponents/likertcomponent/LikertComponent.svelte';
  import Lightbulb from 'lucide-svelte/icons/lightbulb'
  import { onMount } from "svelte";
  import * as Tooltip from "$lib/components/ui/tooltip"
  import BarChart4 from 'lucide-svelte/icons/bar-chart-4'
</script>

<div class="flex items-center gap-4">
    <div class="bg-black rounded-md flex items-center justify-center aspect-square w-12">
      <Webcam class="size-6 text-primary-foreground" />
    </div>
    <div class="grid gap-1">
      <h4 class="font-semibold">Open-Ended</h4>
      <p class="text-muted-foreground text-sm">Allows for free-form responses from the user.</p>
    </div>
  </div>
  <div class="flex items-center gap-4">
    <div class="bg-secondary rounded-md flex items-center justify-center aspect-square w-12">
      <CheckCheck class="size-6 text-secondary-foreground" />
    </div>
    <div class="grid gap-1">
      <h4 class="font-semibold">Multiple Selection</h4>
      <p class="text-muted-foreground text-sm">Presents the user with a set of options to choose from.</p>
    </div>
  </div>
  <div class="flex items-center gap-4">
    <div class="bg-secondary rounded-md flex items-center justify-center aspect-square w-12">
      <Target class="size-6 text-secondary-foreground" />
    </div>
    <div class="grid gap-1">
      <h4 class="font-semibold">Single Selection</h4>
      <p class="text-muted-foreground text-sm">Presents the user with a set of options where respondents can choose only one option.</p>
    </div>
  </div>
  <div class="flex items-center gap-4">
    <div class="bg-secondary rounded-md flex items-center justify-center aspect-square w-12">
      <Star class="size-6 text-secondary-foreground" />
    </div>
    <div class="grid gap-1">
      <h4 class="font-semibold">Rating</h4>
      <p class="text-muted-foreground text-sm">A type of closed-ended question that asks respondents to evaluate something on a scale.</p>
    </div>
  </div>
  <div class="flex items-center gap-4">
    <div class="bg-secondary rounded-md flex items-center justify-center aspect-square w-12">
      <SlidersHorizontal class="size-6 text-secondary-foreground" />
    </div>
    <div class="grid gap-1">
      <h4 class="font-semibold">Likert</h4>
      <p class="text-muted-foreground text-sm">Presents the user with a psychometric scale used to measure attitudes, opinions, or beliefs.</p>
    </div>
  </div>
  <div class="flex items-center gap-4">
    <div class="bg-secondary rounded-md flex items-center justify-center aspect-square w-12">
      <BarChart4 class="size-6 text-secondary-foreground" />
    </div>
    <div class="grid gap-1">
      <h4 class="font-semibold">Ranking</h4>
      <p class="text-muted-foreground text-sm">Presents the user with a list of items where respondents can compare and order these items based on a specific criterion.</p>
    </div>
  </div>