<script>
    let username;
    let password;
    let firstname;
    let lastname;
    let bDrawer = false;
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
            <button class="bg-alfa-700 shadow text-white text-xs rounded w-full h-8"> Crear usuario</button>
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
    <div class="dark:bg-dark-800 bg-white h-[calc(100vh_-_32px)] shadow-lg absolute top-8 z-30 w-[400px] grid grid-rows-[40px,1fr]">
        <div class="bg-beta-400"> 
            <button>Cerrar</button>
        </div>
        <div class="bg-beta-500">
            Hola
        </div>
    </div>
{/if}

<!-- DRAWER_END -->