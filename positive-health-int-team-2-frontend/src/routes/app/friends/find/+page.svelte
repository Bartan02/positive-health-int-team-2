<script>
	import { compute_slots } from "svelte/internal";

    let promiseSearchUsers = null;

    function triggerSearchUsers(){
        promiseSearchUsers = searchUsers();
    }

    async function searchUsers(){
        const prompt = document.getElementById('user').value;
        if(prompt.length === 0) throw new Error("Start typing sth...")
        const usersFetch = await fetch('http://localhost:3021/friends/findperson/'+prompt, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });
        let foundUserRecords = await usersFetch.json();
        const yourUserId = Number(localStorage.getItem('userid'));
        if(foundUserRecords.foundRecords.user !== null && foundUserRecords.foundRecords.user.id === yourUserId) foundUserRecords.foundRecords.user = null;
        if(foundUserRecords.foundRecords.users !== null){
            foundUserRecords.foundRecords.users = foundUserRecords.foundRecords.users.filter(user => {
            if(user.id === yourUserId) return false;
            return true;
        });
        }
        const relationsFetch = await fetch('http://localhost:3021/friends/findrelationships/'+yourUserId, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        });
        let foundRelationsFetch = await relationsFetch.json();
        foundUserRecords.foundRecords.users.forEach(user => {
        if(foundRelationsFetch.includes({friend: user.id})){
          if(foundRelationsFetch[foundRelationsFetch.indexOf({friend: user.id})].status === 1) user.friendStatus = "Pending request";
          else if(foundRelationsFetch[foundRelationsFetch.indexOf({friend: user.id})].status === 2) user.friendStatus = "Friends";
        }else{
          user.friendStatus = "Strangers";
        }

        console.log(foundUserRecords.foundRecords.user)
        if(foundUserRecords.foundRecords.user !== null){
            if(foundRelationsFetch.includes({friend: foundUserRecords.foundRecords.user.id})){
            if(foundRelationsFetch[foundRelationsFetch.indexOf({friend: foundUserRecords.foundRecords.user.id})].status === 1) foundUserRecords.foundRecords.user.friendStatus = "Pending request";
            else if(foundRelationsFetch[foundRelationsFetch.indexOf({friend: foundUserRecords.foundRecords.user.id})].status === 2) foundUserRecords.foundRecords.user.friendStatus = "Friends";
            }else{
                foundUserRecords.foundRecords.user.friendStatus = "Strangers";
            }
        }

    });
        if(usersFetch.ok && relationsFetch.ok) return foundUserRecords;
        else throw new Error("Problems with connection.")
    }
</script>

<input on:keyup={triggerSearchUsers} type="text" placeholder="Search for person" name="user" id="user">
<div>
{#await promiseSearchUsers}
    <span> Loading...</span>
{:then data}
    {#if promiseSearchUsers === null}
        <span> Start typing sth... </span>
    {:else}
        {#if data.foundRecords.user !== null && data.foundRecords.users.length !== 0}
            <ul>
                <li class="font-bold"> {data.foundRecords.user.username} | {data.foundRecords.user.email} | {data.foundRecords.user.friendStatus} </li>
            </ul>
        {/if}
        {#if data.foundRecords.users.length === 0}
            {#if data.foundRecords.user === null}
                <span> No user can be found</span>
            {/if}
        {:else}
            {#each data.foundRecords.users as users}
                    {#if data.foundRecords.user === null}
                        <ul> 
                            <li> {users.username} | {users.email} | {users.friendStatus}</li>
                        </ul>
                    {:else if data.foundRecords.user.username !== users.username}
                        <ul> 
                            <li> {users.username} | {users.email} | {users.friendStatus}</li>
                        </ul>
                    {/if}
            {/each}
        {/if}
    {/if}
{:catch error}
    <span> {error.message} </span>
{/await}
</div>