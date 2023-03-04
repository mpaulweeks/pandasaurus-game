export function getMaxHandSize(numPlayers: number): number {
  return [8, 7, 6, 6, 6][numPlayers] ?? 6;
}
