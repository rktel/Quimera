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
</script>
<div class="bg-alfa-400 h-screen grid grid-rows-[40px,1fr]">
    <div class="bg-alfa-200">a</div>
    <div class="bg-alfa-300">b</div>
</div>