<script>
    import { onMount } from 'svelte';

    let startTime;
    let currentTime = 0;
    let intervalId;
    let stopCounting = false;
    let timeFinished = 0;

    // Start the timer
    function startTimer() {
        startTime = new Date();
        intervalId = setInterval(updateTime, 1000); // Update every second
      
    }

    // Stop the timer
    function stopTimer() {
        stopCounting = true;
        timeFinished = currentTime;
        console.log(timeFinished / 1000);
    }

    // Update the current time
    function updateTime() {
        if (stopCounting === false) {
            currentTime = new Date() - startTime;
        }
    }


    // Cleanup on component destroy
    onMount(() => {
        return () => {
            clearInterval(intervalId);
        };
    });
</script>
<!-- Timer display -->

<h2>Time Elapsed: {Math.floor(currentTime / 1000)} seconds</h2>
<!-- Start Button -->

<button on:click={startTimer}>Start Activity</button>
<button on:click={stopTimer}>Stop Activity</button>
