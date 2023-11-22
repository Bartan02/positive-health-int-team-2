<script>
    import { onMount } from 'svelte';
  
    let message = '';
  
    onMount(async () => {
      try {
        const response = await fetch('http://localhost:3020/logintest', {
          method: 'GET',
          headers: { 
            'Authorization': localStorage.getItem('token'),
          },
        });
        if(response.ok){
          const data = await response.json();
          message = data.message;
        }
      } catch (error) {
        console.error('Profile access failed:', error);
      }
    });

    async function logout(){
      try {
        const response = await fetch('http://localhost:3020/logout', {
          method: 'POST',
          headers: { 
            'Authorization': localStorage.getItem('token'),
          },
        });
        if(response.ok){
          const data = await response.json();
          window.location.href = data.redirect;
        }
      } catch (error) {
        console.error('Logout failed:', error);
      }
    };
  </script>
  
  <h1>{message}
  <button on:click={logout}> Log out </button>
  </h1>