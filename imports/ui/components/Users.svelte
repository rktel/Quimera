<div class="tabPanelContainer">
    <div class="tabPanelSideLeft">

        <div class="p-3 flex flex-col gap-3">
            <button class="btn btn-light" on:click={jopenModal}> CREAR USUARIO </button>
            <button class="btn btn-light"> VER USUARIOS </button>
        </div>

    </div>
    <div class="tabPanelSideRight">2</div>
</div>

{#if openModal}
<div class="absolute z-10 top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-slate-500 opacity-30" >
    <h1>Peppa Pig</h1>
  </div>
{/if}

  <script>
    let openModal = false;
    const jopenModal = () => {
        openModal = true;
    }
  </script>