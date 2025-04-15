import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "./shopping.module.css";

export default function Shopping() {
  const [shoppingItems] = useOutletContext();
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <main className={styles.Shopping}>
      <div className={styles.container}>
        <p>This is the Shopping Page</p>
        <div className={styles.shoppingContainer}>
          {shoppingItems.map((item) => (
            <section key={item.id} className={styles.shoppingItem}>
              <div className={styles.shoppingImgContainer}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.shoppingItemImg}
                />
              </div>
              <article className={styles.article}>
                <div className={styles.truncateTitle}>
                  <h3 className={styles.shoppingItemTitle}>{item.title}</h3>
                </div>
                <div className={styles.truncateDesc}>
                  <p className={styles.shoppingItemDesc}>{item.description}</p>
                </div>
                <p className={styles.shoppingItemPrice}>$ {item.price}</p>
              </article>
              <button type="button">Add to Cart</button>
            </section>
          ))}
        </div>
        <button>
          <Link to="/">Go Back Home</Link>
        </button>
      </div>
    </main>
  );
}
