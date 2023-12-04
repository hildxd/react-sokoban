import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Position } from "../hooks/usePosition.ts";
export type Cargo = {
  x: number;
  y: number;
};

type CargoStore = {
  cargos: Cargo[];
  setupCargos: (cargos: Cargo[]) => void;
  _findCargoWithPosition: (position: Position) => number;
  move: (findPosition: Position, newPosition: Position) => void;
  isCargo: (position: Position) => boolean;
};

export const useCargoStore = create(
  immer<CargoStore>((set, get) => ({
    cargos: [],
    setupCargos: (cargos: Cargo[]) => {
      set((state) => {
        state.cargos = cargos;
      });
    },
    _findCargoWithPosition: (position: Position) => {
      return get().cargos.findIndex(
        (cargo) => cargo.x === position.x && cargo.y === position.y,
      );
    },
    move: (findPos, newPosition) => {
      const index = get()._findCargoWithPosition(findPos);
      if (index === -1) return;
      set((state) => {
        state.cargos[index] = newPosition;
      });
    },
    isCargo: (position: Position) => {
      return get()._findCargoWithPosition(position) !== -1;
    },
  })),
);
