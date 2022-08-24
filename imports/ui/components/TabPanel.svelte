<script>
	import { getContext } from 'svelte';
	import { TABS } from './Tabs.svelte';

	const panel = {};
	const { registerPanel, selectedPanel } = getContext(TABS);

	registerPanel(panel);
</script>

{#if $selectedPanel === panel}
<div class="bg-zinc-200 tabPanel">
	<slot></slot>
</div>

{/if}

<style>
	.tabPanel{
		height: calc(100vh - 80px);
	}

	@media (min-width: 640px) {
    .tabPanel{
        height: calc(100vh - 64px);
    }
}
</style>