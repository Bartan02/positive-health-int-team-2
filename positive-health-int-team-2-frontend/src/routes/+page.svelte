<svelte:head>
    <title> StepUp! </title>
</svelte:head>

<div class="flex justify-between flex-col w-screen h-screen">
    <div class="h-20 w-full">

    </div>          
    <div class="h-3/4 w-full flex justify-center items-center">
        <img src="/logo.png" alt="StepUp!_logo">
    </div>
    <div class="h-1/4 w-full flex flex-col p-5 gap-4 select-none">        
        <a  href="/login" class="h-1/2 w-full">
            <div class="bg-orange-500 w-full h-full rounded-3xl flex justify-center items-center">
                    <h1 class="font-bold text-white text-xl">Login</h1>
            </div>  
        </a>   
        <a href="/register" class="h-1/2 w-full">
            <div class="w-full h-full border border-black border-solid rounded-3xl flex justify-center items-center">
                <h1 class="text-xl">Register</h1>
            </div>  
        </a>     
    </div>
</div>