/* ==========================================
   ClusterLog
   app.js
========================================== */

// ----------------------------
// Navigation
// ----------------------------

const pages = document.querySelectorAll(".page");

function showPage(pageId) {

    pages.forEach(page => {
        page.classList.remove("active");
    });

    document
        .getElementById(pageId)
        .classList.add("active");

    updateDashboard();

}

dashboardBtn.onclick = () => showPage("dashboardPage");

newBtn.onclick = () => showPage("newPage");

calendarBtn.onclick = () => showPage("calendarPage");

statsBtn.onclick = () => showPage("statsPage");


// ----------------------------
// Toast
// ----------------------------

function showToast(text) {

    const toast = document.getElementById("toast");

    toast.textContent = text;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    },2000);

}


// ----------------------------
// Dashboard
// ----------------------------

function updateDashboard(){

    if(typeof dashboardStats !== "function")
        return;

    const stats = dashboardStats();

    const attacks =
        document.getElementById("todayAttacks");

    const kip =
        document.getElementById("todayKip");

    const duration =
        document.getElementById("todayDuration");

    if(attacks)
        attacks.textContent = stats.attacks;

    if(kip)
        kip.textContent = stats.avgKip;

    if(duration)
        duration.textContent =
            stats.avgDuration + " s";

    updateLastAttack();

}


// ----------------------------
// Letzte Attacke
// ----------------------------

function updateLastAttack(){

    const container =
        document.getElementById("lastAttack");

    if(!container)
        return;

    const entries = loadEntries();

    if(entries.length===0){

        container.innerHTML=
        "Noch keine Attacken gespeichert.";

        return;

    }

    const last = entries[entries.length-1];

    container.innerHTML = `

        <strong>KIP ${last.kip}</strong><br>

        📅 ${last.date}<br>

        🕒 ${last.time}<br>

        ⏱ ${last.duration} s<br>

        👉 ${last.side}

    `;

}


// ----------------------------
// Initialisierung
// ----------------------------

document.addEventListener("DOMContentLoaded",()=>{

    updateDashboard();

});