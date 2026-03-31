# Instructor Notes — L4-01: GitHub Profile Lookup

## Working Solution

### useGitHub.js

```js
export default function useGitHub(username) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setUser(null)
    setError(null)

    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (cancelled) return
        if (!ok) setError(data.message || 'Request failed')
        else setUser(data)
        setIsLoading(false)
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setIsLoading(false)
        }
      })

    return () => { cancelled = true }
  }, [username])

  return { user, isLoading, error }
}
```

### GitHubProfile.jsx (one-line change)

```jsx
const { user, isLoading, error } = useGitHub(username)
```

## Common Student Mistakes

1. **Missing dependency array `[username]`** — effect never re-runs, so searching a second user shows stale data.

2. **Empty dependency array `[]`** — effect only runs on mount. Changing the username does not re-fetch.

3. **Checking `!res.ok` incorrectly** — `fetch` only rejects on network failure, not HTTP errors.
   A 404 response resolves but `res.ok` is false. Students who don't check `res.ok` show the raw
   error JSON as if it were user data.

4. **Forgetting to reset state before the next fetch** — old user data shows briefly before new data
   arrives (or old error shows while loading). Fix: call `setUser(null)`, `setError(null)` at the top of the effect.

5. **Removing the `cancelled` flag** — causes React's "Can't perform state update on unmounted
   component" warning in strict mode when searching quickly.

6. **Naming the hook without the `use` prefix** — React won't recognise it as a hook, and the rules
   of hooks won't be enforced. Always start custom hook names with `use`.

## Code Review Focus

- Does `useGitHub` reset all three state values at the start of each effect?
- Is `username` in the dependency array?
- Is `res.ok` checked before treating the response as success?
- Is the `cancelled` flag returned from the cleanup function?
- Does `GitHubProfile.jsx` use only `useGitHub` — no direct `useState` or `useEffect`?

## Pedagogical Flags

- This exercise surfaces the most important mental model at L4: **separation of concerns**.
  The component renders; the hook fetches. Each file does exactly one job.
- The `cancelled` flag pattern is the pre-`AbortController` classic. Walk through it carefully.
  Mention `AbortController` as the modern equivalent (EC connection point).
- Rate limiting: GitHub allows 60 unauthenticated requests/hour. If testing as a class,
  have students test with the same few usernames (e.g. `torvalds`, `gaearon`, `sindresorhus`).
  Alternatively, prepare a mock (`useMockGitHub`) in advance.
