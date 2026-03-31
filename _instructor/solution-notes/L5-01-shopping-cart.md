# Instructor Notes — L5-01: Shopping Cart

## Working Solution

### cartReducer.js

```js
export default function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(i => i.id === action.payload.id)
      if (existing) {
        return { ...state, items: state.items.map(i =>
          i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
        )}
      }
      return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter(i => i.id !== action.payload) }
    case 'UPDATE_QTY': {
      const { id, qty } = action.payload
      if (qty < 1) return { ...state, items: state.items.filter(i => i.id !== id) }
      return { ...state, items: state.items.map(i => i.id === id ? { ...i, qty } : i) }
    }
    case 'CLEAR_CART':
      return { ...state, items: [] }
    default:
      return state
  }
}
```

### CartContext.jsx

```jsx
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })
  return (
    <CartContext.Provider value={{ items: state.items, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}
```

## Evaluation Rubric (L5 is open-ended — use this instead of pass/fail)

**Required (must have all):**
- [ ] Adding a new product appends it to items with qty 1
- [ ] Adding an existing product increments qty (no duplicates)
- [ ] − button at qty 1 removes the item
- [ ] ✕ button removes regardless of qty
- [ ] CLEAR_CART resets items to []
- [ ] Cart total is correct at all times

**Quality indicators (look for these):**
- [ ] No direct state mutation in the reducer (always returns new objects)
- [ ] Default case returns `state` unchanged (not `undefined`)
- [ ] `UPDATE_QTY` with qty < 1 removes the item (not just sets qty to 0)
- [ ] `CartProvider` doesn't expose the full `state` object — only `items` and `dispatch`

**Red flags:**
- Storing items in `useState` inside the provider instead of `useReducer`
- Dispatch with `type` misspelled (action types not matching reducer cases)
- Forgetting to spread `...state` in each case (losing other state properties)
- Exporting `CartContext` directly and using it with `useContext(CartContext)` in components
  instead of the `useCart()` hook (breaks encapsulation)

## Common Student Mistakes

1. **Missing `{ }` around `ADD_ITEM` case** — `const existing = ...` without block scope
   causes a linting error about lexical declarations in case clauses.

2. **Forgetting the `default` case** — reducer returns `undefined` for unknown actions,
   crashing the app.

3. **Not resetting qty < 1 to remove** — cart shows items with qty 0 or negative.

4. **Passing the entire `state` as context value** — tightly couples consumers to the
   internal state shape. The contract should be `{ items, dispatch }` only.

## Pedagogical Flags

- At L5, students may over-engineer (reach for Context when props suffice) or under-engineer
  (prop drill through 4 levels). This exercise deliberately makes Context the right call —
  ProductCard and Cart have no common parent other than App.
- The reducer pattern is the gateway to Redux, Zustand, and XState.
  Connect it: "A reducer is just a pure function. You've seen this before in `Array.reduce()`."
- EC-3 (unit testing the reducer) is high value: the reducer is a pure function, so testing
  it requires no React or DOM setup. Run `vitest cartReducer.test.js` directly.
