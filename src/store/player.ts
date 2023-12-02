import { create } from "zustand";
import { getMapTileWithPlayer, MapTile } from "./map.ts";

export type PlayerStore = {
  player: {
    x: number;
    y: number;
  };
  movePlayerLeft: () => void;
  movePlayerRight: () => void;
  movePlayerUp: () => void;
  movePlayerDown: () => void;
  reset: () => void;
  setPlayerPosition: (x: number, y: number) => void;
};

function canMove(target: number): boolean {
  return [MapTile.FLOOR].includes(target);
}

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

    const target = getMapTileWithPlayer(newPlayer);
    if (canMove(target)) {
      get().setPlayerPosition(newPlayer.x, newPlayer.y);
    }
  },
  movePlayerRight: () => {
    const newPlayer = {
      ...get().player,
      x: get().player.x + 1,
    };
    const target = getMapTileWithPlayer(newPlayer);
    if (canMove(target)) {
      get().setPlayerPosition(newPlayer.x, newPlayer.y);
    }
  },
  movePlayerUp: () => {
    const newPlayer = {
      ...get().player,
      y: get().player.y - 1,
    };
    const target = getMapTileWithPlayer(newPlayer);
    if (canMove(target)) {
      get().setPlayerPosition(newPlayer.x, newPlayer.y);
    }
  },
  movePlayerDown: () => {
    const newPlayer = {
      ...get().player,
      y: get().player.y + 1,
    };
    const target = getMapTileWithPlayer(newPlayer);
    if (canMove(target)) {
      get().setPlayerPosition(newPlayer.x, newPlayer.y);
    }
  },
  reset: () => {
    set(() => ({
      player: {
        x: 1,
        y: 1,
      },
    }));
  },
  setPlayerPosition: (x, y) => {
    set(() => ({
      player: {
        x,
        y,
      },
    }));
  },
}));
