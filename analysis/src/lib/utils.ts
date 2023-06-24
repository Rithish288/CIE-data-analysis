import type { Chart, ChartDataset, ChartTypeRegistry, Point } from "chart.js";
import { to_number } from "svelte/internal";


export function clearDataSet(chart: Chart, dataSet: ChartDataset<keyof ChartTypeRegistry, (number | [number, number] | Point)[]>[]): void {
	dataSet.forEach(item => item.data.length = 0);
	chart.data.labels = [];
	chart.update();
}

export function compare(a: string, b: string) {
	const seasons = {
		m: 0, s: 1, w: 2
	}
	const [y1, y2] = [to_number(a.substring(1)), to_number(b.substring(1))] 
	if(y1 <= y2){
		if(y1 === y2) {
			return a[0] <= b[0];
		}
		return true;
	};
	return false;
}

export function addDataset(chart: Chart, statistic: {season: string, dataPoint: number[]}): void {
	chart.data.labels.push(statistic.season);
	for (let i = 0; i < 8; i++)
		chart.data.datasets[i].data.push(statistic.dataPoint[i]);
}