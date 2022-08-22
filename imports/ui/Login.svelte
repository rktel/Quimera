<script>
    import { fly } from "svelte/transition";
    import { Meteor } from "meteor/meteor";
    
	let visible = false;
    let username = "";
    let password = "";

    const handleSubmit = () => {
        Meteor.loginWithPassword(username, password);
    };
    const setTimer = _ => visible = true;
    setTimeout(setTimer, 2000);
 
</script>
{#if visible}
    <form class="login-form" on:submit|preventDefault={handleSubmit} transition:fly={{ x: 0, duration: 300 }}>
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



