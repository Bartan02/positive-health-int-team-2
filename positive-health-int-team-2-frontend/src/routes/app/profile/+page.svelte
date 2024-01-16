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
            <TopMenu menuLabel="Home" isHome={false} />
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div class="w-full mx-auto mt-20" style="width: 90%;">
            {#await getUserInfo(userid)}
                <p>Loading...</p>
            {:then data} 
                <img src="{data.user.profilePic}" alt="Profile" class="aspect-ratio-1 rounded-full mx-auto w-1/2 h-1/2 object-cover">
                <h2>First Name: {data.user.firstName}</h2>
                <h2>Last Name: {data.user.lastName}</h2>
                <h2>Height: {data.user.height}</h2>
                <h2>Weight: {data.user.weight}</h2>
                <h2>Gender: {data.user.gender}</h2>
                <h2>Date of Birth: {data.user.dateOfBirth}</h2>
                <h2>Favorite Sports: {data.user.favoriteSports}</h2>
                <h2>Location: {data.user.location}</h2>
            {:catch error}
                <p>{error.message}</p>
            {/await}
            {#await getUserInfoAuth(userid)}
                <p>Loading...</p>
            {:then data}
                <h2>Username: {data.foundRecords.user.username}</h2>
                <h2>email: {data.foundRecords.user.email}</h2>
            {/await}
        </div>
    </div>
</body>
