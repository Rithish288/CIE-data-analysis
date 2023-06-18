import type { Chart, ChartDataset, ChartTypeRegistry, Point } from "chart.js";


export function clearDataSet(chart: Chart, dataSet: ChartDataset<keyof ChartTypeRegistry, (number | [number, number] | Point)[]>[]): void {
	dataSet.forEach(item => item.data.length = 0);
	chart.data.labels = [];
	chart.update();
}

export function addDataset(chart: Chart, statistic: {season: string, dataPoint: number[]}): void {
	chart.data.labels.push(statistic.season);
	for (let i = 0; i < 8; i++)
		chart.data.datasets[i].data.push(statistic.dataPoint[i]);
	chart.update();
}