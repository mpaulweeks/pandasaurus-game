import { DomContainer } from "@/hooks/useBoundingContainer";
import { CardLocation, CardState } from "@/lib/types"
import { CSSProperties } from "react";
import styles from './CardView.module.css';

export const CardView = (props: {
  container: DomContainer<HTMLDivElement>;
  state: CardState;
  selected: boolean;
  onClick(): void;
}) => {
  // todo remove visible
  // if (!props.state.visible) { return null; }

  const { bounding } = props.container;
  const smallCard = {
    width: bounding.width / 9,
    height: bounding.height / 4,
  };
  const largeCard = {
    width: bounding.width / 6,
    height: bounding.height / 3,
  };

  const absolutePositioning: CSSProperties = {
    [CardLocation.Board]: {
      top: 0,
      left: `${0 + props.state.position * largeCard.width}px`,
      width: `${largeCard.width}px`,
      height: `${largeCard.height}px`,
    },
    [CardLocation.Hand]: {
      top: `${bounding.height - smallCard.height}px`,
      left: `${0 + props.state.position * (smallCard.width)}px`,
      width: `${smallCard.width}px`,
      height: `${smallCard.height}px`,
    },
    [CardLocation.Deck]: {
      top: 0,
      right: 0,
      width: `${smallCard.width}px`,
      height: `${smallCard.height}px`,
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
