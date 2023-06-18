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
			{ label: "A*", data: [], stack: "" },
			{ label: "A or above", data: [], stack: "" },
			{ label: "B or above", data: [], stack: "" },
			{ label: "C or above", data: [], stack: "" },
			{ label: "D or above", data: [], stack: "" },
			{ label: "E or above", data: [], stack: "" },
			{ label: "ungraded", data: [], stack: "" },
			{ label: "AS A-E grades", data: [], stack: "" }
		]
	}
}