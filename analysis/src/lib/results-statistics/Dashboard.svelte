<script lang="ts" defer="false">
import Alevel from "./Alevel.svelte";
import { Chart } from "chart.js/auto";
import { onMount } from "svelte";
import { subjects } from "./subjects.change";
import { formatDoc, getCollection } from "../../private/data-retriever";
import { convSeasonToTimeStamp, cumulativeToDistr } from "../algorithms";
import { chartOptions } from "./chartOptions";
import { addDataset, clearDataSet } from "../utils";

let canvas: HTMLCanvasElement;
let chart: Chart;
let plotSeasons = [];
let currentSubject = subjects[0];

$: {
	if(chart) clearDataSet(chart, chart?.data.datasets)
	if(plotSeasons.length > 0) {
		const data = getCollection(currentSubject, convSeasonToTimeStamp(plotSeasons[0]), convSeasonToTimeStamp(plotSeasons[plotSeasons.length - 1]));
		data.then(values => {
			values.map((element, i) => {
				const formatted = cumulativeToDistr(formatDoc(element.data()))
				addDataset(chart, {season: plotSeasons[i], dataPoint: formatted})
			})
			chart?.update();
		});
	}
}
onMount(() => {
	chart = new Chart(canvas.getContext("2d"), chartOptions);
});

</script>

<div class="container">
	<div class="sidebar">
		<Alevel bind:currentSubject bind:plotSeasons/>
	</div>
	<main class="dashboard">
		<div class="dashboard-content">
			<canvas bind:this={canvas}></canvas>
		</div>
	</main>
</div>

<style>
	div.container {
		display: flex;
		flex-grow: 100;
	}
	div.container main.dashboard {
		width: 100%;
		overflow-x: auto;
		padding-inline: 1rem;
	}
	div.container main.dashboard div.dashboard-content {
		width: 90%;;
		margin-inline: auto;
		min-width: 600px;
	}
	div.container div.sidebar {
		padding: 0.25rem 0.5rem;
		box-shadow: 0 0 10px -2px rgb(203, 203, 203);
		height: inherit;
	}
</style>