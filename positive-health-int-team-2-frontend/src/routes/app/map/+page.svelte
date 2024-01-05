<script>
	import Map from '../../../components/Map.svelte';
	import SideMenu from '../../../components/top-menu.svelte';
</script>

<div class="flex justify-start flex-col w-screen h-screen">
	<div style="background-color: #F65800;" class="h-20 w-full center">
		<SideMenu />
	</div>
	<div class="center bg-blue-200">
		<Map />
	</div>
</div>
