import { create } from "zustand";
import { useCargoStore } from "./cargo";

type Game = {
    isWin: boolean,
    checkWin: () => void
}

export const useGameStore = create<Game>((set) => ({
    isWin: false,
    checkWin: () => {
        const { cargos } = useCargoStore.getState()
        set({
            isWin: cargos.every(c => c.onTarget)
        })
    }
}))