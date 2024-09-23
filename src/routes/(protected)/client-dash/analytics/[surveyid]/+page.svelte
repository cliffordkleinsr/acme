<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    import * as Table from "$lib/components/ui/table"
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js"
    import { Progress } from "$lib/components/ui/progress"
    import Chart from "$lib/components/blocks/apexchart/chart.svelte"
    import PieChart from "lucide-svelte/icons/pie-chart"
    import { Button, buttonVariants } from "$lib/components/ui/button"
    import * as Dialog from "$lib/components/ui/dialog"
    import * as Drawer from "$lib/components/ui/drawer"
	  import { browser } from '$app/environment';
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
    import { page } from '$app/stores'
	  import Lmap from '$lib/components/Leaflet/Lmap.svelte';
    import { cntys, items } from '$lib/helperFunctions/helpers';
    import ListFilter from 'lucide-svelte/icons/list-filter'
    import * as Sheet from "$lib/components/ui/sheet"
    import { Checkbox } from "$lib/components/ui/checkbox"
    import { Label } from "$lib/components/ui/label"
    import { Badge } from "$lib/components/ui/badge"
    import X from 'lucide-svelte/icons/x'
	  import { cn } from '$lib/utils';
	  import Picker from '$lib/components/blocks/daterange/Picker.svelte';
    import { Skeleton } from "$lib/components/ui/skeleton"
    
    export let data: PageData;
    let isDesktop = true
    const { 
      answers,
      male_answers,
      female_answers,
      cnt_counties,
      cnt_gender,
      male_gender,
      female_gender,
      cnt_sect,
      male_sector,
      female_sector,
      total,
      male_tot,
      female_tot,
      completed,
      male_comp,
      female_comp,
    } = data

    type Amaria = {
      question_id: string;
      question_type: string;
      question: string;
      answer: string;
      count: number;
      percentage: number;
    }
    
    type Kamolian = {
        [key: string]: {
          id:string,
          question:string,
          questionT:string,
          results: [{answer:string, percentage:number, count: number}]
        }
    }
    type Question = {
      id: string;
        question: string;
        questionT: string;
        results: [{
            answer: string;
            percentage: number;
            count: number;
        }]
    }
    

    
    function createMap(Answers:Amaria[]) {
      let questionMap:Kamolian ={}
      let ans = []
      for (const {question, answer, question_id, question_type, percentage, count} of Answers) {
        if (questionMap[question!]) {
            // Question already exists, add the answer to the existing array
            questionMap[question!].results.push({answer, percentage, count });
        } else {
        // Question doesn't exist, create a new entry in the questionMap
          ans.push(answer)
            questionMap[question!] = {
                id:question_id!,
                question:question!,
                questionT: question_type!,
                results: [{answer, percentage, count}],
            };
        }
      }
      return questionMap
    }
    
    function createChartOptions(question: Question) {
      const labels = question.results.map((res) => res.answer);
      const series = question.results.map((res) => Math.round(res.percentage));

      return {
        series,
        chart: {
          width: 380,
          type: 'donut',
        },
        labels,
        responsive: [{
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }]
      };
  }

  let questionMap = createMap(answers)
  let maleMap = createMap(male_answers)
  let femMap = createMap(female_answers)
  const groupedAnswers = Object.values(questionMap)
  const groupedMAnswers = Object.values(maleMap)
  const groupedFAnswers = Object.values(femMap)
  // gen demos
  const gen_lbl = cnt_gender.map(item => item.gen_dem)
  const gen_cnt = cnt_gender.map(item => item.agents)
  const mal_lbl = male_gender.map(item => item.gen_dem)
  const mal_cnt = male_gender.map(item => item.agents)
  const femal_lbl = female_gender.map(item => item.gen_dem)
  const femal_cnt = female_gender.map(item => item.agents)
  // sec demos
  const sec_lbl = cnt_sect.map(item => item.sec_dem)
  const sec_cnt = cnt_sect.map(item => item.agents)
  const mal_sec_lbl = male_sector.map(item => item.sec_dem)
  const mal_sec_cnt = male_sector.map(item => item.agents)
  const fem_sec_lbl = female_sector.map(item => item.sec_dem)
  const fem_sec_cnt = female_sector.map(item => item.agents)

  const polarArea = (series:number[], label:string[]) => {
    let options = {
          series: series,//gen_cnt,
          chart: {
            width: 380,
            type: 'polarArea'
          },
        labels: label,//gen_lbl,
        fill: {
          opacity: 1
        },
        stroke: {
          width: 1,
          colors: undefined
        },
        yaxis: {
          show: false
        },
        legend: {
          position: 'bottom'
        },
        plotOptions: {
          polarArea: {
            rings: {
              strokeWidth: 0
            },
            spokes: {
              strokeWidth: 0
            },
          }
        },
        theme: {
          monochrome: {
            enabled: true,
            shadeTo: 'light',
            shadeIntensity: 0.6
          }
        }
      }
    return options
  }

  const barArea = (series: number[], label: string[]) => {
    let baroptions = {
      series: [{
        data: series//sec_cnt
      }],
      chart: {
        type: 'bar',
        height: 150
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          horizontal: true,
          dataLabels: {
            position: 'top'
          }
        }
      },
      xaxis: {
        categories: label//sec_lbl,
      }
    };
    return baroptions
  }
    let counties = new Map()
    for (const {loc_dem, agents} of cnt_counties) {
        counties.set(loc_dem, agents)
    }
    counties.forEach((value, key) => {
        if (cntys.has(key)) {
          cntys.set(key, value);
        }
    })
    let male = true
    let female = true

    // let female_fltr = true
    // let male_fltr = true
