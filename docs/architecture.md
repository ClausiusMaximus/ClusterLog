# Architecture

## Layers

UI
↓
Feature Components
↓
Hooks
↓
Services
↓
Repositories
↓
Dexie

## Rules

Components
- Presentation only

Hooks
- UI state

Services
- Business logic

Repositories
- Persistence

Utils
- Pure calculations
