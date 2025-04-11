import styles from "./Home.module.css";

export default function Home() {
  return (
    <main className={styles.Home}>
      <div className={styles.container}>
        <h2>The Shopping Cart Project</h2>
        <p>
          This website is created to practice the knowledge aquired with The
          Odin Project React section. The intention of this is to be able to
          implement the following:
        </p>
        <ul>
          <li className={styles.listItem}>React Router</li>
          <li className={styles.listItem}>React Testing with Vitest</li>
          <li className={styles.listItem}>React Fetching with useEffect</li>
        </ul>
      </div>
    </main>
  );
}
