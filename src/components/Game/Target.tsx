import targetImg from "../../assets/target.png";
import { usePosition } from "../../hooks/usePosition.ts";

interface TargetProps {
  x: number;
  y: number;
}

export const Target = ({ x, y }: TargetProps) => {
  const { position } = usePosition({
    x,
    y,
  });
  return (
    <div className={"absolute"} style={position}>
      <img src={targetImg} />
    </div>
  );
};
