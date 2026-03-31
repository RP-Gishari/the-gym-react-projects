// Do not modify this file.
import { useCart } from './CartContext'

export default function Cart() {
  const { items, dispatch } = useCart()

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)

  function handleRemove(id) {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  function handleQtyChange(id, qty) {
    dispatch({ type: 'UPDATE_QTY', payload: { id, qty } })
  }

  function handleClear() {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <>
      <h2>Cart ({items.length})</h2>

      {items.length === 0 && (
        <p className="cart-empty">Your cart is empty.</p>
      )}

      <div className="cart-items">
        {items.map(item => (
          <div key={item.id} className="cart-item">
            <span className="cart-item-name">{item.name}</span>
            <div className="qty-controls">
              <button
                className="qty-btn"
                onClick={() => handleQtyChange(item.id, item.qty - 1)}
              >
                −
              </button>
              <span className="qty-display">{item.qty}</span>
              <button
                className="qty-btn"
                onClick={() => handleQtyChange(item.id, item.qty + 1)}
              >
                +
              </button>
            </div>
            <span className="cart-item-price">
              ${(item.price * item.qty).toFixed(2)}
            </span>
            <button className="remove-btn" onClick={() => handleRemove(item.id)}>
              ✕
            </button>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Checkout</button>
          <button className="clear-btn" onClick={handleClear}>
            Clear cart
          </button>
        </div>
      )}
    </>
  )
}
