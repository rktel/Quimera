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
        <div class="tabPanelContainer">
            <div class="tabPanelSideLeft">1</div>
            <div class="tabPanelSideRight">2</div>
        </div>
    </TabPanel>
    <TabPanel>
        <div class="tabPanelContainer">
            <div class="tabPanelSideLeft">1</div>
            <div class="tabPanelSideRight">2</div>
        </div>
    </TabPanel>
    <TabPanel>
        <div class="tabPanelContainer">
            <div class="tabPanelSideLeft">1</div>
            <div class="tabPanelSideRight">2</div>
        </div>
    </TabPanel>
</Tabs>
