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
      localStorage.setItem('userid', JSON.stringify(data.userid));
      localStorage.setItem('userinfo',data.userinfo);
      user.set({ id: data.userid, token: data.token });
      console.log('Store updated with:', { id: data.userid, info: data.userinfo, token: data.token });
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
<div class="h-screen relative" style="background: linear-gradient(to right, #F65800, #FF0000C2);">
    <!-- Positioning the white box absolutely to the bottom of the screen and specifying its height -->
    <div class="absolute bottom-0 w-full" style="height: 84%; background: #F6F7FB; box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);border-radius: 20px 20px 0px 0px;"> <!-- Set the desired height here -->
      <!-- White box with content -->
      <div class="bg-white rounded-t-3xl p-8 overflow-auto" style="height: 100%;">
        <div class="mt-20">
            <div class="mb-6 flex justify-center">
                <img src="/logo.png" alt="StepUp! logo" class="w-1/2"> <!-- Adjust width as needed -->
              </div>
              <form on:submit={login}>
                <div class="mb-4">
                  <input type="email" bind:value={email} placeholder="Username" class="bg-transparent w-full border-b-2 border-orange-400 py-2 px-4 focus:outline-none">
                </div>
                <div class="mb-6">
                  <input type="password" bind:value={password} placeholder="Password" class="bg-transparent w-full border-b-2 border-orange-400 py-2 px-4 focus:outline-none">
                </div>
                <div class="mb-6">
                  <button type="submit" class="bg-orange-500 w-full py-2 rounded-full text-white focus:outline-none hover:bg-orange-600">Login</button>
                </div>
                <div class="text-center mb-4">
                  <a href="/forgot-password" class="text-orange-500 hover:text-orange-600">Forgot password?</a>
                </div>
              </form>
              <div class="text-center">
                <a href="/register" class="text-orange-500 hover:text-orange-600">Register</a>
              </div>
        </div>
      </div>
    </div>
  </div>
  