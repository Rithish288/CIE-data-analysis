<script lang="ts">
import FormField from "@smui/form-field";
import Checkbox from "@smui/checkbox";
import List from "@smui/list/src/List.svelte";
import { currentSubject$, seasonSelection$, subjectSeasons$, subscriptions$} from "./subjects.change";
import { sortSeasons } from "./algorithms";

let selected = [];
$: seasonSelection$.next(selected);
let availableSeasons = [];
subscriptions$.add(
	subjectSeasons$.subscribe(seasonArr => {
		sortSeasons(seasonArr);
		availableSeasons = seasonArr;
	})
);
subscriptions$.add(
	currentSubject$.subscribe(() => selected = [])
)
</script>

<List id="available-season-select" style="float:left; overflow-x:hidden">
	{#each availableSeasons as season}
		<FormField>
			<Checkbox bind:group={selected} value={season}/>
			<span>{season}</span>
		</FormField>
	{/each}
</List>