<script>
  // import { Meteor } from "meteor/meteor";
  import { fly } from "svelte/transition";
  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";
  import Drawer from "./components/Drawer.svelte";
  import Login from "../ui/Login.svelte";

  let loggedIn = false;
  let userPermission = "";

  $m: {
    loggedIn = !!Meteor.user();
    let user = Meteor.user();
    if (user) {
      // userPermission = user.profile.accountType;
    }
  }
</script>

{#if !loggedIn}
  <Login />
{/if}
{#if loggedIn}
  <div transition:fly={{ x: 200, duration: 1000 }}>
    <Navbar />
    <ReportsTable />
    <Drawer />
  </div>
{/if}
