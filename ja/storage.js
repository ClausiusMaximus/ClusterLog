const STORAGE_KEY = "clusterlog";

function loadEntries() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveEntries(entries) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function addEntry(entry) {
    const entries = loadEntries();
    entries.push(entry);
    saveEntries(entries);
}