</script>
{#if answers.length > 0}
<div class="flex gap-1 m-1">
  <!-- <Button class='flex gap-1' variant="secondary" size='default'><ListFilter class="size-4" /> Filters</Button> -->
  <Sheet.Root>
    <Sheet.Trigger class={cn(buttonVariants({ variant: 'secondary', size:'default'}), 'flex gap-1')}><ListFilter class="size-4" /> Filters</Sheet.Trigger>
    <Sheet.Content>
      <Sheet.Header>
        <Sheet.Title>Filters</Sheet.Title>
        <Sheet.Description>
          <div class="grid gap-5">
            <div class="grid gap-2">
              <h1 class="text-md font-semibold text-balance"> Gender</h1>
              <div class="flex items-center space-x-2">
                <Checkbox bind:checked={male}/>
                <Label for="male">Male</Label>
              </div>
              <div class="flex items-center space-x-2">
                <Checkbox bind:checked={female}/>
                <Label for="female">Female</Label>
              </div>
            </div>
            <div class="grid gap-2">
              <h1 class="text-md font-semibold text-balance"> Timeframe</h1>
              <Picker />
            </div>
          </div>
        </Sheet.Description>
      </Sheet.Header>
    </Sheet.Content>
  </Sheet.Root>
  {#if male && female}
    <p></p>
  {:else if male || female}
    <Badge variant="secondary" class='text-muted-foreground'><X class='size-4'/> {male?'Male':'female'}</Badge>
  {/if}
  
</div>
<div class="grid gap-2 w-full m-1" id="my-div">
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-2">
    <Card.Root>
      <Card.Header>
        <Card.Title class='text-2xl'>Completes By Gender</Card.Title>
      </Card.Header>
      <Card.Content>
        {#if male && female}
          <Chart options={polarArea(gen_cnt, gen_lbl)} />
        {:else if female}
          <Chart options={polarArea(femal_cnt, femal_lbl)} />
        {:else if male}
          <Chart options={polarArea(mal_cnt, mal_lbl)} />
        {/if}
      </Card.Content>
    </Card.Root>
      <Lmap options={Object.fromEntries(counties)}/>
    <Card.Root class='col-span-2'>
      <Card.Header>
        <Card.Title class='text-5xl text-end'>Summary Statistics</Card.Title>
        <Card.Description class='text-end'>Survey Id: {$page.params.surveyid}</Card.Description>
      </Card.Header>
      <Card.Content class='grid grid-cols-2 gap-2'>
        <div class="grid gap-2">
          <p class="text-sm">Total agents selected for this survey</p>
          {#if male && female}
            <p class="text-3xl font-semibold">{total}</p>
          {:else if female}
            <p class="text-3xl font-semibold">{female_tot}</p>
          {:else if male}
            <p class="text-3xl font-semibold">{male_tot}</p>
          {/if}
        </div>
        <div class="grid gap-2">
          <p class="text-sm">Total agents who completed this survey</p>
          {#if male && female}
            <p class="text-3xl font-semibold">{completed}</p>
          {:else if female}
            <p class="text-3xl font-semibold">{female_comp}</p>
          {:else if male}
            <p class="text-3xl font-semibold">{male_comp}</p>
          {/if}
        </div>
        <div class="grid gap-2 col-span-2">
          {#if male && female}
            <Chart options={barArea(sec_cnt, sec_lbl)} />
          {:else if female}
            <Chart options={barArea(fem_sec_cnt, fem_sec_lbl)} />
          {:else if male}
            <Chart options={barArea(mal_sec_cnt, mal_sec_lbl)} />
          {/if}
          <h1 class="mx-auto text-sm">Completes by sector</h1>
        </div>
      </Card.Content>
    </Card.Root>
</div>
{#if male && female}
  {#if isDesktop}
      <div class="grid gap-4 w-full">
      {#each groupedAnswers as question}
      <Card.Root>
        <Card.Header>
          <Card.Title>{question.question}</Card.Title>
          <Card.Description class="text-xs">{question.questionT}</Card.Description>
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head class="w-[70px]">#</Table.Head>
                <Table.Head class="lg:w-[800px]">Answers</Table.Head>
                <Table.Head></Table.Head>
                <Table.Head class="text-right">Percentage</Table.Head>
                <Table.Head class="text-right">Count</Table.Head> 
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each question.results as res, ix}
              <Table.Row class="space-y-2">
                <Table.Cell class="font-normal">A{ix+1}</Table.Cell>
                <Table.Cell class=" font-normal line-clamp-3">{res.answer}</Table.Cell>
                <Table.Cell class="font-normal">
                  <Progress value={res.percentage} class="lg:w-[80%] w-full h-2"/>
                </Table.Cell>
                <Table.Cell class="font-normal text-right">{Math.round(res.percentage)}%</Table.Cell>
                <Table.Cell class="font-normal text-right ">{res.count}</Table.Cell>
              </Table.Row> 
              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
        <Card.Footer>
          {#if question.questionT === "Optional"}
            <Dialog.Root>
              <Dialog.Trigger asChild let:builder>
                <Button variant="ghost" size="icon" builders={[builder]}><PieChart class="size-4 text-muted-foreground"/></Button>
              </Dialog.Trigger>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Description>
                    <Chart options={createChartOptions(question)} class="max-w-sm"/>
                  </Dialog.Description>
                </Dialog.Header>
              </Dialog.Content>
            </Dialog.Root>
          {/if}
        </Card.Footer>
      </Card.Root>    
      {/each}
      </div>
  {:else}
    <div class="grid gap-4">
    {#each groupedAnswers as question}
    <Card.Root>
      <Card.Header class="space-y-4">
        <Card.Title>{question.question}</Card.Title>
        <Card.Description class="text-xs">{question.id}</Card.Description>
      </Card.Header>
      <Card.Content>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="">#</Table.Head>
              <Table.Head class="">Answers</Table.Head>
              <Table.Head></Table.Head>
              <Table.Head class="text-right">Percentage</Table.Head>
              <Table.Head class="text-right">Count</Table.Head> 
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each question.results as res, ix}
            <Table.Row class="space-y-2 lg:mx-px mx-auto">
              <Table.Cell class="font-normal">A{ix+1}</Table.Cell>
              <Table.Cell class=" font-normal line-clamp-3">{res.answer}</Table.Cell>
              <Table.Cell class="font-normal">
                <Progress value={res.percentage} class="lg:w-[80%] w-5 h-2"/>
              </Table.Cell>
              <Table.Cell class="font-normal text-right">{Math.round(res.percentage)}%</Table.Cell>
              <Table.Cell class="font-normal text-right ">{res.count}</Table.Cell>
            </Table.Row> 
            {/each}
          </Table.Body>
        </Table.Root>
      </Card.Content>
      <Card.Footer>
        {#if question.questionT === "Optional"}
          <Drawer.Root>
            <Drawer.Trigger asChild let:builder>
              <Button variant="ghost" size="icon" builders={[builder]}><PieChart class="size-4 text-muted-foreground"/></Button>
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header>
                <Drawer.Title></Drawer.Title>
                <Drawer.Description>
                  <Chart options={createChartOptions(question)}/>
                </Drawer.Description>
              </Drawer.Header>
            </Drawer.Content> 
          </Drawer.Root>
        {/if}
      </Card.Footer>
    </Card.Root>    
    {/each}
    </div>
  {/if}
{:else if male}
  {#if isDesktop}
    <div class="grid gap-4 w-full">
    {#each groupedMAnswers as question}
    <Card.Root>
      <Card.Header>
        <Card.Title>{question.question}</Card.Title>
        <Card.Description class="text-xs">{question.questionT}</Card.Description>
      </Card.Header>
      <Card.Content>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[70px]">#</Table.Head>
              <Table.Head class="lg:w-[800px]">Answers</Table.Head>
              <Table.Head></Table.Head>
              <Table.Head class="text-right">Percentage</Table.Head>
              <Table.Head class="text-right">Count</Table.Head> 
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each question.results as res, ix}
            <Table.Row class="space-y-2">
              <Table.Cell class="font-normal">A{ix+1}</Table.Cell>
              <Table.Cell class=" font-normal line-clamp-3">{res.answer}</Table.Cell>
              <Table.Cell class="font-normal">
                <Progress value={res.percentage} class="lg:w-[80%] w-full h-2"/>
              </Table.Cell>
              <Table.Cell class="font-normal text-right">{Math.round(res.percentage)}%</Table.Cell>
              <Table.Cell class="font-normal text-right ">{res.count}</Table.Cell>
            </Table.Row> 
            {/each}
          </Table.Body>
        </Table.Root>
      </Card.Content>
      <Card.Footer>
        {#if question.questionT === "Optional"}
          <Dialog.Root>
            <Dialog.Trigger asChild let:builder>
              <Button variant="ghost" size="icon" builders={[builder]}><PieChart class="size-4 text-muted-foreground"/></Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Description>
                  <Chart options={createChartOptions(question)} class="max-w-sm"/>
                </Dialog.Description>
              </Dialog.Header>
            </Dialog.Content>
          </Dialog.Root>
        {/if}
      </Card.Footer>
    </Card.Root>    
    {/each}
    </div>
  {:else}
  <div class="grid gap-4">
  {#each groupedMAnswers as question}
  <Card.Root>
    <Card.Header class="space-y-4">
      <Card.Title>{question.question}</Card.Title>
      <Card.Description class="text-xs">{question.id}</Card.Description>
    </Card.Header>
    <Card.Content>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head class="">#</Table.Head>
            <Table.Head class="">Answers</Table.Head>
            <Table.Head></Table.Head>
            <Table.Head class="text-right">Percentage</Table.Head>
            <Table.Head class="text-right">Count</Table.Head> 
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each question.results as res, ix}
          <Table.Row class="space-y-2 lg:mx-px mx-auto">
            <Table.Cell class="font-normal">A{ix+1}</Table.Cell>
            <Table.Cell class=" font-normal line-clamp-3">{res.answer}</Table.Cell>
            <Table.Cell class="font-normal">
              <Progress value={res.percentage} class="lg:w-[80%] w-5 h-2"/>
            </Table.Cell>
            <Table.Cell class="font-normal text-right">{Math.round(res.percentage)}%</Table.Cell>
            <Table.Cell class="font-normal text-right ">{res.count}</Table.Cell>
          </Table.Row> 
          {/each}
        </Table.Body>
      </Table.Root>
    </Card.Content>
    <Card.Footer>
      {#if question.questionT === "Optional"}
        <Drawer.Root>
          <Drawer.Trigger asChild let:builder>
            <Button variant="ghost" size="icon" builders={[builder]}><PieChart class="size-4 text-muted-foreground"/></Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title></Drawer.Title>
              <Drawer.Description>
                <Chart options={createChartOptions(question)}/>
              </Drawer.Description>
            </Drawer.Header>
          </Drawer.Content> 
        </Drawer.Root>
      {/if}
    </Card.Footer>
  </Card.Root>    
  {/each}
  </div>
  {/if}
{:else if female}
  {#if isDesktop}
    <div class="grid gap-4 w-full">
    {#each groupedFAnswers as question}
    <Card.Root>
      <Card.Header>
        <Card.Title>{question.question}</Card.Title>
        <Card.Description class="text-xs">{question.questionT}</Card.Description>
      </Card.Header>
      <Card.Content>
        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.Head class="w-[70px]">#</Table.Head>
              <Table.Head class="lg:w-[800px]">Answers</Table.Head>
              <Table.Head></Table.Head>
              <Table.Head class="text-right">Percentage</Table.Head>
              <Table.Head class="text-right">Count</Table.Head> 
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {#each question.results as res, ix}
            <Table.Row class="space-y-2">
              <Table.Cell class="font-normal">A{ix+1}</Table.Cell>
              <Table.Cell class=" font-normal line-clamp-3">{res.answer}</Table.Cell>
              <Table.Cell class="font-normal">
                <Progress value={res.percentage} class="lg:w-[80%] w-full h-2"/>
              </Table.Cell>
              <Table.Cell class="font-normal text-right">{Math.round(res.percentage)}%</Table.Cell>
              <Table.Cell class="font-normal text-right ">{res.count}</Table.Cell>
            </Table.Row> 
            {/each}
          </Table.Body>
        </Table.Root>
      </Card.Content>
      <Card.Footer>
        {#if question.questionT === "Optional"}
          <Dialog.Root>
            <Dialog.Trigger asChild let:builder>
              <Button variant="ghost" size="icon" builders={[builder]}><PieChart class="size-4 text-muted-foreground"/></Button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Dialog.Header>
                <Dialog.Description>
                  <Chart options={createChartOptions(question)} class="max-w-sm"/>
                </Dialog.Description>
              </Dialog.Header>
            </Dialog.Content>
          </Dialog.Root>
        {/if}
      </Card.Footer>
    </Card.Root>    
    {/each}
    </div>
  {:else}
  <div class="grid gap-4">
  {#each groupedFAnswers as question}
  <Card.Root>
    <Card.Header class="space-y-4">
      <Card.Title>{question.question}</Card.Title>
      <Card.Description class="text-xs">{question.id}</Card.Description>
    </Card.Header>
    <Card.Content>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head class="">#</Table.Head>
            <Table.Head class="">Answers</Table.Head>
            <Table.Head></Table.Head>
            <Table.Head class="text-right">Percentage</Table.Head>
            <Table.Head class="text-right">Count</Table.Head> 
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each question.results as res, ix}
          <Table.Row class="space-y-2 lg:mx-px mx-auto">
            <Table.Cell class="font-normal">A{ix+1}</Table.Cell>
            <Table.Cell class=" font-normal line-clamp-3">{res.answer}</Table.Cell>
            <Table.Cell class="font-normal">
              <Progress value={res.percentage} class="lg:w-[80%] w-5 h-2"/>
            </Table.Cell>
            <Table.Cell class="font-normal text-right">{Math.round(res.percentage)}%</Table.Cell>
            <Table.Cell class="font-normal text-right ">{res.count}</Table.Cell>
          </Table.Row> 
          {/each}
        </Table.Body>
      </Table.Root>
    </Card.Content>
    <Card.Footer>
      {#if question.questionT === "Optional"}
        <Drawer.Root>
          <Drawer.Trigger asChild let:builder>
            <Button variant="ghost" size="icon" builders={[builder]}><PieChart class="size-4 text-muted-foreground"/></Button>
          </Drawer.Trigger>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title></Drawer.Title>
              <Drawer.Description>
                <Chart options={createChartOptions(question)}/>
              </Drawer.Description>
            </Drawer.Header>
          </Drawer.Content> 
        </Drawer.Root>
      {/if}
    </Card.Footer>
  </Card.Root>    
  {/each}
  </div>
  {/if}
{/if}
</div>
{:else}
<div class="m-5 w-full">
  <p class="italic text-sm">These statistics will grow as more people answer your surveys</p>
  <div class="flex flex-col gap-4 m-4">
    <Skeleton class="w-[200px] h-[20px] rounded-full" />
    <Skeleton class="w-[300px] h-[10px] rounded-full" />
  </div>
  <div class="md:flex gap-6 w-full space-x-4 ">
    <Skeleton class="size-40 rounded-full" />
    <div class="grid gap-1">
      <Skeleton class="w-[400px] h-[20px] rounded-full" />
      <Skeleton class="w-[400px] h-[20px] rounded-full" />
      <Skeleton class="w-[400px] h-[20px] rounded-full" />
    </div>
  </div>
</div>
{/if}
<style>
  @media print {
   @page {
        size: auto;   /* auto is the initial value */
        margin: 0;  /* this affects the margin in the printer settings */
    }
  :global(body) {
    visibility: hidden;
  }
  #my-div {
    visibility: visible;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>