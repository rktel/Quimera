<script>
    
    import Users from "./subpages/Users.svelte";
    import Reports from "./subpages/Reports.svelte";
    import Messages from "./subpages/Messages.svelte";
    
    const subpages = [
        {name:"Users", component: Users},
        {name:"Reports", component: Reports},
        {name:"Messages", component: Messages},
    ]
    let subpageOn = subpages[0];
    const fLoadSubpage = subpage => subpageOn = subpage;
    const styles = {
        active: "text-alfa-500"
    }

 
</script>

<div>
    {#each subpages as $subpage }
        <button class="{$subpage===subpageOn?styles.active:''}" on:click="{_=>fLoadSubpage($subpage)}">{$subpage.name}</button>
    {/each}
</div>
<svelte:component this="{subpageOn.component}"></svelte:component>