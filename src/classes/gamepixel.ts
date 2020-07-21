export const cellHeightInGamePixels = 16;

export type GamePixel = number;

export function getGridValueOfGamePixel(value: number) {
  return Math.floor(value/cellHeightInGamePixels);
}


