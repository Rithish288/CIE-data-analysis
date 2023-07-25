import type { ChartConfiguration } from "chart.js";

export const chartOptions: ChartConfiguration  = {
	type: "bar",
	options: {
		responsive: true,
		maintainAspectRatio: false,
		
		scales: {
			x: {
				stacked: true,
				type: "category"
			},
			y: {
				stacked: true
			}
		},
		aspectRatio: 1/(.5 + Math.sqrt(5)/2)
	},
	data: {
		labels: [],
		datasets: [
			{ label: "A*", data: []},
			{ label: "A", data: []},
			{ label: "B", data: []},
			{ label: "C", data: []},
			{ label: "D", data: []},
			{ label: "E", data: []},
			{ label: "ungraded", data: []},
			{ label: "AS A-E grades", data: []}
		]
	}
}
