import { create } from "zustand";
import { useCargoStore } from "./cargo";
import { GameData } from '../data/game';
import { useMapStore } from "./map";
import { usePlayerStore } from "./player";
import { useTargetStore } from "./target";

type Game = {
    isWin: boolean,
    checkWin: () => void
    setupGameData: (data: GameData) => void
}

export const useGameStore = create<Game>((set) => ({
    isWin: false,
    checkWin: () => {
        const { cargos } = useCargoStore.getState()
        set({
            isWin: cargos.every(c => c.onTarget)
        })
    },
    setupGameData: (data) => {
        const { setupMap } = useMapStore.getState()
        const { setPlayerPosition } = usePlayerStore.getState()
        const { setupCargos } = useCargoStore.getState()
        const { setupTargets } = useTargetStore.getState()

        setupMap(data.map)
        setPlayerPosition(data.player)
        setupCargos(data.cargos)
        setupTargets(data.targets)
    }
}))