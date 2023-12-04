import { create } from "zustand";
import { Position } from "../hooks/usePosition.ts";

type Target = {
  x: number;
  y: number;
};

type TargetStore = {
  targets: Target[];
  setupTargets: (targets: Target[]) => void;
  isTarget: (position: Position) => boolean;
};

export const useTargetStore = create<TargetStore>((set, get) => ({
  targets: [],
  setupTargets: (targets: Target[]) => {
    set(() => ({
      targets,
    }));
  },
  isTarget: (position: Position) => {
    const { targets } = get();
    return targets.some(
      (target) => target.x === position.x && target.y === position.y,
    );
  },
}));
