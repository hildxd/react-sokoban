import { create } from "zustand";

type Target = {
  x: number;
  y: number;
};

type TargetStore = {
  targets: Target[];
  setupTargets: (targets: Target[]) => void;
};

export const useTargetStore = create<TargetStore>((set) => ({
  targets: [],
  setupTargets: (targets: Target[]) => {
    set(() => ({
      targets,
    }));
  },
}));
