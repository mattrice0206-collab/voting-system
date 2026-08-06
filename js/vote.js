import {
    roomRef,
    votersRef,
    getDeviceId
} from "./common.js";

import {
    doc,
    getDoc,
    setDoc,
    onSnapshot,
    serverTimestamp
} from "./firebase.js";


// Page elements

const statusText = document.getElementById("status");

const buttons = document.getElementById("buttons");

const yesButton = document.getElementById("yesButton");

const noButton = document.getElementById("noButton");


// Device identity

const deviceID = getDeviceId();


// Current voting round

let currentRound = 1;


// Prevent double clicking

let hasVoted = false;



// Watch the voting room

onSnapshot(roomRef, async (snapshot) => {


    if (!snapshot.exists()) {

        statusText.textContent =
            "Voting system unavailable";

        buttons.style.display = "none";

        return;

    }



    const room = snapshot.data();


    currentRound = room.round;



    // Check if this device already voted

    const existingVote = await getDoc(

        doc(
            votersRef,
            deviceID
        )

    );



    hasVoted = false;



    if(existingVote.exists()){


        const voteData = existingVote.data();



        if(voteData.round === currentRound){

            hasVoted = true;

        }

    }



    // Voting closed

    if(!room.open){


        statusText.textContent =
            "Waiting for next vote";


        buttons.style.display =
            "none";


        return;


    }



    // Already voted

    if(hasVoted){


        statusText.textContent =
            "Vote Recorded";


        buttons.style.display =
            "none";


        return;


    }



    // Voting available

    statusText.textContent =
        "Cast Your Vote";


    buttons.style.display =
        "grid";



});





// Submit vote

async function submitVote(choice){


    if(hasVoted){

        return;

    }



    await setDoc(

        doc(
            votersRef,
            deviceID
        ),

        {

            vote: choice,

            round: currentRound,

            timestamp:
                serverTimestamp()

        }


    );



    hasVoted = true;



    statusText.textContent =
        "Vote Recorded";


    buttons.style.display =
        "none";


}





// Buttons

yesButton.addEventListener(
    "click",
    () => {

        submitVote("yes");

    }
);



noButton.addEventListener(
    "click",
    () => {

        submitVote("no");

    }
);
