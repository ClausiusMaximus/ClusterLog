import {
    initDatabase,
    saveAttack
} from "./storage.js";

/* =========================================
   Status
========================================= */

let duration = 0;
let selectedKip = null;

/* =========================================
   Start
========================================= */

document.addEventListener("DOMContentLoaded", init);

async function init() {

    console.log("ClusterLog gestartet");

    await initDatabase();

    setupNowButton();
    setupDurationButtons();
    setupKipButtons();
    setupSaveButton();

    setCurrentDateTime();
    updateDurationDisplay();

}

/* =========================================
   Jetzt
========================================= */

function setupNowButton() {

    document
        .getElementById("nowButton")
        .addEventListener("click", setCurrentDateTime);

}

function setCurrentDateTime() {

    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("attackDate").value =
        `${year}-${month}-${day}`;

    document.getElementById("attackTime").value =
        `${hours}:${minutes}:${seconds}`;

}

/* =========================================
   Dauer
========================================= */

function setupDurationButtons() {

    document.getElementById("minus60").onclick = () => changeDuration(-60);
    document.getElementById("minus10").onclick = () => changeDuration(-10);
    document.getElementById("minus1").onclick = () => changeDuration(-1);

    document.getElementById("plus1").onclick = () => changeDuration(1);
    document.getElementById("plus10").onclick = () => changeDuration(10);
    document.getElementById("plus60").onclick = () => changeDuration(60);

}

function changeDuration(value) {

    duration += value;

    if (duration < 0)
        duration = 0;

    updateDurationDisplay();

}

function updateDurationDisplay() {

    const display =
        document.getElementById("durationValue");

    const hours =
        Math.floor(duration / 3600);

    const minutes =
        Math.floor((duration % 3600) / 60);

    const seconds =
        duration % 60;

    if (hours > 0) {

        display.textContent =
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;

    } else {

        const totalMinutes =
            Math.floor(duration / 60);

        display.textContent =
            `${String(totalMinutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}`;

    }

}

/* =========================================
   KIP
========================================= */

function setupKipButtons() {

    const buttons =
        document.querySelectorAll(".kip-btn");

    buttons.forEach(button => {

        button.onclick = () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            selectedKip =
                Number(button.dataset.kip);

        };

    });

}

/* =========================================
   Speichern
========================================= */

function setupSaveButton() {

    document
        .getElementById("saveButton")
        .addEventListener("click", saveCurrentAttack);

}

async function saveCurrentAttack() {

    if (selectedKip === null) {

        alert("Bitte KIP auswählen.");

        return;

    }

    const attack = {

        date:
            document.getElementById("attackDate").value,

        time:
            document.getElementById("attackTime").value,

        duration,

        kip: selectedKip,

        side: null,

        oxygen: false,

        sumatriptan: false,

        notes: "",

        createdAt: Date.now()

    };

    await saveAttack(attack);

    alert("Angriff gespeichert.");

    resetForm();

}

/* =========================================
   Reset
========================================= */

function resetForm() {

    duration = 0;

    selectedKip = null;

    updateDurationDisplay();

    setCurrentDateTime();

    document
        .querySelectorAll(".kip-btn")
        .forEach(btn =>
            btn.classList.remove("active")
        );

}