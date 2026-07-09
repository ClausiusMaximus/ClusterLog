import {
    initDatabase,
    saveAttack,
    getAttacks,
    deleteAttack
} from "./storage.js";

/* =========================================
   Status
========================================= */

let duration = 0;
let selectedKip = null;

let currentView = "capture";

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

    await renderHistory();

    await updateStatistics();

}

/* =========================================
   Navigation
========================================= */

function setupNavigation() {

    document
        .getElementById("navCapture")
        .addEventListener("click", () => showView("capture"));

    document
        .getElementById("navHistory")
        .addEventListener("click", async () => {

            showView("history");

            await renderHistory();

        });

    document
        .getElementById("navStatistics")
        .addEventListener("click", async () => {

            showView("statistics");

            await updateStatistics();

        });

}

function showView(view) {

    currentView = view;

    document
        .getElementById("captureView")
        .hidden = view !== "capture";

    document
        .getElementById("historyView")
        .hidden = view !== "history";

    document
        .getElementById("statisticsView")
        .hidden = view !== "statistics";

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

    const year =
        now.getFullYear();

    const month =
        String(now.getMonth() + 1)
            .padStart(2, "0");

    const day =
        String(now.getDate())
            .padStart(2, "0");

    const hours =
        String(now.getHours())
            .padStart(2, "0");

    const minutes =
        String(now.getMinutes())
            .padStart(2, "0");

    const seconds =
        String(now.getSeconds())
            .padStart(2, "0");

    document
        .getElementById("attackDate")
        .value =
        `${year}-${month}-${day}`;

    document
        .getElementById("attackTime")
        .value =
        `${hours}:${minutes}:${seconds}`;

}

/* =========================================
   Dauer
========================================= */

function setupDurationButtons() {

    document
        .getElementById("minus60")
        .onclick = () => changeDuration(-60);

    document
        .getElementById("minus10")
        .onclick = () => changeDuration(-10);

    document
        .getElementById("minus1")
        .onclick = () => changeDuration(-1);

    document
        .getElementById("plus1")
        .onclick = () => changeDuration(1);

    document
        .getElementById("plus10")
        .onclick = () => changeDuration(10);

    document
        .getElementById("plus60")
        .onclick = () => changeDuration(60);

}

function changeDuration(value) {

    // Buttons arbeiten in Minuten
    duration += value * 60;

    if (duration < 0) {
        duration = 0;
    }

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

        display.textContent =
            `${String(minutes).padStart(2, "0")}:` +
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

        kip:
            selectedKip,

        side: null,

        oxygen: false,

        sumatriptan: false,

        notes: "",

        createdAt: Date.now()

    };

    await saveAttack(attack);

    alert("Angriff gespeichert.");

    resetForm();

    await renderHistory();

    await updateStatistics();

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

/* =========================================
   Verlauf
========================================= */

async function renderHistory() {

    const historyList =
        document.getElementById("historyList");

    const attacks =
        await getAttacks();

    if (!attacks.length) {

        historyList.innerHTML = `
            <div class="empty-state">
                Noch keine Angriffe gespeichert.
            </div>
        `;

        return;

    }

    attacks.sort((a, b) => {

        const first =
            new Date(`${a.date}T${a.time}`);

        const second =
            new Date(`${b.date}T${b.time}`);

        return second - first;

    });

    const groups = {};

    attacks.forEach(attack => {

        if (!groups[attack.date]) {

            groups[attack.date] = [];

        }

        groups[attack.date].push(attack);

    });

    historyList.innerHTML = "";

    Object.keys(groups)
        .sort((a, b) => new Date(b) - new Date(a))
        .forEach(date => {

            const day =
                document.createElement("div");

            day.className =
                "history-day";

            day.innerHTML =
                `<h3>${formatDate(date)}</h3>`;

            groups[date].forEach(attack => {

                const item =
                    document.createElement("div");

                item.className =
                    "history-item";

                item.innerHTML = `

                    <div class="history-header">

                        <strong>${attack.time}</strong>

                        <button
                            class="delete-btn"
                            data-id="${attack.id}">
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
                    .onclick = async () => {

                        if (!confirm("Eintrag löschen?")) {

                            return;

                        }

                        await deleteAttack(attack.id);

                        await renderHistory();

                        await updateStatistics();

                    };

                day.appendChild(item);

            });

            historyList.appendChild(day);

        });

}

/* =========================================
   Hilfsfunktionen
========================================= */

function formatDate(date) {

    return new Date(date)
        .toLocaleDateString("de-DE", {

            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric"

        });

}

function formatDuration(seconds) {

    const hours =
        Math.floor(seconds / 3600);

    const minutes =
        Math.floor((seconds % 3600) / 60);

    if (hours > 0) {

        return `${hours} h ${minutes} min`;

    }

    return `${minutes} min`;

}

/* =========================================
   Statistik
========================================= */

async function updateStatistics() {

    const attacks =
        await getAttacks();

    const today =
        new Date();

    const todayString =
        today.toISOString().split("T")[0];

    const currentMonth =
        today.getMonth();

    const currentYear =
        today.getFullYear();

    const startOfWeek =
        new Date(today);

    startOfWeek.setHours(0, 0, 0, 0);

    startOfWeek.setDate(
        today.getDate() - today.getDay()
    );

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;

    let totalDuration = 0;

    attacks.forEach(attack => {

        if (attack.date === todayString) {

            todayCount++;

        }

        const attackDate =
            new Date(`${attack.date}T${attack.time}`);

        if (attackDate >= startOfWeek) {

            weekCount++;

        }

        if (
            attackDate.getMonth() === currentMonth &&
            attackDate.getFullYear() === currentYear
        ) {

            monthCount++;

        }

        totalDuration += attack.duration;

    });

    const average =
        attacks.length === 0
            ? 0
            : Math.round(totalDuration / attacks.length);

    document.getElementById("statToday").textContent =
        todayCount;

    document.getElementById("statWeek").textContent =
        weekCount;

    document.getElementById("statMonth").textContent =
        monthCount;

    document.getElementById("statAverage").textContent =
        formatDuration(average);

}