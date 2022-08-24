<script>
  import { Meteor } from "meteor/meteor";
  import { Router, Route, navigate } from "svelte-routing";
  import MainStatusBar from "./components/MainStatusBar.svelte";
  import Navbar from "./components/Navbar.svelte";
  import ReportsTable from "./components/ReportsTable.svelte";

  import { s_user } from "../api/stores";

  import Login from "../ui/Login.svelte";

  export let url = "";
  let loggedIn = false;
  let userPermission = undefined;
  let user = undefined;

  s_user.subscribe((newValue) => (user = newValue));

  $m: {
    loggedIn = !!Meteor.userId();
    s_user.update((el) => Meteor.user());

    if (loggedIn) {
      navigate("/home", { replace: true });
    } else {
      navigate("/login", { replace: true });
    }

    if (user) {
      userPermission = user.profile.accountType;
    }
  }
</script>

<Router {url}>
  {#if !loggedIn}
    <main>
      <Route path="/login">
        <Login />
      </Route>
    </main>
  {/if}

  {#if loggedIn}
    <MainStatusBar />
    {#if userPermission === "admin"}
      <Navbar />
    {/if}
    {#if userPermission === "super"}
      <h1>Super</h1>
    {/if}
    <main>
      <Route path="/home">
        <ReportsTable />
      </Route>
    </main>
  {/if}
</Router>
