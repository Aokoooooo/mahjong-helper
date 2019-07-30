import { tileEnum } from "../enum/tile";
import { Tile } from "../modal/tile";

export const isSuo = (tile: Tile) => {
  return tile.id >= tileEnum.s1.id && tile.id <= tileEnum.s9.id;
};

export const isTong = (tile: Tile) => {
  return tile.id >= tileEnum.p1.id && tile.id <= tileEnum.p9.id;
};

export const isWan = (tile: Tile) => {
  return tile.id >= tileEnum.m1.id && tile.id <= tileEnum.m9.id;
};

export const isFeng = (tile: Tile) => {
  return tile.id >= tileEnum.z1.id && tile.id <= tileEnum.z4.id;
};

export const isSanyuan = (tile: Tile) => {
  return tile.id >= tileEnum.z5.id && tile.id <= tileEnum.z7.id;
};

export const isZi = (tile: Tile) => {
  return isFeng(tile) || isSanyuan(tile);
};

const tileTypeAcronym = ["s", "m", "p", "z"];
export const isValidTileTypeAcronym = (acronym: string) => {
  return tileTypeAcronym.includes(acronym);
};
