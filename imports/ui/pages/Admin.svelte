<script>
    import { Tabs, TabList, TabPanel, Tab } from "./components/tabs";
    import Messages from "./components/Messages.svelte";
    import Reports from "./components/Reports.svelte";
    import Users from "./components/Users.svelte";
</script>

<Tabs>
    <TabList>
        <Tab>Usuarios</Tab>
        <Tab>Reportes</Tab>
        <Tab>Mensajes</Tab>
        <div class="tab-tasks" />
    </TabList>

    <TabPanel>
        <Users />
    </TabPanel>

    <TabPanel>
        <Reports />
    </TabPanel>

    <TabPanel>
        <Messages />
    </TabPanel>
</Tabs>
