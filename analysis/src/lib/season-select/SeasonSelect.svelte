<script lang="ts">
import Checkbox from "@smui/checkbox";
import FormField from "@smui/form-field";
import List from "@smui/list/src/List.svelte";
import SelectAll from "./SelectAll.svelte";
import { sortSeasons } from "../algorithms";
import { currentSubject$, seasonSelection$, selectAll$, subjectSeasons$, subscriptions$} from "../subjects.change";
let selected: string[] = [];
$: seasonSelection$.next({seasons: selected});
let availableSeasons =  [];
subscriptions$.add(
	subjectSeasons$.subscribe(seasonArr => {
		sortSeasons(seasonArr);
		availableSeasons = seasonArr;
	})
);
subscriptions$.add(
	selectAll$.subscribe(bool => {
		if(bool) {
			availableSeasons.forEach((s, i) => selected[i] = s);
		} else selected = []
	})
)
subscriptions$.add(
	currentSubject$.subscribe(() => selected = [])
)
</script>

<div class="season-select">
	<SelectAll/>
	<List>
		{#each availableSeasons as season}
			<FormField>
				<Checkbox bind:group={selected} value={season} accept="great"/>
				<span>{season}</span>
			</FormField>
		{/each}
	</List>
</div>