<script>
  // import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Router, Route, navigate } from 'svelte-routing';
  import { fly } from "svelte/transition";
  import MainStatusBar from './components/icons/MainStatusBar.svelte';
  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";

  import Login from "../ui/Login.svelte";

   

  export let url = "";
  let loggedIn = false;
  let userPermission = "";
  let user = undefined;

  $m: {
    loggedIn = !!Meteor.userId();

    if(loggedIn){
      navigate("/home", { replace: true });
    }else{
      navigate("/login", { replace: true });
    }

    // if (user) {
    //   userPermission = user.profile.accountType;
    // }
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
  <MainStatusBar></MainStatusBar>
  <Navbar />
    <main>
      <Route path="/home">
        <ReportsTable />
      </Route>
    </main>
  {/if}
</Router>



