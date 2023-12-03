import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useMapStore } from "../map.ts";

describe("map", () => {
  it("setup map", () => {
    const { result } = renderHook(() => useMapStore());
    const newMap = [
      [2, 2, 2],
      [2, 2, 2],
    ];
    act(() => {
      result.current.setupMap(newMap);
    });
    expect(result.current.map).toEqual(newMap);
  });
});
