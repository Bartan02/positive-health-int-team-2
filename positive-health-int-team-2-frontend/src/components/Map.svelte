<script>
	import { onMount } from 'svelte';
	import 'ol/ol.css'; // Import OpenLayers styles
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import OSM from 'ol/source/OSM';
	import Geolocation from 'ol/Geolocation';
	import Overlay from 'ol/Overlay'; // Import Overlay from OpenLayers
	import { createMeeting } from '../lib/mapService.js';

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
				map.getView().animate({ center: coordinates, zoom: 14 }); // Adjust zoom level as needed
			}
		});

		// Handle errors in obtaining user's location
		geolocation.on('error', (error) => {
			console.error('Geolocation error:', error);
			// Handle error scenario (e.g., notify the user or use a default location)
		});

		// Event listener for map clicks
			map.on('click', (event) => {
				if (!document.getElementById('popup')?.classList.contains('hidden')) return;
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
					
					if (distance <= 30) {
						document.getElementById('popup')?.classList.remove('hidden');
						return;
					}	
				}
				const coordinates = event.coordinate;
				
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
			activityPointElement.src = 'map-icons/football/football-beginner.png';

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

	/**
	 * @type {any}
	 */
	let activity, skill, start, end, latitude, longitude;

	/**
	 * @param {string} selectedActivity
	 */
	function selectActivity(selectedActivity) {
		activity = selectedActivity;
		console.log('Selected activity:', activity);
	}

	/**
	 * @param {any} selectedSkill
	 */
	function selectSkill(selectedSkill) {
		skill = selectedSkill;
		// You can perform additional actions here based on the selected skill
		console.log('Selected skill:', skill);
	}

	function createMeetingInitial() {
		// @ts-ignore | We know that value exists on the element
		start = document.getElementById('meetingStart')?.value;
		// @ts-ignore | We know that value exists on the element
		end = document.getElementById('meetingEnd')?.value;
		latitude = userPoint.getPosition()[0];
		longitude = userPoint.getPosition()[1];

		createMeeting(activity, start, end, latitude, longitude, skill);
	}
</script>

<div id="popup" class="fixed left bg-white h-1/2 w-5/6 z-10 p-4 shadow-md rounded-md">
	<h1 class="font-semibold">Create meeting</h1>
	<h2>Choose activity</h2>
	<div id="activityContainer" class="flex justify-evenly center">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id="football"
			class="w-full border border-gray-400 center"
			on:click={() => selectActivity('football')}
		>
			<img src="football.png" class="w-1/3" alt="football" />
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id="basketball"
			class="w-full border-y border-gray-400 center"
			on:click={() => selectActivity('basketball')}
		>
			<img src="basketball.png" class="w-1/3" alt="basketball" />
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id="tennis"
			class="w-full border border-gray-400 center"
			on:click={() => selectActivity('tennis')}
		>
			<img src="tennis.png" class="w-1/3" alt="tennis" />
		</div>
		<div id="activity" class="hidden" />
	</div>
	<h2 class="mt-3">Assign expected play-time</h2>
	<div class="flex justify-evenly w-1/2">
		<select
			id="meetingStart"
			name="meetingStartTime"
			class="border-y border-l border-gray-400 w-full center"
		>
			<option value="9" selected>9:00</option>
			<option value="10">10:00</option>
			<option value="11">11:00</option>
			<option value="12">12:00</option>
		</select>
		<select
			id="meetingEnd"
			name="meetingEndTime"
			class="border-y border-x border-gray-400 w-full center"
		>
			<option value="13" selected>13:00</option>
			<option value="14">14:00</option>
			<option value="15">15:00</option>
			<option value="16">16:00</option>
		</select>
	</div>
	<h2 class="mt-3">Assign skill level</h2>
	<div class="flex justify-evenly">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id="beginner"
			class="border-y border-l border-gray-400 w-full center"
			on:click={() => selectSkill('beginner')}
		>
			Beginner
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id="intermediate"
			class="border border-gray-400 w-full center"
			on:click={() => selectSkill('intermediate')}
		>
			Intermediate
		</div>
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<div
			id="advanced"
			class="border-y border-r border-gray-400 w-full center"
			on:click={() => selectSkill('advanced')}
		>
			Advanced
		</div>
	</div>
	<div class="center h-1/2">
		<button
			id="create"
			class="bg-orange-500 rounded-2xl p-2 mt-3 text-white text-semibold"
			on:click={() => createMeetingInitial()}>Create</button
		>
	</div>
	<!-- <div>
		<h1>
			{#await getAllInfo()}
				<p>loading...</p>
			{:then info}
				<p>{JSON.stringify({info})} </p>
			{:catch error}
				<p>error: {error.message}</p>
			{/await}
		</h1>
	</div> -->
</div>		

<div id="map" class="h-screen w-screen" />

<style>
	/* Custom styles for the map container if needed */
	#map {
		/* Custom styles */
		height: 91vh;
	}
</style>
