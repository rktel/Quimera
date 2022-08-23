<script>
  // import { Meteor } from "meteor/meteor";
  import { Router, Route } from 'svelte-routing';
  import { fly } from "svelte/transition";
  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";

  import Login from "../ui/Login.svelte";
  export let url = "";
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

<Router url={url}>
  {#if !loggedIn}
    <main>
      <Route path="/login" component={Login} />
    </main>
  {/if}
  {#if loggedIn}
  <Navbar />
    <main>
      <Route path="/secure/users-home">
        <ReportsTable />
      </Route>
    </main>
  {/if}
</Router>



