<script>
    let username;
    let password;
    let firstname;
    let lastname;
    let bDrawer = true;
    let users = [];
    const fToggleDrawer = () => bDrawer = !bDrawer;
    const fCreateUser = () =>{
        username = username.toLowerCase();
        firstname = firstname.toLowerCase();
        lastname = lastname.toLowerCase();
        Meteor.call('users.create',{username,password,firstname,lastname});
        fToggleDrawer();
        fGetAllUsers();
        username = '';
        password = '';
        firstname = '';
        lastname = '';
    }
    const fGetAllUsers = () =>{
        Meteor.call('users.getAll', (e,r)=>{
            users = r;
        });
    }
    const fRemoveUser = (_id) =>{
        Meteor.call('users.remove',_id)
        fGetAllUsers()
    }
</script>
<!-- CONTAINER -->
<div class="dark:bg-dark-800 h-[calc(100vh_-_32px)] grid grid-cols-[340px,1fr] gap-1">
    <!-- LEFT -->
    <div class="grid grid-rows-[40px,40px] gap-3 p-5 border-dark-300 border-r">
        <div>
            <button class="bg-alfa-700 shadow text-white text-xs rounded w-full h-8" on:click="{fGetAllUsers}"> Ver usuarios</button>
        </div>
        <div>
            <button class="bg-alfa-700 shadow text-white text-xs rounded w-full h-8" on:click="{fToggleDrawer}"> Nuevo usuario</button>
        </div>
    </div>
    <!-- LEFT_END -->
    <!-- RIGHT -->
    <div class="p-5 overflow-hidden">

        {#if users[0]}
            <table class="min-w-full text-sm">
                <thead>
                    <tr class="font-medium text-dark-700 dark:text-white h-10">
                        <th>Nombre completo</th>
                        <th>Usuario</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {#each users as user }
                    <tr class="text-dark-600 dark:text-dark-400 text-center h-9">
                        <td>{user.profile.fullname}</td>
                        <td>{user.username}</td>
                        <td>
                            <button class="bg-beta-700 shadow text-white text-xs rounded h-7 min-w-[100px]" on:click="{_=>fRemoveUser(user._id)}">Eliminar</button>
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
        {/if}

    </div>
    <!-- RIGHT_END -->
</div>
<!-- CONTAINER_END -->

<!-- DRAWER -->
{#if bDrawer}
    <div class="dark:bg-dark-800 bg-white h-[calc(100vh_-_32px)] shadow-lg absolute top-8 z-30 w-[340px] grid grid-rows-[50px,1fr]">
        <!-- BAR -->
        <div class="flex justify-end px-4 items-center"> 
            <button class="h-6 w-6 shadow rounded-full text-white text-xs hover:ring" on:click={_=> bDrawer = false}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-6 w-6 fill-dark-700 dark:fill-dark-300"><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
            </button>
        </div>
        <!-- BAR_END -->
        <div class="flex flex-col p-10 gap-6">

            <div class="grid grid-rows-[auto,auto] gap-1">
                <label for="firstname" class="text-dark-700 dark:text-dark-200 text-xs">Nombre</label>
                <input bind:value="{firstname}" type="text" name="firstname" class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500" required>
            </div>

            <div class="grid grid-rows-[auto,auto] gap-1">
                <label for="lastname" class="text-dark-700 dark:text-dark-200 text-xs">Apellido</label>
                <input bind:value="{lastname}" type="text" name="lastname" class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500" required>
            </div>
            <div class="grid grid-rows-[auto,auto] gap-1">
                <label for="_username" class="text-dark-700 dark:text-dark-200 text-xs">Nombre de usuario</label>
                <input bind:value="{username}" type="text" name="_username" class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500" required>
            </div>
            <div class="grid grid-rows-[auto,auto] gap-1">
                <label for="_password" class="text-dark-700 dark:text-dark-200 text-xs">Contraseña</label>
                <input bind:value="{password}" type="text" name="_password" class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500" required>
            </div>
            <div class="">
                <button class="bg-alfa-700 shadow text-white text-xs rounded w-full h-9 mt-2" on:click="{fCreateUser}">
                    Crear usuario
                </button>
            </div>
        </div>
    </div>
{/if}

<!-- DRAWER_END -->