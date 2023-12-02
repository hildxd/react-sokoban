import { create } from "zustand";
import { PlayerStore } from "./player.ts";

type MapStore = {
  map: Array<number[]>;
};

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export const useMapStore = create<MapStore>(() => ({
  map: [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1],
  ],
}));

export function getMapTileWithPlayer(newPlayer: PlayerStore["player"]): number {
  const { map } = useMapStore.getState();
  return map[newPlayer.y][newPlayer.x];
}
