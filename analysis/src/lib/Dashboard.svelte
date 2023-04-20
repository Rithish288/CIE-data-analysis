<script lang="ts" defer="false">
import Season from "./Season.svelte";
import Alevel from "./Alevel.svelte";
import { Chart } from "chart.js/auto";
import { onMount, onDestroy } from "svelte";
import { cacheObject, currentSubject$, seasonSelection$, subscriptions$ } from "./subjects.change";
import { formatDoc, getDocData } from "../private/data-retriever";

let canvas: HTMLCanvasElement;
let chart: Chart;
onMount(() => {
chart = new Chart(canvas.getContext("2d"), {
	type: "line",
	options: {
		responsive: true,
		maintainAspectRatio: true,
		interaction: {
			mode: "nearest",
			intersect: true
		}
	},
	data: {
		labels: ["A*", "A or above", "B or above", "C or above", "D or above", "E or above", "ungraded", "AS A-E grades"],
		datasets: [{data: [0, 199]}]
	},
});

subscriptions$.add(
	currentSubject$.subscribe(() => {
		chart.data.datasets.length = 0;
		chart.update();
	})
);

function addDataset(): void {
	chart.data.datasets.push({
		data: this.plotData,
		label: this.season,
		pointHoverBackgroundColor: "black",
		borderColor: "rgb(240, 89, 225, 0.5)"
	});
	chart.update();
}

const seasonSelectionSub = seasonSelection$.subscribe(subArr => {
	const curSubj = currentSubject$.getValue()
	chart.data.datasets.length = 0;
	subArr.forEach(season => {
		let plotData: number[];
		if(cacheObject[curSubj][season]) {
			plotData = cacheObject[currentSubject$.getValue()][season];
			addDataset.call({plotData, season});
		} else {
			const docDataSub = getDocData(curSubj, season).subscribe(data => {
				plotData = formatDoc(data.data());
				cacheObject[curSubj][season] = plotData;
				addDataset.call({plotData, season});
			})
			subscriptions$.add(docDataSub);
		}
	})
})
subscriptions$.add(seasonSelectionSub)
})
onDestroy(() => subscriptions$.unsubscribe());

</script>

<div class="container">
	<Season/>
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
	div.container main.dashboard-content canvas {
		width: 100% !important;
	}
</style>