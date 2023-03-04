import { useBoundingContainer } from "@/hooks/useBoundingContainer";
import { executeEndTurn, executePlays } from "@/lib/executor";
import { mapCards } from "@/lib/mapper";
import { CardID, CardLocation, CardState, GameState } from "@/lib/types"
import React, { useCallback, useState } from "react";
import { CardView } from "./CardView";
import styles from './GameView.module.css';
import common from '../styles/Common.module.css';

export const GameView = (props: {
  initialState: GameState;
  pid: string;
}) => {
  const {container, Wrapper} = useBoundingContainer();
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
  }, [state, selected]);

  const endTurn = useCallback(() => {
    const pid = state.hands[0].pid;
    const newState = executeEndTurn(state, pid);
    setGameState(newState);
    setSelected([]);
  }, [state]);

  const { allCards } = mapCards(state, props.pid);
  return (
    <div className={styles.GameView}>
      <div className={common.FlexRow} style={{ justifyContent: 'flex-end', }}>
        <button onClick={() => endTurn()}>
          end turn
        </button>
      </div>
      <Wrapper>
        {container && (
          <>
            {allCards.map(cs => (
              <CardView
                key={cs.data.cid}
                container={container}
                state={cs}
                selected={selected.includes(cs.data.cid)}
                onClick={() => onCardClick(cs)}
              />
            ))}
          </>
        )}
      </Wrapper>
    </div>
  )
};
