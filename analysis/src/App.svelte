<script lang="ts">
  import Dashboard from "./lib/Dashboard.svelte";
  import Main from "./lib/statistical-tests/Main.svelte";
  import Drawer, {Content, AppContent} from "@smui/drawer";
  import List, {Item, Text} from "@smui/list";
  let activePage = "dashboard";
  const components = {
    "dashboard": Dashboard,
    "statistical-tests": Main
  }
</script>
<Drawer>
  <Content>
    <List>
      <Item on:click="{() => activePage = "dashboard"}"><Text>Dashboard</Text></Item>
      <Item on:click="{() => activePage = "statistical-tests"}">Statistical Tests</Item>
    </List>
  </Content>
</Drawer>
<AppContent>
  <svelte:component this="{components[activePage]}"/>
</AppContent>