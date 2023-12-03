import { describe, expect, it } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { Cargo, useCargoStore } from "../cargo.ts";

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
});
