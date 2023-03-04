import { generateGameState } from "@/lib/generator";
import { GameView } from "@/views/GameView";
import styles from './Main.module.css';

export const Solitaire = () => {
  return (
    <div className={styles.Main}>
      <h1>Solitaire</h1>
      <GameView
        initialState={generateGameState(['p0'])}
        pid="p0"
      />
    </div>
  );
};

export default Solitaire;
