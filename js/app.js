/* ==========================================
   ClusterLog
========================================== */

class App {

    static init() {

        console.log("ClusterLog gestartet");

        this.initNavigation();

        if (typeof fillCurrentDateTime === "function") {
            fillCurrentDateTime();
        }

        if (typeof updateDashboard === "function") {
            updateDashboard();
        }

    }

    static initNavigation() {

        const pages = document.querySelectorAll(".page");

        function showPage(pageId){

            pages.forEach(page=>{
                page.classList.remove("active");
            });

            document
                .getElementById(pageId)
                .classList.add("active");

            if(typeof updateDashboard==="function"){
                updateDashboard();
            }

            // Aktive Navigation markieren
            document
                .querySelectorAll(".topNav button")
                .forEach(btn=>btn.classList.remove("active"));

            const map={
                dashboardPage:"dashboardBtn",
                newPage:"newBtn",
                calendarPage:"calendarBtn",
                statsPage:"statsBtn"
            };

            document
                .getElementById(map[pageId])
                ?.classList.add("active");

        }

        dashboardBtn.onclick=()=>showPage("dashboardPage");
        newBtn.onclick=()=>showPage("newPage");
        calendarBtn.onclick=()=>showPage("calendarPage");
        statsBtn.onclick=()=>showPage("statsPage");

        showPage("dashboardPage");

    }

}

document.addEventListener("DOMContentLoaded",()=>{

    App.init();

});