<script>
    let username;
    let password;
    let firstname;
    let lastname;
    let bDrawer = false;
    let bLeftPanel = true;
    let users = [];
    const fToggleDrawer = () => bDrawer = !bDrawer;
    const fCreateUser = () =>{
        username = username.toLowerCase();
        firstname = firstname.toLowerCase();
        lastname = lastname.toLowerCase();
        Meteor.call('users.create',{username,password,firstname,lastname});
        //fToggleDrawer();
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
    const fToggleAllLeft = ()=> {
        if(bLeftPanel){
            bDrawer = false;
            bLeftPanel = false;
        }else{
            bDrawer = false;
            bLeftPanel = true;
        }

    }
</script>
<!-- CONTAINER -->
<div class="dark:bg-dark-700 bg-dark-50 h-[calc(100%_-_40px)] flex">
    <!-- LEFT -->   
    {#if bLeftPanel}
        <div class="grid grid-rows-[50px,1fr] shadow-lg basis-[300px]">
            <!-- BAR -->
            <div class="flex justify-end px-4 items-center"> 

            </div>
            <!-- BAR_END -->
            <div class="flex flex-col p-10 gap-6">
                <div>
                    <h1 class="text-dark-700 dark:text-dark-100 font-bold text-sm">SELECCIONE OPCION</h1>
                </div>
                <div>
                    <button class="bg-alfa-600 shadow uppercase font-bold  text-white text-xs rounded w-full h-9" on:click="{fGetAllUsers}"> Listar usuarios</button>
                </div>
                <div>
                    <button class="bg-alfa-600 shadow uppercase font-bold  text-white text-xs rounded w-full h-9" on:click="{fToggleDrawer}"> Registrar nuevo usuario</button>
                </div>
            </div>
        </div>
    {/if}
    <!-- LEFT_END -->

    <!-- RIGHT -->
    <div class="overflow-hidden flex-1 p-5 h-full">
    
        {#if users[0]}
            <!-- BAR ACTION -->
            <div class="bg-dark-300 h-[30px] flex border-dark-50 border-b">
                <!-- toggle all left panels -->
                <button class="h-[30px] px-2" on:click={fToggleAllLeft}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 fill-dark-500" viewBox="0 0 512 512"><path d="M406.6 374.6l96-96c12.5-12.5 12.5-32.8 0-45.3l-96-96c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224l-293.5 0 41.4-41.4c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-96 96c-12.5 12.5-12.5 32.8 0 45.3l96 96c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 288l293.5 0-41.4 41.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"/></svg>
                </button>
              <!-- toggle all left panels_end -->

                <!-- select columns -->
                <!-- select columns_end -->

                <!-- pagination -->
                <!-- pagination_end -->
            </div>
            <!-- BAR ACTION_END -->

            <!-- TABLE CONTAINER -->
            <div class="overflow-scroll h-[calc(100%_-_30px)]">
                <table class="min-w-full text-sm">
                    <thead class="bg-dark-200 dark:bg-dark-900 text-left sticky top-0">
                        <tr class="font-medium text-dark-700 dark:text-white h-10">
                            <th class="px-5">#</th>
                            <th class="px-5">Nombre</th>            
                            <th class="px-5">Apellido</th>
                            <th class="px-5">Usuario</th>
                            <th class="px-5">Creado</th>
                            <th class="px-5">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {#each users as user,i }
                        <tr class="text-dark-600 dark:text-dark-200 dark:bg-dark-800 h-9 border-b border-dark-200 dark:border-dark-600">
                            <td class="px-5">{i+1}</td>
                            <td class="px-5">{user.profile.firstname}</td>
                            <td class="px-5">{user.profile.lastname}</td>
                            <td class="px-5">{user.username}</td>
                            <td class="px-5">{user.profile.createdAtFormat}</td>
                            <td class="px-5">
                                <button class="bg-beta-700 shadow text-white text-xs rounded h-7 min-w-[60px]" on:click="{_=>fRemoveUser(user._id)}">Eliminar</button>
                            </td>
                        </tr>
                        {/each}
                    </tbody>
                </table>
            </div>
            <!-- TABLE CONTAINER_END-->
        {/if}
    </div>
    <!-- RIGHT_END -->
</div>
<!-- CONTAINER_END -->

<!-- DRAWER -->
{#if bDrawer}
    <div class="dark:bg-dark-700 bg-dark-50 shadow-lg absolute top-[40px] bottom-0 z-40 w-[300px] grid grid-rows-[50px,1fr]">
        <!-- BAR -->
        <div class="flex justify-end px-4 items-center"> 
            <button class="h-6 w-6 shadow rounded-full text-white text-xs hover:ring" on:click={_=> bDrawer = false}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-6 w-6 fill-dark-700 dark:fill-dark-300"><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
            </button>
        </div>
        <!-- BAR_END -->
        <form class="flex flex-col p-10 gap-6" on:submit|preventDefault={fCreateUser}>
            <div>
                <h1 class="text-dark-700 dark:text-dark-100 font-bold text-sm">REGISTRAR USUARIO</h1>
            </div>
            <div class="grid grid-rows-[auto,auto] gap-1">
                <label for="firstname" class="text-dark-700 dark:text-dark-300 text-xs">Nombre</label>
                <input bind:value="{firstname}" type="text" name="firstname" class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500" required>
            </div>

            <div class="grid grid-rows-[auto,auto] gap-1">
                <label for="lastname" class="text-dark-700 dark:text-dark-300 text-xs">Apellido</label>
                <input bind:value="{lastname}" type="text" name="lastname" class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500" required>
            </div>
            <div class="grid grid-rows-[auto,auto] gap-1">
                <label for="_username" class="text-dark-700 dark:text-dark-300 text-xs">Nombre de usuario</label>
                <input bind:value="{username}" type="text" name="_username" class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500" required>
            </div>
            <div class="grid grid-rows-[auto,auto] gap-1">
                <label for="_password" class="text-dark-700 dark:text-dark-300 text-xs">Contraseña</label>
                <input bind:value="{password}" type="text" name="_password" class="h-9 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500" required>
            </div>
            <div class="">
                <button class="bg-alfa-600 shadow uppercase text-white font-bold text-xs rounded w-full h-9 mt-2" type="submit">
                    Registrar
                </button>
            </div>
        </form>
    </div>
{/if}

<!-- DRAWER_END -->