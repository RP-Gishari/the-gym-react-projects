# [L4] GitHub Profile Lookup

**Level:** L4 — Advanced  
**Concept:** Custom Hooks · useEffect · Async Data Fetching · Error / Loading States  
**Time:** 75 minutes  
**Bloom's level:** Analyze → Evaluate

---

## Scenario

A developer-tools app lets you look up any GitHub user by username and displays their profile.
The fetch logic needs to live in a reusable custom hook — not scattered inside a component —
so any other component in the app could use it too.

---

## Concept Brief

A custom hook is a JavaScript function whose name starts with `use` that calls other hooks.
It extracts stateful logic out of a component so the component stays declarative.
`useEffect(fn, deps)` runs `fn` after render; the dependency array controls when it re-runs.
Async data fetching in effects must handle three states: loading (before data arrives),
success (data present), and error (fetch failed). A cleanup flag (`let cancelled = false`)
prevents state updates on components that have already unmounted.

---

## Task

Open `src/useGitHub.js`. Implement the hook. Then open `src/GitHubProfile.jsx` and wire it up.

**The app must:**

1. Show nothing below the search bar before a username is submitted
2. Show `"Loading {username}..."` immediately after a search is submitted
3. Render the user's avatar, name, bio (if any), repo count, follower count, and a link to their GitHub profile after a successful fetch
4. Show `"Error: Not Found"` when a non-existent username is searched (GitHub returns 404)
5. Show `"Error: {message}"` for any other failure (network down, etc.)
6. Re-fetch automatically when the submitted username changes (searching a second user replaces the first)
7. A search result from a previous username must never appear after a new search starts

Do not modify `App.jsx` or `main.jsx`.

---

## Visual Spec

**After submitting "torvalds":**

```text
Loading torvalds...
```

**After data loads:**

```text
┌──────────────────────────────────────────────┐
│  [avatar]  Linus Torvalds                    │
│            "Linux kernel developer"           │
│            1 repos · 230k followers · 0 following │
│            [ View on GitHub → ]              │
└──────────────────────────────────────────────┘
```

**After submitting "zzz-does-not-exist-zzz":**

```text
Error: Not Found
```

---

## Hints

<details>
<summary>Hint 1 — Syntax</summary>

A custom hook file exports a function:
```text
export default function useGitHub(username) {
  // call useState and useEffect here
  return { user, isLoading, error }
}
```
The GitHub user API endpoint: `https://api.github.com/users/${username}`
A 404 response still returns JSON with `{ message: "Not Found" }`.
Check `response.ok` before parsing as a successful result.

</details>

<details>
<summary>Hint 2 — Conceptual</summary>

Your hook owns three pieces of state. When a new `username` arrives, what should happen
to the previous `user` and `error` before the new fetch completes?
Where does `username` belong in the `useEffect` dependency array — and what happens if you leave it out?

</details>

<details>
<summary>Hint 3 — Near-solution</summary>

Effect structure:
```text
useEffect(() => {
  let cancelled = false
  setIsLoading(true)
  setUser(null)
  setError(null)

  fetch(url)
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (cancelled) return
      if (!ok) setError(data.message)
      else setUser(data)
      setIsLoading(false)
    })
    .catch(err => { if (!cancelled) { setError(err.message); setIsLoading(false) } })

  return () => { cancelled = true }
}, [username])
```
In `GitHubProfile.jsx`: replace the three hardcoded lines with
`const { user, isLoading, error } = useGitHub(username)`.

</details>

---

## Extension Challenges

**EC-1 [Evaluate]:** The hook currently fires a fetch even when `username` is an empty string.
Add a guard so the hook does nothing (resets to `{ user: null, isLoading: false, error: null }`)
when `username` is falsy. Where is the right place to put this guard?

**EC-2 [Create]:** Generalise `useGitHub` into a `useFetch(url)` hook that accepts any URL.
Rewrite `useGitHub` to use `useFetch` internally. What interface does `useFetch` need to expose?

**EC-3 [Evaluate]:** GitHub rate-limits unauthenticated requests to 60/hour.
Add a simple in-memory cache (a `Map` defined outside the hook) that returns cached data
immediately on repeat lookups. What are the trade-offs of this approach?
