# Instructor Notes — Movie Watchlist (Intermediate)

## What good code looks like vs. what passing code looks like

**Passing:** Movies show, filtering works, watchlist saves to localStorage.

**Good:**
- `filtered` is derived inline from `movies`, `search`, and `genre` — NOT stored in state
- `watchlistIds` stores only ids, not full movie objects (avoids data duplication and stale references)
- The `localStorage` sync uses `useEffect` with `[watchlistIds]` in the dependency array
- The `useState` initializer for watchlist uses a function: `useState(() => JSON.parse(...))` (lazy init — not re-parsed on every render)

**Excellent:**
- Error boundary around `JSON.parse` (localStorage can be corrupted)
- `useMemo` used for `filtered` if student has learned it (discuss as preview)
- Genre list derived from the data rather than hardcoded: `new Set(movies.map(m => m.genre))`
- Total runtime displayed in hours + minutes (shows arithmetic and derived computation)

## Common mistakes to look for in PRs

1. **Storing `filteredMovies` in state + syncing with `useEffect`** — the canonical anti-pattern. "If you can calculate it, don't store it." This is the most important teachable moment in this exercise.
2. **Storing full movie objects in watchlist state** — works but creates duplication. The movie data already exists in the imported array; only the id needs to be remembered.
3. **No lazy initializer for watchlist state** — `useState(JSON.parse(localStorage.getItem(...)))` parses on every render instead of just the first. Correct: `useState(() => JSON.parse(...))`
4. **Missing try/catch** — if localStorage contains invalid JSON (e.g. the key was written by an older version), the app crashes silently
5. **`useEffect` with no dependency array** — writes to localStorage on every render

## Questions to ask during PR review

- "Walk me through what happens in memory when the user adds a movie to the watchlist and then refreshes the page."
- "You stored X in state — could you have calculated it instead? What would change?"
- "What happens if the user opens the app in a browser where localStorage is disabled?"
- "Why does your `useEffect` have `[watchlistIds]` in the dependency array and not `[]`?"

## Extension paths (next session)

- Add a `useLocalStorage` custom hook (introduces custom hooks)
- Fetch real movie data from TMDB API (introduces async data fetching, loading/error states)
- Add routing: catalogue → movie detail page (introduces React Router)
- Sort by rating, year, or runtime (introduces controlled select + derived sorting)
