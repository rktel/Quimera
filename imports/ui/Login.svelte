<script>
    import { fade } from 'svelte/transition';
    import { Meteor } from "meteor/meteor";
    
	let visible = true;
    let username = "";
    let password = "";

    const handleSubmit = () => {
        Meteor.loginWithPassword(username, password);
    };
</script>
{#if visible}
    <form class="login-form" on:submit|preventDefault={handleSubmit} transition:fade>
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
    
        <div>
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
{/if}



