import { initDatabase } from "./storage.js";
document.addEventListener("DOMContentLoaded", init);

async function init() {
    console.log("ClusterLog gestartet");

    //registerServiceWorker();
    initDatabase();
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