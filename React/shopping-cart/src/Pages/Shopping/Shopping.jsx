import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import styles from "./shopping.module.css";
import ShoppingItem from "./ShoppingItem";

export default function Shopping() {
  const [shoppingItems] = useOutletContext();
  const [shoppingCart, setShoppingCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(calculateTotal());

  function calculateTotal() {
    return shoppingCart.reduce((total, cartItem) => {
      const item = shoppingItems.find(
        (shopItem) => shopItem.id === cartItem.id
      );
      return item ? total + cartItem.itemCount * item.price : total;
    }, 0);
  }

  function addToCart(e) {
    const itemID = e.target.dataset.id;
    const index = shoppingCart.findIndex((item) => item.id === itemID);

    setShoppingCart((prevCart) => {
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index] = {
          ...updatedCart[index],
          itemCount: updatedCart[index].itemCount + 1,
        };
        return updatedCart;
      } else {
        return [...prevCart, { id: itemID, itemCount: 1 }];
      }
    });
  }

  function removeFromCart(e) {
    const itemID = e.target.dataset.id;
    const index = shoppingCart.findIndex((item) => item.id === itemID);

    setShoppingCart((prevCart) => prevCart.toSpliced(index, 1));
  }

  function decreaseFromCart(e) {
    const itemID = e.target.dataset.id;
    const index = shoppingCart.findIndex((item) => item.id === itemID);

    setShoppingCart((prevCart) => {
      if (index !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[index] = {
          ...updatedCart[index],
          itemCount: updatedCart[index].itemCount - 1,
        };
        return updatedCart;
      } else {
        return [...prevCart, { id: itemID, itemCount: 1 }];
      }
    });
  }

  return (
    <main className={styles.Shopping}>
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
      <div className={styles.cartSection}>
        {shoppingCart.length >= 1 && <h3>Shopping Cart</h3>}
        {shoppingCart.map((item) => {
          const itemDetails = shoppingItems.find(
            (shoppingItem) => shoppingItem.id == item.id
          );
          return (
            <section key={itemDetails.id} className={styles.cartItem}>
              <div className={styles.cartImgContainer}>
                <img
                  src={itemDetails.image}
                  alt={itemDetails.title}
                  className={styles.cartItemImg}
                />
              </div>
              <article className={styles.cartArticle}>
                <div className={styles.truncateTitle}>
                  <h3 className={styles.shoppingItemTitle}>
                    {itemDetails.title}
                  </h3>
                </div>
                <p className={styles.cartItemCount}>
                  Quantity: {item.itemCount}
                </p>
                <p className={styles.cartItemCount}>
                  Total:{" "}
                  <strong>
                    ${(item.itemCount * itemDetails.price).toFixed(2)}
                  </strong>
                </p>
              </article>
              <div className={styles.buttonSection}>
                {item.itemCount > 1 && (
                  <button onClick={decreaseFromCart} data-id={itemDetails.id}>
                    -
                  </button>
                )}
                <button onClick={removeFromCart} data-id={itemDetails.id}>
                  Remove
                </button>
                <button onClick={addToCart} data-id={itemDetails.id}>
                  +
                </button>
              </div>
            </section>
          );
        })}
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
    </main>
  );
}
