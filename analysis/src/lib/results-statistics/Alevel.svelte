<script lang="ts">
import Select, { Option } from "@smui/select";
import Button, { Label } from "@smui/button";
import CircularProgress from "@smui/circular-progress";
import { availableSeasons, subjects } from "./subjects.change";
import { getSubjectSeasons } from "../../private/data-retriever";
import { getContext } from "svelte";
import type { Writable } from "svelte/store";

const currentsubject = getContext<Writable<string>>("currentSubject");

$: startSeason = "";
$: endSeason = "";

let errorMessage = {
	start: "",
	end: ""
}

function isValid(): boolean {
	let isValid = true;
	if(startSeason === undefined) {
		errorMessage.start = "Please select a start season";
		isValid = false;
	};
	if(startSeason === undefined) {
		errorMessage.end = "Please select an ending season"
	} else if($availableSeasons.indexOf(endSeason) > $availableSeasons.indexOf(startSeason)) {
		errorMessage.end = "End season cannot come before the start season";
		isValid = false;
	}
	return isValid;
}

function uploadPLotData() {
	if(!isValid()) return;
}

console.log(startSeason);


function change() {
	console.log('change', startSeason);
}

</script>

<div class="form">
	<Select variant="filled" bind:value={$currentsubject} label="Select A Level">
		{#each subjects as subject}
			<Option value={subject}>{subject}</Option>
		{/each}
		<svelte:fragment slot="helperText"><span class="error-message"></span></svelte:fragment>
	</Select>
	{#await getSubjectSeasons($currentsubject)}
		<CircularProgress style="width: 32px; height: 32px" indeterminate /> Loading Season data...
	{:then seasons} 
		<Select on:input={change} variant="filled" bind:value={startSeason} label="Select start season" required>
			{#each seasons as season}
				<Option value={season}>{season}</Option>
			{/each}
			<svelte:fragment slot="helperText">
				<span class="error-message">
				{errorMessage.start}
				</span>
			</svelte:fragment>
		</Select>	
		<Select on:change={() => errorMessage.end = ""} variant="filled" bind:value={endSeason} label="Select end season" required>
			{#each seasons as season}
				<Option value={season}>{season}</Option>
			{/each}
			<svelte:fragment slot="helperText"><span class="error-message">{errorMessage.end}</span></svelte:fragment>
		</Select>
	{:catch error}
	<span color="error" style="color: red; font-weight: 550">{error}</span>
	{/await}
	<Button on:click={uploadPLotData} style="display: block; max-width: fit-content; margin-inline: auto" variant="raised">
		<Label>Plot results</Label>
	</Button>
</div>

<style>
	div.form {
		display: flex;
		flex-direction: column;
		margin-block: 1rem;
	}
</style>