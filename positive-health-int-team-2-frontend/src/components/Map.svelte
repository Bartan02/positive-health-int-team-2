<script>
	import { onMount } from 'svelte';
	import 'ol/ol.css'; // Import OpenLayers styles
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import OSM from 'ol/source/OSM';
	import Geolocation from 'ol/Geolocation';
	import Overlay from 'ol/Overlay'; // Import Overlay from OpenLayers
	import { createMeeting, getAllMeetings } from '../lib/mapService.js';
	import { set } from 'ol/transform.js';

	/**
	 * @type {Map}
	 */
	let map;
	/**
	 * @type {Overlay}
	 */
	let userPoint;	
	
	let popupIsVisible = false;
	let popupInfoIsVisible = false;

	onMount(() => {
		popupIsVisible = false;
		popupInfoIsVisible = false;

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
				map.getView().animate({ center: coordinates, zoom: 14 });
			}
		});
		
		// Handle errors in obtaining user's location
		geolocation.on('error', (error) => {
			console.error('Geolocation error:', error);
		});
		
		createMeetingsAtStart();

		// Event listener for map clicks
		map.on('click', (event) => {
			if (document.getElementById('popup')) return;
			
			if (userPoint && userPoint.getPosition()) {
				const overlayPosition = userPoint.getPosition();
				const overlayPixel = map.getPixelFromCoordinate(overlayPosition);
				const clickPixel = event.pixel;

				overlayPixel[1] -= 25;

				const distance = Math.hypot(
					overlayPixel[0] - clickPixel[0],
					overlayPixel[1] - clickPixel[1]
				);

				if (distance <= 30) {
					toggleVisibilityPopup();	
					return;
				}
			}

			const coordinates = event.coordinate;

			const existingPoint = document.getElementById('point');
			if (existingPoint) existingPoint.remove();
			map.removeOverlay(userPoint);

			const point = document.createElement('img');
			point.style.width = '50px';
			point.id = 'point';
			point.src = 'point.png';

			userPoint = new Overlay({
				offset: [-25, -50],
				position: coordinates,
				element: point,
				stopEvent: false
			});
			map.addOverlay(userPoint);
		});

		// Close popup when clicking outside of it
		document.addEventListener('click', (event) => {
			if (popupIsVisible && !event.target?.closest('#popup')) {
				toggleVisibilityPopup();
			}
		});
	});

	/**
	 * @type {string}
	 */
	let activity, start, end, latitude, longitude, skill;

	/**
	 * Sets the activity for the meeting
	 * @param {string} selectedActivity
	 */
	function selectActivity(selectedActivity) {
		activity = selectedActivity;
		const activityElements = document.getElementById('activityContainer')?.children;

		Array.from(activityElements).forEach((element) => {
			if (element.nodeType === 1) {
				element.classList.remove('bg-gray-200');
			}
		});
		document.getElementById(activity)?.classList.add('bg-gray-200');
	}

	/**
	 * Sets the skill level for the meeting
	 * @param {any} selectedSkill
	 */
	function selectSkill(selectedSkill) {
		skill = selectedSkill;
		const skillElements = document.getElementById('skillContainer')?.children;

		Array.from(skillElements).forEach((element) => {
			if (element.nodeType === 1) {
				element.classList.remove('bg-gray-200');
			}
		});
		document.getElementById(skill)?.classList.add('bg-gray-200');
	}

	//Creates all meetings in database at start (onMount)
	function createMeetingsAtStart() {
		getAllMeetings().then((meetings) => {
			const meetingsArray = Object.values(meetings)[0];
			console.log(meetingsArray)
			meetingsArray.forEach((/** @type {{ activity: any; skillLevel: any; locationLatitude: number; locationLongitude: number; }} */ meeting) => {
				const activityPointElement = document.createElement('img');
				activityPointElement.style.width = '50px';
				activityPointElement.id = `${meeting.activity}Point`;
				activityPointElement.src = `map-icons/${meeting.activity}/${meeting.activity}-${meeting.skillLevel}.png`;

				const activityPoint = new Overlay({
					offset: [-25, -50],
					position: [meeting.locationLatitude, meeting.locationLongitude],
					element: activityPointElement,
					stopEvent: false
				});
				
				activityPointElement.addEventListener('click', () => {
					activity = meeting.activity;
					skill = meeting.skillLevel;
					start = '9';
					end = '13';
					latitude = meeting.locationLatitude;
					longitude = meeting.locationLongitude;
					if (!popupInfoIsVisible) {
						toggleVisibilityPopupInfo();
					}
				});
				map.addOverlay(activityPoint);
			});
		});
	}
	function toggleVisibilityPopup() {
    	popupIsVisible = !popupIsVisible;
 	}

	function toggleVisibilityPopupInfo() {
		popupInfoIsVisible = !popupInfoIsVisible;
 	}

	function createNewMeeting() {
		// @ts-ignore | We know that value exists on the element
		start = document.getElementById('meetingStart')?.value;
		// @ts-ignore | We know that value exists on the element
		end = document.getElementById('meetingEnd')?.value;
		// @ts-ignore
		let latitude = userPoint.getPosition()[0];
		// @ts-ignore
		let longitude = userPoint.getPosition()[1];
		createMeeting(activity, start, end, latitude, longitude, skill);

		toggleVisibilityPopup();

		const activityPointElement = document.createElement('img');
		activityPointElement.style.width = '50px';
		activityPointElement.id = `${activity}Point`;
		activityPointElement.src = `map-icons/${activity}/${activity}-${skill}.png`;

		const activityPoint = new Overlay({
			offset: [-25, -50],
			position: [latitude, longitude],
			element: activityPointElement,
			stopEvent: false
		});
		map.addOverlay(activityPoint);
		userPoint.setPosition(undefined);
	}
</script>
{#if popupInfoIsVisible}
	<div id="popup-info-content" class="fixed left bg-white h-1/2 w-5/6 z-10 p-4 shadow-md rounded-md">
		<h1 class="font-semibold">Meeting info</h1>
		<h2>Activity: {activity}</h2>
		<h2>Expected play-time: {start}:00 - {end}:00</h2>
		<h2>Skill level: {skill}</h2>
		<h2 id="closeButton" on:click={toggleVisibilityPopupInfo}>Close X</h2>
	</div>
 {/if}
{#if popupIsVisible}
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
		<div id="skillContainer" class="flex justify-evenly">
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
				on:click={() => createNewMeeting()}>Create</button
			>
		</div>
	</div>
{/if}

<div id="map" class="h-screen w-screen" />

<style>
	/* Custom styles for the map container if needed */
	#map {
		/* Custom styles */
		height: 91vh;
	}
</style>
