<div class="tabPanelContainer">
    <div class="tabPanelSideLeft">

        <div class="p-3 flex flex-col gap-3">
            <button class="btn btn-light" on:click={jtoggleModal}> CREAR USUARIO </button>
            <button class="btn btn-light" on:click={jgetAllUsers}> VER USUARIOS </button>
        </div>

    </div>
    <div class="tabPanelSideRight">

        <div class="p-3 flex flex-col gap-3">
            {#if users[0]}
                {#each users as user}
                    <div class="flex">
                        <div class="flex-1 overflow-hidden border-l border-y border-solid border-zinc-400">
                            <span>{user.username}</span>
                        </div>
                        <div class="flex-none overflow-hidden border-x border-y border-solid border-zinc-400">
                            <button class="btn btn-light btn-small">ELIMINAR</button>
                        </div>
                    </div>
                {/each}
            {/if}
        </div>

    </div>
</div>

{#if openModal}
<div class="absolute z-10 top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-slate-500 bg-opacity-25" >
    <div class="h-[600px] w-[400px] bg-white shadow-lg">
        
        <div class="defaultBar">
            <div></div>
            <button class="btn btn-light btn-small" on:click={jtoggleModal}> X &nbsp;  Cerrar</button>
        </div>

            <form class="flex flex-col justify-center  gap-10 h-[calc(100%_-_32px)]" on:submit|preventDefault={jcreateUser}>

                <div>
                    <h1 class="text-xl text-gray-800 px-5">Complete los siguientes campos</h1>
                </div>

                <div class="flex flex-col items-center gap-5">
                    <div class="flex flex-col">
                        <label for="username" class="inline-block mb-2 text-gray-700"
                            >Nombre de usuario</label>
        
                        <input
                            class="form-input"
                            type="text"
                            name="username"
                            required
                            bind:value={username}
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
                            bind:value={password}
                        />
                    </div>
                    <div class="flex flex-col gap-3 mt-3">
                        <button class="btn btn-light" type="submit"
                            >CREAR USUARIO</button
                        >
                    </div>
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
    let username;
    let password;
    const jcreateUser = () =>{
        Meteor.call('users.create',{username,password});
        jtoggleModal();
    }
    let users = [];
    const jgetAllUsers = () =>{
        Meteor.call('users.getAll', (e,r)=>{
            users = r;
        });
    }
  </script>