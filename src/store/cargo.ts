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
  findCargoWithPosition: (position: Position) => number;
  moveCargoLeft: (index: number) => void;
  moveCargoRight: (index: number) => void;
  moveCargoUp: (index: number) => void;
  moveCargoDown: (index: number) => void;
};

export const useCargoStore = create(
  immer<CargoStore>((set, get) => ({
    cargos: [
      {
        x: 2,
        y: 2,
      },
      {
        x: 3,
        y: 2,
      },
    ],
    setupCargos: (cargos: Cargo[]) => {
      set((state) => {
        state.cargos = cargos;
      });
    },
    findCargoWithPosition: (position: Position) => {
      return get().cargos.findIndex(
        (cargo) => cargo.x === position.x && cargo.y === position.y,
      );
    },
    moveCargoLeft: (index: number) => {
      set((state) => {
        state.cargos[index].x = state.cargos[index].x - 1;
      });
    },
    moveCargoRight: (index: number) => {
      set((state) => {
        state.cargos[index].x = state.cargos[index].x + 1;
      });
    },
    moveCargoUp: (index: number) => {
      set((state) => {
        state.cargos[index].y = state.cargos[index].y - 1;
      });
    },
    moveCargoDown: (index: number) => {
      set((state) => {
        state.cargos[index].y = state.cargos[index].y + 1;
      });
    },
  })),
);
