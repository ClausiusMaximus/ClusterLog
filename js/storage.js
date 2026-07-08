let db = null;

const DB_NAME = "ClusterLogDB";
const DB_VERSION = 1;
const STORE_NAME = "attacks";

/* =========================================
   Datenbank initialisieren
========================================= */

export function initDatabase() {

    return new Promise((resolve, reject) => {

        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onupgradeneeded = (event) => {

            db = event.target.result;

            if (!db.objectStoreNames.contains(STORE_NAME)) {

                db.createObjectStore(STORE_NAME, {
                    keyPath: "id",
                    autoIncrement: true
                });

            }

        };

        request.onsuccess = (event) => {

            db = event.target.result;

            console.log("✅ Datenbank geöffnet");

            resolve();

        };

        request.onerror = (event) => {

            console.error("❌ Datenbankfehler", event.target.error);

            reject(event.target.error);

        };

    });

}

/* =========================================
   Angriff speichern
========================================= */

export function saveAttack(attack) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(STORE_NAME, "readwrite");

        const store =
            transaction.objectStore(STORE_NAME);

        const request =
            store.add(attack);

        request.onsuccess = () => {

            console.log("💾 Angriff gespeichert");

            resolve();

        };

        request.onerror = () => {

            reject();

        };

    });

}

/* =========================================
   Alle Angriffe laden
========================================= */

export function getAttacks() {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(STORE_NAME, "readonly");

        const store =
            transaction.objectStore(STORE_NAME);

        const request =
            store.getAll();

        request.onsuccess = () => {

            resolve(request.result);

        };

        request.onerror = () => {

            reject();

        };

    });

}

/* =========================================
   Angriff löschen
========================================= */

export function deleteAttack(id) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(STORE_NAME, "readwrite");

        const store =
            transaction.objectStore(STORE_NAME);

        const request =
            store.delete(id);

        request.onsuccess = () => {

            resolve();

        };

        request.onerror = () => {

            reject();

        };

    });

}

/* =========================================
   Angriff aktualisieren
========================================= */

export function updateAttack(attack) {

    return new Promise((resolve, reject) => {

        const transaction =
            db.transaction(STORE_NAME, "readwrite");

        const store =
            transaction.objectStore(STORE_NAME);

        const request =
            store.put(attack);

        request.onsuccess = () => {

            resolve();

        };

        request.onerror = () => {

            reject();

        };

    });

}