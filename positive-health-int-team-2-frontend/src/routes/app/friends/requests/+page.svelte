<script>
	import { onMount } from "svelte";
    import TopMenu from '../../../../components/top-menu.svelte';

    let promiseDisplayFriendRequests = displayFriendRequests();

    function triggerPromiseDisplayFriendRequests(){
        promiseDisplayFriendRequests = displayFriendRequests();
    }

    async function displayFriendRequests(){
        const yourUserId = Number(localStorage.getItem('userid'));
        const requestsFetch = await fetch('http://localhost:3021/friends/getFriendsRequests/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                yourUserId: yourUserId
            })
        });
        let requestsArray = await requestsFetch.json();
        requestsArray = requestsArray.requestsArray;
        return requestsArray;
    }

    async function acceptRequest(friendshipId){
        const request = await fetch('http://localhost:3021/friends/acceptFriend/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                friendshipId: friendshipId,
            })
        });
        if(request.ok) alert('Invitation accepted.');
        else alert('Error. Try again');
        triggerPromiseDisplayFriendRequests();
    }

    async function rejectRequest(friendshipId){
        const request = await fetch('http://localhost:3021/friends/rejectFriend/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                friendshipId: friendshipId,
            })
        });
        if(request.ok) alert('Invitation rejected');
        else alert('Error. Try again');
        triggerPromiseDisplayFriendRequests();
    }

</script>

<h1> Requests </h1>
<div class="min-h-screen bg-[#F6F7FB]">
    <TopMenu menuLabel="Friend requests" />
    <div style="padding-top: 81px;"></div>
    <div class="w-full mx-auto" style="width: 90%;">
{#await promiseDisplayFriendRequests}
    <span> Loading...</span>
{:then data}
    {#if data.length !== 0}
        {#each data as data}
            <div class="flex justify-between items-center bg-white rounded-lg p-4 mb-2 w-full max-w-md mx-auto" style="box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);"> 
                <span class="mr-auto"> {data.username} </span>
                <button class="text-white p-2 rounded-full" on:click={() => acceptRequest(data.friendship_id)} style="background: linear-gradient(180deg, #F65800 0%, #F00 100%);;">
                    <div style="height: 20px; width: 20px;"> ✔ </div>
                </button>
                <button class="text-black p-2 ml-5 rounded-full" on:click={() => rejectRequest(data.friendship_id)} style="background: white; box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.25);">
                    <div style="height: 20px; width: 20px;"> ✖ </div>
                </button>
            </div>
        {/each}
    {:else}
            <div class="flex justify-center items-center">
                <span class="text-big"> No friend requests </span>
            </div>
        
    {/if}
{:catch error}
    <span> {error.message} </span>
{/await}
</div>
</div>