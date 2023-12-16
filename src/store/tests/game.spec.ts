import { renderHook, waitFor, act } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { setupCargo, setupTarget } from "./setup";
import { useCargoStore } from "../cargo";
import { useGameStore } from "../game";

describe("game", () => {
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
})