# Contributing

## Branch-Regeln
- `main`: stabiler Release-Branch, jederzeit deploybar
- `dev`: Integrationsbranch für neue Features
- `feature/*`: einzelne Features entwickeln und nach Test in `dev` mergen
- `bugfix/*`: Fehlerbehebungen für `dev` oder `main`
- `release/*`: spätere Release-Preparation-Branches

## Commit-Regeln
Verwende präzise Conventional-Commit-Präfixe:
- `feat:` für neue Funktionen
- `fix:` für Fehlerbehebungen
- `refactor:` für interne Strukturänderungen
- `style:` für Formatierungen oder Styling
- `docs:` für Dokumentation
- `test:` für Tests
- `chore:` für Wartung und Infrastruktur

Beispiele:
- `feat(statistics): add filter reset`
- `fix(history): correct sorting`
- `chore: remove obsolete longpress implementation`

## Qualitätsanforderungen
- Vor jedem Commit: `npm run build` ausführen
- Vor jedem Merge in `dev` oder `main`: `npm run build` erfolgreich sein lassen
- Änderungen nur in den dafür vorgesehenen Branches einbringen
- Dokumentation und Changelog bei relevanten Änderungen aktualisieren
