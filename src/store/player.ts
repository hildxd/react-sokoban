import { create } from "zustand";
import { useMapStore } from "./map.ts";
import { Position } from "../hooks/usePosition.ts";
import { useCargoStore } from "./cargo.ts";

export type PlayerStore = {
  player: Position;
  movePlayerLeft: () => void;
  movePlayerRight: () => void;
  movePlayerUp: () => void;
  movePlayerDown: () => void;
  reset: () => void;
  setPlayerPosition: (position: Position) => void;
  _move: (dx: number, dy: number) => void;
};

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: {
    x: 1,
    y: 1,
  },
  _move: (dx, dy) => {
    const nextPosition = {
      x: get().player.x + dx,
      y: get().player.y + dy,
    };

    const { isWall } = useMapStore.getState();
    if (isWall(nextPosition)) {
      return;
    }

    const { findCargo, moveCargo } = useCargoStore.getState();
    const cargo = findCargo(nextPosition);
    if (cargo) {
      const isMoveCargo = moveCargo(cargo, dx, dy);
      if (!isMoveCargo) return;
    }

    get().setPlayerPosition(nextPosition);
  },
  movePlayerLeft: () => {
    get()._move(-1, 0);
  },
  movePlayerRight: () => {
    get()._move(1, 0);
  },
  movePlayerUp: () => {
    get()._move(0, -1);
  },
  movePlayerDown: () => {
    get()._move(0, 1);
  },
  reset: () => {
    set(() => ({
      player: {
        x: 1,
        y: 1,
      },
    }));
  },
  setPlayerPosition: (position) => {
    set(() => ({
      player: position,
    }));
  },
}));
