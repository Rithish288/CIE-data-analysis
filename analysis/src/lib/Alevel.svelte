<script lang="ts">
import Select, { Option} from "@smui/select";
import type { Subscription } from "rxjs";
import { currentSubject$, subjectSeasons$, subjects, subscriptions$ } from "./subjects.change";
import { getSubjectSeasons } from "../private/data-retriever";

let subscription: Subscription;
let currentSubject = subjects[0];
$: {
	currentSubject$.next(currentSubject);
	subscription = getSubjectSeasons(currentSubject).subscribe(seasons => {
		subjectSeasons$.next(seasons.data().availableSeasons);
	});
	subscriptions$.add(subscription);
};
</script>
<div class="wrapper" style="width: fit-content">
	<Select style="display: block;" bind:value={currentSubject} label="Select A Level">
	{#each subjects as subject}
		<Option value={subject}>{subject}</Option>
	{/each}
	</Select>
</div>