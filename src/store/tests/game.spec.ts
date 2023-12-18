import { renderHook, waitFor, act } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { setupCargo, setupTarget } from "./setup";
import { useCargoStore } from "../cargo";
import { useGameStore } from "../game";
import { useMapStore } from "../map";
import { GameData } from "../../data/game";
import { usePlayerStore } from "../player";
import { useTargetStore } from "../target";

let firstLevelData = {
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
    cargos: [
        { x: 2, y: 2 },
        { x: 3, y: 2 },
    ],
    player: {
        x: 1,
        y: 1,
    },
    targets: [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
    ]

}

let secondLevelData = {
    map: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    cargos: [
        { x: 2, y: 2 },
        { x: 3, y: 2 },
    ],
    player: {
        x: 1,
        y: 1,
    },
    targets: [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
    ]

}

const gameData = [firstLevelData, secondLevelData]

describe("game", () => {
    beforeEach(() => {
        const { result: mapStore } = renderHook(() => useMapStore())
        act(() => {
            mapStore.current.setupMap([
                [1, 1, 1, 1, 1, 1, 1, 1],
                [1, 2, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 2, 1],
                [1, 2, 2, 2, 2, 2, 2, 1],
                [1, 1, 1, 1, 1, 1, 1, 1],
            ])
        })
    })
    afterEach(() => {
        const { result: gameStore } = renderHook(() => useGameStore())
        act(() => {
            gameStore.current._reset()
        })
    })
    it("should win with cargos on target", () => {

        const { result: gameStore } = renderHook(() => useGameStore())
        setupCargo([{
            x: 3,
            y: 1
        }])

        setupTarget([{
            x: 2,
            y: 1
        }])

        const { result: { current: { moveCargo, findCargo } } } = renderHook(() => useCargoStore())

        act(() => {
            moveCargo(findCargo({ x: 3, y: 1 })!, -1, 1)
        })

        waitFor(() => {
            gameStore.current.checkWin()
            expect(gameStore.current.isWin).toBe(true)
        })

    })

    it("should not win with cargos not all in target", () => {

        const { result: gameStore } = renderHook(() => useGameStore())
        setupCargo([{
            x: 3,
            y: 1
        }])

        setupTarget([{
            x: 2,
            y: 1
        }])

        const { result: { current: { moveCargo, findCargo } } } = renderHook(() => useCargoStore())

        act(() => {
            moveCargo(findCargo({ x: 3, y: 1 })!, 1, 1)
        })

        waitFor(() => {
            gameStore.current.checkWin()
            expect(gameStore.current.isWin).toBe(false)
        })
    })
    it("setup game data", () => {
        const { result: gameStore } = renderHook(() => useGameStore())


        act(() => {
            gameStore.current.setupGameData(gameData)
        })
        expectSetupLevelGameData(firstLevelData)
    })

    it("should change game data with next level", () => {

        const { result: gameStore } = renderHook(() => useGameStore())


        act(() => {
            gameStore.current.setupGameData([firstLevelData, secondLevelData])
            gameStore.current.setupNextLevel()
        })
        expectSetupLevelGameData(secondLevelData)
        expect(gameStore.current.level).toBe(2)
    })

    it("win status reset when enter next level", () => {
        const { result: gameStore } = renderHook(() => useGameStore())
        act(() => {
            gameStore.current.isWin = true
            gameStore.current.setupGameData(gameData)
            gameStore.current.setupNextLevel()
        })

        expect(gameStore.current.isWin).toBe(false)
    })
})

function expectSetupLevelGameData(gameData: GameData) {

    const { result: mapStore } = renderHook(() => useMapStore())
    const { result: playStore } = renderHook(() => usePlayerStore())
    const { result: cargoStore } = renderHook(() => useCargoStore())
    const { result: targetStore } = renderHook(() => useTargetStore())


    expect(mapStore.current.map).toEqual(gameData.map)
    expect(playStore.current.player).toEqual(gameData.player)
    expect(cargoStore.current.cargos.length).toEqual(gameData.cargos.length)
    expect(targetStore.current.targets).toEqual(gameData.targets)
}