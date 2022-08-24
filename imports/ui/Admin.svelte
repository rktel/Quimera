<script>
    import { Tabs, TabList, TabPanel, Tab } from "./components/tabs";
</script>

<Tabs>
    <TabList>
        <Tab>Usuarios</Tab>
        <Tab>Reportes</Tab>
        <Tab>Mensajes</Tab>
        <div class="flex-1 border-b border-solid border-zinc-700"></div>
    </TabList>

    <TabPanel>
        <div class="bg-zinc-200">
            <h2>Usuarios panel</h2>
        </div>
    </TabPanel>

    <TabPanel>
        <div class="bg-zinc-200">
            <button class="bg-slate-600">one</button>
            <button class="bg-slate-600">two</button>
        </div>
    </TabPanel>

    <TabPanel>
        <div class="bg-zinc-200">
            <h2>Mensajes panel</h2>
        </div>
    </TabPanel>
</Tabs>
