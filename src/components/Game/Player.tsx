import playerImg from "../../assets/keeper.png";
import React from "react";
import { usePlayerStore } from "../../store/player.ts";
import { usePosition } from "../../hooks/usePosition.ts";

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
  const { player } = usePlayerStore();
  const { position } = usePosition(player);
  useMove();

  return (
    <div className={"absolute"} style={position}>
      <img src={playerImg} alt="" />
    </div>
  );
};
