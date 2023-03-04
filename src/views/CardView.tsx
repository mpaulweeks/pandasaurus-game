import { CardLocation, CardState } from "@/lib/types"
import { CSSProperties } from "react";
import styles from './CardView.module.css';

export const CardView = (props: {
  state: CardState;
  selected: boolean;
  onClick(): void;
}) => {
  // todo remove visible
  // if (!props.state.visible) { return null; }

  const absolutePositioning: CSSProperties = {
    [CardLocation.Board]: {
      top: 0,
      left: `${0 + props.state.position * 100}px`,
    },
    [CardLocation.Hand]: {
      top: '50%',
      left: `${0 + props.state.position * 80}px`,
    },
    [CardLocation.Deck]: {
      top: 0,
      right: 0,
    },
  }[props.state.location];

  const override: CSSProperties = {
    ...absolutePositioning,
    zIndex: 10 + props.state.stack,
    ...(props.selected ? { backgroundColor: 'blue', } : {}),
  };

  return (
    <div
      className={styles.Card}
      onClick={props.onClick}
      style={override}
    >
     {props.state.data.cid}
    </div>
  );
}
