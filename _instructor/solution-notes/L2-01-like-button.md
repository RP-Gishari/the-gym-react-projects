# Instructor Notes — L2-01: Like Button

## Working Solution

```jsx
function handleLike() {
  setLiked(!liked)
  setLikeCount(liked ? likeCount - 1 : likeCount + 1)
}

const btnClass = liked ? 'like-btn liked' : 'like-btn'
const heartIcon = liked ? '♥' : '♡'
```

## Common Student Mistakes

1. **`onClick={handleLike()}`** — calling the function immediately (with parentheses) rather than passing a reference.
   Causes an infinite render loop. This is the most common L2 mistake.
   Fix: `onClick={handleLike}` (no parentheses).

2. **Only one useState call** — students declare `liked` but forget `likeCount`, or vice versa.
   They then read a variable that doesn't exist, getting a ReferenceError.

3. **Using the post-update value of `liked`** — writing `setLiked(!liked)` then
   `if (liked) ...` and expecting `liked` to already be `false`.
   Inside a handler, `liked` always has the value from the render it was captured in.

4. **String concatenation instead of ternary** — `'like-btn ' + liked` gives `'like-btn true'`,
   not a valid CSS class. Ternary is the correct tool here.

## Code Review Focus

- Does `handleLike` update both `liked` and `likeCount` in one call?
- Is the ternary for `btnClass` syntactically correct?
- Are both posts toggled independently when rendered?

## Alternative Valid Approaches

- Functional update form: `setLiked(prev => !prev)` then `setLikeCount(prev => liked ? prev - 1 : prev + 1)`.
  Both are correct; functional form is safer in concurrent mode.
- Storing `likeCount` in the parent (`App.jsx`) and lifting state up is valid but over-engineered for this exercise.

## Pedagogical Flags

- The `onClick={fn()}` mistake reliably appears in the first useState exercise every cohort.
  Prepare a clear explanation: "parentheses mean 'run this now'; no parentheses mean 'run this later'."
- This is a good moment to introduce React DevTools — students can watch state update on each click.
- Point out that two `PostCard` components have completely separate state — this surfaces the
  "each component instance is independent" mental model.
