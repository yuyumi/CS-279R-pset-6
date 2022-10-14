<script>
    import { Meteor } from 'meteor/meteor';

    let username = "";
    let password = "";

    // Handle username/password submission
    const handleSubmit = () => {
        Meteor.loginWithPassword(username, password);
    }
</script>

<form class="login-form" on:submit|preventDefault={handleSubmit}>

    <!-- Input Box for username -->
    <div>
        <label for="username">Username</label>

        <input
                type="text"
                placeholder="Username"
                name="username"
                required
                bind:value={username}
        />
    </div>

    <!-- Input Box for password -->
    <div>
        <label for="password">Password</label>

        <input
                type="password"
                placeholder="Password"
                name="password"
                required
                bind:value={password}
        />
    </div>

    <!-- Login button -->
    <div>
        <button type="submit">Log In</button>
    </div>
</form>