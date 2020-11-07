import styles from './NeoLoading.module.scss';

export const NeoLoading = () => {
  return (
    <div className={styles.neoLoading}>
      <div className={styles.neoLight}/>
      <div className={styles.neoLight}/>
      <div className={styles.neoLight}/>
      <div className={styles.neoLight}/>
      <div className={styles.neoLight}/>
      <div className={styles.neoLight}/>
    </div>
  )
}