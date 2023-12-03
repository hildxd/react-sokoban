import { act, renderHook } from "@testing-library/react";
import { Map, useMapStore } from "../map.ts";
import { Position } from "../../hooks/usePosition.ts";
import { usePlayerStore } from "../player.ts";
import { Cargo, useCargoStore } from "../cargo.ts";

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

export const setupCargo = (cargos: Cargo[]) => {
  const { result } = renderHook(() => useCargoStore());
  act(() => {
    result.current.setupCargos(cargos);
  });
};
