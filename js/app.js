/* ==========================================
   ClusterLog v0.3.5 Stable
   Teil 1c.1
   App-Start & Navigation
========================================== */

import {
    initDatabase,
    saveAttack,
    getAttacks,
    deleteAttack
} from "./storage.js";

/* ==========================================
   Ansichten
========================================== */

const Views = {
    CAPTURE: "captureView",
    HISTORY: "historyView",
    STATISTICS: "statisticsView"
};

/* ==========================================
   Status
========================================== */

const state = {

    currentView: Views.CAPTURE,

    duration: 0,

    selectedKip: null

};

/* ==========================================
   Start
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    init
);

async function init() {

    await initDatabase();

    setupNavigation();

    showView(Views.CAPTURE);

}

/* ==========================================
   Navigation
========================================== */

function setupNavigation() {

    document
        .getElementById("navCapture")
        .addEventListener(
            "click",
            () => showView(Views.CAPTURE)
        );

    document
        .getElementById("navHistory")
        .addEventListener(
            "click",
            () => showView(Views.HISTORY)
        );

    document
        .getElementById("navStatistics")
        .addEventListener(
            "click",
            () => showView(Views.STATISTICS)
        );

}

/* ==========================================
   View wechseln
========================================== */

function showView(view) {

    state.currentView = view;

    document
        .querySelectorAll(".view")
        .forEach(section => {

            section.classList.remove("active");

            section.classList.add("hidden");

        });

    const current =
        document.getElementById(view);

    current.classList.remove("hidden");

    current.classList.add("active");

    updateNavigation();

}

/* ==========================================
   Navigation markieren
========================================== */

function updateNavigation() {

    document
        .querySelectorAll("nav button")
        .forEach(button =>
            button.classList.remove("active")
        );

    switch(state.currentView){

        case Views.CAPTURE:

            document
                .getElementById("navCapture")
                .classList.add("active");

            break;

        case Views.HISTORY:

            document
                .getElementById("navHistory")
                .classList.add("active");

            break;

        case Views.STATISTICS:

            document
                .getElementById("navStatistics")
                .classList.add("active");

            break;

    }

}

/* ==========================================
   Toast
========================================== */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2200);

}

/* ==========================================
   Vibration
========================================== */

function vibrate(duration = 30){

    if("vibrate" in navigator){

        navigator.vibrate(duration);

    }

}
/* ==========================================
   Teil 1c.2
   Datum, Uhrzeit, Dauer, KIP
========================================== */

/* ==========================================
   Initialisierung
========================================== */

setupNowButton();
setupDurationButtons();
setupKipButtons();

setCurrentDateTime();
updateDurationDisplay();

/* ==========================================
   Jetzt-Button
========================================== */

function setupNowButton() {

    document
        .getElementById("nowButton")
        .addEventListener(
            "click",
            setCurrentDateTime
        );

}

function setCurrentDateTime() {

    const now = new Date();

    document
        .getElementById("attackDate")
        .value =
        now.toISOString().split("T")[0];

    document
        .getElementById("attackTime")
        .value =
        now.toLocaleTimeString(
            "de-DE",
            {
                hour12: false
            }
        );

}

/* ==========================================
   Dauer
========================================== */

function setupDurationButtons() {

    const buttons = {

        minus60: -60,
        minus10: -10,
        minus1: -1,

        plus1: 1,
        plus10: 10,
        plus60: 60

    };

    Object.entries(buttons).forEach(([id, value]) => {

        document
            .getElementById(id)
            .addEventListener(
                "click",
                () => changeDuration(value)
            );

    });

}

function changeDuration(seconds) {

    state.duration += seconds;

    if (state.duration < 0) {

        state.duration = 0;

    }

    updateDurationDisplay();

}

function updateDurationDisplay() {

    document
        .getElementById("durationValue")
        .textContent =
        formatDuration(state.duration);

}

function formatDuration(totalSeconds) {

    totalSeconds =
        Math.max(
            0,
            Math.floor(totalSeconds)
        );

    const hours =
        Math.floor(totalSeconds / 3600);

    const minutes =
        Math.floor(
            (totalSeconds % 3600) / 60
        );

    const seconds =
        totalSeconds % 60;

    return `${String(hours).padStart(2, "0")}:` +
           `${String(minutes).padStart(2, "0")}:` +
           `${String(seconds).padStart(2, "0")}`;

}

/* ==========================================
   KIP
========================================== */

function setupKipButtons() {

    const buttons =
        document.querySelectorAll(".kip-btn");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                buttons.forEach(btn =>
                    btn.classList.remove("active")
                );

                button.classList.add("active");

                state.selectedKip =
                    Number(button.dataset.kip);

            }
        );

    });

}
/* ==========================================
   Teil 1c.3
   Speichern & Formular zurücksetzen
========================================== */

setupSaveButton();

/* ==========================================
   Speichern
========================================== */

function setupSaveButton() {

    document
        .getElementById("saveButton")
        .addEventListener(
            "click",
            saveCurrentAttack
        );

}

async function saveCurrentAttack() {

    if (state.selectedKip === null) {

        showToast("Bitte KIP auswählen");

        return;

    }

    const attack = {

        date:
            document.getElementById("attackDate").value,

        time:
            document.getElementById("attackTime").value,

        duration:
            state.duration,

        kip:
            state.selectedKip,

        side: null,

        oxygen: false,

        sumatriptan: false,

        notes: "",

        createdAt:
            Date.now()

    };

    try {

        await saveAttack(attack);

        vibrate(30);

        showToast("✓ Angriff gespeichert");

        resetForm();

        refreshCurrentView();

    }
    catch(error){

        console.error(error);

        showToast("Speichern fehlgeschlagen");

    }

}

/* ==========================================
   Formular zurücksetzen
========================================== */

function resetForm(){

    state.duration = 0;

    state.selectedKip = null;

    updateDurationDisplay();

    setCurrentDateTime();

    document
        .querySelectorAll(".kip-btn")
        .forEach(button =>
            button.classList.remove("active")
        );

}

/* ==========================================
   Aktive Seite aktualisieren
========================================== */

async function refreshCurrentView(){

    switch(state.currentView){

        case Views.HISTORY:

            if(typeof renderHistory === "function"){

                await renderHistory();

            }

            break;

        case Views.STATISTICS:

            if(typeof updateStatistics === "function"){

                await updateStatistics();

            }

            break;

    }

}
