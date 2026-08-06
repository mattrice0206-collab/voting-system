import {
    db,
    doc,
    collection
} from "./firebase.js";

// Get or create a unique device ID
export function getDeviceId() {

    let id = localStorage.getItem("deviceId");

    if (!id) {

        id = crypto.randomUUID();

        localStorage.setItem("deviceId", id);

    }

    return id;

}

// Firestore references
export const roomRef = doc(db, "rooms", "main");

export const votersRef = collection(roomRef, "voters");
