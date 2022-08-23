<script>
  // import { Meteor } from "meteor/meteor";
  import { onMount } from 'svelte';
  import { Router, Route, navigate } from 'svelte-routing';
  import { fly } from "svelte/transition";
  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";

  import Login from "../ui/Login.svelte";
  export let url = "";
  let loggedIn = false;
  let userPermission = "";
  let user = undefined;
  let counter = 0;
  onMount(_=>{
    console.log(new Date(),'=> ','onMount');
    const timer = setInterval(_=> {
      const u = Meteor.user();
      console.log('u:',u);
      if(counter === 10){
        clearInterval(timer);
      }
      counter = counter + 1;
    },100)
  })
  $m: {
    loggedIn = !!Meteor.user();
    // let user = Meteor.user();
    // console.log(new Date(),'=> ','App user:',user);
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
  <Navbar />
    <main>
      <Route path="/home">
        <ReportsTable />
      </Route>
    </main>
  {/if}
</Router>



