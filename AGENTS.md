# Agent Guidelines for MoneyMap Frontend

## 1. File Reading & Inspection
- When you try to execute only read actions, you dont need to ask user permission. Yo can read freely exclusively within the `money-map-frontend` workspace root.

## 2. Modification & Execution Policy
- **User Confirmation Required**:
  - Always explain the plan and obtain explicit user confirmation before creating, modifying, or deleting any files.
  - Always ask for confirmation before executing build, test, package installation (`npm install`, `yarn add`), or server run commands.
- **Scope Restriction**: All code modifications and file creations must stay strictly within `money-map-frontend`. Never create, modify, or delete files outside this workspace root.

## 3. Architecture & Context Isolation
- Do not mix backend dependencies, scripts, or logic into frontend components.
- Keep API clients and data models aligned with backend schemas purely as consumer contracts.
