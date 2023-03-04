import { useBoundingContainer } from "@/hooks/useBoundingContainer";
import { generateGameState } from "@/lib/generator";
import { GameView } from "@/views/GameView";

export const Solitaire = () => {
  const {container, Wrapper} = useBoundingContainer();
  return (
    <Wrapper>
      {container && <GameView
        initialState={generateGameState(['p0'])}
        pid="p0"
        container={container} />}
    </Wrapper>
  );
};

export default Solitaire;
