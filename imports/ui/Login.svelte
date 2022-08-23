<script>
    import { fly } from "svelte/transition";
    import { Meteor } from "meteor/meteor";

    let username = "";
    let password = "";

    const jlogin = () => {
        Meteor.loginWithPassword(username, password);
    };
</script>

<div class="relative h-screen flex bg-zinc-200">
    <div class="hidden md:flex flex-2">Peppa</div>
    <form on:submit|preventDefault={jlogin}>
        <div>
            <label htmlFor="username">Username</label>

            <input
                type="text"
                placeholder="Username"
                name="username"
                required
                bind:value={username}
            />
        </div>

        <div class="flex-1">
            <label htmlFor="password">Password</label>

            <input
                type="password"
                placeholder="Password"
                name="password"
                required
                bind:value={password}
            />
        </div>
        <div>
            <button type="submit">Log In</button>
        </div>
    </form>
</div>
