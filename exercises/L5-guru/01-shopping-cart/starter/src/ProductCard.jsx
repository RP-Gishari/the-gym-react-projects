// Do not modify this file.
import { useCart } from './CartContext'

export default function ProductCard({ product }) {
  const { dispatch } = useCart()

  function handleAdd() {
    dispatch({ type: 'ADD_ITEM', payload: product })
  }

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <div className="product-body">
        <p className="product-name">{product.name}</p>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="add-btn" onClick={handleAdd}>
          Add to Cart
        </button>
      </div>
    </div>
  )
}
