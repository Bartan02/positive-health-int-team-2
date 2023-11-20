<script>
	import { goto } from "$app/navigation";
	import { authHandlers } from "../../stores/authStore";

    let email = '';
    let password = '';
    let username = '';
    let confirmPassword = '';

    async function handleSubmit(){
        if(!email || !password || !username || !confirmPassword){
            return;
        }
        else if(email && username && password==confirmPassword){
            try{
                await authHandlers.signup(email,password,username);
            }
            catch(err){
                console.log(err);
            }
        }
    }
</script>

<div class="flex justify-between flex-col w-screen h-screen">
    <div class="h-20 w-full"></div>          
    <div class="w-full h-full center flex-col">          
        <div class="w-full h-1/3 center">
            <img src="/logo.png" alt="StepUp!_logo" class="h-2/3">
        </div>
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
                <a  class="w-1/3 h-3/5">
                    <div on:click={handleSubmit} class="w-full h-full border border-orange-500 center rounded-3xl">
                        <h2 >Join</h2>
                    </div>
                </a>
            </div>    
        </div>
    </div>  
</div>  