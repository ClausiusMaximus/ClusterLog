import { initDatabase } from "./storage.js";
document.addEventListener("DOMContentLoaded", init);

async function init() {
    console.log("ClusterLog gestartet");

    //registerServiceWorker();
    initDatabase();
}

function setupNowButton() {

    const button = document.getElementById("nowButton");

    button.addEventListener("click", setCurrentDateTime);

}

function setCurrentDateTime() {

    const now = new Date();

    const date =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, "0") + "-" +
        String(now.getDate()).padStart(2, "0");

    const time =
        String(now.getHours()).padStart(2, "0") + ":" +
        String(now.getMinutes()).padStart(2, "0") + ":" +
        String(now.getSeconds()).padStart(2, "0");

    document.getElementById("attackDate").value = date;
    document.getElementById("attackTime").value = time;

}

async function registerServiceWorker() {

    if (!("serviceWorker" in navigator)) {
        return;
    }

    try {
        await navigator.serviceWorker.register("./sw.js");
        console.log("✅ Service Worker registriert");
    } catch (error) {
        console.error("❌ Service Worker konnte nicht registriert werden", error);
    }

}