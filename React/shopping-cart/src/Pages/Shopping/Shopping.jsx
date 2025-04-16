import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "./shopping.module.css";
import CartItem from "./Cart/CartItem";
import ShoppingSection from "./Shopping/ShoppingSection";
import CartSection from "./Cart/CartSection";

export default function Shopping() {
  const [shoppingItems] = useOutletContext();
  const [shoppingCart, setShoppingCart] = useState([]);

  function addToCart(e) {
    const itemID = e.target.closest("button").dataset.id;
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
    const itemID = e.target.closest("button").dataset.id;
    const index = shoppingCart.findIndex((item) => item.id === itemID);

    setShoppingCart((prevCart) => prevCart.toSpliced(index, 1));
  }

  function decreaseFromCart(e) {
    const itemID = e.target.closest("button").dataset.id;
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
      <ShoppingSection shoppingItems={shoppingItems} addToCart={addToCart} />
      {shoppingCart.length >= 1 && (
        <CartSection
          shoppingCart={shoppingCart}
          shoppingItems={shoppingItems}
          addToCart={addToCart}
          decreaseFromCart={decreaseFromCart}
          removeFromCart={removeFromCart}
        />
      )}
    </main>
  );
}
