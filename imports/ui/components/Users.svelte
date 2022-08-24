<div class="tabPanelContainer">
    <div class="tabPanelSideLeft">

        <div class="p-3 flex flex-col gap-3">
            <button class="btn btn-light" on:click={jtoggleModal}> CREAR USUARIO </button>
            <button class="btn btn-light"> VER USUARIOS </button>
        </div>

    </div>
    <div class="tabPanelSideRight">2</div>
</div>

{#if openModal}
<div class="absolute z-10 top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-slate-500 bg-opacity-25" >
    <div class="relative z-20 h-2/3 w-1/3 bg-white rounded border border-solid border-zinc-400">
        <div class="statusBar rounded-t">
            <div></div>
            <button class="btn btn-light btn-small" on:click={jtoggleModal}> x Cerrar</button>
        </div>
    </div>
  </div>
{/if}

  <script>
    let openModal = false;
    const jtoggleModal = () => {
        openModal = !openModal;
    }
  </script>