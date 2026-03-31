# [L5] Shopping Cart

**Level:** L5 — Guru  
**Concept:** useReducer · createContext · useContext · Custom Hook · Complex State  
**Time:** 2–4 hours  
**Bloom's level:** Evaluate → Create

---

## Scenario

An e-commerce app needs a persistent cart that works across multiple components.
Products are listed on the left; the cart panel is on the right.
Both sides need read and write access to the same cart state — without prop drilling.

---

## Concept Brief

At L5, you choose the tools. Consider: `useReducer` vs. multiple `useState` calls — which scales better
when actions have names and complex branching? `Context` vs. prop drilling — which is more
maintainable when five components need the same state? The cart has a clear event vocabulary:
ADD_ITEM, REMOVE_ITEM, UPDATE_QTY, CLEAR_CART. Each action transforms state in a predictable way.
Reducers make that transformation explicit, testable, and easy to trace.

---

## Task

Open `src/cartReducer.js` and `src/CartContext.jsx`. Implement both files.
`App.jsx`, `ProductCard.jsx`, and `Cart.jsx` are pre-written and must not be modified.

**The app must:**

1. Show a product grid on load; each product has an "Add to Cart" button
2. Clicking "Add to Cart" adds the product to the cart panel on the right
3. If the same product is added again, its quantity increments (no duplicate rows)
4. The cart panel shows each item's name, unit price × qty, and a row total
5. The `−` button decrements quantity; pressing it when qty is 1 removes the item entirely
6. The `+` button increments quantity
7. The ✕ button removes the item regardless of quantity
8. "Clear cart" removes all items at once
9. The cart total reflects all items and quantities at all times
10. None of the above requires changes to `App.jsx`, `ProductCard.jsx`, or `Cart.jsx`

---

## Visual Spec

**Initial state:**

```text
┌──────────────────────────────┬────────────────────┐
│  The Shop                    │  Cart (0)           │
│                              │                     │
│  [Keyboard $129.99]          │  Your cart is empty │
│  [ Add to Cart ]             │                     │
│                              │                     │
│  [USB-C Hub $49.99]          │                     │
│  [ Add to Cart ]             │                     │
│  ...                         │                     │
└──────────────────────────────┴────────────────────┘
```

**After adding Keyboard twice and USB-C Hub once:**

```text
┌──────────────────────────────┬────────────────────────────┐
│  The Shop                    │  Cart (2)                  │
│                              │                            │
│  ...                         │  Mechanical Keyboard       │
│                              │  − 2 +  ✕   $259.98       │
│                              │                            │
│                              │  USB-C Hub                 │
│                              │  − 1 +  ✕   $49.99        │
│                              │                            │
│                              │  Total       $309.97       │
│                              │  [ Checkout ]              │
│                              │  [ Clear cart ]            │
└──────────────────────────────┴────────────────────────────┘
```

---

## Hints

<details>
<summary>Hint 1 — Syntax</summary>

```text
// useReducer
const [state, dispatch] = useReducer(reducerFn, initialState)

// Context
const MyContext = createContext(null)
<MyContext.Provider value={...}>{children}</MyContext.Provider>
const value = useContext(MyContext)
```
`dispatch({ type: 'ACTION_NAME', payload: data })` triggers the reducer with that action.

</details>

<details>
<summary>Hint 2 — Conceptual</summary>

`CartProvider` wraps the entire app — it's the single source of truth for cart state.
`ProductCard` and `Cart` both call `useCart()` to get `{ items, dispatch }`.
The reducer decides *how* state changes; the components only decide *what event happened*.
Which action type should handle the case where adding an existing item increments qty vs. appends?

</details>

<details>
<summary>Hint 3 — Near-solution</summary>

`CartContext.jsx` structure:
```text
const [state, dispatch] = useReducer(cartReducer, { items: [] })
<CartContext.Provider value={{ items: state.items, dispatch }}>
  {children}
</CartContext.Provider>
```

`ADD_ITEM` reducer pattern:
```text
const existing = state.items.find(i => i.id === action.payload.id)
if (existing) {
  return { ...state, items: state.items.map(i =>
    i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
  )}
}
return { ...state, items: [...state.items, { ...action.payload, qty: 1 }] }
```

For `UPDATE_QTY`: if the new qty is less than 1, remove the item (same as REMOVE_ITEM).

</details>

---

## Extension Challenges

**EC-1 [Evaluate]:** Persist the cart to `localStorage` so a page refresh does not clear it.
Pass the persisted cart as the initial state to `useReducer`.
What happens if the stored data is malformed or outdated? Add a try/catch guard.

**EC-2 [Create]:** Write a `useCartSummary()` custom hook that returns
`{ itemCount, total, isEmpty }` computed from `useCart().items`.
Replace any inline calculations in `Cart.jsx` with this hook (you may modify `Cart.jsx` for this challenge only).

**EC-3 [Create]:** Write a unit test for `cartReducer` using Vitest.
Test each action type: ADD_ITEM (new), ADD_ITEM (existing), REMOVE_ITEM, UPDATE_QTY (to 0), CLEAR_CART.
No React rendering required — the reducer is a pure function.
