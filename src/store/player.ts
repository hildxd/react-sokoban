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

const isWall = useMapStore.getState().isWall;
const findCargoWithPosition = useCargoStore.getState().findCargoWithPosition;

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: {
    x: 1,
    y: 1,
  },
  _move: (dx, dy) => {
    const newPlayer = {
      x: get().player.x + dx,
      y: get().player.y + dy,
    };

    if (isWall(newPlayer)) {
      return;
    }
    const cargoIndex = findCargoWithPosition(newPlayer);
    if (cargoIndex !== -1) {
      useCargoStore.getState().move(cargoIndex, {
        x: newPlayer.x + dx,
        y: newPlayer.y + dy,
      });
    }
    get().setPlayerPosition(newPlayer);
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
