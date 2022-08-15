<script>
  import { Meteor } from "meteor/meteor";

  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";

  
</script>

<Navbar>

</Navbar>
<ReportsTable reports={Meteor.reports}></ReportsTable>