export const cellDimensionInGamePixels = 16;

export type GamePixel = number;

export function getGridValueOfGamePixel(value: number) {
  return Math.floor(value/cellDimensionInGamePixels);
}

export default GamePixel;
