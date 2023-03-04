import { CardState } from "@/lib/types"

export const CardView = (props: {
  state: CardState;
  selected: boolean;
  onClick(): void;
}) => {
  if (!props.state.visible) { return null; }

  return (
    <div onClick={props.onClick} style={{
      backgroundColor: props.selected ? 'blue' : 'inherit',
    }}>
     {props.state.data.cid}
    </div>
  );
}
