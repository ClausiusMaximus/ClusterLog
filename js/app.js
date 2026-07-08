/* ==========================================
   ClusterLog
   js/app.js
========================================== */

class App {

    static init() {

        console.log("ClusterLog gestartet");

        // Dashboard aktualisieren
        if (typeof updateDashboard === "function") {
            updateDashboard();
        }

        // Angriffsformular vorbereiten
        if (typeof fillCurrentDateTime === "function") {
            fillCurrentDateTime();
        }

    }

}

document.addEventListener("DOMContentLoaded", () => {

    App.init();

});