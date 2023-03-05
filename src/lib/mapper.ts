import { CardLocation, CardState, GameState } from "./types";
import { sortCardData, sortCardState } from "./util";

export function mapCards(state: GameState, pid: string): {
  allCards: CardState[];
 } {
  const allCards: CardState[] = [];

  state.board.forEach((pile, pi) => {
    pile.cards.forEach((card, ci, arr) => {
      allCards.push({
        data: card,
        location: CardLocation.Board,
        position: pi,
        stack: ci,
        visible: ci >= arr.length - 2, // show the top 2 cards
      });
    });
  });

  state.hands.forEach(hand => {
    const sorted = sortCardData(hand.cards, { ascending: true, check10: false, });
    sorted.forEach((card, ci) => {
      allCards.push({
        data: card,
        location: CardLocation.Hand,
        position: ci,
        stack: ci,
        visible: hand.pid === pid,
      });
    });
  });

  state.deck.forEach(card => {
    allCards.push({
      data: card,
      location: CardLocation.Deck,
      position: 0,
      stack: 0,
      visible: false,
    });
  });

  return {
    allCards: sortCardState(allCards, { ascending: true, check10: false, }),
  };
}
