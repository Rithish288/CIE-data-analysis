<script lang="ts">
import Select, { Option} from "@smui/select";
import { currentSubject$, subjectSeasons$, subjects, subscriptions$ } from "./subjects.change";
import { getSubjectSeasons } from "../private/data-retriever";

let currentSubject = subjects[0];
$: {
	currentSubject$.next(currentSubject);
	subscriptions$.add(	
		getSubjectSeasons(currentSubject).subscribe(seasons => {
			subjectSeasons$.next(seasons.data().availableSeasons);
		})
	);
};
</script>
<div style="width: fit-content">
	<Select bind:value={currentSubject} label="Select A Level">
	{#each subjects as subject}
		<Option value={subject}>{subject}</Option>
	{/each}
	</Select>
</div>