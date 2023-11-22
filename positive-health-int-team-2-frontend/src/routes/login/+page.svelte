<script>
	import { authHandlers } from "../../stores/authStore";

    let email = '';
    let password = '';

    async function handleSubmit(){
        if(!email || !password){
            return;
        }
        else{
            try{
                await authHandlers.login(email,password);
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
                <a href="/login" class="w-1/3 h-3/5">
                    <div class="w-full h-full border border-orange-500 center rounded-3xl">
                        <h2 on:click={handleSubmit}>Login</h2>
                    </div>
                </a>
            </div>    
        </div>
    </div>  
</div>