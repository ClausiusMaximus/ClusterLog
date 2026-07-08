/* ==========================================
   ClusterLog
   ui.js
========================================== */

const UI = {

    renderAttackForm() {

        const page = document.getElementById("newPage");

        page.innerHTML = `

        <div class="card">

            <h2>Neue Attacke</h2>

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
                class="primaryButton"
                id="nowButton">

                Jetzt übernehmen

            </button>

        </div>

        <div class="card">

            <h3>KIP</h3>

            <div id="kipGrid"></div>

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

            <div id="sideButtons"></div>

        </div>

        <div class="card">

            <h3>Tätigkeiten</h3>

            <div id="activitiesGrid"></div>

        </div>

        <div class="card">

            <label>Notizen</label>

            <textarea
                id="notes"
                rows="5"></textarea>

        </div>

        <button
            class="primaryButton"
            id="saveAttack">

            💾 Speichern

        </button>

        `;

    }

};