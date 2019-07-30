import { isEmpty, sortBy } from "lodash";
import { Tile } from "../modal/tile";
import { isZi } from "../utils/tile";

export const encode = (tiles: Tile[]): string => {
  if (isEmpty(tiles)) {
    throw new Error("入参不可为空");
  }
  tiles = sortBy(tiles, ["id"]);
  const quantities: number[] = [];
  const distances: number[] = [];
  let index = 0;
  for (let i = 0; i < tiles.length; i++) {
    quantities.push(1);
    let diff = 3;
    // 如果已经是最后一张牌,写入距离3
    if (i === tiles.length - 1) {
      distances.push(diff);
      break;
    }

    diff = calculateDiff(tiles[i], tiles[i + 1]);
    // 写入距离
    switch (diff) {
      case 0: {
        // 距离为0,即为同种手牌,数量+1
        quantities[index] = quantities[index] + 1;
        i++;
        // 过滤后续所有同种手牌
        for (let j = i + 1; j < tiles.length; j++) {
          diff = calculateDiff(tiles[i], tiles[j]);
          if (diff === 0) {
            // 同种手牌,数量+1
            quantities[index] = quantities[index] + 1;
            i++;
          } else {
            // 不是同种手牌,写入两张牌之间的距离
            distances.push(diff);
            index++;
            i = j - 1;
            break;
          }
        }
        break;
      }
      case 1: {
        distances.push(1);
        index++;
        break;
      }
      case 2: {
        distances.push(2);
        index++;
        break;
      }
      default: {
        distances.push(3);
        index++;
        break;
      }
    }
  }
  index = 0;
  let featureCode = "";
  for (const i of quantities) {
    featureCode += i;
    if (index < distances.length) {
      featureCode += distances[index++];
    }
  }
  return featureCode;
};

const calculateDiff = (firstTile: Tile, nextTile: Tile): number => {
  let diff = 3;
  if (isZi(firstTile)) {
    diff = nextTile.id - firstTile.id === 0 ? 0 : 3;
  } else {
    diff = nextTile.id - firstTile.id;
    diff = diff >= 3 ? 3 : diff;
    diff = diff < 0 ? 0 : diff;
  }
  return diff;
};
