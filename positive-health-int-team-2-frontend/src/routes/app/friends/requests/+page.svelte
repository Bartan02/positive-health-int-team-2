<script>
	import { onMount } from "svelte";

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
        if(request.ok) alert('Accepted');
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
        if(request.ok) alert('Rejected');
        else alert('Error. Try again');
        triggerPromiseDisplayFriendRequests();
    }

</script>

<h1> Requests </h1>

{#await promiseDisplayFriendRequests}
    <span> Loading...</span>
{:then data}
    <ul>
        {#each data as data}
            <li> {data.username}
                <button on:click={() => acceptRequest(data.friendship_id)}> ADD </button>
                <button on:click={() => rejectRequest(data.friendship_id)}> REMOVE </button>
            </li>
        {/each}
    </ul>
{:catch error}
    <span> {error.message} </span>
{/await}