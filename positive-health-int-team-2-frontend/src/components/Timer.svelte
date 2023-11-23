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

<style>
    .start {
        background-color: #4CAF50;
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
    }
</style>

<!-- Timer display -->

<h2>Time Elapsed: {Math.floor(currentTime / 1000)} seconds</h2>
<!-- Start Button -->

<button on:click={startTimer}>Start Activity</button>
<button on:click={stopTimer}>Stop Activity</button>
