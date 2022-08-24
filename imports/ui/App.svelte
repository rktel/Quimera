<script>
  import { Meteor } from "meteor/meteor";
  import { Router, Route, navigate } from "svelte-routing";
  import MainStatusBar from "./components/MainStatusBar.svelte";
  import { Tabs, TabList, TabPanel, Tab} from './components/tabs';

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
        <Tabs>
          <TabList>
            <Tab>one</Tab>
            <Tab>two</Tab>
            <Tab>three</Tab>
          </TabList>
        
          <TabPanel>
            <h2>First panel</h2>
          </TabPanel>
        
          <TabPanel>
            <h2>Second panel</h2>
          </TabPanel>
        
          <TabPanel>
            <h2>Third panel</h2>
          </TabPanel>
        </Tabs>
        {/if}

        {#if userPermission === "super"}
          <h1>Super</h1>
        {/if}
      </Route>
    </main>
  {/if}
</Router>
