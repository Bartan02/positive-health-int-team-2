<script>
import { onMount } from 'svelte';
  
  let message = '';

  onMount(async () => {
    try {
      const response = await fetch('http://localhost:3025/auth/logintest', {
        method: 'GET',
        headers: { 
          'Authorization': localStorage.getItem('token')
        },
      });
      if(response.ok){
        const data = await response.json();
        const token = localStorage.getItem('token');
        const userid = data.userId;
        localStorage.setItem('userid',userid);
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
      const response = await fetch('http://localhost:3025/auth/logout', {
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