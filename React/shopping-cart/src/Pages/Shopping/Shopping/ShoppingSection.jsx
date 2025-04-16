import styles from "../shopping.module.css";
import ShoppingItem from "./ShoppingItem";

export default function ShoppingSection({ shoppingItems, addToCart }) {
  return (
    <div className={styles.container}>
      <h3>Shopping!</h3>
      <div className={styles.shoppingNCart}>
        <div className={styles.shoppingContainer}>
          {shoppingItems.map((item) => (
            <ShoppingItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
              handleClick={addToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
