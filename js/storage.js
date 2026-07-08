let db = null;

export function initDatabase() {

    const request = indexedDB.open("ClusterLogDB", 1);

    request.onupgradeneeded = (event) => {

        db = event.target.result;

        if (!db.objectStoreNames.contains("attacks")) {

            db.createObjectStore("attacks", {
                keyPath: "id",
                autoIncrement: true
            });

        }

    };

    request.onsuccess = (event) => {

        db = event.target.result;

        console.log("✅ Datenbank geöffnet");

    };

    request.onerror = () => {

        console.error("❌ Datenbank konnte nicht geöffnet werden");

    };

}