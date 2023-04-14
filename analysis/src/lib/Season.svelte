<script lang="ts">
import Select, {Option} from "@smui/select";
import { currentSeason$, seasons } from "./subjects.change";
let currentSeason = seasons[seasons.length - 1];
$: currentSeason$.next(currentSeason);

</script>

<Select bind:value={currentSeason} label="Select season">
	{#each seasons as season}
		<Option value={season}>{season}</Option>
	{/each}
	<svelte:fragment slot="helperText">Atleast 1 season must be selected</svelte:fragment>
</Select>