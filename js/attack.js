/* ==========================================
   ClusterLog
   attack.js
========================================== */

let selectedKip = 0;
let selectedSide = "";
let selectedActivities = [];
let duration = 0;

/* -----------------------------
   Datum/Uhrzeit übernehmen
------------------------------ */

function fillCurrentDateTime() {

    const now = new Date();

    const date =
        now.toISOString().slice(0, 10);

    const time =
        now.toTimeString().slice(0, 8);

    document.getElementById("attackDate").value = date;
    document.getElementById("attackTime").value = time;

}

/* -----------------------------
   Dauer
------------------------------ */

function changeDuration(value){

    duration += value;

    if(duration < 0)
        duration = 0;

    document.getElementById("durationValue")
        .textContent = duration + " s";

}

/* -----------------------------
   KIP auswählen
------------------------------ */

function selectKip(value){

    selectedKip = value;

    document
        .querySelectorAll(".kipButton")
        .forEach(button=>{

            button.classList.remove("selected");

        });

    document
        .getElementById("kip"+value)
        .classList.add("selected");

}

/* -----------------------------
   Kopfseite
------------------------------ */

function selectSide(side){

    selectedSide = side;

}

/* -----------------------------
   Tätigkeit
------------------------------ */

function toggleActivity(activity){

    if(selectedActivities.includes(activity)){

        selectedActivities =
            selectedActivities.filter(a=>a!==activity);

    }else{

        selectedActivities.push(activity);

    }

}

/* -----------------------------
   Formular zurücksetzen
------------------------------ */

function resetAttackForm(){

    duration = 0;

    selectedKip = 0;

    selectedSide = "";

    selectedActivities = [];

    document.getElementById("durationValue")
        .textContent = "0 s";

}

/* -----------------------------
   Initialisierung
------------------------------ */

document.addEventListener("DOMContentLoaded",()=>{

    fillCurrentDateTime();

});