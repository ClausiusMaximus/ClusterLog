import { initDatabase } from "./storage.js";

document.addEventListener("DOMContentLoaded", init);

let duration = 0;

function init() {

    console.log("ClusterLog gestartet");

    initDatabase();

    setupNowButton();

    // Datum und Uhrzeit direkt beim Start setzen
    setCurrentDateTime();

    setupDurationButtons();
    updateDurationDisplay();

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
function setupDurationButtons() {

    document.getElementById("minus60").addEventListener("click", () => changeDuration(-60));
    document.getElementById("minus10").addEventListener("click", () => changeDuration(-10));
    document.getElementById("minus1").addEventListener("click", () => changeDuration(-1));

    document.getElementById("plus1").addEventListener("click", () => changeDuration(1));
    document.getElementById("plus10").addEventListener("click", () => changeDuration(10));
    document.getElementById("plus60").addEventListener("click", () => changeDuration(60));

}

function changeDuration(value) {

    duration += value;

    if (duration < 0) {
        duration = 0;
    }

    updateDurationDisplay();

}

function updateDurationDisplay() {

    const display = document.getElementById("durationValue");

    if (!display) return;

    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = duration % 60;

    let formattedTime;

    if (hours > 0) {

        formattedTime =
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;

    } else {

        const totalMinutes = Math.floor(duration / 60);

        formattedTime =
            `${String(totalMinutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;

    }

    display.textContent = formattedTime;

}