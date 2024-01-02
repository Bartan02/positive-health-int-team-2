<script>
    import { user } from '../stores/user.js';
    import { slide } from 'svelte/transition';
    export let isOpen = false;

    $: topPosition = isOpen ? '0px' : '-100%'; // This controls the top position of the menu

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
                user.set({ id: null, token: null });
            }
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const menuItems = [
    {
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

{#if !isOpen} <!--Sets the button location when the side menu is closed-->
    <button on:click={toggleMenu} class="text-4xl z-30 fixed top-0 p-4">
        <!-- <img src="/hamburger-icon-closed.png" alt="Menu" style="width: 47px; height: 33px;"> -->
        <svg width="47" height="33" viewBox="0 0 47 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="47" height="33" fill="url(#pattern0)"/>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_180_42" transform="matrix(0.01 0 0 0.0142424 0 -0.212121)"/>
            </pattern>
            <image id="image0_180_42" width="100" height="100" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAb5JREFUeAHt3D9uE0EUwOGkoyYCuhSUQaHizzFSwSkQR6CDcBhCE3GKKJcAKTVUlD80IUnnFM5K9nq/kUa2djXj97631hTj8d6eRoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOBhAtVB9Xyh/fHD9CYcXT2qfqSdD4sJadebqvqoFncCH9ZTnHBUdXoXjjdfJqRdb6rqZfVXLa4NjtdTnHhU9aL6VH1daB+5H03MajoCBAgQIECAAAECBAgQIECAAAECBAgQIHCfQPWsOqnezbSP2J/el+Ns7lVvqz87sIH1u3o9G/hVgVbfd6AYtymcrcpzNters9tsduD122zgVwVavanG133ubeTwalWes7o+FsQdWNSfzApdsAQIECBAgAABAgQIECBAgAABAgQIECCwZIFqv3p/c3h0U0fixsHVEcP+kmtxnfuWneL9rCB1tUVbiVcKUpdbVJALBfn/M6FfW1CUn2P/f/EFGQA3C/vhBv+4Zny2Bd3TSIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgsEmBf6Yjid+VwET8AAAAAElFTkSuQmCC"/>
            </defs>
            </svg>
            
    </button>
{/if}

{#if isOpen} <!--Sets the button location when the side menu is open and opens the side menu-->
<div transition:slide={{ x: -300, duration: 200 }}>
    <button on:click={toggleMenu} class="text-4xl fixed p-4" style="top: {topPosition}; z-index:100">
        <svg width="47" height="33" viewBox="0 0 47 33" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <rect width="47" height="33" transform="matrix(1 0 0 -1 0 33)" fill="url(#pattern0)"/>
            <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
            <use xlink:href="#image0_276_338" transform="matrix(0.01 0 0 0.0142424 0 -0.212121)"/>
            </pattern>
            <image id="image0_276_338" width="100" height="100" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAb5JREFUeAHt3D9uE0EUwOGkoyYCuhSUQaHizzFSwSkQR6CDcBhCE3GKKJcAKTVUlD80IUnnFM5K9nq/kUa2djXj97631hTj8d6eRoAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQOBhAtVB9Xyh/fHD9CYcXT2qfqSdD4sJadebqvqoFncCH9ZTnHBUdXoXjjdfJqRdb6rqZfVXLa4NjtdTnHhU9aL6VH1daB+5H03MajoCBAgQIECAAAECBAgQIECAAAECBAgQIHCfQPWsOqnezbSP2J/el+Ns7lVvqz87sIH1u3o9G/hVgVbfd6AYtymcrcpzNters9tsduD122zgVwVavanG133ubeTwalWes7o+FsQdWNSfzApdsAQIECBAgAABAgQIECBAgAABAgQIECCwZIFqv3p/c3h0U0fixsHVEcP+kmtxnfuWneL9rCB1tUVbiVcKUpdbVJALBfn/M6FfW1CUn2P/f/EFGQA3C/vhBv+4Zny2Bd3TSIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgsEmBf6Yjid+VwET8AAAAAElFTkSuQmCC"/>
            </defs>
            </svg>
            
    </button>
    
    <div class="fixed inset-x-0 top-0 z-20" style="height: 80%; border-radius: 0px 0px 20px 20px;
    background: linear-gradient(180deg, #F65800 0%, #F00 100%);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); z-index:99">
        <div class="flex flex-col h-full justify-between">
            <div>
                <div class="flex flex-col items-center justify-center" style="margin-top: 20%">
                    <img src="/profilepicture.jpg" alt="" class="rounded-full" style="width: 70px; height: 70px;">
                    <h1 class="text-white">*NAME*</h1>
                </div>
                <ul class="space-y-2 text-white mt-10">
                    {#each menuItems as menuItem}
                    <li class="hover:bg-orange-400 p-2 flex justify-center">
                      <a href="{menuItem.href}" class="flex">
                        <img src="{menuItem.icon}" alt="{menuItem.alt}" class="mr-2 w-4 h-4">
                        {menuItem.text}
                      </a>
                    </li>
                    {/each}
                </ul>
            </div>

            <ul class="space-y-2 text-white" style="margin-bottom: 10%">
                <li class="hover:bg-orange-400 p-2 flex items-center justify-center text-base">
                    <img src="/Settings-icon.png" alt="Settings" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Settings
                </li>
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <li on:click={logout} class="hover:bg-orange-400 p-2 flex items-center justify-center text-base">
                   <img src="/Logout-icon.png" alt="Log Out" class="mr-2" style="width: 16px; height: 16px; margin-right: 16px;"> Log Out
                </li>
            </ul>
        </div>
    </div>
</div>
{/if}
  