import { CardData, CardState } from "./types";

// todo this sort has problems with more than 2 elements
/*
  these are both valid sorts:
    16 < 24 < 26
    24 < 26 < 16
  rip transitive property
*/
function compareCardData(a: CardData, b: CardData) {
  if (a.value === b.value + 10) { return -1; }
  if (a.value + 10 === b.value) { return 1; }
  return a.value < b.value ? -1 : 1;
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
