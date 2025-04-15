import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./Pages/Core/Header/Header";
import "./App.css";

function App() {
  const [shoppingItems, setShoppingItems] = useState([]);

  useEffect(() => {
    const fakeStoreURL = "https://fakestoreapi.com/products";
    fetch(fakeStoreURL)
      .then((response) => response.json())
      .then((data) => {
        setShoppingItems(data);
      });
  }, []);

  return (
    <>
      <Header />
      <Outlet context={[shoppingItems]} />
      <footer></footer>
    </>
  );
}

export default App;
