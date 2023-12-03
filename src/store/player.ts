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
};

const isWall = useMapStore.getState().isWall;
const findCargoWithPosition = useCargoStore.getState().findCargoWithPosition;

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  player: {
    x: 1,
    y: 1,
  },
  movePlayerLeft: () => {
    const newPlayer = {
      ...get().player,
      x: get().player.x - 1,
    };

    if (isWall(newPlayer)) {
      return;
    }
    const cargoIndex = findCargoWithPosition(newPlayer);
    if (cargoIndex !== -1) {
      useCargoStore.getState().moveCargoLeft(cargoIndex);
    }
    get().setPlayerPosition(newPlayer);
  },
  movePlayerRight: () => {
    const newPlayer = {
      ...get().player,
      x: get().player.x + 1,
    };
    if (isWall(newPlayer)) {
      return;
    }
    const cargoIndex = findCargoWithPosition(newPlayer);
    if (cargoIndex !== -1) {
      useCargoStore.getState().moveCargoRight(cargoIndex);
    }
    get().setPlayerPosition(newPlayer);
  },
  movePlayerUp: () => {
    const newPlayer = {
      ...get().player,
      y: get().player.y - 1,
    };
    if (isWall(newPlayer)) {
      return;
    }
    const cargoIndex = findCargoWithPosition(newPlayer);
    if (cargoIndex !== -1) {
      useCargoStore.getState().moveCargoUp(cargoIndex);
    }
    get().setPlayerPosition(newPlayer);
  },
  movePlayerDown: () => {
    const newPlayer = {
      ...get().player,
      y: get().player.y + 1,
    };
    if (isWall(newPlayer)) {
      return;
    }
    const cargoIndex = findCargoWithPosition(newPlayer);
    if (cargoIndex !== -1) {
      useCargoStore.getState().moveCargoDown(cargoIndex);
    }
    get().setPlayerPosition(newPlayer);
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
