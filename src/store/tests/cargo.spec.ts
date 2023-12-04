import { beforeAll, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { Cargo, useCargoStore } from "../cargo.ts";
import { setupCargo, setupMap, setupPlayerPosition } from "./setup.ts";
import { usePlayerStore } from "../player.ts";

describe("cargo store", () => {
  it("setup cargos", () => {
    const { result } = renderHook(() => useCargoStore());
    const newCargos: Cargo[] = [
      {
        x: 1,
        y: 1,
      },
    ];
    act(() => {
      result.current.setupCargos(newCargos);
    });
    expect(result.current.cargos).toEqual(newCargos);
  });

  describe("collision wall", () => {
    beforeAll(() => {
      setupMap([
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
      ]);
    });

    it("should not move if there is an wall on the left", () => {
      setupPlayerPosition({
        x: 2,
        y: 1,
      });
      setupCargo([
        {
          x: 1,
          y: 1,
        },
      ]);
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerLeft();
      });
      expect(playerStore.current.player.x).toBe(2);
      expect(cargoStore.current.cargos[0].x).toBe(1);
    });

    it("should not move if there is an wall on the right", () => {
      setupPlayerPosition({
        x: 5,
        y: 1,
      });
      setupCargo([
        {
          x: 6,
          y: 1,
        },
      ]);
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerRight();
      });
      expect(playerStore.current.player.x).toBe(5);
      expect(cargoStore.current.cargos[0].x).toBe(6);
    });

    it("should not move if there is an wall on the up", () => {
      setupPlayerPosition({
        x: 2,
        y: 2,
      });
      setupCargo([
        {
          x: 2,
          y: 1,
        },
      ]);
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerUp();
      });
      expect(playerStore.current.player.y).toBe(2);
      expect(cargoStore.current.cargos[0].y).toBe(1);
    });

    it("should not move if there is an wall on the down", () => {
      setupPlayerPosition({
        x: 1,
        y: 5,
      });
      setupCargo([
        {
          x: 1,
          y: 6,
        },
      ]);
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerDown();
      });
      expect(playerStore.current.player.y).toBe(5);
      expect(cargoStore.current.cargos[0].y).toBe(6);
    });
  });
});
