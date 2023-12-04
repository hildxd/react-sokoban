import { Map } from "./Map.tsx";
import { Player } from "./Player.tsx";
import { Cargo } from "./Cargo.tsx";
import { useCargoStore } from "../../store/cargo.ts";
import { useEffect } from "react";

export const Game = () => {
  const { cargos, setupCargos } = useCargoStore();
  useEffect(() => {
    setupCargos([
      { x: 2, y: 2 },
      { x: 3, y: 2 },
    ]);
  }, []);
  return (
    <div className={"relative"}>
      <Map />
      <Player />
      {cargos.map((cargo, index) => (
        <Cargo key={index} x={cargo.x} y={cargo.y} />
      ))}
    </div>
  );
};
