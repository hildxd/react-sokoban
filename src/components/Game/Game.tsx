import { Map } from "./Map.tsx";
import { Player } from "./Player.tsx";
import { Cargo } from "./Cargo.tsx";
import { useCargoStore } from "../../store/cargo.ts";
import { useEffect } from "react";
import { useTargetStore } from "../../store/target.ts";
import { Target } from "./Target.tsx";
import { useGameStore } from "../../store/game.ts";
import { gameData } from "../../data/game.ts";

export const Game = () => {
  const { cargos } = useCargoStore();
  const { targets } = useTargetStore();
  const { isWin, setupGameData } = useGameStore()
  useEffect(() => {
    setupGameData(gameData)
  }, []);

  return (
    <div className={"relative"}>
      <Map />
      {targets.map((target, index) => (
        <Target key={index} x={target.x} y={target.y} />
      ))}
      <Player />
      {cargos.map((cargo, index) => (
        <Cargo key={index} {...cargo} />
      ))}
      {isWin && <button>下一关</button>}
    </div>
  );
};
