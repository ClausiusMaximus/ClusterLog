import {
    initDatabase,
    saveAttack,
    getAttacks,
    deleteAttack
} from "./storage.js";

/* =========================================
   Konstanten
========================================= */

const Views = {
    CAPTURE: "capture",
    HISTORY: "history",
    STATISTICS: "statistics"
};

/* =========================================
   App-Status
========================================= */

const state = {
    duration: 0,
    selectedKip: null,
    currentView: Views.CAPTURE
};

/* =========================================
   Start
========================================= */

document.addEventListener("DOMContentLoaded", init);

async function init() {

    console.log("ClusterLog gestartet");

    await initDatabase();

    setupNavigation();
    setupNowButton();
    setupDurationButtons();
    setupKipButtons();
    setupSaveButton();

    setCurrentDateTime();
    updateDurationDisplay();

    showView(Views.CAPTURE);

}

/* =========================================
   Navigation
========================================= */

function setupNavigation() {

    document
        .getElementById("navCapture")
        .addEventListener("click", () => {

            showView(Views.CAPTURE);

        });

    document
        .getElementById("navHistory")
        .addEventListener("click", async () => {

            await renderHistory();

            showView(Views.HISTORY);

        });

    document
        .getElementById("navStatistics")
        .addEventListener("click", async () => {

            await updateStatistics();

            showView(Views.STATISTICS);

        });

}

function showView(view) {

    state.currentView = view;

    document.getElementById("captureView").style.display =
        view === Views.CAPTURE ? "block" : "none";

    document.getElementById("historyView").style.display =
        view === Views.HISTORY ? "block" : "none";

    document.getElementById("statisticsView").style.display =
        view === Views.STATISTICS ? "block" : "none";

    updateNavigation();

}

function updateNavigation() {

    document
        .querySelectorAll("nav button")
        .forEach(button =>
            button.classList.remove("active")
        );

    switch (state.currentView) {

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

/* =========================================
   Datum / Uhrzeit
========================================= */

function setupNowButton() {

    document
        .getElementById("nowButton")
        .addEventListener("click", setCurrentDateTime);

}

function setCurrentDateTime() {

    const now = new Date();

    const date =
        now.toISOString().split("T")[0];

    const time =
        now.toLocaleTimeString(
            "de-DE",
            {
                hour12: false
            }
        );

    document
        .getElementById("attackDate")
        .value = date;

    document
        .getElementById("attackTime")
        .value = time;

}

/* =========================================
   Dauer
========================================= */

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
            .addEventListener("click", () => {

                changeDuration(value);

            });

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

/* =========================================
   KIP
========================================= */

function setupKipButtons() {

    const buttons =
        document.querySelectorAll(".kip-btn");

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            buttons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            state.selectedKip =
                Number(button.dataset.kip);

        });

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

    if (state.selectedKip === null) {

        alert("Bitte KIP auswählen.");

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

        createdAt: Date.now()

    };

    try {

        await saveAttack(attack);

        resetForm();

        if (state.currentView === Views.HISTORY) {

            await renderHistory();

        }

        if (state.currentView === Views.STATISTICS) {

            await updateStatistics();

        }

        alert("Angriff gespeichert.");

    }
    catch (error) {

        console.error(error);

        alert("Fehler beim Speichern.");

    }

}

/* =========================================
   Reset
========================================= */

function resetForm() {

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

/* =========================================
   Verlauf
========================================= */

async function renderHistory() {

    const historyList =
        document.getElementById("historyList");

    const attacks =
        await getAttacks();

    if (attacks.length === 0) {

        historyList.innerHTML = `
            <div class="empty-state">
                Noch keine Angriffe gespeichert.
            </div>
        `;

        return;

    }

    historyList.innerHTML = "";

    const grouped =
        groupAttacksByDate(attacks);

    Object.keys(grouped)
        .sort((a, b) => new Date(b) - new Date(a))
        .forEach(date => {

            historyList.appendChild(

                createHistoryDay(
                    date,
                    grouped[date]
                )

            );

        });

}

function groupAttacksByDate(attacks) {

    attacks.sort((a, b) => {

        return new Date(`${b.date}T${b.time}`) -
               new Date(`${a.date}T${a.time}`);

    });

    const groups = {};

    attacks.forEach(attack => {

        if (!groups[attack.date]) {

            groups[attack.date] = [];

        }

        groups[attack.date].push(attack);

    });

    return groups;

}

function createHistoryDay(date, attacks) {

    const day =
        document.createElement("div");

    day.className = "history-day";

    day.innerHTML =
        `<h3>${formatDate(date)}</h3>`;

    attacks.forEach(attack => {

        day.appendChild(

            createHistoryItem(attack)

        );

    });

    return day;

}

function createHistoryItem(attack) {

    const item =
        document.createElement("div");

    item.className =
        "history-item";

    item.innerHTML = `

        <div class="history-header">

            <strong>${attack.time}</strong>

            <button
                class="delete-btn">

                🗑️

            </button>

        </div>

        <div>

            KIP ${attack.kip}

        </div>

        <div>

            Dauer:
            ${formatDuration(attack.duration)}

        </div>

    `;

    item
        .querySelector(".delete-btn")
        .addEventListener(
            "click",
            () => deleteHistoryItem(attack.id)
        );

    return item;

}

async function deleteHistoryItem(id) {

    if (!confirm("Eintrag löschen?")) {

        return;

    }

    await deleteAttack(id);

    await renderHistory();

    await updateStatistics();

}

function formatDate(date) {

    return new Date(date)
        .toLocaleDateString(
            "de-DE",
            {

                weekday: "long",

                day: "2-digit",

                month: "2-digit",

                year: "numeric"

            }

        );

}

/* =========================================
   Statistik
========================================= */

async function updateStatistics() {

    const attacks =
        await getAttacks();

    updateTodayStatistic(attacks);
    updateWeekStatistic(attacks);
    updateMonthStatistic(attacks);
    updateAverageDuration(attacks);

}

function updateTodayStatistic(attacks) {

    const today =
        new Date().toISOString().split("T")[0];

    document
        .getElementById("statToday")
        .textContent =
        attacks.filter(
            attack => attack.date === today
        ).length;

}

function updateWeekStatistic(attacks) {

    const today =
        new Date();

    const weekStart =
        new Date(today);

    weekStart.setHours(0, 0, 0, 0);

    weekStart.setDate(
        today.getDate() - today.getDay()
    );

    const count =
        attacks.filter(attack => {

            const attackDate =
                new Date(`${attack.date}T${attack.time}`);

            return attackDate >= weekStart;

        }).length;

    document
        .getElementById("statWeek")
        .textContent = count;

}

function updateMonthStatistic(attacks) {

    const today =
        new Date();

    const count =
        attacks.filter(attack => {

            const attackDate =
                new Date(`${attack.date}T${attack.time}`);

            return (
                attackDate.getMonth() === today.getMonth() &&
                attackDate.getFullYear() === today.getFullYear()
            );

        }).length;

    document
        .getElementById("statMonth")
        .textContent = count;

}

function updateAverageDuration(attacks) {

    if (attacks.length === 0) {

        document
            .getElementById("statAverage")
            .textContent =
            "00:00:00";

        return;

    }

    const total =
        attacks.reduce(

            (sum, attack) =>
                sum + attack.duration,

            0

        );

    const average =
        Math.round(
            total / attacks.length
        );

    document
        .getElementById("statAverage")
        .textContent =
        formatDuration(average);

}

/* =========================================
