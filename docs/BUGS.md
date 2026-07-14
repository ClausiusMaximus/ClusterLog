# Bugs

## Bekannte Fehler

### Offene Punkte
- Langpress-Logik für Android wurde aus dem Projekt entfernt und wird nicht mehr weiterverfolgt
- Weitere Fehler werden über Issues und Branches dokumentiert

## Status-Matrix
| Fehler | Status | Priorität |
| --- | --- | --- |
| Keine aktuell bekannten App-Fehler dokumentiert | Offen | Mittel |

## Vorgehensweise
- Fehler zuerst in einem `bugfix/*`-Branch behandeln
- Nach Fix in `dev` testen und anschließend mergen
- Bei stabilen Fehlerbehebungen kann ein Merge in `main` erfolgen
## Refactoring verification

- Build, ESLint, and TypeScript checks are required after each completed refactoring step.
- The production build currently reports a large bundle warning. This is a performance follow-up for a separately approved optimization, not a functional defect.

---
