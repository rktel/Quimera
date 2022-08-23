<script>
  // import { Meteor } from "meteor/meteor";
  import { fly } from "svelte/transition";
  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";
  import Drawer from "./components/Drawer.svelte";
  import Login from "../ui/Login.svelte";

  let loggedIn = false;
  let userPermission = "";
  let visible = false;
  $m: {
    loggedIn = !!Meteor.user();
    let user = Meteor.user();
    if (user) {
      // userPermission = user.profile.accountType;
    }
  }
  const setTimer = (_) => (visible = true);
  setTimeout(setTimer, 1200);
</script>

{#if !loggedIn}
  <Login />
{/if}

{#if visible}
  {#if loggedIn}
    <div transition:fly={{ x: 200, duration: 1000 }}>
      <Navbar />
      <ReportsTable />
      <Drawer />
    </div>
  {/if}
{/if}
