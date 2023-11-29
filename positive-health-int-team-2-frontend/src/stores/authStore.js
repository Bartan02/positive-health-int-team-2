// import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from "firebase/auth";
// import { writable } from "svelte/store";
// import { auth } from "../lib/firebase/firebase.client";
// import { goto } from "$app/navigation";

// export const authStore = writable({
//     isLoading: true,
//     currentUser: null
// })

// export const authHandlers = {
//     login: async (email, password) => {
//         await signInWithEmailAndPassword(auth, email, password);
//         goto('/');
//     },
//     signup: async (email, password, username) => {
//         await createUserWithEmailAndPassword(auth, email, password)
//         .then(function(result){
//             const auth = getAuth();
//             updateProfile(auth.currentUser, {displayName: username})
//         })
//         goto('/');
//     },
//     logout: async () => {
//         await signOut(auth)
//     },
//     resetPassword: async (email) => {
//         console.log('WE ARE HERE', email)
//         if (!email) {
//             console.log('inHERE')
//             return
//         }
//         await sendPasswordResetEmail(auth, email)
//     },
//     updateEmail: async (email) => {
//         authStore.update(curr => {
//             return {
//                 ...curr, currentUser: {
//                     ...curr.currentUser, email: email
//                 }
//             }
//         })
//         await updateEmail(auth.currentUser, email)
//     },
//     updatePassword: async (password) => {
//         await updatePassword(auth.currentUser, password)
//     }
// }