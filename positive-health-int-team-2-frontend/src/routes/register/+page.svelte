<script>

  
    let username = '';
    let password = '';
    let email = '';
    let confirmPassword = '';
  
    const register = async () => {
        try {
            const response = await fetch('http://localhost:3020/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email, username: username, password: password }),
            });

            if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            // Redirect to the specified route
            window.location.href = data.redirect;
            } else {
            console.error('Register failed');
            }
        } catch (error) {
            console.error('Error during register:', error);
        }
    };
  </script>

<div class="flex justify-between flex-col w-screen h-screen">
    <div class="h-20 w-full"></div>          
    <div class="w-full h-full center flex-col">          
        <div class="w-full h-1/3 center">
            <img src="/logo.png" alt="StepUp!_logo" class="h-2/3">
        </div>
        <form on:submit|preventDefault={register}>
        <div class="w-full h-2/3">
            <div class="center h-10">
                <div class="w-2/3 h-full center border-b border-orange-400">
                    <input type="text" bind:value={username} placeholder="Username" class="bg-transparent outline-none w-full">
                </div>
            </div>
            <div class="center h-10">
                <div class="w-2/3 h-full center border-b border-orange-400">
                    <input type="email" bind:value={email} placeholder="E-Mail" class="bg-transparent outline-none w-full">
                </div>  
            </div>    
            <div class="center h-10">
                <div class="w-2/3 h-full center border-b border-orange-400">
                    <input type="password" bind:value={password} placeholder="Password" class="bg-transparent outline-none w-full">
                </div>  
            </div>  
            <div class="center h-10">
                <div class="w-2/3 h-full center border-b border-orange-400">
                    <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" class="bg-transparent outline-none w-full">
                </div>
            </div>
            <div class="w-full h-20 center flex justify-evenly mt-5">
                <a href="/login" class="w-1/3 h-3/5">
                    <div class="w-full h-full border border-orange-500 center rounded-3xl">
                        <h2 href="/login">Already a user?</h2>
                    </div>
                </a>
                <a class="w-1/3 h-3/5">
                    <button type="submit" class="w-full h-full border border-orange-500 center rounded-3xl">
                        <h2 >Join</h2>
                    </button>
                </a>
            </div>    
        </div>
        </form>
    </div>  
</div>  