// Do not modify this file.
import { CartProvider } from './CartContext'
import ProductCard from './ProductCard'
import Cart from './Cart'
import { products } from './data/products'

export default function App() {
  return (
    <CartProvider>
      <div className="shop-layout">
        <main className="product-grid">
          <h1>The Shop</h1>
          <div className="grid">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
        <aside className="cart-panel">
          <Cart />
        </aside>
      </div>
    </CartProvider>
  )
}
