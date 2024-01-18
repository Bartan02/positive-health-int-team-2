<script>
	import { compute_slots } from "svelte/internal";
    import TopMenu from '../../../../components/top-menu.svelte';
    let promiseSearchUsers = null;

    function triggerSearchUsers(){
        promiseSearchUsers = searchUsers();
    }

    async function searchUsers(){
        const prompt = document.getElementById('user').value;
        if(prompt.length === 0) throw new Error("Type to find friends");

        const usersFetch = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/friends/findperson/'+prompt, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });
        let foundUserRecords = await usersFetch.json();
        const yourUserId = Number(localStorage.getItem('userid'));

        // Filter out the current user
        if(foundUserRecords.foundRecords.user !== null && foundUserRecords.foundRecords.user.id === yourUserId) {
            foundUserRecords.foundRecords.user = null;
        }
        if(foundUserRecords.foundRecords.users !== null){
            foundUserRecords.foundRecords.users = foundUserRecords.foundRecords.users.filter(user => user.id !== yourUserId);
        }

        // Check if any users were found
        if(!foundUserRecords.foundRecords.user && (!foundUserRecords.foundRecords.users || foundUserRecords.foundRecords.users.length === 0)) {
            throw new Error("No users found");
        }

        // Fetch relationships
        const relationsFetch = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/friends/findrelationships/'+yourUserId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },

        });

        let foundRelationsFetch = await relationsFetch.json();
        
        foundUserRecords.foundRecords.users.forEach(user => {
        if(foundRelationsFetch.some(obj => obj.friend === user.id)){
          if(foundRelationsFetch[foundRelationsFetch.findIndex(obj => obj.friend === user.id)].status === 1) user.friendStatus = "Pending request";
          else if(foundRelationsFetch[foundRelationsFetch.findIndex(obj => obj.friend === user.id)].status === 2) user.friendStatus = "Friends";
        }else{
          user.friendStatus = "Strangers";
        }

        if(foundUserRecords.foundRecords.user !== null){
            if(foundRelationsFetch.includes(obj => obj.friend === foundUserRecords.foundRecords.user.id)){
            if(foundRelationsFetch[foundRelationsFetch.findIndex(obj => obj.friend === foundUserRecords.foundRecords.user.id)].status === 1) foundUserRecords.foundRecords.user.friendStatus = "Pending request";
            else if(foundRelationsFetch[foundRelationsFetch.findIndex(obj => obj.friend === foundUserRecords.foundRecords.user.id)].status === 2) foundUserRecords.foundRecords.user.friendStatus = "Friends";
            }else{
                foundUserRecords.foundRecords.user.friendStatus = "Strangers";
            }
        }

    });
        if(usersFetch.ok && relationsFetch.ok) return foundUserRecords;
        else throw new Error("Problems with connection.")
    }

    async function addFriend(friendId){
        const yourUserId = Number(localStorage.getItem('userid'));
        const addFriendProcess = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/friends/addFriend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                friendId: friendId,
                yourId: yourUserId
            })
        })
        if(addFriendProcess.ok){
            alert("Invitation sent!");
            triggerSearchUsers();
        }
        else{
            alert("Failure!");
        }
    }
</script>

<body>
    <div class="min-h-screen bg-[#F6F7FB]">
        <TopMenu menuLabel="Find friends" />
        <div style="padding-top: 81px;"></div>
        <div class="flex justify-center">
            <input on:keyup={triggerSearchUsers} type="text" placeholder="Search for person" name="user" id="user" class="border-none rounded-full p-4" style="margin-bottom: 16px; width: 90%; box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25); background: white;">
        </div>
        <div class="w-full mx-auto" style="width: 90%;">
            {#await promiseSearchUsers}
            <span class="block text-center">Loading...</span>
            {:then data}
                {#if data && data.foundRecords}
                    {#if data.foundRecords.user}
                        <div class="flex justify-between items-center bg-white rounded-lg p-4 mb-2 w-full max-w-md mx-auto" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                            <div>
                                <p class="font-bold">{data.foundRecords.user.username}</p>
                                <p>{data.foundRecords.user.email}</p>
                            </div>
                            {#if data.foundRecords.user.friendStatus === "Strangers"}
                            <button class="text-white p-2 rounded-full" on:click={() => addFriend(user.id)} style="background: linear-gradient(180deg, #F65800 0%, #F00 100%);;">
                                <img src="/Plus-icon.png" alt="" style="height: 20px; width: 20px;">
                            </button>
                            {:else}
                                <p>{data.foundRecords.user.friendStatus}</p>
                            {/if}
                        </div>
                    {/if}
                    {#each data.foundRecords.users as user}
                        <div class="flex justify-between items-center bg-white rounded-lg p-4 mb-2 w-full max-w-md mx-auto" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);">
                            <!-- svelte-ignore a11y-click-events-have-key-events -->
                            <div on:click={() => window.location.href=`/app/profile/${user.username}`}>
                                <p class="font-bold">{user.username}</p>
                                <p>{user.email}</p>
                            </div>
                            {#if user.friendStatus === "Strangers"}
                            <button class="text-white p-2 rounded-full" on:click={() => addFriend(user.id)} style="background: linear-gradient(180deg, #F65800 0%, #F00 100%);;">
                                <img src="/Plus-icon.png" alt="" style="height: 20px; width: 20px;">
                            </button>
                            {:else}
                                <p>{user.friendStatus}</p>
                            {/if}
                        </div>
                    {/each}
                {:else}
                    <span>No user can be found</span>
                {/if}
            {:catch error}
                <span class="block text-center">{error.message}</span>
            {/await}
        </div>
    </div>
</body>
