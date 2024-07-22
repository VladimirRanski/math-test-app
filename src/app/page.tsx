import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Link href="/arithmetic">
          <button className={styles.button}>Арифметика</button>
        </Link>
        <Link href="/comparison">
          <button className={styles.button}>Сравнение</button>
        </Link>
        <Link href="/multiple-choice">
          <button className={styles.button}>Множественный выбор</button>
        </Link>
        <Link href="/settings">
          <button className={styles.button}>Настройки</button>
        </Link>
      </main>
    </div>
  );
}
