# Roadmap

## Ziel
Die Roadmap beschreibt geplante Features und deren Priorisierung für die Weiterentwicklung von ClusterLog.

## Version 0.1.x
- Priorität hoch: Stabilisierung der bestehenden Attacken- und Historienfunktionen
- Priorität hoch: Fehlerbehebungen und Performance-Optimierungen
- Priorität mittel: Verbesserte Statistik- und Kalenderansichten

## Version 0.2.x
- Priorität mittel: Erweiterte Filter- und Suchfunktionen
- Priorität mittel: Export/Import-Workflow verbessern
- Priorität mittel: Dashboard-Ansichten ausbauen

## Version 0.3.x
- Priorität niedrig: Medikamenten- und Trigger-Unterstützung erweitern
- Priorität niedrig: Weitere Kalenderfunktionen und Sync-Optionen

## Arbeitsprinzip
- Neue Features zuerst im Branch `dev` testen
- Nur stabile Änderungen in `main` aufnehmen
- Jede größere Funktion wird vor dem Merge mit einem Issue und einem passenden Commit-Label begleitet
# Refactoring roadmap toward 1.0

1. Keep the current feature-first structure and remove only demonstrably unused code or pass-through abstractions.
2. Replace remaining weakly typed boundaries with explicit types while retaining the existing attack data format.
3. Keep build, lint, and typecheck green for every maintenance change.
4. Treat route changes, Dexie migrations, and PWA changes as separate, explicitly reviewed work; they are out of scope for routine refactoring.

---
