<script>
    import { Meteor } from "meteor/meteor";

    let username = "";
    let password = "";

    const fLogin = () => {
        Meteor.loginWithPassword(username, password);
    };
    const styles = {
        container: "h-screen text-dark-800 dark:bg-dark-800 dark:text-white grid grid-cols-1 sm:grid-cols-[1fr,500px]",
        left: "hidden sm:grid",
        right: "grid place-items-center",
        form: "grid grid-rows-[106px,60px,60px,66px] w-3/4 gap-10",
        title: "text-xl",
        form_control: "grid grid-rows-2",
        label: "text-dark-700 dark:text-dark-400",
        input: "h-10 ring-1 ring-dark-300 rounded px-3 dark:text-dark-800 focus:outline-none focus:ring-alfa-500",
        submit: "uppercase bg-alfa-700 shadow text-white rounded w-full h-12 mt-3"
    }
</script>

<div class="{styles.container}">
    <!-- LEFT -->
    <div class="{styles.left} bg-special">

    </div>
    <!-- LEFT_END -->
    <!-- RIGHT -->
    <div class="{styles.right}">

        <form class="{styles.form}" on:submit|preventDefault={fLogin}>
            <h1 class="{styles.title}">Iniciar sesión</h1>
            <div for="username" class="{styles.form_control}">
                <label for="username" class="{styles.label}">Nombre de usuario</label>
                <input class="{styles.input}" type="text" name="username" required bind:value={username}>
            </div>
            <div for="password" class="{styles.form_control}">
                <label for="password" class="{styles.label}">Contraseña</label>
                <input class="{styles.input}" type="password" name="password" required bind:value={password}>
            </div>
            <div>
                <button type="submit" class="{styles.submit}">inicio de sesión</button>
            </div>
        </form>

    </div>
    <!-- RIGHT_END -->
</div>
<style>
    .bg-special{
        background-color: #1D4ED8;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%2360A5FA'/%3E%3Cstop offset='1' stop-color='%231D4ED8'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%233f7ae9'/%3E%3Cstop offset='1' stop-color='%231D4ED8'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='translate(320 0)'%3E%3Cg %3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(-226.8 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        background-attachment: fixed;
        background-size: cover;
    }
</style>

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
