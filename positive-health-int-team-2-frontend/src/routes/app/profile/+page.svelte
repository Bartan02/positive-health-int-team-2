<script>
	import { getUserInfo, getUserInfoAuth} from '$lib/userprofileService';
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

    function calculateAge(dateOfBirth) {
        const dob = new Date(dateOfBirth);
        const diff_ms = Date.now() - dob.getTime();
        const age_dt = new Date(diff_ms);

        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap');
    * {
        font-family: 'Montserrat', sans-serif;
    }

	.aspect-ratio-1 {
  		aspect-ratio: 1 / 1;
	}
</style>

<body>
    <div class="min-h-screen bg-[#F6F7FB]">
        <TopMenu menuLabel="Profile" isHome={false} />
        <div style="padding-top: 81px;"></div>
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div class="w-full mx-auto" style="width: 90%;">
            {#await getUserInfo(userid)}
                <p>Loading...</p>
            {:then data}
                <!-- Profile Picture and User Information Section -->
                <div class="flex flex-col items-center" style="background: linear-gradient(180deg, #F65800 0%, #F00 100%); padding-bottom:10px; padding-top:10px; border-radius: 20px; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                    <img src="{data.user.profilePic}" alt="Profile" class="rounded-full w-32 h-32 object-cover shadow-md mb-4">
                    <h2 class="text-lg font-bold text-white">{data.user.firstName} {data.user.lastName} <span class="text-blue-500">✓</span></h2>
                    {#if data.user.location}
                        <p class="text-sm text-gray-600">{data.user.location}</p>
                    {/if}
                    {#await getUserInfoAuth(userid)}
                        <p class="text-white">Loading...</p>
                    {:then data}
                        <h2 class="text-white">{data.foundRecords.user.username}</h2>
                    {/await}
                </div>
                
                <!-- Personal Information Section -->
                <div class="grid grid-cols-2 gap-4 mt-4">
                    <div class="aspect-ratio-1 bg-white rounded-lg p-4 text-center flex flex-col justify-center items-center shadow-custom" style="background:linear-gradient(180deg, #F65800 0%, #F00 100%); box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                        <p class="text-lg font-bold text-white">Age: {data.user.dateOfBirth.toString().substring(0, 10) == '2020-01-01' || data.user.dateOfBirth == null ? 0 : calculateAge(data.user.dateOfBirth)}</p>
                        <p class="text-lg font-bold text-white">Height: {data.user.height} cm</p>
                        <p class="text-lg font-bold text-white">Weight: {data.user.weight} kg</p>
                    </div>
                    <div class="aspect-ratio-1 bg-white rounded-lg p-4 text-center flex flex-col justify-center items-center shadow-custom" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                        <h1 class="font-bold text-sm mb-1" style="background: linear-gradient(180deg, #F65800 0%, #F00 100%);
                        -webkit-background-clip: text;
                        color: transparent;
                        background-clip: text;">Favorite activities:</h1>
                        {#if data.user.favoriteSports}
                            <div class='hidden'>
                                {favoriteSportsArray = data.user.favoriteSports.split(",")}
                            </div>
                            {#each favoriteSportsArray as sport}
                                <p class="text-lg font-bold text-gray-600">{sport}</p>
                            {/each}
                        {:else}
                            <p>Favorite Sports: Not specified</p>
                        {/if}
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
