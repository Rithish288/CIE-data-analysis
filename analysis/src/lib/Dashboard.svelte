<script lang="ts" defer="false">
import SeasonSelect from "./season-select/SeasonSelect.svelte";
import Alevel from "./Alevel.svelte";
import type { ChartDataset, ChartTypeRegistry, Point } from "chart.js/auto";
import { Chart } from "chart.js/auto";
import { onMount, onDestroy } from "svelte";
import { cacheObject, currentSubject$, seasonSelection$, subscriptions$ } from "./subjects.change";
import { formatDoc, getDocData } from "../private/data-retriever";
import { cumulativeToDistr } from "./algorithms";
import { pairwise, startWith } from "rxjs";

function clearDataSet(dataSet: ChartDataset<keyof ChartTypeRegistry, (number | [number, number] | Point)[]>[]): void {
	dataSet.forEach(item => item.data.length = 0);
	chart.data.labels = [];
	chart.update();
}

function addDataset(): void {
	chart.data.labels.push(this.season);
	for (let i = 0; i < 8; i++) {
		chart.data.datasets[i].data.push(this.dataPoint[i])
	}
	chart.update();
}

let canvas: HTMLCanvasElement;
let chart: Chart;
onMount(() => {
chart = new Chart(canvas.getContext("2d"), {
	type: "bar",
	options: {
		responsive: true,
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true
			}
		}
	},
	data: {
		labels: [],
		datasets: [
			{ label: "A*", data: [] },
			{ label: "A or above", data: [] },
			{ label: "B or above", data: [] },
			{ label: "C or above", data: [] },
			{ label: "D or above", data: [] },
			{ label: "E or above", data: [] },
			{ label: "ungraded", data: [] },
			{ label: "AS A-E grades", data: [] }
		]
	},
});


subscriptions$.add(
	currentSubject$.subscribe(() => {
		clearDataSet(chart.data.datasets);
	})
);

const seasonSelectionSub = seasonSelection$.subscribe(subArr => {
	const curSubj = currentSubject$.getValue();
	clearDataSet(chart.data.datasets);

	subArr.seasons.forEach(season => {
		let plotData: number[];
		if(cacheObject[curSubj][season]) {
			plotData = cacheObject[curSubj][season];
			addDataset.call({dataPoint: cumulativeToDistr(plotData), season});
		} else {
			const docDataSub = getDocData(curSubj, season).subscribe(data => {
				plotData = formatDoc(data.data());
				cacheObject[curSubj][season] = plotData;
				addDataset.call({dataPoint: cumulativeToDistr(plotData), season});
			})
			subscriptions$.add(docDataSub);
		}
	})
});

subscriptions$.add(seasonSelectionSub)
})
onDestroy(() => subscriptions$.unsubscribe());

</script>

<div class="container">
	<SeasonSelect/>
	<main class="dashboard-content">
		<Alevel/>
		<canvas bind:this={canvas}></canvas>
	</main>
</div>

<style>
	div.container {
		display: flex;
		flex-direction: row;
	}
	div.container main.dashboard-content {
		float: none;
		overflow: hidden;
	}
</style>