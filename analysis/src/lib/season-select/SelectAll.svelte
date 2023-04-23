<script lang="ts">
import Checkbox from "@smui/checkbox";
import FormField from "@smui/form-field";
import { selectAll$, subjectSeasons$, subscriptions$ } from "../subjects.change";
let checked: boolean = false;
$: selectAll$.next(checked);
subscriptions$.add(subjectSeasons$.subscribe(() => checked = false))
</script>

<div class="select-all">
	<FormField>
		<span>Select all</span>
		<Checkbox bind:checked/>
	</FormField>
</div>