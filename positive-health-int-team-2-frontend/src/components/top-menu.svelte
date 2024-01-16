<script>
    import { user } from '../stores/user.js';
    import { slide } from 'svelte/transition';
	import { getUserInfo } from '$lib/userprofileService.js';
	import { onMount } from 'svelte';

    export let menuLabel = ''; // Add this line to create a 'menuLabel' prop
    let isOpen = false;
    export let isHome = false; // True if it's for the home page
    export let subHeader = ''; // Text for the subheader
    export let noMenu = false; // True if there is no menu
    
    $: topPosition = isOpen ? '0px' : '-100%';

    $: headerBackground = isOpen ? 'transparent' : 'linear-gradient(180deg, #F65800 0%, #F00 100%)';

    $: headerShadow = isOpen ? 'none' : '0px 4px 4px rgba(0, 0, 0, 0.25)';

    $: menuIcon = isOpen ? '/hamburger-icon-open.png' : '/hamburger-icon-closed.png';

    function toggleMenu() {
        isOpen = !isOpen;
    }

    /**
	 * @type {string | null}
	 */
    let userid;
    
    onMount(() => {
        // @ts-ignore
        userid = localStorage.getItem('userid');
    });

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
                localStorage.clear();
                window.location.href = data.redirect;
                user.set({
                    id: null,
                    token: null
                });
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [{
            href: '/app/home',
            icon: '/Home-icon.png',
            text: 'Home',
            alt: 'Home'
        },
        {
            href: '/app/profile', // Update link with profile page
            icon: '/Profile-icon.png',
            text: 'Profile',
            alt: 'Profile'
        },
        {
            href: '/app/activities',
            icon: '/Activities-icon.png',
            text: 'Activities',
            alt: 'Favorites'
        },
        {   
            href: '/app/map', // Update link with map page
            icon: '/Map-icon.png',
            text: 'Map',
            alt: 'Discover'
        },
        {
            href: '/app/friends',
            icon: '/Friends-icon.png',
            text: 'Friends',
            alt: 'Feed'
        }
    ];
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap');      
    * {
        font-family: 'Montserrat', sans-serif;
    }
</style>

<div class="fixed top-0 left-0 right-0 z-30 p-4"
     style="border-radius: 0px 0px 20px 20px; background: {headerBackground}; box-shadow: {headerShadow};">
    <div class="flex items-center justify-between w-full">
        {#if !noMenu}
        <button on:click={toggleMenu} class="z-40">
            <img src={menuIcon} alt="Menu">
        </button>
        {/if}
        {#if noMenu}
        <div style="height: 33px; width:47px"></div>
        {/if}
        <span class="text-white text-xl font-bold">{menuLabel}</span>
        <div style="width: 48px;"></div>
    </div>

    {#if isHome && !isOpen}
        <div class="text-center text-white text-xl w-full mt-6 font-bold">
            {#await getUserInfo(userid)}
                    <p>Loading...</p>
            {:then data}
                {#if data.user.firstName == ""}
                    <span>Hi, <span>User</span>! 👋</span><br>
                {:else}
                    <span>Hi, <span>{data.user.firstName}</span>! 👋</span><br>
                {/if}
            {/await}
            <span style="color: #C5C5C5; font-size: 15px">Good morning</span>
        </div>
    {/if}

    {#if subHeader.length !== 0 && !isOpen && !isHome}
        <div class="text-center text-white text-xl w-full mt-6">
            <span>{subHeader}</span>
        </div>
    {/if}
</div>

{#if isOpen}
<div in:slide={{ duration: 500 }}
     out:slide={{ duration: 200 }}
     class="absolute top-0 inset-x-0 z-20 font-bold"
     style="height: 80vh; border-radius: 0px 0px 20px 20px;
            background: linear-gradient(180deg, #F65800 0%, #F00 100%);
            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
        <div class="flex flex-col h-full justify-between">
            <div>
                <div class="flex flex-col items-center justify-center" style="margin-top: 20%">
                    {#await getUserInfo(userid)}
                        <p>Loading...</p>
                    {:then data}
                        <img src="{data.user.profilePic}" alt="" class="rounded-full" style="width: 70px; height: 70px;">
                        {#if data.user.firstName == ""}
                            <h1 class="text-white">Anonymous User</h1>
                        {:else}
                            <h1 class="text-white">{data.user.firstName}</h1>
                        {/if}
                    {/await}
                </div>
                <ul class="space-y-2 text-white mt-10">
                    {#each menuItems as menuItem}
                    <li class="hover:bg-orange-400 p-2 flex" style="padding-left: 35%;">
                      <a href="{menuItem.href}" class="flex">
                        <img src="{menuItem.icon}" alt="{menuItem.alt}" class="mr-2 w-4 h-4">
                        {menuItem.text}
                      </a>
                    </li>
                    {/each}
                </ul>
            </div>

            <ul class="space-y-2 text-white" style="margin-bottom: 10%">
                <a href="/app/profile/settings">
                    <li class="hover:bg-orange-400 p-2 flex text-base" style="padding-left: 35%;">
                        <img src="/Settings-icon.png" alt="Settings" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Settings
                    </li>
                </a>

                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li on:click={logout} class="hover:bg-orange-400 p-2 flex text-base" style="padding-left: 35%;">
                   <img src="/Logout-icon.png" alt="Log Out" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Log Out
                </li>
            </ul>
        </div>
    </div>
    {/if}