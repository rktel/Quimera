<script>
  import { Meteor } from "meteor/meteor";

  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";

  $: {
    console.log('App', Meteor.reports);
  }
</script>

<Navbar>

</Navbar>
<ReportsTable reports={Meteor.reports}></ReportsTable>