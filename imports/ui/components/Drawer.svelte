<script>
    import { fly } from "svelte/transition";
    let drawerOpen = false;
    export const jtoggleDrawer = (_) => {
        drawerOpen = !drawerOpen;
        // console.log(drawerOpen);
    };
</script>

{#if drawerOpen}
    <div class="drawer" transition:fly={{ x: 200, duration: 500 }}>Hello</div>
{/if}
