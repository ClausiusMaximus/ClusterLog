/* ==========================================
   ClusterLog
   UI - Attack
========================================== */

class AttackUI {

    static render() {

        const page = document.getElementById("newPage");

        if (!page) return;

        page.innerHTML = `

        <div class="card">

            <h2>Neue Attacke</h2>

            <p>Neue Cluster-Attacke erfassen</p>

        </div>

        <div class="card">

            <label>Datum</label>

            <input
                id="attackDate"
                type="date">

            <label>Uhrzeit</label>

            <input
                id="attackTime"
                type="time"
                step="1">

            <button
                id="nowButton"
                class="primaryButton">

                Jetzt übernehmen

            </button>

        </div>

        <div class="card">

            <h3>KIP</h3>

            <div
                id="kipGrid"
                class="buttonGrid">

            </div>

        </div>

        <div class="card">

            <h3>Dauer</h3>

            <div class="durationRow">

                <button id="minus10">-10</button>

                <button id="minus1">-1</button>

                <span id="durationValue">

                    0 s

                </span>

                <button id="plus1">+1</button>

                <button id="plus10">+10</button>

            </div>

        </div>

        <div class="card">

            <h3>Kopfseite</h3>

            <div
                id="sideGrid"
                class="buttonGrid">

            </div>

        </div>

        <div class="card">

            <h3>Tätigkeiten</h3>

            <div
                id="activitiesGrid"
                class="buttonGrid">

            </div>

        </div>

        <div class="card">

            <label>Notizen</label>

            <textarea
                id="notes"
                rows="5"></textarea>

        </div>

        <button
            id="saveAttack"
            class="primaryButton">

            💾 Speichern

        </button>

        `;

        this.renderKip();

        this.renderSides();

        this.renderActivities();

    }

    static renderKip(){

        const grid=document.getElementById("kipGrid");

        for(let i=1;i<=10;i++){

            grid.innerHTML+=`
                <button
                    id="kip${i}"
                    class="kipButton">

                    ${i}

                </button>
            `;

        }

    }

    static renderSides(){

        const grid=document.getElementById("sideGrid");

        const sides=[

            "Links",

            "Rechts",

            "Beidseitig"

        ];

        sides.forEach(side=>{

            grid.innerHTML+=`
                <button
                    class="sideButton">

                    ${side}

                </button>
            `;

        });

    }

    static renderActivities(){

        const grid=document.getElementById("activitiesGrid");

        const list=[

            "Heben",
            "Kopf rechts",
            "Kopf links",
            "Kopf hoch",
            "Kopf runter",
            "Bücken",
            "Drehen",
            "Husten",
            "Niesen",
            "Ruhe",
            "Schlaf",
            "Sport",
            "Sonstiges"

        ];

        list.forEach(activity=>{

            grid.innerHTML+=`

            <button
                class="activityButton">

                ${activity}

            </button>

            `;

        });

    }

}