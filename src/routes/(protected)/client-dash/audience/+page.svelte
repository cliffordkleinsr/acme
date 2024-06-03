<script lang="ts">
	  import { onMount } from 'svelte';
    import type {PageData} from './$types';
	  import { items } from '$lib/helperFunctions/helpers';
	  import Chart from '$lib/components/blocks/chart.svelte';
    export let data: PageData;
    const { by_sec, by_cty, by_age } = data
    let loaded = false
    function calculateAge(birthday:Date) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    }
    // pie chart
    const loc_lbl =  by_cty.map(item=> item.variable)
    const loc_cnt = by_cty.map(item=> item.agent_cnt)
    // area chart
    const sect_lbl = by_sec.map(item => item.variable)
    const sect_cnt = by_sec.map(item => item.agent_cnt)
    // radial chart
    const age_cnt = by_age.map(item => item.agent_cnt)
    const age_lbl = by_age.map(item => calculateAge(new Date(item.variable)))


    let pie_options = {
        series: loc_cnt ,
        chart: {
            width: 380,
            type: 'pie',
        },
        labels: loc_lbl,
        title: {
          text: "By County"
        },
        fill: {
          type: 'gradient',
        },
        theme: {
            palette: 'palette6' // upto palette10
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200,
                    
                },
                legend: {
                    position: 'bottom'
                }
            }
        }]
    }

    let area_options = {
          series: [{
          data: sect_cnt
        }],
          chart: {
          type: 'bar',
          height: 200,
          
        },
        theme: {
            palette: 'palette1' // upto palette10
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            borderRadiusApplication: 'end',
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        title: {
            text: "By sector"
        },
        xaxis: {
          categories: sect_lbl
        }
    }

    var radial = {
          series: age_cnt,
          chart: {
          type: 'donut',
        },
        labels: age_lbl,
        title: {
          text: "By Age"
        },
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
  //   let chart: ApexCharts
  //   const rendition = (el:HTMLDivElement, opts:any) => {
  //       onMount(async()=> {
  //           const module = await import('apexcharts')
  //           const ApexCharts = module.default
  //           chart = new ApexCharts(el, opts)
  //           chart.render()
  //       })
  //   }
  //   $: {
  //   // Whenever `opts` changes, update the chart options
  //   if (chart) {
  //     chart.updateOptions(opts);
  //   }
  // }
</script>
<div class="flex flex-col gap-4 m-5">
    <h1 class="text-2xl font-bold ">
        Audience Demographics
    </h1>
    <p class="italic text-sm">These statistics will continue to grow as more people respond to you're surveys</p>
    <div class="md:flex gap-6 w-full space-x-4">
      <Chart class="md:shadow-md" options={pie_options} />
      <Chart class="md:w-[62rem] w-80 space-y-2 pr-10" options={area_options} />
    </div>
    <Chart class="md:w-[24rem] shadow-md w-80" options={radial} />
</div>