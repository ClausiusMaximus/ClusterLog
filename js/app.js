import { initDatabase } from "./storage.js";

document.addEventListener("DOMContentLoaded", init);

function init() {

    console.log("ClusterLog gestartet");

    initDatabase();

    setupNowButton();

    // Datum und Uhrzeit direkt beim Start setzen
    setCurrentDateTime();

}

function setupNowButton() {

    const button = document.getElementById("nowButton");

    if (button) {
        button.addEventListener("click", setCurrentDateTime);
    }

}

function setCurrentDateTime() {

    const now = new Date();

    // Datum YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    // Uhrzeit HH:MM:SS
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    const date = `${year}-${month}-${day}`;
    const time = `${hours}:${minutes}:${seconds}`;

    const dateInput = document.getElementById("attackDate");
    const timeInput = document.getElementById("attackTime");

    if (dateInput) {
        dateInput.value = date;
    }

    if (timeInput) {
        timeInput.value = time;
    }

}