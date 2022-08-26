<script>
  import { Meteor } from "meteor/meteor";
  import { Router, Route, navigate } from "svelte-routing";
  import MainStatusBar from "./components/MainStatusBar.svelte";
  import Admin from "./Admin.svelte";
  import Super from "./Super.svelte";
  import Login from "../ui/Login.svelte";
  import { s_user } from "../api/stores";

  export let url = "";
  let loggedIn = false;
  let userPermission = undefined;
  let user = undefined;


  s_user.subscribe((newValue) => (user = newValue));

  $m: {
    loggedIn = !!Meteor.userId();
    s_user.update((el) => Meteor.user());

    if (loggedIn) {
      navigate("/", { replace: true });
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
    <main>
      <Route path="/">
        {#if userPermission === "admin"}
          <Admin />
        {/if}

        {#if userPermission === "super"}
         <Super />
        {/if}
      </Route>
    </main>
  {/if}
</Router>
