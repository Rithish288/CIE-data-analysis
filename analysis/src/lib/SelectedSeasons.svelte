<script lang="ts">
import Chip, { Set as Unordered_Set, TrailingAction, Text } from "@smui/chips";
import { seasonSelection$, currentSeason$, seasons } from "./subjects.change";
import { isUnique } from "./algorithms";
let seasonSelection = new Array(seasons[seasons.length - 1]);
currentSeason$.subscribe(cs => {
	if(isUnique(seasonSelection, cs)) {
		seasonSelection.push(cs);
		seasonSelection$.next(seasonSelection);
	}
	seasonSelection = seasonSelection;
})

</script>

<Unordered_Set chips={seasonSelection} let:chip>
	<Chip {chip}>
		<Text>{chip}</Text>
		<TrailingAction disabled={seasonSelection.length <= 1} icon$class="material-icons">cancel</TrailingAction>
	</Chip>
</Unordered_Set>