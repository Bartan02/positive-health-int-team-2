<script>
	import { onMount } from 'svelte';
    import TopMenu from '../../../components/top-menu.svelte';

    let promiseRetrieveFriends = new Promise(() => {});

    onMount(() => {
        triggerPromiseRetrieveFriends();
    }); 

    function triggerPromiseRetrieveFriends(){
        promiseRetrieveFriends = retrieveFriends();
    }

    async function retrieveFriends(){
        const yourUserId = localStorage.getItem('userid');
        let retrievedFriends = await fetch('http://localhost:3021/friends/getFriendsList/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                yourUserId: yourUserId
            })
        });
        retrievedFriends = await retrievedFriends.json();
        // @ts-ignore
        retrievedFriends = retrievedFriends.friendsList;
        return retrievedFriends;
    }
    
    async function displayChat(friendshipId){
        await fetch('http://localhost:3090/chat/redirectToChat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                friendshipId: friendshipId
        })
        })
        .then(response => response.json())
        .then(data => {
            window.location.href = data.redirect;
        })
        .catch(error => {
            console.log(error.message);
        })
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
    * {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }
</style>

<body class="flex flex-col min-h-screen bg-[#F6F7FB]">
    <TopMenu menuLabel="Friends" />
    
    <!-- Main content -->
    <div class="flex-grow w-full px-4 sm:px-6 lg:px-8 mx-auto" style="width: 90%;">
        {#await promiseRetrieveFriends}
            <p>Loading...</p>
        {:then retrievedFriends}
            <div style="margin-top: 81px;"></div>
            {#each retrievedFriends as friend}
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div>
                <div class="flex items-center bg-white rounded-lg p-4 mb-2 shadow-md w-full max-w-md mx-auto">
    
                    <!-- User avatar image on the top-left -->
                    <div class="mr-3 w-16 h-16 flex items-center justify-center bg-amber-500 rounded-full" on:click={() => window.location.href=`/app/profile/${friend.username}`}>
                        <p class="text-white text-big">{ (friend.username[0]).toUpperCase() }</p>
                    </div>
        
                    <!-- Text content -->
                    <div class="flex items-center ml-3" on:click={() => displayChat(friend.friendship_id)}>
                        <p class="text-gray-800 font-bold text-lg">{ friend.username }</p>
                    </div>
                </div>
            </div>
            {/each}
        {:catch error}
            <span>{ error.message }</span>
        {/await}
    </div>

    <!-- Footer container -->
    <div class="p-4 mt-auto">
        <div class="flex justify-end space-x-4">
            <!-- Button 1 -->
            <div class="bg-orange-500 rounded-full p-2" style="background: linear-gradient(180deg, #F65800 0%, #F00 100%);">
                <a href="/app/friends/requests"><img src="/Plus-icon.png" alt="Add friend" class="w-12 h-12"></a>
            </div>

            <!-- Button 2 -->
            <div class="bg-orange-500 rounded-full p-2" style="background: linear-gradient(180deg, #F65800 0%, #F00 100%);">
                <a href="/app/friends/find"><img src="/Search-icon.png" alt="Search" class="w-12 h-12"></a>
            </div>
        </div>
    </div>
</body>

