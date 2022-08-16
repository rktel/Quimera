<script>
    import { fly } from "svelte/transition";
    import { s_openDrawer} from '../../api/stores'
    let drawerOpen = false;
    s_openDrawer.subscribe(newValue => {drawerOpen = newValue})
</script>

{#if drawerOpen}
    <div class="drawer" transition:fly={{ x: 200, duration: 500 }}>Hello</div>
{/if}
