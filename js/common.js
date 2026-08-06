import {

    db,
    doc,
    collection

} from "./firebase.js";



// Create a permanent anonymous device ID

export function getDeviceId(){


    let id = localStorage.getItem("deviceID");



    if(!id){


        id = crypto.randomUUID();


        localStorage.setItem(
            "deviceID",
            id
        );


    }


    return id;


}




// Main voting room

export const roomRef = doc(

    db,

    "rooms",

    "main"

);




// Voter collection

export const votersRef = collection(

    roomRef,

    "voters"

);
