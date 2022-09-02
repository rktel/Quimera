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
        active: "bg-white text-alfa-500 shadow-lg"
    }

 
</script>

<div class="h-8 text-sm font-normal bg-dark-200 text-dark-500 grid grid-cols-[120px,120px,120px,1fr,200px]">
    {#each subpages as $subpage }
        <button class="{$subpage.index===subpageOn.index?styles.active:''} " on:click="{_=>fLoadSubpage($subpage)}">{$subpage.name}</button>
    {/each}
    <div></div>
    <div class="bg-alfa-800"></div>
</div>
<svelte:component this="{subpageOn.component}"></svelte:component>