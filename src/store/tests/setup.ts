import { act, renderHook } from "@testing-library/react";
import { Map, useMapStore } from "../map.ts";
import { Position } from "../../hooks/usePosition.ts";
import { usePlayerStore } from "../player.ts";
import { Cargo, useCargoStore } from "../cargo.ts";
import { useTargetStore } from "../target.ts";

export const setupMap = (map: Map) => {
  const { result } = renderHook(() => useMapStore());
  act(() => {
    result.current.setupMap(map);
  });
};

export const setupPlayerPosition = (pos: Position) => {
  const { result } = renderHook(() => usePlayerStore());
  act(() => {
    result.current.setPlayerPosition(pos);
  });
};

export const setupCargo = (cargos: Omit<Cargo, "onTarget">[]) => {
  const { result } = renderHook(() => useCargoStore());
  act(() => {
    result.current.setupCargos(
      cargos.map((cargo) => ({ ...cargo, onTarget: false })),
    );
  });
};

export const setupTarget = (targets: Position[]) => {
  const { result } = renderHook(() => useTargetStore());
  act(() => {
    result.current.setupTargets(targets);
  });
};
