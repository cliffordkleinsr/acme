<script lang="ts">
    import type { PageData } from './$types';
    import * as Card from "$lib/components/ui/card"
    import * as Table from "$lib/components/ui/table"
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js"
    import { Progress } from "$lib/components/ui/progress"
    import Chart from "$lib/components/blocks/chart.svelte"
    import PieChart from "lucide-svelte/icons/pie-chart"
    import { Button } from "$lib/components/ui/button"
    

    export let data: PageData;
    const { answers} = data
    
    type Kamolian = {
        [key: string]: {
          question:string,
          questionT:string,
          results: [{answer:string, percentage:number, count: number}]
        }
    }

    const questionMap:Kamolian = {}
    let ans = []
    for (const {question, answer, question_type, percentage, count} of answers) {
        if (questionMap[question!]) {
            // Question already exists, add the answer to the existing array
            questionMap[question!].results.push({answer, percentage, count });
        } else {
        // Question doesn't exist, create a new entry in the questionMap
          ans.push(answer)
            questionMap[question!] = {
                question:question!,
                questionT: question_type,
                results: [{answer, percentage, count}],
            };
        }
    }
    let options = {
          series: [44, 55, 13, 43, 22],
          chart: {
          width: 380,
          type: 'pie',
        },
        labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
// const groupedAnswers: Question[] = Object.values(questionMap)
const groupedAnswers = Object.values(questionMap)
</script>
<ScrollArea class="h-screen w-full rounded-md border p-4">
<div class="grid gap-4">
{#each groupedAnswers as question}
<Card.Root>
  <Card.Header>
    <Card.Title>{question.question}</Card.Title>
    <Card.Description></Card.Description>
  </Card.Header>
  <Card.Content>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[500px]">Answers</Table.Head>
          <Table.Head></Table.Head>
          <Table.Head class="text-right">Percentage</Table.Head>
          <Table.Head class="text-right">Count</Table.Head>
          
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each question.results as res}
        <Table.Row class="space-y-2">
          <Table.Cell class="font-medium line-clamp-2">{res.answer}</Table.Cell>
          <Table.Cell class="font-medium">
            <Progress value={res.percentage} class="w-[60%] h-2"/>
          </Table.Cell>
          <Table.Cell class="font-medium text-right">{Math.round(res.percentage)}%</Table.Cell>
          <Table.Cell class="font-medium text-right ">{res.count}</Table.Cell>

        </Table.Row> 
        {/each}
      </Table.Body>
    </Table.Root>
  </Card.Content>
  <Card.Footer>
    <Button variant="ghost" size="icon"><PieChart class="size-4 text-muted-foreground"/></Button>
    <!-- <Chart /> -->
  </Card.Footer>
</Card.Root>    
{/each}
</div>
</ScrollArea>