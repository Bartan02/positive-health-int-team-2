<script>
  import { onMount } from 'svelte';
  import TopMenu from '../../../components/top-menu.svelte';

  // let getResponsePromise;

  // onMount(() => {
  //   getResponsePromise = getResponse();
  // });

  // async function getResponse() {
  //   try {
  //     const res = await fetch(
  //     `http://localhost:3025/activities/activity`);
  //     if (!res.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     return await res.json();
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //     throw error; // Re-throw the error to be caught by the await block
  //   }
  // }

  // Define the array of activities
  let activities;

  // Paths to star images
  const emptyStar = '/star-empty.png';
  const filledStar = '/star-full.png';

  let favoredActivities = [];
  let otherActivities = [];

  function toggleFavored(activity) {
  const index = activities.findIndex(a => a.name === activity.name);
  activities[index].favored = !activities[index].favored;
  activities[index].starImg = activities[index].favored ? filledStar : emptyStar;

  // Save favored state to localStorage
  saveActivitiesToStorage();

  // Trigger reactivity by creating a new array
  activities = [...activities];
  
  // Update the filtered arrays
  favoredActivities = activities.filter(a => a.favored);
  otherActivities = activities.filter(a => !a.favored);
}

  // Function to save activities to localStorage
  function saveActivitiesToStorage() {
    try {
      localStorage.setItem('activities', JSON.stringify(activities));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }

  // Function to load activities from localStorage
  function loadActivitiesFromStorage() {
  try {
    const storedActivities = localStorage.getItem('activities');
    if (storedActivities) {
      let loadedActivities = JSON.parse(storedActivities);
      // Set the correct star image based on the favored state
      return loadedActivities.map(activity => ({
        ...activity,
        starImg: activity.favored ? filledStar : emptyStar
      }));
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  // Fallback to default activities if none are stored or if there's an error
  return [
    { name: 'Football', img: '/Football-icon.png', favored: false, starImg: emptyStar },
    { name: 'Running', img: '/Running-icon-full.png', favored: false, starImg: emptyStar  },
    { name: 'Hiking', img: '/football.png', favored: false, starImg: emptyStar  },
    { name: 'Volleyball', img: '/Volleyball-icon.png', favored: false, starImg: emptyStar  },
    // ... other activities
  ];
}

  activities = loadActivitiesFromStorage();
    // Initial sort of activities
    sortActivities();

  // Reactive statements to filter activities based on whether they are favored
  $: sortActivities();

  function sortActivities() {
    favoredActivities = activities.filter(activity => activity.favored);
    otherActivities = activities.filter(activity => !activity.favored);
  }

  $: showFavoritesHeading = favoredActivities.length > 0;
  $: spacing = showFavoritesHeading ? '16px' : '81px';

</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap');
    * {
        font-family: 'Montserrat', sans-serif;
        font-weight: bold;
    }

    .aspect-ratio-1 {
  		aspect-ratio: 1 / 1;
	}
</style>

<body>
  <div class="min-h-screen" style="background: F6F7FB;">
    <TopMenu menuLabel="Activities" />
    <div class="w-11/12 mx-auto">
      {#if showFavoritesHeading}
      <h3 style="margin-top: 81px; background: linear-gradient(180deg, #F65800 0%, #F00 100%);
           -webkit-background-clip: text;
           color: transparent;
           background-clip: text;">
        Favorites
      </h3>
    {/if}
      <div class="grid grid-cols-2 gap-4">
        {#each favoredActivities as activity (activity.name)}
          <div class="relative bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-4 aspect-ratio-1">
            <img src={activity.starImg} alt="Star" class="absolute top-0 right-0" style="height:60px; width:30px" on:click={() => toggleFavored(activity)} />
            <h4 class="text-lg font-semibold">{activity.name}</h4>
            <img class="h-16 w-16" src={activity.img} alt={activity.name} />
          </div>
        {/each}
      </div>

      <h3 style="margin-top: {spacing}; background: linear-gradient(180deg, #F65800 0%, #F00 100%);
      -webkit-background-clip: text;
      color: transparent;
      background-clip: text;">
      Other activities
      </h3>
      <div class="grid grid-cols-2 gap-4">
        {#each otherActivities as activity (activity.name)}
          <div class="relative bg-white rounded-lg shadow-lg flex flex-col items-center justify-center p-4 aspect-ratio-1">
            <img src={activity.starImg} alt="Star" class="absolute top-0 right-0" style="height:60px; width:30px" on:click={() => toggleFavored(activity)} />
            <h4 class="text-lg font-semibold">{activity.name}</h4>
            <img class="h-16 w-16" src={activity.img} alt={activity.name} />
          </div>
        {/each}
      </div>
    </div>
  </div>
</body>
