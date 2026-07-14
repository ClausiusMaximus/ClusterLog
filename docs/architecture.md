# Architecture

## Overview

ClusterLog follows a feature-oriented frontend structure with a mobile-first UI and a local-first data layer.

```text
UI / Routes
  ↓
Feature Components
  ↓
Hooks and Services
  ↓
Repositories / Database Layer
  ↓
Dexie / IndexedDB
```

## Structure

- app/: routing and application-level configuration
- components/: shared UI building blocks
- features/: feature-specific pages, components, hooks, types, and utils
- hooks/: cross-cutting React hooks
- lib/: database and service/repository abstraction
- shared/: small reusable helpers and common utilities
- theme/: shared visual styling and theming

## Principles

- Offline-first
- Mobile-first
- Feature-first
- Keep business logic close to the feature where possible
- Preserve the existing Dexie schema and data compatibility
- Keep routing and PWA behavior stable

## Refactoring Direction

The current refactoring focus is on simplification, dead-code removal, and maintainability without changing user-visible behavior.
# Maintenance boundaries

- The Dexie database name (`ClusterLog`), schema version, and `attacks` store remain stable for existing IndexedDB data.
- Routing remains centralized in `src/app/router.tsx`; route paths and the browser-router setup are not changed by maintenance work.
- PWA configuration remains in `vite.config.ts` and continues to generate the service worker during production builds.
- Feature code owns feature-specific UI, hooks, types, options, and calculations. Shared UI lives in `src/components`, while the persistence boundary is `src/lib`.

## Refactoring rules

- Prefer small, behavior-preserving refactorings verified by build, lint, and typecheck.
- Do not introduce a service layer unless it adds domain behavior beyond forwarding repository calls.
- Keep the UI component tree and persisted attack shape stable during technical cleanup.
