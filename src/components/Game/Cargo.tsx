import cargoImg from "../../assets/cargo.png";
import cargoOnTargetImg from "../../assets/cargo_on_target.png";
import { usePosition } from "../../hooks/usePosition.ts";

interface CargoProps {
  x: number;
  y: number;
  onTarget: boolean;
}

export const Cargo = ({ x, y, onTarget }: CargoProps) => {
  const { position } = usePosition({
    x,
    y,
  });
  return (
    <div className={"absolute"} style={position}>
      <img src={onTarget ? cargoOnTargetImg : cargoImg} />
    </div>
  );
};
