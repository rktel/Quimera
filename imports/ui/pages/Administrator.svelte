<script>
    
    import Users from "./subpages/Users.svelte";
    import Reports from "./subpages/Reports.svelte";
    import Messages from "./subpages/Messages.svelte";
    
    const subpages = [
        {index:1, name:"Users", component: Users},
        {index:2, name:"Reports", component: Reports},
        {index:3, name:"Messages", component: Messages},
    ]
    let subpageOn = subpages[0];
    const fLoadSubpage = subpage => subpageOn = subpage;
    const styles = {
        active: "bg-white text-alfa-500 shadow"
    }
    let bUserOptions = false
 
</script>

<div class="h-8 text-sm font-normal bg-dark-200 text-dark-500 grid grid-cols-[120px,120px,120px,1fr,auto]">
    {#each subpages as $subpage }
        <button class="{$subpage.index===subpageOn.index?styles.active:''}" on:click="{_=>fLoadSubpage($subpage)}">{$subpage.name}</button>
    {/each}
    <div></div>
    <div class="bg-white flex justify-end items-center gap-4 px-4">

           <button class="h-[22px] w-[22px] shadow rounded-full bg-alfa-800 text-white text-xs hover:ring" title="rktel" on:click="{_=> bUserOptions = !bUserOptions}">R</button>
           {#if bUserOptions}
             <div class="absolute top-8 right-8 shadow grid gap-3 p-3 z-10">
                <div class="rounded-t">
                    <p class="text-dark-700 text-xs font-medium">Ricardo Hernández (rktel)</p> 
                </div>
                <button class="text-dark-600 text-sm">Cerrar sesión</button>
             </div>
           {/if}

        <button>A</button>
    </div>
</div>
<svelte:component this="{subpageOn.component}"></svelte:component>