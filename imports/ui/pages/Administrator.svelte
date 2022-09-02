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
        active: "text-alfa-500"
    }

 
</script>

<div class="h-9 text-sm font-light bg-dark-200 text-dark-800 grid grid-cols-12">
    {#each subpages as $subpage }
        <button class="{$subpage.index===subpageOn.index?styles.active:''}" on:click="{_=>fLoadSubpage($subpage)}">{$subpage.name}</button>
    {/each}
</div>
<svelte:component this="{subpageOn.component}"></svelte:component>