import {
    roomRef,
    votersRef
} from "./common.js";

import {
    updateDoc,
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
    getDoc
} from "./firebase.js";


// Page Elements

const statusText = document.getElementById("status");

const yesCount = document.getElementById("yesCount");

const noCount = document.getElementById("noCount");

const notVoted = document.getElementById("notVoted");


const openButton = document.getElementById("openButton");

const closeButton = document.getElementById("closeButton");

const resetButton = document.getElementById("resetButton");


// Settings

const TOTAL_VOTERS = 7;


// Track current round

let currentRound = 1;



// Listen for room status changes

onSnapshot(roomRef, (snapshot)=>{


    if(!snapshot.exists()){

        return;

    }


    const room = snapshot.data();


    currentRound = room.round;


    if(room.open){

        statusText.textContent =
            "Voting Open";

    }

    else{

        statusText.textContent =
            "Voting Closed";

    }


});





// Update vote totals

async function updateResults(){


    const snapshot =
        await getDocs(votersRef);



    let yes = 0;

    let no = 0;



    snapshot.forEach((vote)=>{


        const data = vote.data();



        if(data.round !== currentRound){

            return;

        }



        if(data.vote === "yes"){

            yes++;

        }



        if(data.vote === "no"){

            no++;

        }


    });



    yesCount.textContent = yes;


    noCount.textContent = no;


    notVoted.textContent =
        TOTAL_VOTERS - (yes + no);


}



// Watch voter changes

onSnapshot(votersRef, ()=>{


    updateResults();


});





// Open voting

openButton.addEventListener(
    "click",
    async ()=>{


        await updateDoc(

            roomRef,

            {

                open:true

            }

        );


    }
);





// Close voting

closeButton.addEventListener(
    "click",
    async ()=>{


        await updateDoc(

            roomRef,

            {

                open:false

            }

        );


    }
);





// Reset voting round

resetButton.addEventListener(
    "click",
    async ()=>{


        // Delete previous votes

        const votes =
            await getDocs(votersRef);



        for(const vote of votes.docs){


            await deleteDoc(

                doc(
                    votersRef,
                    vote.id
                )

            );


        }



        // Increase round number

        const room =
            await getDoc(roomRef);



        const nextRound =
            room.data().round + 1;



        await updateDoc(

            roomRef,

            {

                round:
                    nextRound,

                open:false

            }

        );


    }
);
