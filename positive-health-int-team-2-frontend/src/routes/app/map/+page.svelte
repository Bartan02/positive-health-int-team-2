<script>
	import Map from '../../../components/Map.svelte';
	import TopMenu from '../../../components/top-menu.svelte';
</script>

<div class="flex justify-start flex-col w-screen h-screen">
	<div>
		<TopMenu menuLabel="Map"/>
	</div>
	<div class="bg-blue-200 w-screen h-screen center">
		<Map />
	</div>
</div>
