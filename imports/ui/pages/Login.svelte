<script>
    import { Meteor } from "meteor/meteor";

    let username = "";
    let password = "";

    const flogin = () => {
        Meteor.loginWithPassword(username, password);
    };
</script>

<div class="h-screen text-gray-800 grid grid-cols-1 sm:grid-cols-[1fr,380px]">
    <!-- LEFT -->
    <div class="bg-violet-500 hidden sm:grid">

    </div>
    <!-- LEFT_END -->
    <!-- RIGHT -->
    <div class="bg-violet-700 grid place-items-center">

        <form>
            <h1>Iniciar sesión</h1>
            <div for="username" class="block">
                <label for="username">Nombre de usuario</label>
                <input type="text" name="username" required>
            </div>
            <div for="password" class="block">
                <label for="password">Contraseña</label>
                <input type="password" name="password" required>
            </div>
            <button type="submit">inicio de sesión</button>
        </form>

    </div>
    <!-- RIGHT_END -->
</div>


<!-- <div class="h-screen bg-neutral-200 flex">
    <div class="hidden sm:flex sm:justify-center sm:items-center sm:flex-1">
        <h1>QUIMERA</h1>
    </div>
    <div
        class="bg-zinc-200 grid place-content-center flex-1 sm:flex-none sm:basis-96 gap-7"
    >
        <div>
            <h1 class="text-xl text-gray-800">Iniciar sesión</h1>
        </div>
        <form
            on:submit|preventDefault={jlogin}
            class="flex flex-col items-center gap-5 px-5"
        >
            <div class="flex flex-col">
                <label for="username" class="inputLabel"
                    >Nombre de usuario</label
                >

                <input
                    class="form-input"
                    type="text"
                    name="username"
                    required
                    bind:value={username}
                />
            </div>

            <div class="flex flex-col">
                <label for="password" class="inputLabel"
                    >Contraseña</label
                >

                <input
                    class="form-input"
                    type="password"
                    name="password"
                    required
                    bind:value={password}
                />
            </div>
            <div class="flex flex-col gap-3 mt-3">
                <button class="btn btn-light" type="submit"
                    >INICIO DE SESIÓN</button
                >
            </div>
        </form>
    </div>
</div> -->
