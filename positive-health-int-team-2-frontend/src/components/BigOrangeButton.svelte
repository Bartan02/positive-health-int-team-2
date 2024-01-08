<script>
    export let buttonText = "Welcome";
    export let subText = "Let's start an activity?";
    export let iconUrl = "";
    export let topPosition = '35%';
</script>




<button class="flex items-center justify-between text-white rounded shadow-lg"
        style="font-weight: 900; border-radius: 20px; position: absolute; top: {topPosition}; left: 50%; transform: translate(-50%, -50%); width: 90%; height: 10%; z-index: 10; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); background: linear-gradient(180deg, #F65800 0%, #F00 100%);">
    <h1 style="padding-left: 5%; text-align:left; font-weight:bolder">
        {buttonText}<br>
        <small>{subText}</small>
    </h1>
    {#if iconUrl}
      <img src={iconUrl} alt="Run" style="height: 100%; object-fit: contain;"> <!-- Adjust image to scale within the button height -->
    {/if}
</button>