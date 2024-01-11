<script>
	import TopMenu from '../../../components/top-menu.svelte';
	import DayMeter from '../../../components/DayMeter.svelte';
	import { getUserInfo, createUserProfile, updateUserProfile } from '$lib/userprofileService';
	import { onMount } from 'svelte';


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

    onMount(() => {
        userid = localStorage.getItem('userid');
        getUserInfoButton();
    });
    
    function getUserInfoButton(){
        getUserInfo(localStorage.getItem('userid')).then((data) => {
            firstName = data.user.firstName;
            lastName = data.user.lastName;
            profilePic = data.user.profilePic;
            height = data.user.height;
            weight = data.user.weight;
            gender = data.user.gender;
            dateOfBirth = data.user.dateOfBirth.toString().substring(0, 10);
            console.log(data);
        });
        console.log("Fetching user info");
    }
    function createUserProfileButton(){
        createUserProfile(localStorage.getItem('userid'));
        console.log("Creating user profile");
    }
    function updateUserProfileButton(){
        updateUserProfile(localStorage.getItem('userid'), firstName, lastName, profilePic, height, weight, gender, dateOfBirth)
        console.log("Updating user profile");
    }
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
		<TopMenu menuLabel="Home" isHome={true} />
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div class="w-full mx-auto" style="width: 90%;">
            <DayMeter />
            <div>
                <h2>First Name:</h2>
                <input type="text" bind:value={firstName} />
                <h2>Last Name:</h2>
                    <input type="text" bind:value={lastName} />
                    <h2>Gender:</h2>
                    <select bind:value={gender}>
                        <option value="" disabled hidden selected>Choose gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                    <h2>Height:</h2>
                    <input type="text" bind:value={height} />
                    <h2>Weight:</h2>
                    <input type="text" bind:value={weight} />
                    <h2>Date of Birth:</h2>
                    <input type="date" bind:value={dateOfBirth} />
            </div>
            <div class='mt-10 grid gap-5'>
                <h1 on:click={updateUserProfileButton}>UPDATE PROFILE</h1>
            </div>
        </div>
    </div>
</body>
