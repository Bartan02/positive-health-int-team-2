<script>
    let promiseSearchUsers = null;

    function triggerSearchUsers(){
        promiseSearchUsers = searchUsers();
    }

    async function searchUsers(){
        const prompt = document.getElementById('user').value;
        if(prompt.length === 0) throw new Error("Start typing sth...")
        const usersFetch = await fetch('http://localhost:3025/friends/findperson/'+prompt, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
        });
        const foundRecords = await usersFetch.json();
        if(usersFetch.ok) return foundRecords;
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
                <li class="font-bold"> {data.foundRecords.user.username} | {data.foundRecords.user.email} </li>
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
                            <li> {users.username} | {users.email}</li>
                        </ul>
                    {:else if data.foundRecords.user.username !== users.username}
                        <ul> 
                            <li> {users.username} | {users.email}</li>
                        </ul>
                    {/if}
            {/each}
        {/if}
    {/if}
{:catch error}
    <span> {error.message} </span>
{/await}
</div>