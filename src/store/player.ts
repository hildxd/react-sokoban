import { create } from "zustand";
import { useMapStore } from "./map.ts";

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
  setPlayer: (x: number, y: number) => void;
};

function getMapTileWithPlayer(newPlayer: PlayerStore["player"]): number {
  const { map } = useMapStore.getState();
  return map[newPlayer.y][newPlayer.x];
}

function canMove(target: number): boolean {
  return target === 2;
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
      set(() => ({
        player: newPlayer,
      }));
    }
  },
  movePlayerRight: () => {
    const newPlayer = {
      ...get().player,
      x: get().player.x + 1,
    };
    const target = getMapTileWithPlayer(newPlayer);
    if (canMove(target)) {
      set(() => ({
        player: newPlayer,
      }));
    }
  },
  movePlayerUp: () => {
    const newPlayer = {
      ...get().player,
      y: get().player.y - 1,
    };
    const target = getMapTileWithPlayer(newPlayer);
    if (canMove(target)) {
      set(() => ({
        player: newPlayer,
      }));
    }
  },
  movePlayerDown: () => {
    const newPlayer = {
      ...get().player,
      y: get().player.y + 1,
    };
    const target = getMapTileWithPlayer(newPlayer);
    if (canMove(target)) {
      set(() => ({
        player: newPlayer,
      }));
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
  setPlayer: (x, y) => {
    set(() => ({
      player: {
        x,
        y,
      },
    }));
  },
}));
