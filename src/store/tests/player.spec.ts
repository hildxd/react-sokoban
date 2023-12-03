import { beforeEach, describe, expect, it } from "vitest";
import { usePlayerStore } from "../player.ts";
import { act, renderHook } from "@testing-library/react";
import { useMapStore } from "../map.ts";

function initPlayerStore() {
  return renderHook(() => usePlayerStore());
}

describe("player store", () => {
  describe("base move", () => {
    beforeEach(() => {
      const { result } = initPlayerStore();
      const map = renderHook(() => useMapStore());
      act(() => {
        map.result.current.setupMap([
          [2, 2, 2],
          [2, 2, 2],
          [2, 2, 2],
        ]);
        result.current.reset();
      });
    });
    it("should move player left", () => {
      const { result } = initPlayerStore();
      act(() => {
        result.current.movePlayerLeft();
      });
      expect(result.current.player.x).toBe(0);
    });

    it("should move player right", () => {
      const { result } = initPlayerStore();
      act(() => {
        result.current.movePlayerRight();
      });
      expect(result.current.player.x).toBe(2);
    });

    it("should move player up", () => {
      const { result } = initPlayerStore();
      act(() => {
        result.current.movePlayerUp();
      });
      expect(result.current.player.y).toBe(0);
    });

    it("should move player down", () => {
      const { result } = initPlayerStore();
      act(() => {
        result.current.movePlayerDown();
      });

      expect(result.current.player.y).toBe(2);
    });
  });

  describe("collision wall", () => {
    beforeEach(() => {
      const { result } = renderHook(() => useMapStore());
      result.current.setupMap([
        [1, 1, 1],
        [1, 2, 1],
        [1, 1, 1],
      ]);
    });
    it("should not move if there is an wall on the left", () => {
      const { result } = initPlayerStore();
      act(() => {
        result.current.movePlayerLeft();
      });
      expect(result.current.player.x).toBe(1);
    });

    it("should not move if there is an wall on the right", () => {
      const { result } = initPlayerStore();
      act(() => {
        result.current.movePlayerRight();
      });
      expect(result.current.player.x).toBe(1);
    });

    it("should not move if there is an wall up", () => {
      const { result } = initPlayerStore();
      act(() => {
        result.current.movePlayerUp();
      });
      expect(result.current.player.y).toBe(1);
    });

    it("should not move if there is an wall down", () => {
      const { result } = initPlayerStore();
      act(() => {
        result.current.movePlayerDown();
      });
      expect(result.current.player.y).toBe(1);
    });
  });
});
