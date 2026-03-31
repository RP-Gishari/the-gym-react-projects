# Instructor Notes — Quiz App (Beginner)

## What good code looks like vs. what passing code looks like

**Passing:** State works, quiz progresses, results show.

**Good:**
- State is minimal and well-named: `currentIndex`, `selectedAnswer`, `score`, `isFinished` — nothing more
- No derived value is stored in state (e.g. `isCorrect` is not stored; it's computed when needed)
- Component is split at least into a question display and a results display (either as separate components or conditional renders)
- Event handler is clearly named and does one thing
- Re-render cycle is understood: `setSelectedAnswer` causes re-render, which causes the option styling to update

**Excellent:**
- The student extracts a component (e.g. `<QuestionCard>`, `<OptionButton>`)
- The student uses `prev =>` functional updater for score: `setScore(s => s + 1)`
- The student handles the edge case: clicking an already-answered option does nothing (guard at top of handler)

## Common mistakes to look for in PRs

1. **`onClick={handleAnswer(i)}`** — called immediately during render, not on click
2. **Storing `isCorrect` in state** — should be derived from `selectedAnswer === question.correct` during render
3. **`currentIndex++` mutation** — must call `setCurrentIndex(i => i + 1)`
4. **Not resetting `selectedAnswer` on Next** — shows previous answer highlighted on new question
5. **All state in one big object** — works but harder to read; discuss the tradeoff
6. **Using `questions.length - 1` vs `isLast` flag** — both correct; point out readability preference

## Questions to ask during PR review

- "Why did you put state here and not in a child component?"
- "What happens if someone clicks an option twice? Show me the code that prevents it."
- "Walk me through what happens in the render cycle when the user clicks an answer."
- "Is there any state in your component that you could calculate instead of store?"

## Extension paths (next session)

- Extract a `<ProgressBar>` component
- Add a timer per question (introduces `useEffect` with `setInterval` + cleanup)
- Shuffle questions on restart (introduces array manipulation)
- Add categories and let the user choose (introduces routing next week)
