<script>
    import {
        user
    } from '../stores/user.js';
    import {
        slide
    } from 'svelte/transition';
    export let isOpen = false;
    export let menuLabel = ''; // Add this line to create a 'menuLabel' prop

    $: topPosition = isOpen ? '0px' : '-100%';

    $: headerBackground = isOpen ? 'transparent' : 'linear-gradient(180deg, #F65800 0%, #F00 100%)';

    $: headerShadow = isOpen ? 'none' : '0px 4px 4px rgba(0, 0, 0, 0.25)';

    // Reactive declaration for menuIcon
    $: menuIcon = isOpen ? '/hamburger-icon-open.png' : '/hamburger-icon-closed.png';

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
            href: '.', // Update link with profile page
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
            href: '.', // Update link with leaderboard page
            icon: '/Leaderboard-icon.png',
            text: 'Leaderboard',
            alt: 'Stats'
        },
        {   
            href: '.', // Update link with map page
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
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
    * {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }
</style>

<div class="fixed top-0 left-0 right-0 z-30 flex items-center justify-between p-4" style="border-radius: 0px 0px 20px 20px; 
height: 10%; background: {headerBackground};
box-shadow: {headerShadow}">
    <!-- Menu button with only the hamburger icon clickable -->
    <button on:click={toggleMenu} class="z-40">
      <img src={menuIcon} alt="Menu">
    </button>
  
    <!-- Menu label, styled but not clickable -->
    <span class="text-white text-xl absolute left-1/2 transform -translate-x-1/2">{menuLabel}</span>
</div>

<!--transition-opacity duration-200-->

{#if isOpen}
    <div transition:slide class="fixed inset-x-0 z-20"
         style="height: 80vh; border-radius: 0px 0px 20px 20px;
         background: linear-gradient(180deg, #F65800 0%, #F00 100%);
         box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);">
        <div class="flex flex-col h-full justify-between">
            <div>
                <div class="flex flex-col items-center justify-center" style="margin-top: 20%">
                    <img src="/profilepicture.jpg" alt="" class="rounded-full" style="width: 70px; height: 70px;">
                    <h1 class="text-white">*NAME*</h1>
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
                <li class="hover:bg-orange-400 p-2 flex text-base" style="padding-left: 35%;">
                    <img src="/Settings-icon.png" alt="Settings" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Settings
                </li>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li on:click={logout} class="hover:bg-orange-400 p-2 flex text-base" style="padding-left: 35%;">
                   <img src="/Logout-icon.png" alt="Log Out" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Log Out
                </li>
            </ul>
        </div>
    </div>
    {/if}