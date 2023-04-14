<script lang="ts">
import Select, { Option} from "@smui/select";
import { currentSubject$, subjects } from "./subjects.change";
let currentSubject = subjects[0];
$: currentSubject$.next(currentSubject);
</script>

<Select bind:value={currentSubject} label="Selet A Level">
{#each subjects as subject}
	<Option value={subject}>{subject}</Option>
{/each}
</Select>