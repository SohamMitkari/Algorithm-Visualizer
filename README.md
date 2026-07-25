# Algorithm Visualizer

A full-stack web app that animates sorting, searching, and backtracking
algorithms step-by-step, with a live execution trace log, synced pseudocode
highlighting, and user accounts for saving custom test arrays.

**Live demo:** https://algorithm-visualizer-frontend-three.vercel.app/

> Note: the backend runs on Render's free tier, which spins down after
> inactivity. The first request may take 30–60 seconds to wake up.


## Algorithms implemented

| Algorithm | Category | Time Complexity |
|---|---|---|
| Bubble Sort | Sorting | O(n²) |
| Merge Sort | Sorting (divide & conquer) | O(n log n) |
| Quick Sort | Sorting (divide & conquer) | O(n log n) avg, O(n²) worst |
| Binary Search | Searching | O(log n) |
| N-Queens | Backtracking | O(n!) |

## Architecture

**Frontend:** React (Vite) → **Backend:** Express REST API → **Database:** PostgreSQL

Every algorithm is implemented as a JavaScript **generator function** that
`yield`s a step object after every meaningful operation (comparison, swap,
placement). The UI drives the generator forward — via Play/Pause/Step controls
— without knowing anything about the specific algorithm running. This means
adding a new algorithm never requires touching the animation/UI code, only
writing a new generator function.

Recursive algorithms (Merge Sort, Quick Sort, N-Queens) use `yield*` to
delegate through recursive calls, so nested recursive steps still reach the
UI in order.

Auth uses JWT + bcrypt. Saved-array queries use raw SQL (via `pg`, no ORM) so
every query is explicit and auditable — each saved-array query is scoped by
`user_id` to enforce that users only ever see their own data.

## Repository structure
algorithm-visualizer/
├── frontend/ # React + Vite app
├── backend/ # Express API
└── README.md

## Setup (to run locally)

Clone the repo:
```bash
git clone https://github.com/SohamMitkari/algorithm-visualizer.git
cd algorithm-visualizer
```

### Backend
```bash
cd backend
npm install
# create a .env file with DATABASE_URL, JWT_SECRET, PORT
npm run dev
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev
```

## Deployment

- **Frontend:** deployed on Vercel, root directory set to `frontend`
- **Backend:** deployed on Render, root directory set to `backend`
- **Database:** hosted on Neon (PostgreSQL)

## What I'd add next
- More algorithms (Dijkstra, AVL tree rotations)
- A leaderboard comparing step counts across users for the same input
- Automated tests for the generator functions

## Tech stack
React, Vite, Node.js, Express, PostgreSQL, JWT, bcrypt. Deployed on Vercel
(frontend), Render (backend), Neon (database).
