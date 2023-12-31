import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import { usePlayerStore } from "../player.ts";
import { act, renderHook } from "@testing-library/react";
import { useCargoStore } from "../cargo.ts";
import { setupCargo, setupMap, setupPlayerPosition } from "./setup.ts";

describe("player store", () => {
  describe("base move", () => {
    beforeEach(() => {
      const { result } = renderHook(() => usePlayerStore());
      setupMap([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ]);
      act(() => {
        result.current.reset();
      });
    });
    it("should move player left", () => {
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerLeft();
      });
      expect(result.current.player.x).toBe(0);
    });

    it("should move player right", () => {
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerRight();
      });
      expect(result.current.player.x).toBe(2);
    });

    it("should move player up", () => {
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerUp();
      });
      expect(result.current.player.y).toBe(0);
    });

    it("should move player down", () => {
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerDown();
      });

      expect(result.current.player.y).toBe(2);
    });
  });

  describe("collision wall", () => {
    beforeEach(() => {
      setupMap([
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1],
      ]);
    });
    it("should not move if there is an wall on the left", () => {
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerLeft();
      });
      expect(result.current.player.x).toBe(1);
    });

    it("should not move if there is an wall on the right", () => {
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerRight();
      });
      expect(result.current.player.x).toBe(1);
    });

    it("should not move if there is an wall up", () => {
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerUp();
      });
      expect(result.current.player.y).toBe(1);
    });

    it("should not move if there is an wall down", () => {
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerDown();
      });
      expect(result.current.player.y).toBe(1);
    });
  });

  describe("move cargo", () => {
    beforeAll(() => {
      setupMap([
        [2, 2, 2],
        [2, 2, 2],
        [2, 2, 2],
      ]);
    });
    it("should move cargo left", () => {
      // setup test data
      setupPlayerPosition({
        x: 2,
        y: 0,
      });
      setupCargo([
        {
          x: 1,
          y: 0,
        },
      ]);
      // run test
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerLeft();
      });
      expect(cargoStore.current.cargos[0].x).toEqual(0);
      expect(playerStore.current.player).toEqual({
        x: 1,
        y: 0,
      });
    });

    it("should move cargo right", () => {
      // setup test data
      setupCargo([
        {
          x: 1,
          y: 0,
        },
      ]);
      setupPlayerPosition({
        x: 0,
        y: 0,
      });
      // run test
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerRight();
      });
      expect(cargoStore.current.cargos[0].x).toEqual(2);
      expect(playerStore.current.player).toEqual({
        x: 1,
        y: 0,
      });
    });
    it("should move cargo up", () => {
      // setup test data
      setupCargo([
        {
          x: 0,
          y: 1,
        },
      ]);
      setupPlayerPosition({
        x: 0,
        y: 2,
      });
      // run test
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerUp();
      });
      expect(cargoStore.current.cargos[0].y).toEqual(0);
      expect(playerStore.current.player).toEqual({
        x: 0,
        y: 1,
      });
    });
    it("should move cargo down", () => {
      // setup test data
      setupCargo([
        {
          x: 0,
          y: 1,
        },
      ]);
      setupPlayerPosition({
        x: 0,
        y: 0,
      });
      // run test
      const { result: playerStore } = renderHook(() => usePlayerStore());
      const { result: cargoStore } = renderHook(() => useCargoStore());
      act(() => {
        playerStore.current.movePlayerDown();
      });
      expect(cargoStore.current.cargos[0].y).toEqual(2);
      expect(playerStore.current.player).toEqual({
        x: 0,
        y: 1,
      });
    });
  });
  describe("fix errors", () => {
    it("can't move to last floor", () => {
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
      setupPlayerPosition({
        x: 1,
        y: 2,
      });
      setupCargo([{ x: 5, y: 5 }]);
      const { result } = renderHook(() => usePlayerStore());
      act(() => {
        result.current.movePlayerUp();
      });
      expect(result.current.player.y).toBe(1);
    });
  });
});
