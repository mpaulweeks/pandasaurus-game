import { CardData, GameState } from "./types"

export function executePlay(state: GameState, play: {
  sid: string;
  cid: string;
}): GameState {
  const out: GameState = JSON.parse(JSON.stringify(state));

  // execute
  let card: CardData | undefined;
  out.hands.forEach(hand => {
    hand.cards.forEach(c => {
      if (c.cid === play.cid) {
        card = c;
      }
    });
    hand.cards = hand.cards.filter(c => c.cid !== play.cid)
  });

  // if no card found?
  if (card === undefined) {
    // no-op
    return state;
  }

  out.board.forEach(stack => {
    if (stack.sid === play.sid) {
      stack.cards.push(card!);
    }
  });

  return out;
}

export function executePlays(state: GameState, play: {
  sid: string;
  cards: string[];
}): GameState {
  // todo sort cards with 10 skip in mind
  let out = state;
  for (const cid of play.cards) {
    out = executePlay(out, { sid: play.sid, cid, });
  }
  return out;
}
