<script>
    import { Meteor } from 'meteor/meteor';
    import { s_user } from '../../api/stores';
    import { onDestroy } from "svelte";
    import { clickOutside } from '../tools/clickOutside';
    import Users from "./subpages/Users.svelte";
    import Reports from "./subpages/Reports.svelte";
    import Messages from "./subpages/Messages.svelte";
    
    const subpages = [
        {index:1, name:"Usuarios", component: Users},
        {index:2, name:"Reportes", component: Reports},
        {index:3, name:"Mensajes", component: Messages},
    ]
    let subpageOn = subpages[0];
    const fLoadSubpage = subpage => subpageOn = subpage;
    let user = undefined;
    s_user.subscribe(newValue => user = newValue);
    let bUserOptions = false
    const fLogout = () => Meteor.logout();

    const fFormatDate = (date) => {
        const fPad2 = (num) => {
            return num.toString().padStart(2, "0");
        };

        if (date) {
            return (
                [fPad2(date.getDate()), date.toLocaleString("es-PE", { month: "short" })].join(" ")  +
                " " +
                [fPad2(date.getHours()), fPad2(date.getMinutes())].join(":")
            );
        } else {
            return undefined;
        }
    };
    let now = fFormatDate(new Date());
    const fSetNow = () => now = fFormatDate(new Date());
    let timer = setInterval(fSetNow, 1 * 1000);
    onDestroy((_) => clearInterval(timer));
    const active = 'text-dark-800 font-bold dark:text-dark-100'
</script>

<!-- CONTAINER -->
<div class="h-screen grid grid-rows-[40px,1fr]">
    <!-- BAR -->
    <div class="grid grid-cols-[auto,1fr,auto] bg-dark-50 dark:bg-dark-700 border-b border-beta-500">
        <!-- SELECT SUBPAGE -->
        <div class="flex text-dark-500">
            {#each subpages as $subpage }
            <button class="min-w-[150px] {$subpage.index === subpageOn.index?active:''}" on:click="{_=>fLoadSubpage($subpage)}">{$subpage.name}</button>
            {/each}
        </div>
        <!-- SELECT SUBPAGE_END -->
        <!-- TOOL -->
        <div class="flex items-center justify-end px-5">
            <span class="text-alfa-800 dark:text-alfa-300 text-sm font-bold">
                {now}
            </span>
        </div>
        <!-- TOOL_END -->
        <!-- OPTION USER -->
        <div class="bg-alfa-400">
            C
        </div>
        <!-- OPTION USER_END -->
    </div>
    <!-- BAR_END -->
    <!-- SUBPAGE -->
    <svelte:component this="{subpageOn.component}"></svelte:component>
    <!-- SUBPAGE_END -->
</div>
<!-- CONTAINER_END -->