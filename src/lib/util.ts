import { CardData, CardState } from "./types";

function compareCardData(a: CardData, b: CardData) {
  if (a.value < b.value || a.value === b.value + 10) {
    return -1;
  }
  return 1;
}

export function sortCardData(arr: CardData[], ascending: boolean): CardData[] {
  const out = arr.concat();
  out.sort(compareCardData);
  return ascending ? out : out.reverse();
}

export function sortCardState(arr: CardState[], ascending: boolean): CardState[] {
  const out = arr.concat();
  out.sort((a, b) => compareCardData(a.data, b.data));
  return ascending ? out : out.reverse();
}

export function shuffle<T>(arr: T[]): T[] {
  const out = arr.concat();
  out.sort(() => Math.random() < 0.5 ? -1 : 1);
  return out;
}
