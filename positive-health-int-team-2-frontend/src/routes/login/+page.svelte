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

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100&display=swap');
</style>

<div bind:this={errorDisplay} class="fixed bg-red-600 w-screen text-white p-3 hidden">
    {#if errorDisplay}
        <span> {errorContent} </span>
    {/if}
</div>
<div class="h-screen relative" style="background: linear-gradient(to right, #F65800, #FF0000C2);">
  <div class="absolute bottom-0 w-full" style="height: 84%; background: #F6F7FB; box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);border-radius: 20px 20px 0px 0px;">
    <div class="bg-white rounded-t-3xl p-8 overflow-auto" style="height: 100%;">
      <div>
        <div class="mb-10 mt-10 flex justify-center">
          <img src="/logo.png" alt="StepUp! logo" class="w-48, h-40">
        </div>
        <form on:submit={login}>
          <div class="mb-4">
            <input type="email" bind:value={email} placeholder="Username" class="bg-transparent w-full py-2 px-4 focus:outline-none" style="border: none; border-bottom: 3px solid #F65800; background-color: transparent;">
          </div>

          <div class="mb-6">
            <input type="password" bind:value={password} placeholder="Password" class="p-0 bg-transparent w-full py-2 px-4 focus:outline-none" style="border: none; border-bottom: 3px solid #F65800; background-color: transparent;">
          </div>

          <div class="text-center mb-6">
            <a href="/forgot-password" class="hover:text-orange-600" style="color: #213037;">Forgot password?</a>
          </div>
          <!-- Button container with flexbox -->
          <div class="flex justify-center mb-6 gap-10">
            <!-- Register Button -->
            <button type="button" onclick="location.href='/register'" class="py-2 px-6 rounded-full text-white focus:outline-none hover:bg-orange-600 font-bold w-60 h-12" style="background: linear-gradient(to right, #F65800, #FF0000C2);">Register</button>
            <!-- Login Button -->
            <button type="submit" class="py-2 px-6 rounded-full text-white focus:outline-none hover:bg-orange-600 font-bold w-60 h-12" style="background: linear-gradient(to right, #F65800, #FF0000C2);">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>



  