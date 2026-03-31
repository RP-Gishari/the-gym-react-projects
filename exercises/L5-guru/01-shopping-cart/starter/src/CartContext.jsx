import { createContext, useContext, useReducer } from 'react'
import cartReducer from './cartReducer'

// CartContext is already created — do not rename it.
const CartContext = createContext(null)

// TODO: Implement CartProvider.
// Requirements:
//   1. Call useReducer(cartReducer, { items: [] }) to get [state, dispatch].
//   2. Pass an object containing `items` (from state) and `dispatch` as the
//      context value to CartContext.Provider.
//   3. Render {children} inside the provider.
//
// The shape of the context value must be: { items, dispatch }
// ProductCard and Cart both read from this shape.

export function CartProvider({ children }) {
  // TODO: replace this stub
  const stub = { items: [], dispatch: () => {} }
  return (
    <CartContext.Provider value={stub}>
      {children}
    </CartContext.Provider>
  )
}

// useCart is already implemented — do not modify.
export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
