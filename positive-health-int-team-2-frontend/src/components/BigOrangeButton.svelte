<script>
    import Router from 'svelte-spa-router';
    import ActivityStart from '../routes/app/activities/start/+page.svelte';
      
    const routes = {
    '/app/activities/start': ActivityStart,
    };
    export let buttonText = "";
    export let subText = "";
    export let iconUrl = "";
    export let isHome;
    export let isActivity = false;
    export let activityName = "";
</script>


{#if isHome}
<a href="/app/activities" style="text-decoration: none;">
    <button class="flex items-center justify-between text-white rounded shadow-lg mx-auto"
            style="font-weight: 900; border-radius: 20px; width: 100%; height:100px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); background: linear-gradient(180deg, #F65800 0%, #F00 100%);">
        <h1 style="text-align:left; font-weight:bolder; padding-left: 10px">
            {buttonText}<br>
            <small>{subText}</small>
        </h1>
        {#if iconUrl && buttonText !== "Welcome"}
            <img src={iconUrl} alt="Activity" style="width: 60px; height: 60px; margin-right:20px"> <!-- Adjust image to scale within the button height -->
        {/if}
        {#if iconUrl && buttonText == "Welcome"}
            <img src="/Sports/Empty/Running-icon-empty.png" alt="Activity" style="width: 60px; height: 60px; margin-right:20px"> <!-- Adjust image to scale within the button height -->
        {/if}
    </button>
</a>
{/if}

{#if !isHome}
<a href="/app/activities/start?activity={activityName}" style="text-decoration: none;">
    <button class="flex items-center justify-between text-white rounded shadow-lg mx-auto"
            style="font-weight: 900; border-radius: 20px; width: 100%; height:100px; box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); background: linear-gradient(180deg, #F65800 0%, #F00 100%);">
        <h1 style="text-align:left; font-weight:bolder; padding-left: 10px">
            {buttonText}<br>
            <small>{subText}</small>
        </h1>
        {#if iconUrl && buttonText !== "Welcome"}
            <img src={iconUrl} alt="Activity" style="width: 60px; height: 60px; margin-right:20px"> <!-- Adjust image to scale within the button height -->
        {/if}
        {#if iconUrl && buttonText == "Welcome"}
            <img src="/Sports/Empty/Running-icon-empty.png" alt="Activity" style="width: 60px; height: 60px; margin-right:20px"> <!-- Adjust image to scale within the button height -->
        {/if}
    </button>
</a>

<Router {routes} />
{/if}
