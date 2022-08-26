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

            <div class="flex flex-col">
                <table class="min-w-full text-center">
                    <thead>
                        <tr>
                            <th class="tableHeadItem">
                                #
                            </th>
                            <th class="tableHeadItem">
                                Nombre de usuario
                            </th>
                            <th class="tableHeadItem">
                                Accion
                            </th>                             
                        </tr>
                    </thead>
                    <tbody>
                        {#each users as user,i}
                        <tr class="bg-white border-b">
                            <td class="tableBodyItem">
                                {i+1}
                            </td>
                            <td class="tableBodyItem">
                                {user.username}
                            </td>
                            <td class="tableBodyItem">
                                <button class="btn btn-light btn-small" on:click={_=> jremoveUser(user._id)}>ELIMINAR</button>
                            </td>
                        </tr>
                        {/each}
                    </tbody>

                </table>
            </div>
            {/if}
        </div>

    </div>
</div>

{#if openModal}
<div class="modalCover" >
    <div class="h-[500px] w-[350px] bg-white shadow-lg rounded">
        
        <div class="defaultBar rounded-t">
            <div></div>
            <button class="btn btn-light btn-small" on:click={jtoggleModal}> X &nbsp;  Cerrar</button>
        </div>

            <form class="flex flex-col justify-center gap-10 h-[calc(100%_-_32px)]" on:submit|preventDefault={jcreateUser}>

                <div>
                    <h1 class="text-lg text-gray-800 px-5">Complete los siguientes campos</h1>
                </div>

                <div class="flex flex-col justify-center px-5 gap-5">
                    <div class="flex flex-col">
                        <label for="username" class="inputLabel"
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
                        <label for="username" class="inputLabel"
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
        jgetAllUsers();
        username = '';
        password = '';
    }
    let users = [];
    const jgetAllUsers = () =>{
        Meteor.call('users.getAll', (e,r)=>{
            users = r;
        });
    }
    const jremoveUser = (_id) =>{
        Meteor.call('users.remove',_id)
        jgetAllUsers()
    }
  </script>