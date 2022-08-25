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
    <div class="h-2/3 w-1/3 bg-white shadow-lg">
        
        <div class="defaultBar">
            <div></div>
            <button class="btn btn-light btn-small" on:click={jtoggleModal}> X &nbsp;  Cerrar</button>
        </div>

            <form class="flex flex-col justify-center items-center gap-5 bg-slate-500 h-[calc(100%_-_32px)]">
                <div class="flex flex-col">
                    <label for="username" class="inline-block mb-2 text-gray-700"
                        >Nombre de usuario</label>
    
                    <input
                        class="form-input"
                        type="text"
                        name="username"
                        required
                        
                    />
                </div>
                <div class="flex flex-col">
                    <label for="username" class="inline-block mb-2 text-gray-700"
                        >Contraseña</label>
    
                    <input
                        class="form-input"
                        type="text"
                        name="password"
                        required
                        
                    />
                </div>
                <div class="flex flex-col gap-3 mt-3">
                    <button class="btn btn-light" type="submit"
                        >CREAR USUARIO</button
                    >
                </div>
            </form>

    </div>
  </div>
{/if}

  <script>
    let openModal = false;
    const jtoggleModal = () => {
        openModal = !openModal;
    }
  </script>