<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    import * as Table from "$lib/components/ui/table"
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js"
    import { Progress } from "$lib/components/ui/progress"
    import Chart from "$lib/components/blocks/apexchart/chart.svelte"
    import PieChart from "lucide-svelte/icons/pie-chart"
    import { Button } from "$lib/components/ui/button"
    import * as Dialog from "$lib/components/ui/dialog"
    import * as Drawer from "$lib/components/ui/drawer"
	  import { browser } from '$app/environment';
    import * as AlertDialog from "$lib/components/ui/alert-dialog"
    import { page } from '$app/stores'
	  import Lmap from '$lib/components/Leaflet/Lmap.svelte';
    import { cntys, items } from '$lib/helperFunctions/helpers';
    import { jsPDF } from "jspdf"
	  import html2canvas from 'html2canvas'
    export let data: PageData;
    let isDesktop = true
    const { answers, cnt_counties, cnt_gender, cnt_sect, total, completed} = data
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
    const questionMap:Kamolian = {}

    let ans = []
    for (const {question, answer, question_id, question_type, percentage, count} of answers) {
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
  const groupedAnswers = Object.values(questionMap)
  const gen_lbl = cnt_gender.map(item => item.gen_dem)
  const gen_cnt = cnt_gender.map(item => item.agents)
  const sec_lbl = cnt_sect.map(item => item.sec_dem)
  const sec_cnt = cnt_sect.map(item => item.agents)

  let options = {
          series: gen_cnt,
          chart: {
          width: 380,
          type: 'polarArea'
        },
        labels: gen_lbl,
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
        };

        let baroptions = {
          series: [{
          data: sec_cnt
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
          categories: sec_lbl,
        }
        };
        let counties = new Map()
        for (const {loc_dem, agents} of cnt_counties) {
            counties.set(loc_dem, agents)
        }
        counties.forEach((value, key) => {
            if (cntys.has(key)) {
              cntys.set(key, value);
            }
        })
      
</script>
{#if answers.length > 0}
<div class="grid w-full m-2 gap-2" id="my-div">
  <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-2 'max-w-4xl">
    <Card.Root>
      <Card.Header>
        <Card.Title class='text-2xl'>Completes By Gender</Card.Title>
      </Card.Header>
      <Card.Content>
        <Chart {options} />
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
           <p class="text-3xl font-semibold">{total}</p>
        </div>
        <div class="grid gap-2">
          <p class="text-sm">Total agents who completed this survey</p>
          <p class="text-3xl font-semibold">{completed}</p>
        </div>
        <div class="grid gap-2 col-span-2">
          <Chart options={baroptions} />
          <h1 class="mx-auto text-sm">Completes by sector</h1>
        </div>
      </Card.Content>
    </Card.Root>
</div>
{#if isDesktop}
  <div class="grid gap-4 w-full">
  {#each groupedAnswers as question}
  <Card.Root>
    <Card.Header class="space-y-4">
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
</div>
{:else}
  <p class="m-5 italic text-sm">These statistics will grow as more people answer your surveys</p>
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