<script>
	import { onMount } from 'svelte';
	import 'ol/ol.css'; // Import OpenLayers styles
	import Map from 'ol/Map';
	import View from 'ol/View';
	import TileLayer from 'ol/layer/Tile';
	import OSM from 'ol/source/OSM';
	import Geolocation from 'ol/Geolocation';
	import Overlay from 'ol/Overlay'; // Import Overlay from OpenLayers
	import { createMeeting, deleteMeetingFromDB, getAllMeetings, getMeetingPlayers, joinMeeting, leaveMeeting } from '../lib/mapService.js';
	import { containsCoordinate } from 'ol/extent.js';
	import { getUserInfo } from '$lib/userprofileService.js';

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
		// @ts-ignore
		userID = localStorage.getItem('userid');
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
			}),
			controls: []
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
		map.on('singleclick', (event) => {
			if (document.getElementById('popup')) return;

			const coordinates = event.coordinate;

			const existingPoint = document.getElementById('point');
			if (existingPoint) existingPoint.remove();
			map.removeOverlay(userPoint);

			const point = document.createElement('img');
			point.style.width = '50px';
			point.style.padding = '1px';
			point.id = 'point';
			point.src = '../point.png';

			userPoint = new Overlay({
				offset: [-25, -50],
				position: coordinates,
				element: point,
				stopEvent: false
			});

			point.addEventListener('click', () => {
				if (!popupInfoIsVisible){
					toggleVisibilityPopup();
				}
			});
			map.addOverlay(userPoint);
		});
	});

	/**
	 * @type {number}
	 */
	let activityID
	/**
	 * @type {string}
	 */
	let activity
	/**
	 * @type {number}
	 */
	let start;
	/**
	 * @type {number}
	 */
	let end;
	/**
	 * @type {string}
	 */
	let skill;
	/**
	 * @type {number }
	 */
	let userID;
	/**
	 * @type {any}
	 */
	let meetingPlayers = [];

	/**
	 * Sets the activity for the meeting
	 * @param {string} userInfo
	 * @type {{ username: string; email: string; password: string; profile_pic: string; date_of_birth: string; height: number; weight: number; sex: string; first_name: string; surname: string; }}
	 */
	let userInfo;

	/**
	 * Sets the activity for the meeting
	 * @param {string} selectedActivity
	 */
	function selectActivity(selectedActivity) {
		activity = selectedActivity;
		const activityElements = document.getElementById('activityContainer')?.children;

		// @ts-ignore
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

		// @ts-ignore
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
			console.log(meetingsArray);
			meetingsArray.forEach((meeting) => {
					const activityPointElement = document.createElement('img');
					activityPointElement.style.width = '50px';
					activityPointElement.id = `${meeting.activity}Point`;
					activityPointElement.src = `../map-icons/${meeting.activity}/${meeting.activity}-${meeting.skillLevel}.png`;

					const activityPoint = new Overlay({
						offset: [-25, -50],
						position: [meeting.locationLatitude, meeting.locationLongitude],
						element: activityPointElement,
						stopEvent: false
					});

					map.addOverlay(activityPoint);
					
					activityPointElement.addEventListener('click', () => {
						const meetingStartTime = new Date(meeting.meetingStartTime);
						const meetingEndTime = new Date(meeting.meetingEndTime);
						
						activity = meeting.activity;
						skill = meeting.skillLevel;
						start = meetingStartTime.getUTCHours()
						end = meetingEndTime.getUTCHours()
						userID = meeting.makerUserID;
						activityID = meeting.ID;
						getMeetingPlayers(activityID).then((data) => {
							meetingPlayers = [];
							data.players.forEach(element => {
								meetingPlayers.push(element.playerID);
							});
							console.log(meetingPlayers);
						});
						if (!popupIsVisible) {
							toggleVisibilityPopupInfo();
						}
					});
				}
				);
		});
	}
	function toggleVisibilityPopup() {
		popupIsVisible = !popupIsVisible;
	}

	function toggleVisibilityPopupInfo() {
		popupInfoIsVisible = !popupInfoIsVisible;
	}

	function createNewMeeting() {
		// @ts-ignore
		start = document.getElementById('meetingStart')?.value;
		// @ts-ignore
		end = document.getElementById('meetingEnd')?.value;
		// @ts-ignore
		let latitude = userPoint.getPosition()[0];
		// @ts-ignore
		let longitude = userPoint.getPosition()[1];

		createMeeting(activity, start, end, latitude, longitude, skill, userID).then((data) => {
			location.reload();
		})
	}

	function joinMeetingButton() {
		toggleVisibilityPopupInfo();
		console.log('Joining meeting');
		userID = localStorage.getItem('userid');
		joinMeeting(activityID, userID);
	}
	function deleteMeeting() {
		toggleVisibilityPopupInfo();
		console.log('Deleting meeting')
		deleteMeetingFromDB(activityID).then (() => {
			location.reload();
		})
	}
	function leaveMeetingButton() {
		toggleVisibilityPopupInfo();
		console.log('Leaving meeting')
		userID = localStorage.getItem('userid');
		leaveMeeting(activityID, userID);
	}
</script>

