import { generateGameState } from "@/lib/generator";
import { GameView } from "@/views/GameView";

export const Solitaire = () => {
  return (
    <>
      <div>playing solo</div>
      <GameView
        initialState={generateGameState(['p0'])}
        pid="p0"
      />
    </>
  );
};

export default Solitaire;
