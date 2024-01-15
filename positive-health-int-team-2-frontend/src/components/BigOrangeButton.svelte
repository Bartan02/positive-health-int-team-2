<script>
    export let buttonText = "Welcome";
    export let subText = "";
    export let iconUrl = "";
</script>

<button class="flex items-center justify-between text-white rounded shadow-lg mx-auto"
        style="font-weight: 900; border-radius: 20px; width: 100%; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); background: linear-gradient(180deg, #F65800 0%, #F00 100%);">
    <h1 style="text-align:left; font-weight:bolder; padding-left: 10px">
        {buttonText}<br>
        <small>{subText}</small>
    </h1>
    {#if iconUrl}
      <img src={iconUrl} alt="Run" style="width: 100px; height: 100px"> <!-- Adjust image to scale within the button height -->
    {/if}
</button>
