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
        active: "bg-white text-alfa-500 shadow-md"
    }

 
</script>

<div class="h-8 text-sm font-normal bg-dark-200 text-dark-500 grid grid-cols-[120px,120px,120px,1fr,200px]">
    {#each subpages as $subpage }
        <button class="{$subpage.index===subpageOn.index?styles.active:''}" on:click="{_=>fLoadSubpage($subpage)}">{$subpage.name}</button>
    {/each}
    <div></div>
    <div class="bg-white flex justify-end items-center gap-2">
        <button class="h-4 w-4 rounded-full bg-alfa-500 text-white">R</button>
        <button>A</button>
    </div>
</div>
<svelte:component this="{subpageOn.component}"></svelte:component>