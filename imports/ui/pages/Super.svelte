<script>
    import { Tabs, TabList, TabPanel, Tab } from "./components/tabs";
    import Messages from "./components/Messages.svelte";
    import Reports from "./components/Reports.svelte";
</script>

<Tabs>
    <TabList>
        <Tab>Reportes</Tab>
        <Tab>Mensajes</Tab>
        <div class="tab-tasks" />
    </TabList>

    <TabPanel>
        <Reports />
    </TabPanel>

    <TabPanel>
        <Messages />
    </TabPanel>
</Tabs>