<script lang="ts" defer="false">
import Select, {Option} from "@smui/select";
import Chip, { Set, TrailingAction, Text } from "@smui/chips";
import Button from "@smui/button";
// import type{ ApexOptions } from "apexcharts";
// import ApexCharts from "apexcharts";
// import { getDocData } from "../private/data-retriever";
// import type { DocumentData } from "firebase/firestore";
// let div: HTMLDivElement;
// let options: ApexOptions;
// let observable = getDocData("s22", "Mathematics");
// let data: DocumentData;
// observable.subscribe(grades => {
// 	data = formatDoc(grades);
// 	options = {
// 		chart: {
// 			"type": "line",
// 			width: "80%",
// 			zoom: {
// 				enabled: false
// 			}
// 		},
// 		series: [
// 			{
// 				name: "cf",
// 				data: data.values
// 			}
// 		],
// 		labels: data.labels,
// 		dataLabels: {
// 			enabled: true
// 		}
// 	}
	
// 	let myChart = new ApexCharts(div, options);
// 	myChart.render() 
// })
let seasons: string[] = ["s15", "w15", "s16", "w16", "s17", "w17", "s18", "w18", "s19", "w19"];
const subjects = ["Accounting","Afrikaans","Arabic","Art and Design","Biology","Business","Chemistry","Chinese","Classical Studies","Computer Science","Design and Technology","Digital Media and Design","Divinity","Drama","Economics","English Language","Food Studies","French","Further Mathematics","Geography","Global Perspectives & Research","Hindi","Hinduism","History","Information Technology","Islamic Studies","Law","Literature in English","Marine Science","Mathematics","Media Studies","Music","Physical Education","Physics","Portuguese","Psychology","Sociology","Spanish","Tamil","Thinking Skills","Travel and Tourism","Urdu"]
let i = 20;
const year = (new Date()).getFullYear() - 2000 - 1;
while(i <= year) {  
	seasons.push("m" + i, "s" + i, "w" + i);  
	i++;
}
let value = "w21";
$:console.log(value, choices);
let subj = "Accounting";
let choices = [];
</script>

<div class="main">
	<div class="configurations">
		<Select bind:value={value} on:change={() => console.log(value)} label="Select season">
			{#each seasons as season}
				<Option value={season}>{season}</Option>
			{/each}
		</Select>
		<Select bind:value={subj} label="Select subject">
			{#each subjects as subject}
				<Option value={subject}>{subject}</Option>
			{/each}
		</Select>
		<Set chips={choices} let:chip>
			<Chip {chip}>
				<Text>{chip}</Text>
				<TrailingAction icon$class="material-icons">cancel</TrailingAction>
			</Chip>
		</Set>
		<Button>Add</Button>
	</div>
<!-- <div bind:this={div}></div> -->
</div>