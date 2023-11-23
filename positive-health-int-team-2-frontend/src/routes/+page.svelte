<svelte:head>
  <title>StepUp!</title>
  <style>
    .stepup {
      font-family: 'Abadi', sans-serif;
    }
    .button-container {
          text-align: center;
      }
      .rounded-button {
          display: inline-block;
          padding: 10px 20px;
          margin: 5px;
          border: 2px solid #FFA500; /* Orange border */
          border-radius: 20px; /* Rounded corners */
          background-color: #FFA500; /* Orange background */
          color: #fff; /* White text */
          text-decoration: none;
          text-align: center;
      }
      .rounded-button:hover {
          background-color: #ff7f00; /* Slightly darker orange on hover */
      }
      .flat-button {
          display: inline-block;
          padding: 10px 20px;
          margin: 5px;
          border: 2px solid #000; /* Black border */
          border-radius: 20px; /* Rounded corners */
          background-color: #fff; /* White background */
          color: #000; /* Black text */
          text-decoration: none;
          text-align: center;
      }
      .flat-button:hover {
          background-color: #ddd; /* Slightly lighter gray on hover */
      }
  </style>
</svelte:head>  

<script>
  import { onMount } from 'svelte';

  let getResponsePromise;

  onMount(() => {
    getResponsePromise = getResponse();
  });

  async function getResponse() {
    try {
      const res = await fetch(`https://localhost:3015/activity`);
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return await res.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error; // Re-throw the error to be caught by the await block
    }
  }

  import { auth } from '../lib/firebase/firebase.client';
	import { authHandlers, authStore } from '../stores/authStore';

	let email,info;
	authStore.subscribe((curr) => {
		console.log('CURR', curr);
    info = curr?.currentUser
		email = curr?.currentUser?.email;
	});

</script>

<div class="button-container">
  <h1 class="text-red-700">StepUp!</h1>
  <a href="." class="rounded-button">Login</a>
  <a href="." class="flat-button">Register</a>
</div>

{#await getResponsePromise}
  <span>Waiting for result...</span>
{:then value}
  <span>{JSON.stringify(value)}</span>
{:catch error}
  <li>Error: {error.message}</li>
{/await}

{#if $authStore.currentUser}
	<div>
		<h1>CURRENT USER: {email}</h1>
    { console.log(info)}
        <button on:click={authHandlers.logout}>Logout</button>
	</div>
{:else}
	<div>Not logged in. <a href="/login">Login</a></div>
{/if}