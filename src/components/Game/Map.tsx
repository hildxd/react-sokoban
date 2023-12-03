import { MapTile, useMapStore } from "../../store/map.ts";

const IMAGES = {
  [MapTile.WALL]: new URL("../../assets/wall.png", import.meta.url).href,
  [MapTile.FLOOR]: new URL("../../assets/floor.png", import.meta.url).href,
};
export const Map = () => {
  const { map: mapData } = useMapStore();
  return (
    <>
      {mapData.map((row, index) => {
        return (
          <div className={"flex"} key={index}>
            {row.map((col, index) => {
              return (
                <img src={IMAGES[col as keyof typeof IMAGES]} key={index} />
              );
            })}
          </div>
        );
      })}
    </>
  );
};
