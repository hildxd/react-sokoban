import {Map} from "./Map.tsx";
import {Player} from "./Player.tsx";

export const Game = () => {
  return (
    <div className={"relative"}>
      <Map/>
      <Player />
    </div>
  )
}