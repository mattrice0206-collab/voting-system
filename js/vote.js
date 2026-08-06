import {
    roomRef,
    votersRef,
    getDeviceId
} from "./common.js";

import {
    getDoc,
    setDoc,
    doc,
    onSnapshot,
    serverTimestamp
} from "./firebase.js";

const status = document.getElementById("status");
const buttons = document.getElementById("buttons");

const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

const deviceId = getDeviceId();

let currentRound = 1;

let hasVoted = false;


// Listen for room updates

onSnapshot(roomRef, async (snapshot) => {

    const room = snapshot.data();

    currentRound = room.round;

    // Has this device already voted this round?

    const voteDoc = await getDoc(doc(votersRef, deviceId));

    hasVoted = false;

    if (voteDoc.exists()) {

        if (voteDoc.data().round === currentRound) {

            hasVoted = true;

        }

    }

    if (!room.open) {

        status.textContent = "Waiting for next vote...";

        buttons.classList.add("hidden");

        return;

    }

    if (hasVoted) {

        status.textContent = "Vote Recorded";

        buttons.classList.add("hidden");

        return;

    }

    status.textContent = "Cast Your Vote";

    buttons.classList.remove("hidden");

});

async function vote(choice) {

    if (hasVoted) return;

    await setDoc(doc(votersRef, deviceId), {

        vote: choice,

        round: currentRound,

        timestamp: serverTimestamp()

    });

    hasVoted = true;

    status.textContent = "Vote Recorded";

    buttons.classList.add("hidden");

}

yesButton.onclick = () => vote("yes");

noButton.onclick = () => vote("no");
