<script>
  import { Meteor } from "meteor/meteor";
  import { Router, Route, navigate } from "svelte-routing";
  import Administrator from "./pages/Administrator.svelte";
  import Administrador from "./pages/Administrador.svelte";
  import Home from "./pages/Home.svelte";
  import Login from "./pages/Login.svelte";
  
  import Post from "./pages/Post.svelte";

  import { s_user } from "../api/stores";
  export let url = "";
  let bLogged = false;
  let userPermission = undefined;
  let user = undefined;


  s_user.subscribe((newValue) => (user = newValue));

  $m: {
    bLogged = !!Meteor.userId();
    s_user.update((el) => Meteor.user());

    if (bLogged) {
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
  {#if !bLogged}
    <main>
      <Route path="/login">
        <Login />
      </Route>
    </main>
  {/if}

  {#if bLogged}
    <main>
      <Route path="/">
        {#if userPermission === "administrator"}
          <Administrador />
        {/if}
        {#if userPermission === "supervisor"}
         <Home />
        {/if}
      </Route>
      <Route path="post/:id">
        <Post></Post>
      </Route>
    </main>
  {/if}
</Router>
