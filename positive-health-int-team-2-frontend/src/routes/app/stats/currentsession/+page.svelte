<script>
  import SideMenu from '../../../../components/top-menu.svelte';
  import CurrentSessionDistanceAverage from '../../../../components/CurrentSessionDistanceAverage.svelte';
  import CurrentSessionTopSpeed from '../../../../components/CurrentSessionTopSpeed.svelte';
</script>

<body class="w-full">
  <SideMenu />

  <div class="fixed top-4 right-4 z-20">
    <p class="text-4xl text-orange-500 font-bold">Stats</p>
  </div>

  <div class="pt-16 bg-gray-100 min-h-screen p-4">
    <CurrentSessionTopSpeed />
    <CurrentSessionDistanceAverage />

    <div class="mt-1 w-64 flex items-center justify-center mx-auto p-5">
      <button class="bg-orange-500 text-white px-6 py-3 rounded-full text-2xl">See Details</button>
    </div>
  </div>
</body>