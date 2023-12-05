<script>
import { onMount } from 'svelte';
  
  let message = '';

  onMount(async () => {
    try {
      const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/auth/logintest', {
        method: 'GET',
        headers: { 
          'Authorization': localStorage.getItem('token')
        },
      });
      if(response.ok){
        const token = localStorage.getItem('token');
        const userid = localStorage.getItem('userid');
      }
      else{
        const data = await response.json();
        window.location.href = data.redirect;
      }
    } catch (error) {
      console.error('Profile access failed:', error);
    }
  });

  async function logout(){
    try {
      const response = await fetch('https://step-up-api-gateway-2639a76e4388.herokuapp.com/auth/logout', {
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

<slot></slot>