import styles from "./Header.module.css";
import ToggleThemeBtn from "../ToggleTheme/ToggleThemeBtn";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.Container}>
        <section className={styles.logoSection}>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.2}
              stroke="currentColor"
              className={styles.logoSVG}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </Link>
          <Link to="/">
            <h1 className={styles.logoName}>Shopping Cart</h1>
          </Link>
        </section>
        <div className={styles.rightSection}>
          <ToggleThemeBtn />
          <nav className={styles.mainNav}>
            <Link to="/" className={styles.headerLink}>
              Home
            </Link>
            <Link to="/shopping-cart" className={styles.headerLink}>
              Shopping Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
