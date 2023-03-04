import { executePlays } from "@/lib/executor";
import { mapCards } from "@/lib/mapper";
import { CardID, CardLocation, CardState, GameState } from "@/lib/types"
import { useCallback, useState } from "react";
import { CardView } from "./CardView";
import styles from './Game.module.css';

export const GameView = (props: {
  initialState: GameState;
  pid: string;
}) => {
  const [state, setGameState] = useState<GameState>(props.initialState);
  const [selected, setSelected] = useState<CardID[]>([]);
  const onCardClick = useCallback((cs: CardState) => {
    if (cs.location === CardLocation.Board) {
      if (selected.length) {
        const stack = state.board[cs.position];
        const newState = executePlays(state, {
          sid: stack.sid,
          cards: selected,
        });
        setGameState(newState);
        setSelected([]);
      }
    }
    if (cs.location === CardLocation.Hand) {
      if (selected.includes(cs.data.cid)) {
        setSelected(selected.filter(cid => cid !== cs.data.cid));
      } else {
        setSelected([...selected, cs.data.cid]);
      }
    }
  }, [selected]);

  const { allCards } = mapCards(state, props.pid);
  return (
    <div className={styles.GameBoard}>
      {allCards.map(cs => (
        <CardView
          key={cs.data.cid}
          state={cs}
          selected={selected.includes(cs.data.cid)}
          onClick={() => onCardClick(cs)}
        />
      ))}
    </div>
  )
};
