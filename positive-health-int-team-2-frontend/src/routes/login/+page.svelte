<script>
	import { error } from '@sveltejs/kit';
    import validateEmail from '../../lib/authverification.js';
    let email = '';
    let password = '';
  
    const login = async () => {
    try {
    if (!validateEmail(email)) throw "Typped email is invalid. Your email should look like this: email@domain.com";
    const response = await fetch('http://localhost:3020/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      // Redirect to the specified route
      window.location.href = data.redirect;
    } else {
        if(response.status == 401) throw 'Your email and password are incorrect. Check if you included a typo in your credentials.';
        else if(response.status == 500) throw 'There are some problems with our server. If the problem still persists, please contact us.';
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
    };
  </script>


<div class="flex justify-between flex-col w-screen h-screen">
    <div class="h-20 w-full"></div>          
    <div class="w-full h-full center flex-col">          
        <div class="w-full h-1/3 center">
            <img src="/logo.png" alt="StepUp!_logo" class="h-2/3">
        </div>
        <form on:submit={login}>
        <div class="w-full h-2/3">
            <div class="center h-10">
                <div class="w-2/3 h-full center border-b border-orange-400">
                    <input type="email" bind:value={email} placeholder="Email" class="bg-transparent outline-none w-full">
                </div>
            </div>
            <div class="center h-10">
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
                        <h2 href="/register">Register</h2>
                    </div>
                </a>
                <a class="w-1/3 h-3/5">
                    <button type="submit" class="w-full h-full border border-orange-500 center rounded-3xl">
                        <h2>Login</h2>
                    </button>
                </a>
            </div>    
        </div>
        </form>
    </div>  
</div>