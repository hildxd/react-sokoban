import { create } from "zustand";

type Cargo = {
  x: number;
  y: number;
};

type CargoStore = {
  cargos: Cargo[];
};

export const useCargoStore = create<CargoStore>(() => ({
  cargos: [
    {
      x: 2,
      y: 2,
    },
    {
      x: 3,
      y: 2,
    },
  ],
}));
