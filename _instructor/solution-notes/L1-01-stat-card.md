# Instructor Notes — L1-01: Stat Card

## Working Solution

Replace each `PLACEHOLDER` with the corresponding destructured variable in curly braces:

```jsx
<img src={avatarUrl} alt={name} className="avatar" />
<h2>{name}</h2>
<p className="position">{position}</p>
<div className="score-badge">{score}</div>
```

## Common Student Mistakes

1. **Wrapping JSX expressions in quotes** — writing `alt="{name}"` renders the literal
   string `"{name}"` instead of the variable's value. This is the #1 beginner JSX mistake.
   Address it explicitly before or during the exercise.

2. **Using `props.name` after destructuring** — student did not notice the destructuring
   in the function parameter `({ name, position, score, avatarUrl })` and writes
   `{props.name}` instead of `{name}`. Leads to a `props is not defined` error.

3. **Not replacing the `alt` attribute** — students often fix the JSX children
   (`<h2>`, `<p>`, etc.) but leave `alt="PLACEHOLDER"` untouched because they
   don't notice the attribute syntax difference.

## Code Review Focus

- Are all four `PLACEHOLDER` strings replaced?
- Is `alt={name}` using curly braces (not quotes)?
- Are there any console warnings about missing keys or unknown props?

## Alternative Valid Approaches

- Using `props.name` etc. without destructuring is valid — `function StatCard(props)` then
  `{props.name}`. Both approaches are correct; note whichever the student used and
  discuss the trade-offs of destructuring vs. the `props` object.

## Pedagogical Flags

- **Mental model shift**: Students coming from jQuery or vanilla JS often try
  `document.getElementById` or `innerHTML`. Use this exercise to reinforce
  "describe what it should look like, React makes it happen."
- **JSX is not HTML**: Attribute syntax (`alt={name}` vs `alt="name"`) is a common
  source of confusion. This exercise surfaces it early — good to address in debrief.
