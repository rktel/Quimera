<script>
  // import { Meteor } from "meteor/meteor";

  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";
  import Drawer from "./components/Drawer.svelte";
  import Login from "../ui/Login.svelte";
  let user = null;

  $m: {
        user = Meteor.user();
        console.log(user);
  }
</script>
{#if user}
<Navbar />
<ReportsTable />
<Drawer />
{:else}
<Login />
{/if}

