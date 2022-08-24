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
        <div class="flex h-full">
            <div class="bg-white m-px mt-1 ml-1 rounded-sm border border-solid border-zinc-400 h-[calc(100%_-_8px)] basis-[460px]">1</div>
            <div class="bg-white m-px mt-1 ml-[2px] mr-1 rounded-sm border border-solid border-zinc-400 h-[calc(100%_-_8px)] flex-1">2</div>
        </div>
    </TabPanel>

    <TabPanel>
        <div class="flex h-full">
            <div class="bg-white m-px mt-1 ml-1 rounded-sm border border-solid border-zinc-400 h-[calc(100%_-_8px)] basis-[460px]">1</div>
            <div class="bg-white m-px mt-1 ml-[2px] mr-1 rounded-sm border border-solid border-zinc-400 h-[calc(100%_-_8px)] flex-1">2</div>
        </div>
    </TabPanel>

    <TabPanel>
        <div class="flex h-full">
            <div class="bg-white m-px mt-1 ml-1 rounded-sm border border-solid border-zinc-400 h-[calc(100%_-_8px)] basis-[460px]">1</div>
            <div class="bg-white m-px mt-1 ml-[2px] mr-1 rounded-sm border border-solid border-zinc-400 h-[calc(100%_-_8px)] flex-1">2</div>
        </div>
    </TabPanel>
</Tabs>
