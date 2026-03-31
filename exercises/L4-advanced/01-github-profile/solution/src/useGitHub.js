// INSTRUCTOR ONLY — do not distribute until after class debrief.
import { useState, useEffect } from 'react'

export default function useGitHub(username) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)
    setError(null)
    setUser(null)

    fetch(`https://api.github.com/users/${username}`)
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (cancelled) return
        if (!ok) {
          setError(data.message || 'Request failed')
        } else {
          setUser(data)
        }
        setIsLoading(false)
      })
      .catch(err => {
        if (!cancelled) {
          setError(err.message)
          setIsLoading(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [username])

  return { user, isLoading, error }
}