{#if popupInfoIsVisible}
	<div id="popup-info-content" class="fixed left bg-white w-5/6 z-10 p-4 shadow-md rounded-md">
		<div class="flex justify-between">
			<h1 class="font-semibold text-xl">Meeting info</h1>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="closeButton" class="text-xl" on:click={toggleVisibilityPopupInfo}>X</div>
		</div>
		<div class="flex gap-5">
			<div class="w-full">
				<h2>Expected play-time:</h2>
				<div class="flex justify-start w-full h-10 flex-row">
					<div class="h-full w-full center border border-gray-400">
						<h2>{start}:00</h2>
					</div>
					<div class="h-full w-full center border-r border-y border-gray-400">
						<h2>{end}:00</h2>
					</div>
				</div>
				<div class="mt-3">
					<h2>Skill level:</h2>
					<div class="flex justify-start w-full h-10 flex-row">
						<div class="h-full w-full center border border-gray-400">
							<h2>{skill}</h2>
						</div>
					</div>
				</div>
			</div>
			<div class="center flex-col w-2/3">
				<h2>Activity:</h2>
				<img src={`../map-icons/${activity}/${activity}-${skill}.png`} alt="activity" class="border border-gray-400 p-2" />
				<h2>{activity}</h2>
			</div>
		</div>
		<div class="w-full h-full p-2 bg-gray-200 border border-gray-400 center flex-col gap-2">
			{#if meetingPlayers.length > 0}
				{#each meetingPlayers as player}
					{#await getUserInfo(player)}
						<div>
							<p>Loading...</p>
						</div>
					{:then userInfo}
						{#if player == localStorage.getItem('userid')}
							<div class="center justify-start bg-white p-2 gap-3 border-orange-500 border rounded-2xl">
								<img src="{userInfo.user.profilePic}" alt="profile-pic" class="w-1/6 rounded-full border border-black" />
								<h2>{userInfo.user.firstName}</h2>
							</div>
						{:else}
							<div class="center justify-start bg-white p-2 gap-3 border-gray-300 border rounded-2xl">
								<img src="{userInfo.user.profilePic}" alt="profile-pic" class="w-1/6 rounded-full border border-black" />
								<h2>{userInfo.user.firstName}</h2>
							</div>
						{/if}
					{:catch error}
						<p>Something went wrong: {error.message}</p>
					{/await}
				{/each}
			{:else}
				<div>
					<p>Meeting is empty</p>
				</div>
			{/if}
		</div>
		<div class="center w-full">
			{#if meetingPlayers.includes(parseInt(localStorage.getItem('userid')))}
				<button id="leave" class="bg-orange-500 rounded-2xl p-2 mt-3 text-white text-semibold" on:click={() => leaveMeetingButton()}>Leave</button>
			{:else}
				<button id="join" class="bg-orange-500 rounded-2xl p-2 mt-3 text-white text-semibold" on:click={() => joinMeetingButton()}>Join</button>
			{/if}
			<!-- <button id="join" class="bg-orange-500 rounded-2xl p-2 mt-3 text-white text-semibold" on:click={() => joinMeetingButton()}>Join</button> -->
			{#if userID == localStorage.getItem('userid')}
				<button id="delete" class="bg-orange-500 rounded-2xl p-2 mt-3 text-white text-semibold" on:click={() => deleteMeeting()}>Delete</button>
			{/if}
		</div>
	</div>
{/if}
{#if popupIsVisible}
	<div id="popup" class="fixed left bg-white w-5/6 z-10 p-4 shadow-md rounded-md">
		<div class="flex justify-between">
			<h1 class="font-semibold text-xl">Create meeting</h1>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="closeButton" class="text-xl" on:click={toggleVisibilityPopup}>X</div>
		</div>
		<h2>Choose activity</h2>
		<div id="activityContainer" class="flex justify-evenly center">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="football" class="w-full border border-gray-400 center flex-col h-10" on:click={() => selectActivity('football')}>
				<img src="../football.png" class="w-1/3" alt="football" />
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="basketball" class="w-full border-y border-gray-400 center h-10" on:click={() => selectActivity('basketball')}>
				<img src="../basketball.png" class="w-1/3" alt="basketball" />
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="tennis" class="w-full border border-gray-400 center h-10" on:click={() => selectActivity('tennis')}>
				<img src="../tennis.png" class="w-1/3" alt="tennis" />
			</div>
			<div id="activity" class="hidden" />
		</div>
		<h2 class="mt-3">Assign expected play-time</h2>
		<div class="flex justify-evenly h-10 w-4/6">
			<select id="meetingStart" name="meetingStartTime" class="border-y border-l border-gray-400 w-full center">
				<option value="9" selected>9:00</option>
				<option value="10">10:00</option>
				<option value="11">11:00</option>
				<option value="12">12:00</option>
			</select>
			<select id="meetingEnd" name="meetingEndTime" class="border-y border-x border-gray-400 w-full center">
				<option value="13" selected>13:00</option>
				<option value="14">14:00</option>
				<option value="15">15:00</option>
				<option value="16">16:00</option>
			</select>
		</div>
		<h2 class="mt-3">Assign skill level</h2>
		<div id="skillContainer" class="flex justify-evenly h-10">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="beginner" class="border-y border-l border-gray-400 w-full center" on:click={() => selectSkill('beginner')}>
				Beginner
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="intermediate" class="border border-gray-400 w-full center" on:click={() => selectSkill('intermediate')}>
				Intermediate
			</div>
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<div id="advanced" class="border-y border-r border-gray-400 w-full center" on:click={() => selectSkill('advanced')}>
				Advanced
			</div>
		</div>
		<div class="center w-full">
			<button id="create" class="bg-orange-500 rounded-2xl p-2 mt-3 text-white text-semibold" on:click={() => createNewMeeting()}>Create</button>
		</div>
	</div>
{/if}

<div id="map" class="h-full w-full" />
