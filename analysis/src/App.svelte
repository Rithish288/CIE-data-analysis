<script lang="ts">
import Dashboard from "./lib/results-statistics/Dashboard.svelte";
import TopAppBar, { Row, Section, Title } from "@smui/top-app-bar";
import Tooltip, { Wrapper } from '@smui/tooltip';
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
    <Section align="end">
      <Wrapper>
        <a target="_blank" style="height: 40px; border-radius: 100vw; overflow: hidden" href="https://portfolio-bdbad.web.app/">
          <img style="height: 100%;" src="/me.jpg" alt="my profile display"/>
        </a>
        <Tooltip xPos="center" yPos="above">About me</Tooltip>
      </Wrapper>
    </Section>
  </Row>
</TopAppBar>
<svelte:component this="{components[activePage]}"/>
