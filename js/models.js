class AttackEntry {
    constructor() {
        this.id = crypto.randomUUID();

        this.date = "";
        this.time = "";

        this.kip = 0;

        this.duration = 0; // Sekunden

        this.side = "";

        this.activities = [];

        this.notes = "";

        this.created = new Date().toISOString();
    }
}