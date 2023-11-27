<script>
	import { onMount } from 'svelte';
	import 'ol/ol.css'; // Import OpenLayers styles
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import OSM from 'ol/source/OSM';
	import Geolocation from 'ol/Geolocation';
	import Overlay from 'ol/Overlay'; // Import Overlay from OpenLayers

	let map;
	let userPoint;

	onMount(() => {
		// Initialize the map
		map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM()
				})
			],
			view: new View({
				center: [0, 0],
				zoom: 2
			})
		});

		// Get user's location using Geolocation API
		const geolocation = new Geolocation({
			tracking: true,
			projection: map.getView().getProjection()
		});

		// Listen for changes in user's position
		geolocation.on('change:position', () => {
			const coordinates = geolocation.getPosition();
			if (coordinates) {
				// Update map view to user's location
				map.getView().animate({ center: coordinates, zoom: 12 }); // Adjust zoom level as needed
			}
		});

		// Handle errors in obtaining user's location
		geolocation.on('error', (error) => {
			console.error('Geolocation error:', error);
			// Handle error scenario (e.g., notify the user or use a default location)
		});

		// Event listener for map clicks
		map.on('click', (event) => {
			const coordinates = event.coordinate;

			// Create a div element for the point
			if (userPoint && userPoint.getPosition()) {
				const overlayPosition = userPoint.getPosition();
				const overlayPixel = map.getPixelFromCoordinate(overlayPosition);
				const clickPixel = event.pixel;

				overlayPixel[1] -= 25;

				const distance = Math.sqrt(
					Math.pow(overlayPixel[0] - clickPixel[0], 2) +
					Math.pow(overlayPixel[1] - clickPixel[1], 2)
				);

				if (distance <= 30) { // Change this value as needed to match the overlay size
					console.log('Clicked on userPoint');
					const popup = document.getElementById('popup');
					if (popup) {
						popup.classList.remove('hidden');
						console.log()
					}
				}
			}

			document.getElementById('point')?.remove();
			map.removeOverlay(userPoint);			

			const point = document.createElement('img');
			point.style.width = '50px';
			point.id = 'point';
			point.src = 'point.png';			

			// Create an overlay at the clicked coordinates
			userPoint = new Overlay({
				offset: [-25, -50],
				position: coordinates,
				element: point,
				stopEvent: false
			});
			map.addOverlay(userPoint);
		});

		document.getElementById('create')?.addEventListener('click', () => {
			const popup = document.getElementById('popup');
			if (popup) {
				popup.classList.add('hidden');
			}
			const activityPointElement = document.createElement('img');
			activityPointElement.style.width = '50px';
			activityPointElement.id = 'footballPoint';
			activityPointElement.src = 'footballPoint.png';

			const activityPoint = new Overlay({
				offset: [-25, -50],
				position: [0, 0],
				element: activityPointElement,
				stopEvent: false
			});
			map.addOverlay(activityPoint);

			activityPoint.setPosition(userPoint.getPosition());
			userPoint.setPosition(undefined);
		});

		document.addEventListener('click', (event) => {
			const popup = document.getElementById('popup');
			if (popup && !popup.contains(event.target)) {
				popup.classList.add('hidden');
			}
		});
	});	
</script>

<div id="popup" class="fixed left bg-white h-1/2 w-5/6 z-10 p-4 shadow-md rounded-md hidden">
	<h1 class="font-semibold">Create meeting</h1>
	<h2>Assign expected play-time</h2>
	<div class="flex justify-evenly w-1/2">
		<div class="border-y border-l border-gray-400 w-full center">10:00</div>
		<div class="border border-gray-400 w-full center">11:00</div>    
	</div>
	<h2 class="mt-3">Assign skill level</h2>
	<div class="flex justify-evenly">
		<div class="border-y border-l border-gray-400 w-full center">Beginner</div>
		<div class="border border-gray-400 w-full center">Intermediate</div>    
		<div class="border-y border-r border-gray-400 w-full center">Advanced</div>
	</div>
	<div>
		<button id="create" class="bg-orange-500 rounded-2xl p-2 mt-3 text-white text-semibold">Create</button>
	</div>
</div>
<div id="map" class="h-screen w-screen" />

<style>
	/* Custom styles for the map container if needed */
	#map {
		/* Custom styles */
		height: 91vh;
	}
</style>
