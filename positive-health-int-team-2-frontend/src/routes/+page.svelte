
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
    async function getResponse() {
      const res = await fetch(`http://localhost:3010/`);
      const values = await res.json();
      return values;
    }
    
  let result = null;

  let getResponsePromise = getResponse()

  getResponsePromise.then((value) => {
    result = value
  });
  </script>

    <div class="button-container">
      
      <h1 class="stepup">StepUp!</h1>
      
        <a href="#" class="rounded-button">Login </a>
        <a href="#" class="flat-button">Register</a>
    </div>

    {#await getResponsePromise}
      {:then}
        <span> { result } </span>
      {:catch error}
        <li>Error: {error.message}</li>
    {/await}
