<script lang="ts">
import Dashboard from "./lib/results-statistics/Dashboard.svelte";
import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
let activePage = "dashboard";
const components = {
  "dashboard": Dashboard
}
</script>
<TopAppBar variant="static">
  <Row>
    <Section>
      <Title>CIE Data Analysis</Title>
    </Section>
  </Row>
</TopAppBar>
<svelte:component this="{components[activePage]}"/>