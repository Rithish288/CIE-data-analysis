<script lang="ts" defer="false">
import Season from "./Season.svelte";
import Alevel from "./Alevel.svelte";
  import SelectedSeasons from "./SelectedSeasons.svelte";

let div: HTMLDivElement;


</script>

<div class="main">
	<div class="configurations">
		<div class="mdc-select-container">
			<Season/>
		</div>
		<Alevel/>
		<SelectedSeasons/>
	</div>
	<div bind:this={div}></div>
</div>

<style>
	div.configurations {
		display: flex;
	}
</style>