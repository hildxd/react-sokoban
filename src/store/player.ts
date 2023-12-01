import {create} from "zustand";

export type PlayerStore = {
  player: {
    x: number,
    y: number,
  },
  movePlayerLeft: () => void,
  movePlayerRight: () => void,
  movePlayerUp: () => void,
  movePlayerDown: () => void,
  reset: () => void,
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  player: {
    x: 1,
    y: 1,
  },
  movePlayerLeft: () => {
    set((state) => ({
      player: {
        ...state.player,
        x: state.player.x - 1,
      },
    }));
  },
  movePlayerRight: () => {
    set((state) => ({
      player: {
        ...state.player,
        x: state.player.x + 1,
      },
    }));
  },
  movePlayerUp: () => {
    set((state) => ({
      player: {
        ...state.player,
        y: state.player.y - 1,
      },
    }));
  },
  movePlayerDown: () => {
    set((state) => ({
      player: {
        ...state.player,
        y: state.player.y + 1,
      },
    }));
  },
  reset: () => {
    set(() => ({
      player: {
        x: 1,
        y: 1,
      },
    }));
  },
}))