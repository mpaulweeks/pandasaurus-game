import { generateGameState } from "@/lib/generator";
import { GameView } from "@/views/GameView";

export const Solitaire = () => {
  return (
    <>
      <GameView
        initialState={generateGameState(['p0'])}
        pid="p0"
      />
    </>
  );
};

export default Solitaire;
