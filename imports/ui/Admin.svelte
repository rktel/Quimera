<script>
    import { Tabs, TabList, TabPanel, Tab } from "./components/tabs";
</script>

<Tabs>
    <TabList>
        <Tab>Usuarios</Tab>
        <Tab>Reportes</Tab>
        <Tab>Mensajes</Tab>
    </TabList>

    <TabPanel>
        <div class="bg-zinc-200">
            <h2>Usuarios panel</h2>
        </div>
    </TabPanel>

    <TabPanel>
        <div class="bg-zinc-200">
            <button>one</button>
            <button>two</button>
        </div>
    </TabPanel>

    <TabPanel>
        <div class="bg-zinc-200">
            <h2>Mensajes panel</h2>
        </div>
    </TabPanel>
</Tabs>
