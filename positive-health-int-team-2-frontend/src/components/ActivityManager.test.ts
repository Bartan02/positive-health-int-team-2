import { describe, it, expect, vi } from 'vitest';
import { calculateSpeed } from './ActivityManager.svelte';

// Mocking dependencies
let previousLocation = null;
let lastUpdateTime = 0;
let totalDistance = 0;
const maxHumanSpeed = 45; // Define a reasonable max human speed in km/h
const SPRINT_THRESHOLD_SPEED = 20; // Define a sprint threshold speed in km/h
const currentSpeed = { set: vi.fn() }; // Mock Svelte store
const distance = { set: vi.fn() }; // Mock Svelte store
let sprintDistance = 0;

// Mocking the haversine function
const haversine = vi.fn((prev, current) => {
    return 1000; // 1 km
});

describe('calculateSpeed function', () => {
    it('should calculate speed correctly under normal conditions', () => {
        // Setup the initial state
        previousLocation = { lat: 10, lon: 10 };
        lastUpdateTime = Date.now() - 1000; // 1 second ago

        // Call the function with a new location
        calculateSpeed({ lat: 10.01, lon: 10.01 });

        // Check if the speed and distance were updated correctly
        expect(currentSpeed.set).toHaveBeenCalledWith(expect.any(Number));
        expect(distance.set).toHaveBeenCalledWith(expect.any(Number));
    });

});



// function calculateSpeed(currentLocation) {
//     if (previousLocation) {
//         const timeDifference = Date.now() - lastUpdateTime;

//         if (timeDifference > 0) {
//             const distanceCovered = haversine(previousLocation, currentLocation);
//             let speed = 0;

//             if (distanceCovered > 0) {
//                 speed = (distanceCovered / (timeDifference / 1000)) * 3.6;
//                 totalDistance += distanceCovered; // Accumulate distance

//                 if (speed > maxHumanSpeed) {
//                     speed = 0;
//                 } else if (speed >= SPRINT_THRESHOLD_SPEED) {
//                     sprintDistance += distanceCovered;
//                 }
//             }

//             currentSpeed.set(speed);
//             distance.set(totalDistance); // Update the distance store
//         } else {
//             currentSpeed.set(0);
//         }

//         lastUpdateTime = Date.now();
//         previousLocation = currentLocation;
//     } else {
//         previousLocation = currentLocation;
//         lastUpdateTime = Date.now();
//     }
// }