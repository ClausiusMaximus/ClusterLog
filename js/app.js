/* ==========================================
   ClusterLog
   js/app.js
   Version 0.3 Alpha
========================================== */

class App {

    static init() {

        console.log("🧠 ClusterLog gestartet");

        this.initNavigation();

        // Formular vorbereiten
        if (typeof fillCurrentDateTime === "function") {
            fillCurrentDateTime();
        }

        // Dashboard aktualisieren
        if (typeof updateDashboard === "function") {
            updateDashboard();
        }

    }

    static initNavigation() {

        const pages = document.querySelectorAll(".page");

        const navButtons = {

            dashboardPage: document.getElementById("dashboardBtn"),

            newPage: document.getElementById("newBtn"),

            calendarPage: document.getElementById("calendarBtn"),

            statsPage: document.getElementById("statsBtn")

        };

        function showPage(pageId){

            // Seiten ausblenden
            pages.forEach(page=>{

                page.classList.remove("active");

            });

            // Gewählte Seite anzeigen
            const page = document.getElementById(pageId);

            if(page){

                page.classList.add("active");

            }

            // Navigation aktualisieren
            Object.values(navButtons).forEach(button=>{

                if(button){

                    button.classList.remove("active");

                }

            });

            if(navButtons[pageId]){

                navButtons[pageId].classList.add("active");

            }

            // Dashboard aktualisieren
            if(pageId==="dashboardPage"){

                if(typeof updateDashboard==="function"){

                    updateDashboard();

                }

            }

            // Formular vorbereiten
            if(pageId==="newPage"){

                if(typeof fillCurrentDateTime==="function"){

                    fillCurrentDateTime();

                }

            }

        }

        // Buttons

        navButtons.dashboardPage.onclick=()=>showPage("dashboardPage");

        navButtons.newPage.onclick=()=>showPage("newPage");

        navButtons.calendarPage.onclick=()=>showPage("calendarPage");

        navButtons.statsPage.onclick=()=>showPage("statsPage");

        // Dashboard beim Start

        showPage("dashboardPage");

    }

}


/* ==========================================
   Toast
========================================== */

function showToast(message){

    const toast=document.getElementById("toast");

    if(!toast) return;

    toast.textContent=message;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2000);

}


/* ==========================================
   Start
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

    App.init();

});