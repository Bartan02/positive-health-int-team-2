<svelte:head>
    <title> Register | StepUp! </title>
</svelte:head>

<script>
    import validateEmail from '../../lib/authverification.js';
    import { onMount } from 'svelte';
    let username = '';
    let password = '';
    let email = '';
    let confirmPassword = '';
    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;

    let myInput, letter, capital, number, length, message, errorDisplay, errorContent;

    let usernameError = '';
    let emailError = '';
    let passwordError = '';
    let confirmPasswordError = '';

    // When the user clicks on the password field, show the message box
    function showMessageDisplay() {
        message.classList.remove("hidden");
        message.classList.add("flex");
        message.classList.add("flex-col");
    }

    // When the user clicks outside of the password field, hide the message box
    function hideMessageDisplay() {
        message.classList.remove("flex");
        message.classList.remove("flex-col");
        message.classList.add("hidden");
    }

    function checkPassword(password){
        if(password.match(lowerCaseLetters) && password.match(upperCaseLetters) && password.match(numbers) && password.length >= 8) return true;
        else return false 
    }

    const register = async () => {
        // Reset errors
        usernameError = '';
        emailError = '';
        passwordError = '';
        confirmPasswordError = '';

        try {
            if (username.trim().length === 0) {
                usernameError = "Username is required.";
                throw new Error(usernameError);
            }
            if (!validateEmail(email)) {
                emailError = "Typed email is invalid. Your email should look like this: email@domain.com";
                throw new Error(emailError);
            }
            if (!checkPassword(password)) {
                passwordError = "Password does not fulfill safety requirements.";
                throw new Error(passwordError);
            }
            if (password !== confirmPassword) {
                confirmPasswordError = "Passwords are not the same. Make sure they are the same.";
                throw new Error(confirmPasswordError);
            }
            const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ email: email, username: username, password: password }),
            });
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('userid', data.userid);
                localStorage.setItem('userinfo',data.userinfo);
            // Redirect to the specified route
                window.location.href = data.redirect;
            } else {
                // If the email is taken or other registration errors occur
                const data = await response.json();
                if (data.error && data.error.includes("email")) {
                    emailError = "This email is already taken.";
                } else {
                    emailError = "An unexpected error occurred. Please try again.";
                }
                throw new Error(data.error);
            }
        } catch (error) {
            // If it is a network error or other non-server-related issue
            if (typeof error === 'string') {
                emailError = error;
            } else {
                // errorDisplay.classList.remove("hidden");
                // errorContent = error.message || "An error occurred during registration.";
            }
        }
    };

    function checkPasswordDisplay(){
            if(password.match(lowerCaseLetters)) {
            letter.classList.remove("text-red-400");
            letter.classList.add("text-green-400");
        } else {
            letter.classList.remove("text-green-400");
            letter.classList.add("text-red-400");
        }

        // Validate capital letters
        if(password.match(upperCaseLetters)) {
            capital.classList.remove("text-red-400");
            capital.classList.add("text-green-400");
        } else {
            capital.classList.remove("text-green-400");
            capital.classList.add("text-red-400");
        }

        // Validate numbers
        if(password.match(numbers)) {
            number.classList.remove("text-red-400");
            number.classList.add("text-green-400");
        } else {
            number.classList.remove("text-green-400");
            number.classList.add("text-red-400");
        }

        // Validate length
        if(password.length >= 8) {
            length.classList.remove("text-red-400");
            length.classList.add("text-green-400");
        } else {
            length.classList.remove("text-green-400");
            length.classList.add("text-red-400");
        }
        }
  </script>
<div bind:this={errorDisplay} class="fixed bg-red-600 w-screen text-white p-3 hidden z-20">
    {#if errorDisplay}
        <span> {errorContent} </span>
    {/if}
</div>
<div class="h-screen relative" style="background: linear-gradient(to right, #F65800, #FF0000C2);">
    <div class="absolute bottom-0 w-full" style="height: 84%; background: #F6F7FB; box-shadow: 0px -4px 4px 0px rgba(0, 0, 0, 0.25);border-radius: 20px 20px 0px 0px;">
      <div class="bg-white rounded-t-3xl p-8 overflow-auto" style="height: 100%;">
        <div>
          <div class="mb-10 mt-10 flex justify-center">
            <img src="/logo.png" alt="StepUp!_logo" class="w-48 h-40">
          </div>
          <form on:submit|preventDefault={register}>
            <div class="mb-4">
              <input type="text" bind:value={username} placeholder="Username" class="bg-transparent w-full py-2 px-4 focus:outline-none" style="border: none; border-bottom: 3px solid #F65800; background-color: transparent;">
              {#if usernameError}
              <p class="text-red-500 text-xs italic">{usernameError}</p>
          {/if}
            </div>
            <div class="mb-4">
              <input type="email" bind:value={email} placeholder="E-Mail" class="bg-transparent w-full py-2 px-4 focus:outline-none" style="border: none; border-bottom: 3px solid #F65800; background-color: transparent;">
              {#if emailError}
              <p class="text-red-500 text-xs italic">{emailError}</p>
          {/if}
            </div>    
            <div class="mb-4">
              <input type="password" on:blur={hideMessageDisplay} on:focus={showMessageDisplay} on:keyup={checkPasswordDisplay} bind:this={myInput} bind:value={password} placeholder="Password" class="bg-transparent w-full py-2 px-4 focus:outline-none" style="border: none; border-bottom: 3px solid #F65800; background-color: transparent;">
              {#if passwordError}
              <p class="text-red-500 text-xs italic">{passwordError}</p>
          {/if}
            </div>  
            <div class="center mt-6">
                <div class="w-full h-full border-2 border-red-500 p-4 mx-auto center rounded-lg hidden text-left" bind:this={message} id="message">
                        <h3 class="text-lg font-bold mb-2">Password must contain the following:</h3>
                        <p id="letter" bind:this={letter} class="text-red-400 text-left">A <b>lowercase</b> letter</p>
                        <p id="capital" bind:this={capital} class="text-red-400 text-left">A <b>capital (uppercase)</b> letter</p>
                        <p id="number" bind:this={number} class="text-red-400 text-left">A <b>number</b></p>
                        <p id="length" bind:this={length} class="text-red-400 text-left">Minimum <b>8 characters</b></p>
                </div>
            </div>
            <div class="mb-12">
              <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" class="bg-transparent w-full py-2 px-4 focus:outline-none" style="border: none; border-bottom: 3px solid #F65800; background-color: transparent;">
              {#if confirmPasswordError}
              <p class="text-red-500 text-xs italic">{confirmPasswordError}</p>
          {/if}
            </div>
            <div class="flex justify-center mb-6 gap-10">
                <button type="button" onclick="location.href='/login'" class="px-6 rounded-full text-white focus:outline-none hover:bg-orange-600 font-bold w-60 h-12" style="background: linear-gradient(to right, #F65800, #FF0000C2);">Already a user?</button>
                <button type="submit" class="rounded-full text-white focus:outline-none hover:bg-orange-600 font-bold w-60 h-12" style="background: linear-gradient(to right, #F65800, #FF0000C2);">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>