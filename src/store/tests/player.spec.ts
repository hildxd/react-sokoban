import { afterEach, describe, expect, it } from "vitest";
import { usePlayerStore } from "../player.ts";
import { act, renderHook } from "@testing-library/react";

function initPlayerStore() {
  return renderHook(() => usePlayerStore());
}

describe("player store", () => {
  afterEach(() => {
    const { result } = initPlayerStore();
    act(() => {
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
