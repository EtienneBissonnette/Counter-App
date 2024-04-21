import styles from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styles.loading_ring}>
      Loading
      <span></span>
    </div>
  );
};

export default Loading;
