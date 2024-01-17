<script>
    import TopMenu from '../../../../components/top-menu.svelte';   
	import { getUserInfo, createUserProfile, updateUserProfile } from '$lib/userprofileService';
	import { onMount } from 'svelte';
	import { includesType } from 'ol/expr/expression';


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
         
    function updateUserProfileButton(){
        favoriteSports = "";
        const favoriteSportsArrayElements = [].slice.call(document.getElementsByClassName("favoriteSports"));
        favoriteSportsArrayElements.forEach((element) => {
            if (element.checked) {
                favoriteSports += element.value + ",";
            }
        });
        favoriteSports = favoriteSports.substring(0, favoriteSports.length - 1);
        // @ts-ignore
        firstName = document.getElementById("firstName")?.value;
        // @ts-ignore
        lastName = document.getElementById("lastName")?.value;
        // @ts-ignore
        height = document.getElementById("height")?.value;
        // @ts-ignore
        weight = document.getElementById("weight")?.value;
        // @ts-ignore   
        gender = document.getElementById("gender")?.value;
        // @ts-ignore
        dateOfBirth = document.getElementById("dateOfBirth")?.value;
        // @ts-ignore
        location = document.getElementById("location")?.value;
        updateUserProfile(localStorage.getItem('userid'), firstName, lastName, profilePic, height, weight, gender, dateOfBirth, favoriteSports, location)
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
        <TopMenu menuLabel="Settings" />
        <!-- Frame for all components, setting the width to 90% of the viewport -->
        <div class="w-full mx-auto mt-20" style="width: 90%;">    
            {#await getUserInfo(userid)}
                <p>Loading...</p>
            {:then data} 
                {#if data.user.profilePic == null}
                    <img src="https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png" alt="Profile" class="aspect-ratio-1 rounded-full mx-auto w-1/2 h-1/2 object-cover">
                {:else}
                    <img src="{data.user.profilePic}" alt="Profile" class="aspect-ratio-1 rounded-full mx-auto w-1/2 h-1/2 object-cover">
                {/if}

                <h2>First Name:</h2>
                <input id="firstName" type="text" value={data.user.firstName} />

                <h2>Last Name:</h2>
                <input id="lastName" type="text" value={data.user.lastName} />

                <h2>Gender:</h2>
                <select id="gender">
                    {#if data.user.gender == "male"}
                        <option value="" disabled hidden selected>Choose gender</option>
                        <option value="male" selected>Male</option>
                        <option value="female">Female</option>
                    {:else if data.user.gender == "female"}
                        <option value="" disabled hidden selected>Choose gender</option>
                        <option value="male">Male</option>
                        <option value="female" selected>Female</option>
                    {:else}
                        <option value="" disabled hidden selected>Choose gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    {/if}
                </select>

                <h2>Height:</h2>
                <input id="height" type="text" value={data.user.height} />

                <h2>Weight:</h2>
                <input id="weight" type="text" value={data.user.weight} />

                {#if data.user.dateOfBirth == null}
                    <h2>Date of Birth:</h2>
                    <input id="dateOfBirth" type="date" value="2000-01-01" />
                {:else}
                    <h2>Date of Birth:</h2>
                    <input id="dateOfBirth" type="date" max="2021-01-01" min="1921-01-01" value={data.user.dateOfBirth.toString().substring(0, 10)} />
                {/if}
                <h2>Favorite sports:</h2>
                <div class="grid grid-cols-2 ">
                    <!-- I apologise for this monstrosity but i couldnt find another way to do it -->
                    <div>
                        <input class="favoriteSports" type="checkbox" id="running" name="running" value="running" checked={data.user.favoriteSports.includes('running')}/>
                        <label for="running">Running</label><br />
                    </div>   
                    <div>
                        <input class="favoriteSports" type="checkbox" id="cycling" name="cycling" value="cycling" checked={data.user.favoriteSports.includes('cycling')}/>
                        <label for="cycling">Cycling</label><br />
                    </div>   
                    <div>
                        <input class="favoriteSports" type="checkbox" id="swimming" name="swimming" value="swimming" checked={data.user.favoriteSports.includes('swimming')}/>
                        <label for="swimming">Swimming</label><br />
                    </div>   
                    <div>
                        <input class="favoriteSports" type="checkbox" id="football" name="football" value="football" checked={data.user.favoriteSports.includes('football')}/>
                        <label for="football">Football</label><br />
                    </div>    
                    <div>
                        <input class="favoriteSports" type="checkbox" id="basketball" name="basketball" value="basketball" checked={data.user.favoriteSports.includes('basketball')}/>
                        <label for="basketball">Basketball</label><br />
                    </div>
                    <div>
                        <input class="favoriteSports" type="checkbox" id="tennis" name="tennis" value="tennis" checked={data.user.favoriteSports.includes('tennis')}/>
                        <label for="tennis">Tennis</label><br />
                    </div>
                </div>
                <h2>Location:</h2>
                <input id="location" type="text" value={data.user.location}/>
            {:catch error}
                <p>{error.message}</p>
            {/await}
            <div class='mt-10 grid gap-5'>
                <h1 on:click={updateUserProfileButton}>UPDATE PROFILE</h1>
            </div>
        </div>
    </div>
</body>
