<script>
  // import { Meteor } from "meteor/meteor";
  import { Router, Route, navigate } from 'svelte-routing';
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
    if(!loggedIn){
      navigate("/login", { replace: true });
    }
    if(loggedIn){
      navigate("/home", { replace: true });
    }
    if (user) {
      // userPermission = user.profile.accountType;
    }
  }

</script>

<Router url={url}>
  {#if !loggedIn}
    <main>
      <Route path="/login">
        <Login></Login>
      </Route>
    </main>
  {/if}
  {#if loggedIn}
  <Navbar />
    <main>
      <Route path="/home">
        <ReportsTable />
      </Route>
    </main>
  {/if}
</Router>



