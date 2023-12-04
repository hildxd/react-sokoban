import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { Position } from "../hooks/usePosition.ts";
import { useMapStore } from "./map.ts";
export type Cargo = {
  x: number;
  y: number;
};

type CargoStore = {
  cargos: Cargo[];
  setupCargos: (cargos: Cargo[]) => void;
  findCargo: (position: Position) => Cargo | undefined;
  moveCargo: (cargo: Cargo, dx: number, dy: number) => boolean;
};

export const useCargoStore = create(
  immer<CargoStore>((set, get) => ({
    cargos: [],
    setupCargos: (cargos: Cargo[]) => {
      set((state) => {
        state.cargos = cargos;
      });
    },
    findCargo: (position: Position) => {
      return get().cargos.find(
        (cargo) => cargo.x === position.x && cargo.y === position.y,
      );
    },
    moveCargo: (cargo, dx, dy) => {
      const { isWall } = useMapStore.getState();
      const position = {
        x: cargo.x + dx,
        y: cargo.y + dy,
      };
      if (isWall(position)) return false;
      if (get().findCargo(position)) return false;
      set((state) => {
        const index = state.cargos.findIndex(
          (c) => c.x === cargo.x && c.y === cargo.y,
        );
        state.cargos[index] = position;
      });
      return true;
    },
  })),
);
