<script>
    import { Tabs, TabList, TabPanel, Tab } from "./components/tabs";
</script>

<Tabs>
    <TabList>
        <Tab>Usuarios</Tab>
        <Tab>Reportes</Tab>
        <Tab>Mensajes</Tab>
        <div class="tab-tasks"></div>
    </TabList>

    <TabPanel>
        <div class="grid grid-cols-2 h-full">
            <div class="bg-white m-px mt-1 ml-1 rounded-sm border border-solid border-zinc-400 h-[calc(100%_-_8px)]">1</div>
            <div class="bg-white m-px mt-1 ml-1 mr-1 rounded-sm border border-solid border-zinc-400 h-[calc(100%_-_8px)]">2</div>
        </div>
    </TabPanel>

    <TabPanel>
        <h2>2 panel</h2>
    </TabPanel>

    <TabPanel>
        <h2>3 panel</h2>
    </TabPanel>
</Tabs>
