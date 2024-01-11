<svelte:head>
    <title> Login | StepUp! </title>
</svelte:head>

<script>
	import { error } from '@sveltejs/kit';
    import validateEmail from '../../lib/authverification.js';
    import { user } from '../../stores/user.js';
    let email = ''; 
    let password = '';
    

    let errorDisplay, errorContent;
  
    const login = async () => {
    try {
    if (!validateEmail(email)) throw "Typped email is invalid. Your email should look like this: email@domain.com";
    const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('userid', data.userid);
      localStorage.setItem('userinfo', JSON.stringify(data.userinfo));
      user.set({ id: data.userid, token: data.token });
      // Redirect to the specified route
      window.location.href = data.redirect;
    } else {
        if(response.status == 401) throw 'Your email and password are incorrect. Check if you included a typo in your credentials.';
        else if(response.status == 500) throw 'There are some problems with our server. If the problem still persists, please contact us.';
    }
  } catch (error) {
            console.error('Error during login:', error);
            errorDisplay.classList.remove("hidden");
            errorContent = error;
        }
  }
  </script>

<div bind:this={errorDisplay} class="fixed bg-red-600 w-screen text-white p-3 hidden">
    {#if errorDisplay}
        <span> {errorContent} </span>
    {/if}
</div>
<div class="flex justify-between flex-col w-screen h-screen">
    <div class="h-20 w-full"></div>          
    <div class="w-full h-full center flex-col">          
        <div class="w-full h-1/3 center">
            <img src="/logo.png" alt="StepUp!_logo" class="h-2/3">
        </div>
        <form on:submit={login}>
        <div class="w-full h-2/3">
            <div class=" w-80 center h-10 my-3">
                <div class="w-2/3 h-full center border-b border-orange-400">
                    <input type="email" bind:value={email} placeholder="Email" class="bg-transparent outline-none w-full">
                </div>
            </div>
            <div class="w-80 center h-10 my-3">
                <div class="w-2/3 h-full center border-b border-orange-400">
                    <input type="password" bind:value={password} placeholder="Password" class="bg-transparent outline-none w-full">
                </div>  
            </div>    
            <div class="w-full h-10 center">
                <h2>Forgot password?</h2>
            </div>
            <div class="w-full h-20 center flex justify-evenly">
                <a href="/register" class="w-1/3 h-3/5">
                    <div class="w-full h-full border border-orange-500 center rounded-3xl">
                        <h2 a href="/register">Register</h2>
                    </div>
                </a>
                <span class="w-1/3 h-3/5">
                    <button type="submit" class="w-full bg-orange-500 h-full border border-orange-500 center rounded-3xl text-white">
                        <h2>Login</h2>
                    </button>
                </span>
            </div>    
        </div>
        </form>
    </div>  
</div>