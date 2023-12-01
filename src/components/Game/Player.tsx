import playerImg from "../../assets/keeper.png";
import React from "react";
import { usePlayerStore } from "../../store/player.ts";

const usePosition = () => {
  const SETP = 32;
  const { player } = usePlayerStore();
  return React.useMemo(
    () => ({
      left: player.x * SETP + "px",
      top: player.y * SETP + "px",
    }),
    [player],
  );
};

const useMove = () => {
  const { movePlayerLeft, movePlayerDown, movePlayerRight, movePlayerUp } =
    usePlayerStore();
  const handler = (e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowUp":
        movePlayerUp();
        break;
      case "ArrowDown":
        movePlayerDown();
        break;
      case "ArrowLeft":
        movePlayerLeft();
        break;
      case "ArrowRight":
        movePlayerRight();
        break;
    }
  };

  React.useEffect(() => {
    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);
};

export const Player = () => {
  const position = usePosition();
  useMove();

  return (
    <div className={"absolute"} style={position}>
      <img src={playerImg} alt="" />
    </div>
  );
};
