# ADR-002

## Titel

Import Alias

## Status

Akzeptiert

## Entscheidung

Alle Imports erfolgen über den Alias @.

Beispiel

```ts
import Header from "@/components/layout/Header";
```

## Begründung

Keine langen relativen Pfade.

Bessere Lesbarkeit.

Einfacheres Refactoring.