import { create } from "zustand";
import { useMapStore } from "./map.ts";

export type Position = {
  x: number;
  y: number;
};
export type PlayerStore = {
  player: Position;
  movePlayerLeft: () => void;
  movePlayerRight: () => void;
  movePlayerUp: () => void;
  movePlayerDown: () => void;
  reset: () => void;
  setPlayerPosition: (position: Position) => void;
};

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

    if (useMapStore.getState().isWall(newPlayer)) {
      return;
    }
    get().setPlayerPosition(newPlayer);
  },
  movePlayerRight: () => {
    const newPlayer = {
      ...get().player,
      x: get().player.x + 1,
    };
    if (useMapStore.getState().isWall(newPlayer)) {
      return;
    }
    get().setPlayerPosition(newPlayer);
  },
  movePlayerUp: () => {
    const newPlayer = {
      ...get().player,
      y: get().player.y - 1,
    };
    if (useMapStore.getState().isWall(newPlayer)) {
      return;
    }
    get().setPlayerPosition(newPlayer);
  },
  movePlayerDown: () => {
    const newPlayer = {
      ...get().player,
      y: get().player.y + 1,
    };
    if (useMapStore.getState().isWall(newPlayer)) {
      return;
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
