import { Map } from "./Map.tsx";
import { Player } from "./Player.tsx";
import { Cargo } from "./Cargo.tsx";
import { useCargoStore } from "../../store/cargo.ts";
import { useEffect } from "react";
import { useTargetStore } from "../../store/target.ts";
import { Target } from "./Target.tsx";

export const Game = () => {
  const { cargos, setupCargos } = useCargoStore();
  const { targets, setupTargets } = useTargetStore();
  useEffect(() => {
    setupCargos([
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ]);
    setupTargets([
      { x: 5, y: 5 },
      { x: 5, y: 6 },
    ]);
  }, []);

  return (
    <div className={"relative"}>
      <Map />
      <Player />
      {cargos.map((cargo, index) => (
        <Cargo key={index} x={cargo.x} y={cargo.y} />
      ))}
      {targets.map((target, index) => (
        <Target key={index} x={target.x} y={target.y} />
      ))}
    </div>
  );
};
