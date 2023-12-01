import { beforeEach, describe, expect, it } from "vitest";
import { usePlayerStore } from "../player.ts";
import { act, renderHook } from "@testing-library/react";

function initPlayerStore() {
  return renderHook(() => usePlayerStore());
}

describe("player store", () => {
  beforeEach(() => {
    const { result } = initPlayerStore();
    act(() => {
      result.current.reset();
    });
  });
  it("should move player left", () => {
    const { result } = initPlayerStore();
    act(() => {
      result.current.setPlayer(2, 1);
      result.current.movePlayerLeft();
    });
    expect(result.current.player.x).toBe(1);
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
      result.current.setPlayer(1, 2);
      result.current.movePlayerUp();
    });
    expect(result.current.player.y).toBe(1);
  });

  it("should move player down", () => {
    const { result } = initPlayerStore();
    act(() => {
      result.current.movePlayerDown();
    });

    expect(result.current.player.y).toBe(2);
  });

  it("should not move if there is an obstacle on the left", () => {
    const { result } = initPlayerStore();
    act(() => {
      result.current.movePlayerLeft();
    });
    expect(result.current.player.x).toBe(1);
  });

  it("should not move if there is an obstacle on the right", () => {
    const { result } = initPlayerStore();
    act(() => {
      result.current.setPlayer(6, 1);
      result.current.movePlayerRight();
    });
    expect(result.current.player.x).toBe(6);
  });

  it("should not move if there is an obstacle up", () => {
    const { result } = initPlayerStore();
    act(() => {
      result.current.movePlayerUp();
    });
    expect(result.current.player.y).toBe(1);
  });

  it("should not move if there is an obstacle down", () => {
    const { result } = initPlayerStore();
    act(() => {
      result.current.setPlayer(1, 6);
      result.current.movePlayerDown();
    });
    expect(result.current.player.y).toBe(6);
  });
});
