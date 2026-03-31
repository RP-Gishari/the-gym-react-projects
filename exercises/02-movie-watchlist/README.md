# Movie Watchlist — Intermediate

**Concepts:** useState · useEffect · Controlled inputs · Derived state · Lists · localStorage

---

## What you're building

A movie catalogue where users can search, filter by genre, and save films to a personal watchlist. The watchlist survives a page refresh.

The movie data is in `src/data/movies.js`. Each movie has:

```js
{
  id: number,
  title: string,
  genre: string,
  year: number,
  rating: number,   // out of 10
  runtime: number,  // in minutes
  director: string,
  poster: string,   // image URL
}
```

---

## Acceptance criteria

1. All movies are shown on initial load
2. A search input filters movies by title or director name in real time — no submit button required
3. Genre filter buttons (or a select) narrow the list; "All" shows every movie; both search and genre filters work together simultaneously
4. Each movie card has an "Add to Watchlist" button; movies already saved show a visual indicator and a "Remove" option instead
5. The watchlist is shown in a separate section or panel, displaying the saved movies and a total runtime (in hours and minutes)
6. A movie can be removed from the watchlist from either the catalogue or the watchlist panel
7. The watchlist persists after a full page refresh (use `localStorage`)
8. If no movies match the active filters, a "No results" message is shown instead of an empty grid

---

## Design decision

Leave a comment in your code explaining **your state structure**: what did you store in state vs. what did you derive? This is the most important architectural decision in this exercise.

---

## Getting started

```bash
cd starter
npm install
npm run dev
```

The app renders a placeholder line showing the movie count. Everything else is yours to build.

---

## When you're stuck

[Synchronizing with Effects — React Docs](https://react.dev/learn/synchronizing-with-effects)  
[You Might Not Need an Effect — React Docs](https://react.dev/learn/you-might-not-need-an-effect)
