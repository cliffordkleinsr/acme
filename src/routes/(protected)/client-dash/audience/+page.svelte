<script lang="ts">
	import type { PageData } from './$types';
	import Chart from '$lib/components/blocks/apexchart/chart.svelte';
	// import Datamaps from '$lib/components/blocks/datamaps/datamaps.svelte';
	import { browser } from '$app/environment';
	import { Skeleton } from '$lib/components/ui/skeleton';

	export let data: PageData;
	const { by_sec, by_cty, by_age } = data;

	function calculateAge(birthday: Date) {
		// birthday is a date
		var ageDifMs = Date.now() - birthday.getTime();
		var ageDate = new Date(ageDifMs); // miliseconds from epoch
		return Math.abs(ageDate.getUTCFullYear() - 1970);
	}
	// pie chart
	const loc_lbl = by_cty.map((item) => item.variable);
	const loc_cnt = by_cty.map((item) => item.agent_cnt);
	// area chart
	const sect_lbl = by_sec.map((item) => item.variable);
	const sect_cnt = by_sec.map((item) => item.agent_cnt);
	// radial chart
	const age_cnt = by_age.map((item) => item.agent_cnt);
	const age_lbl = by_age.map((item) => calculateAge(new Date(item.variable)));

	let opts = {
		projection: 'mercator', // big world map
		// countries don't listed in dataset will be painted with this color
		fills: { defaultFill: '#F5F5F5' },
		data: { KEN: { fillColor: '#42a844', numberOfThings: by_cty.length } },
		geographyConfig: {
			highlightOnHover: false,
			borderColor: '#DEDEDE',
			highlightBorderWidth: 2,
			highlightBorderColor: '#B7B7B7',
			popupTemplate: function (geo: { properties: { name: any } }, data: { numberOfThings: any }) {
				// don't show tooltip if country don't present in dataset
				if (!data) {
					return;
				}
				// tooltip content
				return [
					'<div class="hoverinfo">',
					'<strong>',
					geo.properties.name,
					'</strong>',
					'<br>Total Respondents: <strong>',
					data.numberOfThings,
					'</strong>',
					'</div>'
				].join('');
			}
		}
	};
	let pie_options = {
		series: loc_cnt,
		chart: {
			width: 380,
			type: 'pie'
		},
		labels: loc_lbl,
		title: {
			text: 'By County'
		},
		fill: {
			type: 'gradient'
		},
		theme: {
			palette: 'palette6' // upto palette10
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 300
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		]
	};

	let area_options = {
		series: [
			{
				data: sect_cnt
			}
		],
		chart: {
			type: 'bar',
			height: 200
		},
		theme: {
			palette: 'palette1' // upto palette10
		},
		plotOptions: {
			bar: {
				borderRadius: 4,
				borderRadiusApplication: 'end',
				horizontal: true
			}
		},
		dataLabels: {
			enabled: false
		},
		title: {
			text: 'By sector'
		},
		xaxis: {
			categories: sect_lbl
		},
		responsive: [
			{
				breakpoint: 1000,
				options: {
					plotOptions: {
						bar: {
							horizontal: false
						}
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		]
	};

	var radial = {
		series: age_cnt,
		chart: {
			type: 'donut'
		},
		labels: age_lbl,
		title: {
			text: 'By Age'
		},
		responsive: [
			{
				breakpoint: 480,
				options: {
					chart: {
						width: 300
					},
					legend: {
						position: 'bottom'
					}
				}
			}
		]
	};
	let isDesktop = true;
	if (browser) {
		isDesktop = window.innerWidth >= 768;
	}
</script>

{#if by_sec.length > 0}
	<div class="m-4 flex flex-col gap-4">
		<h1 class="text-2xl font-bold">Cumulative Audience Demographics</h1>
		<p class="text-sm italic">
			These statistics will continue to grow as more people respond to you're surveys
		</p>
		<div class="w-full gap-6 space-x-4 md:flex">
			<Chart class="md:shadow-md" options={pie_options} />

			<Chart class="w-5/6 space-y-2 2xl:w-1/2" options={area_options} />
		</div>
		<!-- <div class="grid lg:grid-cols-2 gap-3 max-w-5xl">
      <Chart class="shadow-md w-80 lg:w-96" options={radial} />
      {#if isDesktop}
      <div class="">
        <h1 class="text-lg font-bold">Global Outreach</h1>
        <Datamaps options={opts}/>
      </div>
      {/if}
    </div> -->
	</div>
{:else}
	<div class="m-5 w-full">
		<p class="text-sm italic">These statistics will grow as more people answer your surveys</p>
		<div class="m-4 flex flex-col gap-4">
			<Skeleton class="h-[20px] w-[200px] rounded-full" />
			<Skeleton class="h-[10px] w-[300px] rounded-full" />
		</div>
		<div class="w-full gap-6 space-x-4 md:flex">
			<Skeleton class="size-40 rounded-full" />
			<div class="grid gap-1">
				<Skeleton class="h-[20px] w-[400px] rounded-full" />
				<Skeleton class="h-[20px] w-[400px] rounded-full" />
				<Skeleton class="h-[20px] w-[400px] rounded-full" />
			</div>
		</div>
	</div>
{/if}
