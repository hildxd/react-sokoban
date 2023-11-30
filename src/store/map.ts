import { create } from "zustand";

type MapStore = {
    map: number[]
}

export const useMapStore = create<MapStore>(() => ({
    map: [
        1, 2, 3, 4,
    ]
}))