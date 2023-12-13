// src/lib/stores/user.js
import { writable } from 'svelte/store';

// This store will hold the user object, which can include userid, token, and other user info
export const user = writable({ id: null, token: null }); // Initialize with null or any default state
