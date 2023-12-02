<script>
    import { fly } from 'svelte/transition';
    export let isOpen = false;

    $: rightPosition = isOpen ? 'calc(70% - 60px)' : '0px';

    function toggleMenu() {
        isOpen = !isOpen;
    }

    async function logout() {
        try {
            const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('token'),
                },
            });
            if (response.ok) {
                const data = await response.json();
                window.location.href = data.redirect;
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };
</script>

{#if !isOpen} <!--Sets the button location when the side menu is closed-->
<button on:click={toggleMenu} class="text-4xl z-30 fixed left-0 p-4">
    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
        <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
        </svg>
</button>
{/if}

{#if isOpen} <!--Sets the button location when the side menu is open and opens the side menu-->
<div transition:fly={{ x: -300, duration: 200 }}>
    <button on:click={toggleMenu} class="text-4xl fixed p-4" style="left: {rightPosition}; z-index:100">
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="30" height="30" viewBox="0 0 50 50">
            <path d="M 3 9 A 1.0001 1.0001 0 1 0 3 11 L 47 11 A 1.0001 1.0001 0 1 0 47 9 L 3 9 z M 3 24 A 1.0001 1.0001 0 1 0 3 26 L 47 26 A 1.0001 1.0001 0 1 0 47 24 L 3 24 z M 3 39 A 1.0001 1.0001 0 1 0 3 41 L 47 41 A 1.0001 1.0001 0 1 0 47 39 L 3 39 z"></path>
        </svg>
    </button>
    
    <div class="fixed inset-y-0 left-0 z-20 h-screen" style="width: 70%; background-color: #F65800; z-index:99">
        <div class="flex flex-col h-full justify-between">
            <div>
                <div class="flex flex-col items-center justify-center" style="margin-top: 30%">
                    <h2 class="w-10 h-10 bg-gray-400 rounded-3xl center mb-4">*IMG*</h2>
                    <h1 class="text-white">*NAME*</h1>
                </div>
                <ul class="space-y-2 text-white mt-10">
                    <li class="hover:bg-orange-400 p-2 pl-10 flex items-center">
                        <a href="/app/home" class="flex items-center">
                          <img src="/Home-icon.png" alt="Home" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Home
                        </a>
                    </li>
                    <li class="hover:bg-orange-400 p-2 pl-10 flex items-center">
                        <a href="/app/stats" class="flex items-center">
                          <img src="/Stats-icon.png" alt="Stats" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Stats
                        </a>
                    </li>
                    <li class="hover:bg-orange-400 p-2 pl-10 flex items-center">
                        <a href="" class="flex items-center">
                            <img src="/Profile-icon.png" alt="Profile" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Profile 
                        </a>
                    </li>
                    <li class="hover:bg-orange-400 p-2 pl-10 flex items-center">
                        <a href="" class="flex items-center">
                            <img src="/Activities-icon.png" alt="Favorites" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Activities 
                        </a>
                    </li>
                    <li class="hover:bg-orange-400 p-2 pl-10 flex items-center">
                        <a href="/app/stats" class="flex items-center">
                            <img src="/Leaderboard-icon.png" alt="Stats" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Leaderboard 
                        </a>
                    </li>
                    <li class="hover:bg-orange-400 p-2 pl-10 flex items-center">
                        <a href="" class="flex items-center">
                            <img src="/Map-icon.png" alt="Discover" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Map 
                        </a>
                    </li>
                    <li class="hover:bg-orange-400 p-2 pl-10 flex items-center text-base">
                        <a href="/app/friends" class="flex items-center">
                            <img src="/Friends-icon.png" alt="Feed" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Friends 
                        </a>
                    </li>
                </ul>
            </div>

            <ul class="space-y-2 text-white" style="margin-bottom: 10%">
                <li class="hover:bg-orange-400 p-2 pl-10 flex items-center text-base">
                    <img src="/Settings-icon.png" alt="Settings" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Settings
                </li>
                <li on:click={logout} class="hover:bg-orange-400 p-2 pl-10 flex items-center text-base">
                   <img src="/Logout-icon.png" alt="Log Out" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Log Out
                </li>
            </ul>
        </div>
    </div>
</div>
{/if}
  