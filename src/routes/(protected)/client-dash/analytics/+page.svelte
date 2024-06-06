<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    import * as Table from "$lib/components/ui/table"
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js"
    import { Progress } from "$lib/components/ui/progress"
    import Chart from "$lib/components/blocks/chart.svelte"
    import PieChart from "lucide-svelte/icons/pie-chart"
    import { Button } from "$lib/components/ui/button"
    import * as Dialog from "$lib/components/ui/dialog"
    import * as Drawer from "$lib/components/ui/drawer"
	  import { browser } from '$app/environment';
    import * as AlertDialog from "$lib/components/ui/alert-dialog"

    export let data: PageData;
    let isDesktop = true
    const { answers} = data
    if (browser) {
      isDesktop = window.innerWidth >= 768
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
                id:question_id,
                question:question!,
                questionT: question_type,
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

</script>
{#if isDesktop}
  <!-- <ScrollArea class=" h-[850px] w-full "> -->
  <div class="grid gap-4 m-2 w-full">
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
  <!-- </ScrollArea>   -->
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