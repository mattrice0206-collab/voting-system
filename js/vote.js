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



const status = document.getElementById("status");

const buttons = document.getElementById("buttons");

const yesButton = document.getElementById("yesButton");

const noButton = document.getElementById("noButton");



const deviceID = getDeviceId();



let currentRound = 1;

let alreadyVoted = false;



// Watch voting status

onSnapshot(roomRef, async(snapshot)=>{


    if(!snapshot.exists()){

        status.textContent =
        "System unavailable";

        buttons.style.display="none";

        return;

    }



    const room = snapshot.data();


    currentRound = room.round;



    // Check previous vote

    const vote = await getDoc(

        doc(
            votersRef,
            deviceID
        )

    );



    alreadyVoted = false;



    if(vote.exists()){


        if(vote.data().round === currentRound){

            alreadyVoted = true;

        }

    }



    // Closed

    if(!room.open){


        status.textContent =
        "Waiting for next vote";


        buttons.style.display =
        "none";


        return;

    }



    // Already voted

    if(alreadyVoted){


        status.textContent =
        "Vote Recorded";


        buttons.style.display =
        "none";


        return;

    }



    // Open voting

    status.textContent =
    "Cast Your Vote";


    buttons.style.display =
    "flex";


});





async function castVote(choice){


    if(alreadyVoted){

        return;

    }



    await setDoc(

        doc(
            votersRef,
            deviceID
        ),

        {

            vote:choice,

            round:currentRound,

            timestamp:
            serverTimestamp()

        }

    );



    alreadyVoted=true;



    status.textContent =
    "Vote Recorded";


    buttons.style.display =
    "none";


}





yesButton.onclick=()=>{

    castVote("yes");

};



noButton.onclick=()=>{

    castVote("no");

};
