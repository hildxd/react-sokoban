import { Map } from "./Map.tsx";
import { Player } from "./Player.tsx";
import { Cargo } from "./Cargo.tsx";
import { useCargoStore } from "../../store/cargo.ts";

export const Game = () => {
  const { cargos } = useCargoStore();
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
