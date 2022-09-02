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
    <div class="grid grid-rows-[40px,40px] gap-3 p-5">
        <div>
            <button class="bg-alfa-700 shadow text-white text-xs rounded w-full h-8"> Ver usuarios</button>
        </div>
        <div>
            <button class="bg-alfa-700 shadow text-white text-xs rounded w-full h-8" on:click={fToggleDrawer}> Crear usuario</button>
        </div>
    </div>
    <!-- LEFT_END -->
    <!-- RIGHT -->
    <div class="bg-alfa-900">
        B
    </div>
    <!-- RIGHT_END -->
</div>
<!-- CONTAINER_END -->

<!-- DRAWER -->
{#if bDrawer}
    <div class="dark:bg-dark-800 bg-white h-[calc(100vh_-_32px)] shadow-lg absolute top-8 z-30 w-[400px] grid grid-rows-[32px,1fr]">
        <div class="bg-beta-400 flex justify-end px-3"> 
            <button class="h-[22px] w-[22px] shadow rounded-full text-white text-xs hover:ring">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="h-5 w-5 fill-dark-600 dark:fill-dark-300"><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>
            </button>
        </div>
        <div class="bg-beta-500">
            Hola
        </div>
    </div>
{/if}

<!-- DRAWER_END -->