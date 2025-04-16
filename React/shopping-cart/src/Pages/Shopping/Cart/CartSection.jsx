import styles from "../shopping.module.css";
import CartItem from "./CartItem";

export default function CartSection({
  shoppingCart,
  shoppingItems,
  addToCart,
  decreaseFromCart,
  removeFromCart,
}) {
  return (
    <div className={styles.cartContainer}>
      <h3>Shopping Cart</h3>
      <div className={styles.cartSection}>
        {shoppingCart.map((cartItems) => {
          const shoppingItem = shoppingItems.find(
            (item) => item.id == cartItems.id
          );
          return (
            <CartItem
              key={cartItems.id}
              id={cartItems.id}
              title={shoppingItem.title}
              image={shoppingItem.image}
              itemCount={cartItems.itemCount}
              price={shoppingItem.price}
              addToCart={addToCart}
              decreaseFromCart={decreaseFromCart}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>
      <p>
        Grand Total: $
        {shoppingCart
          .reduce((sum, cartItem) => {
            const item = shoppingItems.find(
              (shopItem) => shopItem.id == cartItem.id
            );
            return item ? sum + cartItem.itemCount * item.price : sum;
          }, 0)
          .toFixed(2)}
      </p>

      <button>Check Out</button>
    </div>
  );
}
