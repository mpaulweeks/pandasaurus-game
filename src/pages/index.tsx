import { generateGameState } from '@/lib/generator'

console.log(generateGameState(['foo', 'bar']));

export default function Home() {
  return (
    <>
      <div>
        <a href='solitaire'>
          <button>Play Alone</button>
        </a>
      </div>
      <div>
        <a href='lobby?name=bob&lobby=foo'>
          <button>Play Online</button>
        </a>
      </div>
    </>
  );
}
