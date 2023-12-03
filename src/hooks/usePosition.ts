import { useMemo } from "react";

export type Position = {
  x: number;
  y: number;
};
export const usePosition = (pos: Position) => {
  const SETP = 32;
  const position = useMemo(
    () => ({
      left: pos.x * SETP + "px",
      top: pos.y * SETP + "px",
    }),
    [pos],
  );
  return {
    position,
  };
};
