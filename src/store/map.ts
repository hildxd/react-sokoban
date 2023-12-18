import { create } from "zustand";
import { Position } from "../hooks/usePosition.ts";

export type Map = MapTile[][];
type MapStore = {
  map: Map;
  setupMap: (map: Map) => void;
  isWall: (postion: Position) => boolean;
};

export enum MapTile {
  WALL = 1,
  FLOOR = 2,
}

export const useMapStore = create<MapStore>((set, get) => ({
  map: [],
  setupMap: (map: Map) => {
    set({ map });
  },
  isWall: (position: Position) => {
    return get().map[position.y][position.x] === MapTile.WALL;
  },
}));
