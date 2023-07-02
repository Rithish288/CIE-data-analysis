<script lang="ts">
import Select, { Option } from "@smui/select";
import Button, { Label } from "@smui/button";
import CircularProgress from "@smui/circular-progress";
import { subjects } from "./subjects.change";
import { getSubjectSeasons } from "../../private/data-retriever";
import { compare } from "../utils";

export let plotSeasons: string[];
export let currentSubject = subjects[0];

const resetSeasons = () => {
	startSeason = "";
	endSeason = "";
}

$: startSeason = "";
$: endSeason = "";

$: currentSubject, resetSeasons();
let errorMessage = {
	start: "",
	end: ""
}

function isValid(): boolean {
	let isValid = true;
	if(startSeason && endSeason && !compare(startSeason, endSeason)) {
		errorMessage.end = "End season cannot come before the start season";
		isValid = false;
	} else {
		if(startSeason === undefined || startSeason === "") {
			errorMessage.start = "Please select a start season";
			isValid = false;
		} else errorMessage.start = "";
		if(endSeason === undefined || endSeason === "") {
			errorMessage.end = "Please select an ending season";
			isValid = false;
		} else errorMessage.end = "";
	}
	return isValid;
}

function uploadPLotData(seasons: string[]) {
	if(!isValid()) return;
	plotSeasons = seasons.slice(seasons.indexOf(startSeason), seasons.indexOf(endSeason) + 1);
}

</script>

<div class="form">
	<Select label$for="subject" variant="filled" bind:value={currentSubject} label="A Level">
		{#each subjects as subject}
			<Option value={subject}>{subject}</Option>
		{/each}
		<svelte:fragment slot="helperText"><span class="error-message"></span></svelte:fragment>
	</Select>
	{#await getSubjectSeasons(currentSubject)}
		<CircularProgress style="width: 32px; height: 32px" indeterminate /> Loading Season data...
	{:then seasons} 
		<Select label$for="start season" variant="filled" bind:value={startSeason} label="Start season" required>
			{#each seasons as season}
				<Option value={season}>{season}</Option>
			{/each}
			<svelte:fragment slot="helperText">
				<span class="error-message">
					{errorMessage.start}
				</span>
			</svelte:fragment>
		</Select>	
		<Select label$for="end season" variant="filled" bind:value={endSeason} label="End season" required>
			{#each seasons as season}
				<Option value={season}>{season}</Option>
			{/each}
			<svelte:fragment slot="helperText">
				<span class="error-message">
					{errorMessage.end}
				</span>
			</svelte:fragment>
		</Select>
		<Button on:click={() => uploadPLotData(seasons)} style="display: block; max-width: fit-content; margin-inline: auto" variant="raised">
			<Label>Plot results</Label>
		</Button>
	{:catch error}
	<span color="error" style="color: red; font-weight: 550">{error}</span>
	{/await}
</div>

<style>
	div.form {
		display: flex;
		flex-direction: column;
		margin-block: 1rem;
	}
</style>