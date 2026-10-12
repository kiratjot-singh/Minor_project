# TestForge Frontend

A first frontend prototype based on the approved TestForge workflow-builder design.

## Run
1. Install Node.js 18+.
2. In this folder run:
   npm install
   npm run dev
3. Open the local Vite URL shown in the terminal.

## Included
- TestForge sidebar navigation
- Website URL, browser and execution mode controls
- Action palette
- Dotted workflow/data-flow canvas
- Start -> actions -> completion flow
- Add/delete workflow steps
- Variables/Data tab
- Save state
- Run Test simulation
- Responsive layout for the desktop project UI

The frontend currently uses local state only. The next stage is connecting Run Test to FastAPI + Playwright and replacing the sample workflow with persisted test definitions.
