import { create } from "zustand";
import { useCargoStore } from "./cargo";
import { GameData } from '../data/game';
import { useMapStore } from "./map";
import { usePlayerStore } from "./player";
import { useTargetStore } from "./target";

type Game = {
    isWin: boolean,
    level: number,
    _gameData: GameData[],
    checkWin: () => void
    setupGameData: (datas: GameData[]) => void
    setupNextLevel: () => void
    _loadData: () => void
    _reset: () => void
}

export const useGameStore = create<Game>((set, get) => ({
    isWin: false,
    level: 1,
    _gameData: [],
    checkWin: () => {
        const { cargos } = useCargoStore.getState()
        set({
            isWin: cargos.every(c => c.onTarget)
        })
    },
    setupGameData: (datas) => {
        set({
            _gameData: datas
        })
        get()._loadData()
    },
    setupNextLevel: () => {
        if (get()._gameData.length < get().level) return
        set({
            level: get().level + 1,
            isWin: false
        })
        get()._loadData()
    },
    _loadData: () => {
        const { _gameData } = get()
        const data = _gameData[get().level - 1]
        const { setupMap } = useMapStore.getState()
        const { setPlayerPosition } = usePlayerStore.getState()
        const { setupCargos } = useCargoStore.getState()
        const { setupTargets } = useTargetStore.getState()
        setupMap(data.map)
        setPlayerPosition(data.player)
        setupCargos(data.cargos)
        setupTargets(data.targets)
    },
    _reset: () => {
        set({
            isWin: false,
            level: 1,
            _gameData: []
        })
    }
}))