function getTodayEntries() {

    const today = new Date().toISOString().slice(0,10);

    return loadEntries().filter(entry => entry.date === today);

}

function dashboardStats() {

    const entries = getTodayEntries();

    const attacks = entries.length;

    const avgKip = attacks
        ? (entries.reduce((a,e)=>a+e.kip,0)/attacks).toFixed(1)
        : 0;

    const avgDuration = attacks
        ? Math.round(entries.reduce((a,e)=>a+e.duration,0)/attacks)
        : 0;

    return {
        attacks,
        avgKip,
        avgDuration
    };

}