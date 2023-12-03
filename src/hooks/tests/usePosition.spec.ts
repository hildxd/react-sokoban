import { describe, expect, it } from "vitest";
import { act, renderHook, waitFor } from "@testing-library/react";
import { usePosition } from "../usePosition.ts";
import { useState } from "react";

describe("usePosition", () => {
  it("should return position", () => {
    const pos = {
      x: 2,
      y: 2,
    };
    const { result } = renderHook(() => usePosition(pos));
    const position = {
      left: "64px",
      top: "64px",
    };
    expect(result.current.position).toEqual(position);
  });

  it("should return position when reactive data changed", async () => {
    const {
      result: {
        current: [pos, setPost],
      },
    } = renderHook(() =>
      useState({
        x: 2,
        y: 2,
      }),
    );
    const { result } = renderHook(() => usePosition(pos));
    act(() => {
      setPost({
        x: 1,
        y: 2,
      });
    });
    const position = {
      left: "32px",
      top: "64px",
    };
    waitFor(() => {
      expect(result.current.position).toEqual(position);
    });
  });
});
