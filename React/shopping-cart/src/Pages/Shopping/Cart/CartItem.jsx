import styles from "../shopping.module.css";
import CartItemButtons from "./CartItemButtons";

export default function CartItem({
  id,
  title,
  image,
  itemCount,
  price,
  addToCart,
  decreaseFromCart,
  removeFromCart,
}) {
  return (
    <section key={id} className={styles.cartItem}>
      <div className={styles.cartImgContainer}>
        <img src={image} alt={title} className={styles.cartItemImg} />
      </div>
      <article className={styles.cartArticle}>
        <div className={styles.truncateTitle}>
          <h3 className={styles.shoppingItemTitle}>{title}</h3>
        </div>
        <p className={styles.cartItemCount}>Quantity: {itemCount}</p>
        <p className={styles.cartItemCount}>
          Total: <strong>${(itemCount * price).toFixed(2)}</strong>
        </p>
      </article>
      <CartItemButtons
        itemCount={itemCount}
        id={id}
        decreaseFromCart={decreaseFromCart}
        removeFromCart={removeFromCart}
        addToCart={addToCart}
      />
    </section>
  );
}
