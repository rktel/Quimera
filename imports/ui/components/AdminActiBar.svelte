<div class="flex items-center h-10 sm:h-8 select-none">
    <!-- <button class="tab">Usuarios</button>
    <button class="tab tab-active">Reportes</button>
    <button class="tab">Mensajes</button>
    <button class="tab">Ruta</button>
    <button class="tab">Auditoria</button> -->
    {#each tabs as tab }
        <button class={tab.class} on:click={_=>jselecTab(tab.index)}> {tab.name}</button>
    {/each}
    <div class="no-tab" />
</div>
<script>
    const tabs = [
        {index: 0, name:'Usuarios' ,class:'tab'},
        {index: 1, name:'Reportes',class:'tab'},
        {index: 2, name:'Mensajes',class:'tab'},
        {index: 3, name:'Rutas',class:'tab'},
        {index: 4, name:'Auditoria',class:'tab'},
    ];
    const jselecTab = (index) => {
        console.log(index);
    }
</script>