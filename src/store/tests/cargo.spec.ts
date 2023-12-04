import { beforeAll, describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { Cargo, useCargoStore } from "../cargo.ts";
import {
  setupCargo,
  setupMap,
  setupPlayerPosition,
  setupTarget,
} from "./setup.ts";
import { usePlayerStore } from "../player.ts";

describe("cargo store", () => {
  it("setup cargos", () => {
    const { result } = renderHook(() => useCargoStore());
    const newCargos: Cargo[] = [
      {
        x: 1,
        y: 1,
        onTarget: false,
      },
    ];
    act(() => {
      result.current.setupCargos(newCargos);
    });
    expect(result.current.cargos).toEqual(newCargos);
  });

  describe("collision wall or cargo", () => {
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
    it("should not move if there is an wall", () => {
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
    it("should not move if there is an cargo", () => {
      setupPlayerPosition({
        x: 2,
        y: 1,
      });
      setupCargo([
        {
          x: 3,
          y: 1,
        },
        {
          x: 4,
          y: 1,
        },
      ]);
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerRight();
      });
      expect(playerStore.current.player.x).toBe(2);
      expect(cargoStore.current.cargos[0].x).toBe(3);
    });
  });

  describe("on target", () => {
    it("in", () => {
      setupCargo([
        {
          x: 1,
          y: 1,
        },
      ]);
      setupTarget([
        {
          x: 2,
          y: 1,
        },
      ]);

      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        cargoStore.current.moveCargo(cargoStore.current.cargos[0], 1, 0);
      });
      expect(cargoStore.current.cargos[0].onTarget).toBe(true);
    });
    it("out", () => {
      setupCargo([
        {
          x: 1,
          y: 1,
        },
      ]);
      setupTarget([
        {
          x: 2,
          y: 1,
        },
      ]);

      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        cargoStore.current.moveCargo(cargoStore.current.cargos[0], 2, 0);
      });
      expect(cargoStore.current.cargos[0].onTarget).toBe(false);
    });
  });
});
