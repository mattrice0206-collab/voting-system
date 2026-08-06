// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getFirestore,
    doc,
    collection,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
    increment,
    query
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2hBSzBeTMoIAC2n16rypTlYnoR9RXsbI",
    authDomain: "congress-voting.firebaseapp.com",
    projectId: "congress-voting",
    storageBucket: "congress-voting.firebasestorage.app",
    messagingSenderId: "529397890096",
    appId: "1:529397890096:web:0ec2ef5fcdf0839ca081f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Export everything we'll use throughout the project
export {
    db,
    doc,
    collection,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    onSnapshot,
    serverTimestamp,
    increment,
    query
};
