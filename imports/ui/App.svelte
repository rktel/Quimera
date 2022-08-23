<script>
  import { Meteor } from "meteor/meteor";
  import { Router, Route, navigate } from 'svelte-routing';
  import MainStatusBar from './components/MainStatusBar.svelte';
  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";
  
  import { s_user } from "../api/stores"

  import Login from "../ui/Login.svelte";

   

  export let url = "";
  let loggedIn = false;
  let userPermission = "";
  let user = undefined;
  s_user.subscribe(newValue => {user = newValue})
  $m: {
    loggedIn = !!Meteor.userId();
    s_user.update(_ => Meteor.user());
    if(loggedIn){
      navigate("/home", { replace: true });
    }else{
      navigate("/login", { replace: true });
    }
    console.log("User:", user)
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



