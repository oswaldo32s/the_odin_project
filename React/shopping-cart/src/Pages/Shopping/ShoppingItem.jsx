import styles from "./shopping.module.css";

export default function ShoppingItem({
  id,
  title,
  image,
  description,
  price,
  handleClick,
}) {
  return (
    <section className={styles.shoppingItem}>
      <div className={styles.shoppingImgContainer}>
        <img src={image} alt={title} className={styles.shoppingItemImg} />
      </div>
      <article className={styles.article}>
        <div className={styles.truncateTitle}>
          <h3 className={styles.shoppingItemTitle}>{title}</h3>
        </div>
        <div className={styles.truncateDesc}>
          <p className={styles.shoppingItemDesc}>{description}</p>
        </div>
        <p className={styles.shoppingItemPrice}>$ {price}</p>
      </article>
      <button type="button" onClick={handleClick} data-id={id}>
        Add to Cart
      </button>
    </section>
  );
}
