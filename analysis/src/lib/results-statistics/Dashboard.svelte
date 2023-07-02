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

function fillDataset(seasons: string[]) {
	if(seasons.length <= 0) return;
	const data = getCollection(currentSubject, convSeasonToTimeStamp(seasons[0]), convSeasonToTimeStamp(seasons[seasons.length - 1]));
	data.then(values => {
		values.forEach((element, i) => {
			const formatted = cumulativeToDistr(formatDoc(element.data()))
			addDataset(chart, {season: seasons[i], dataPoint: formatted})
		})
		chart?.update();
	});
}

$: {
	if(chart) clearDataSet(chart, chart?.data.datasets);
	fillDataset(plotSeasons);
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
		<footer>
			The data shown is taken from the documents publicly provided by the official Cambridge Assessment International Education website.
		</footer>
	</main>
</div>

<style>
	div.container {
		display: flex;
		flex-grow: 100;
	}
	footer {
		opacity: 0.7;
		font-size: small;
		text-align: center;
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