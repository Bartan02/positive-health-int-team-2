<script>
	import { getUserInfo, createUserProfile, updateUserProfile } from '$lib/userprofileService';
	import { onMount } from 'svelte';
	import TopMenu from '../../../components/top-menu.svelte';
	import { user } from '../../../stores/user';

    /**
	 * @type {number}
	 */
    let userid;
    /**
	 * @type {number}
	 */
    let height;
    /**
	 * @type {number}
	 */
    let weight;
    /**
     * @type {string}
     */
    let firstName;
    /**
	 * @type {string}
	 */
    let lastName;
    /**
	 * @type {string}
	 */
    let profilePic;
    /**
	 * @type {string}
	 */
    let gender;
    /**
	 * @type {Date}
	 */
    let dateOfBirth;
    /**
     * @type {string}
     */
    let favoriteSports;
    /**
     * @type {string[]}
     */
    let favoriteSportsArray;
    /**
     * @type {string}
     */
    let location;

    onMount(() => {
        // @ts-ignore
        userid = localStorage.getItem('userid');
    });
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
    * {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }

	.aspect-ratio-1 {
  		aspect-ratio: 1 / 1;
	}
</style>

<body>
    <div class="min-h-screen" style="background: F6F7FB;">
        <TopMenu menuLabel="Profile" isHome={false} />
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div class="w-full mx-auto" style="width: 90%;">
            {#await getUserInfo(userid)}
                <p>Loading...</p>
            {:then data}
                <!-- Profile Picture and User Information Section -->
                <div class="flex flex-col items-center" style="margin-top:81px; background: linear-gradient(180deg, #F65800 0%, #F00 100%); padding-bottom:10px; padding-top:10px; border-radius: 20px; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                    <img src="{data.user.profilePic}" alt="Profile" class="rounded-full w-32 h-32 object-cover shadow-md mb-4">
                    <h2 class="text-lg font-bold text-white">{data.user.firstName} {data.user.lastName} <span class="text-blue-500">✓</span></h2>
                    <p class="text-sm text-gray-600">{data.user.location}</p>
                </div>
                
                <!-- Personal Information Section -->
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div class="aspect-ratio-1 bg-white rounded-lg p-4 text-center" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                        <p>Age: {data.user.dateOfBirth}</p>
                        <p>Height: {data.user.height} cm</p>
                        <p>Weight: {data.user.weight} kg</p>
                    </div>
                    <div class="aspect-ratio-1 bg-white rounded-lg p-4 text-center" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                        <p>Favorite Sports: {data.user.favoriteSports}</p>
                    </div>
                </div>

                <!-- Running Statistics Section -->
                <div class="grid grid-cols-2 gap-4 mt-4">

                </div>
                {:catch error}
                <p>{error.message}</p>
            {/await}
        </div>
    </div>
</body>
