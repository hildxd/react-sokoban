import { create } from "zustand";
import { useMapStore } from "./map.ts";
import { Position } from "../hooks/usePosition.ts";

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
