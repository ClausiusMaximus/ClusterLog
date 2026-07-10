# ClusterLog Architektur

## Ziel

ClusterLog ist eine Progressive Web App (PWA) zur Erfassung und Auswertung von Clusterkopfschmerz-Attacken.

Die Anwendung soll

- offline funktionieren
- auf Smartphones optimiert sein
- schnell bedienbar sein
- langfristig wartbar bleiben

---

## Technologiestack

| Bereich | Technologie |
|----------|-------------|
| Frontend | React 19 |
| Sprache | TypeScript |
| Build | Vite |
| UI | Material UI |
| Routing | React Router |
| Datenbank | Dexie / IndexedDB |
| PWA | vite-plugin-pwa |
| Versionsverwaltung | Git + GitHub |

---

## Projektstruktur

```text
src
│
├── app
├── assets
├── components
├── features
├── hooks
├── lib
├── services
├── types
├── utils
```

---

## Architekturprinzipien

- Feature-basierte Entwicklung
- Kleine Komponenten
- Keine Datei größer als ca. 200 Zeilen
- Wiederverwendbare Komponenten
- Zentrale Theme-Konfiguration
- Offline First