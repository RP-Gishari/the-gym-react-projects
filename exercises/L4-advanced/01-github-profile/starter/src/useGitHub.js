import { useState, useEffect } from 'react'

// TODO: Implement this custom hook.
//
// It receives `username` (a string) and must return:
//   { user, isLoading, error }
//
// Behaviour requirements:
//   - While fetching: isLoading is true, user is null, error is null
//   - On success:     isLoading is false, user is the parsed JSON object, error is null
//   - On HTTP error:  isLoading is false, user is null, error is the message string
//                     (e.g. "Not Found" for a 404)
//   - On network err: isLoading is false, user is null, error is err.message
//   - Re-fetch whenever username changes
//   - Use a `cancelled` flag so that resolving fetches do not update state
//     after the component has unmounted or username has changed
//
// API endpoint: https://api.github.com/users/${username}
// A 404 response has a JSON body: { message: "Not Found" }

export default function useGitHub(username) {
  // your implementation here

  return { user: null, isLoading: false, error: null }
}
