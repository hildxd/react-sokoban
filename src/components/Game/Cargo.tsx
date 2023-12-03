import cargoImg from "../../assets/cargo.png";
import { usePosition } from "../../hooks/usePosition.ts";

interface CargoProps {
  x: number;
  y: number;
}

export const Cargo = ({ x, y }: CargoProps) => {
  const { position } = usePosition({
    x,
    y,
  });
  return (
    <div className={"absolute"} style={position}>
      <img src={cargoImg} />
    </div>
  );
};
