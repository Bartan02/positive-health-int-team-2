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
        try {
            if (!validateEmail(email)) throw "Typped email is invalid. Your email should look like this: email@domain.com";
            if (!checkPassword(password)) throw "Passsord does not fulfill safety requirements. ";
            if (password != confirmPassword) throw "Passwords are not the same. Make sure they are the same.";
            const response = await fetch('http://localhost:3025/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, username: username, password: password }),
            });
            if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            // Redirect to the specified route
            window.location.href = data.redirect;
            } else {
                let error = '';
                response.json().then((data) => {
                    error = data.error;
                });
                throw error;
            }
        } catch (error) {
            console.error('Error during register:', error);
            errorDisplay.classList.remove("hidden");
            errorContent = error;
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
        <form on:submit|preventDefault={register}>
        <div class="w-full h-5/6">
            <div class="center h-10 my-3">
                <div class="w-80 h-full center border-b border-orange-400">
                    <input type="text" bind:value={username} placeholder="Username" class="bg-transparent outline-none w-full">
                </div>
            </div>
            <div class="center h-10 my-3">
                <div class="w-80 h-full center border-b border-orange-400">
                    <input type="email" bind:value={email} placeholder="E-Mail" class="bg-transparent outline-none w-full">
                </div>  
            </div>    
            <div class="center h-10 my-3">
                <div class="w-80 h-full center border-b border-orange-400">
                    <input type="password" on:blur={hideMessageDisplay} on:focus={showMessageDisplay} on:keyup={checkPasswordDisplay} bind:this={myInput} bind:value={password} placeholder="Password" class="bg-transparent outline-none w-full">
                </div>  
            </div>  
            <div class="center h-10 my-3">
                <div class="w-80 h-full center border-b border-orange-400">
                    <input type="password" bind:value={confirmPassword} placeholder="Confirm Password" class="bg-transparent outline-none w-full">
                </div>
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
            <div class="w-full h-20 center flex justify-evenly mt-5">
                <a href="/login" class="w-1/3 h-3/5">
                    <div class="w-full h-full p-3 border border-orange-500 center text-center rounded-3xl">
                        <h2 href="/login">Already a user?</h2>
                    </div>
                </a>
                <span class="w-1/3 h-3/5">
                    <button type="submit" class="w-full p-3 h-max border border-orange-500 bg-orange-500 center rounded-3xl text-white">
                        <h2 >Join</h2>
                    </button>
                </span>
            </div>    
        </div>
        </form>
    </div>  
</div>  