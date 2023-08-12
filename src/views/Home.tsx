import Link from 'next/link';
import styles from './Home.module.css';

export function HomeView() {
  return (
    <main className={styles.Home}>
      <h1>
        The Game
      </h1>
      <div>
        Fan implementation of <a href="https://pandasaurusgames.com/products/the-game-kwanchai-moriya-edition">The Game</a> by Pandasaurus.
        {' '}
        Read the <a href="/RULEBOOK.pdf">Rulebook.pdf</a> for more info.
      </div>
      <Link href='/solitaire'>
        <button>Play Alone</button>
      </Link>
      <Link href='/lobby?name=bob&lobby=foo'>
        <button>Play Online</button>
      </Link>
    </main>
  );
}
