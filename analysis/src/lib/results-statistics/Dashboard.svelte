<script lang="ts" defer="false">
import Alevel from "./Alevel.svelte";
import { Chart } from "chart.js/auto";
import { onMount, onDestroy, setContext } from "svelte";
import { availableSeasons, cacheObject, currentsubject, seasonSelection$, subscriptions$ } from "./subjects.change";
import { formatDoc, getDocData } from "../../private/data-retriever";
import { cumulativeToDistr } from "../algorithms";
import { chartOptions } from "./chartOptions";
import { addDataset, clearDataSet } from "../utils";

setContext("currentSubject", currentsubject);
setContext("availableSeasons", availableSeasons);

let canvas: HTMLCanvasElement;
let chart: Chart;
let lengthGreaterThan1: boolean = true;
onMount(() => {
chart = new Chart(canvas.getContext("2d"), chartOptions);

	currentsubject.subscribe(() => clearDataSet(chart, chart.data.datasets))
	
	const seasonSelectionSub = seasonSelection$.subscribe(subArr => {
		const curSubj = $currentsubject;
		clearDataSet(chart, chart.data.datasets);
		subArr.seasons.forEach(season => {	
			let plotData: number[];
			if(cacheObject[curSubj][season]) {
				plotData = cacheObject[curSubj][season];
			addDataset.call(chart, {dataPoint: cumulativeToDistr(plotData), season});
		} else {
			const docDataSub = getDocData(curSubj, season).subscribe(data => {
				plotData = formatDoc(data.data());
				cacheObject[curSubj][season] = plotData;
				addDataset.call(chart, {dataPoint: cumulativeToDistr(plotData), season});
			})
			subscriptions$.add(docDataSub);
		}
		lengthGreaterThan1 = subArr.seasons.length > 1;
		console.log(lengthGreaterThan1)
	})
});

subscriptions$.add(seasonSelectionSub)
})
onDestroy(() => subscriptions$.unsubscribe());

</script>

<div class="container">
	<div class="sidebar">
		<Alevel/>
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