import { renderHook, waitFor, act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { setupCargo, setupTarget } from "./setup";
import { useCargoStore } from "../cargo";
import { useGameStore } from "../game";
import { useMapStore } from "../map";
import { gameData } from "../../data/game";
import { usePlayerStore } from "../player";
import { useTargetStore } from "../target";

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
        const { result: mapStore } = renderHook(() => useMapStore())
        const { result: playStore } = renderHook(() => usePlayerStore())
        const { result: cargoStore } = renderHook(() => useCargoStore())
        const { result: targetStore } = renderHook(() => useTargetStore())

        act(() => {
            gameStore.current.setupGameData(gameData)
        })

        expect(mapStore.current.map).toEqual(gameData.map)
        expect(playStore.current.player).toEqual(gameData.player)
        expect(cargoStore.current.cargos.length).toEqual(gameData.cargos.length)
        expect(targetStore.current.targets).toEqual(gameData.targets)
    })
})