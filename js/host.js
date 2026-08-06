import {
    roomRef,
    votersRef
} from "./common.js";

import {
    updateDoc,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot
} from "./firebase.js";

const yesCount = document.getElementById("yesCount");
const noCount = document.getElementById("noCount");
const notVoted = document.getElementById("notVoted");

const openButton = document.getElementById("openButton");
const closeButton = document.getElementById("closeButton");
const resetButton = document.getElementById("resetButton");

const EXPECTED_VOTERS = 7;

async function updateResults() {

    const snapshot = await getDocs(votersRef);

    let yes = 0;
    let no = 0;

    snapshot.forEach(docSnap => {

        const vote = docSnap.data().vote;

        if (vote === "yes") yes++;

        if (vote === "no") no++;

    });

    yesCount.textContent = yes;
    noCount.textContent = no;
    notVoted.textContent = EXPECTED_VOTERS - (yes + no);

}

onSnapshot(votersRef, () => {

    updateResults();

});

openButton.onclick = async () => {

    await updateDoc(roomRef, {

        open: true

    });

};

closeButton.onclick = async () => {

    await updateDoc(roomRef, {

        open: false

    });

};

resetButton.onclick = async () => {

    const snapshot = await getDocs(votersRef);

    for (const vote of snapshot.docs) {

        await deleteDoc(doc(votersRef, vote.id));

    }

    const room = await roomRef;

    onSnapshot(roomRef, async (snap) => {

        const round = snap.data().round + 1;

        await updateDoc(roomRef, {

            round: round,
            open: false

        });

    });

};
