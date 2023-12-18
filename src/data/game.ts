import { Position } from "../hooks/usePosition";
import { type Map } from "../store/map";

export interface GameData {
    map: Map
    cargos: Position[]
    player: Position
    targets: Position[]
}

let firstLevelData = {
    map: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    cargos: [
        { x: 2, y: 2 },
        { x: 3, y: 2 },
    ],
    player: {
        x: 1,
        y: 1,
    },
    targets: [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
    ]

}

let secondLevelData = {
    map: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 2, 2, 2, 2, 2, 1, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 2, 2, 2, 2, 2, 2, 1],
        [1, 1, 2, 2, 2, 2, 2, 1],
        [1, 1, 1, 1, 1, 1, 1, 1],
    ],
    cargos: [
        { x: 2, y: 2 },
        { x: 3, y: 2 },
    ],
    player: {
        x: 1,
        y: 1,
    },
    targets: [
        { x: 5, y: 5 },
        { x: 5, y: 6 },
    ]

}

export const gameData: GameData[] = [firstLevelData, secondLevelData]
