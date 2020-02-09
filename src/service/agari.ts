import { tileEnum, tileEnumKeys } from "../enum/tile";
import { Hand } from "../modal/hand";
import { Tile } from "../modal/tile";
import { convertTilesToNumberArray, sortTiles } from "../utils/hand";
import { agariData } from "./agariData";

interface ICalculateAgariKeyReturnType {
  key: number;
  hand14List: number[];
}

export const calculateAgariKey = (
  hand: Hand | Tile[]
): ICalculateAgariKeyReturnType => {
  const hand34List = Array.isArray(hand)
    ? convertTilesToNumberArray(hand)
    : convertTilesToNumberArray(hand);

  let bitPosition = -1;
  let cursor = -1;
  let key = 0;

  const hand14List = new Array<number>(14);
  let hand14ListIndex = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 9; j++) {
      cursor++;
      if (hand34List[cursor] > 0) {
        hand14List[hand14ListIndex++] = cursor;

        bitPosition++;
        switch (hand34List[cursor]) {
          case 2:
            key |= 0b11 << bitPosition;
            bitPosition += 2;
            break;
          case 3:
            key |= 0b1111 << bitPosition;
            bitPosition += 4;
            break;
          case 4:
            key |= 0b111111 << bitPosition;
            bitPosition += 6;
            break;
        }
      } else {
        if (hand34List[cursor - 1]) {
          key |= 0b1 << bitPosition;
          bitPosition++;
        }
      }
    }

    if (hand34List[cursor]) {
      key |= 0b1 << bitPosition;
      bitPosition++;
    }
  }

  for (let i = 27; i < 34; i++) {
    if (hand34List[i] > 0) {
      hand14List[hand14ListIndex++] = i;

      bitPosition++;
      switch (hand34List[i]) {
        case 2:
          key |= 0b11 << bitPosition;
          bitPosition += 2;
          break;
        case 3:
          key |= 0b1111 << bitPosition;
          bitPosition += 4;
          break;
        case 4:
          key |= 0b111111 << bitPosition;
          bitPosition += 6;
          break;
      }
      key |= 0b1 << bitPosition;
      bitPosition++;
    }
  }

  return { key, hand14List };
};

export class AgariDataInfo {
  /**
   * 雀头
   */
  public readonly jantouTile: Tile;
  /**
   * 刻子集合,默认为暗刻,需结合荣和时的牌来判断
   */
  public readonly koutsuTiles: Tile[];
  /**
   * 顺子的第一张牌的数组
   */
  public readonly shuntsuFirstTiles: Tile[];

  /**
   * 是否为七对子
   */
  public readonly isChiitoi: boolean;
  /**
   * 是否为九莲宝灯
   */
  public readonly isChuurenPoutou: boolean;
  /**
   * 是否为一气贯通(未考虑副露中的牌)
   */
  public readonly isIkkitsuukan: boolean;
  /**
   * 是否为两杯口(当是两杯口是一杯口为false)
   */
  public readonly isRyanpeikou: boolean;
  /**
   * 是否为一杯口
   */
  public readonly isIipeikou: boolean;

  constructor(
    jantouTile: Tile,
    koutsuTiles: Tile[],
    shuntsuFirstTiles: Tile[],
    isChiitoi: boolean,
    isChuurenPoutou: boolean,
    isIkkitsuukan: boolean,
    isRyanpeikou: boolean,
    isIipeikou: boolean
  ) {
    this.jantouTile = jantouTile;
    this.koutsuTiles = koutsuTiles;
    this.shuntsuFirstTiles = shuntsuFirstTiles;
    this.isChiitoi = isChiitoi;
    this.isChuurenPoutou = isChuurenPoutou;
    this.isIkkitsuukan = isIkkitsuukan;
    this.isRyanpeikou = isRyanpeikou;
    this.isIipeikou = isIipeikou;
  }
}

export const getAgariDataInfo = (hand: Hand | Tile[]) => {
  if (Array.isArray(hand)) {
    hand = sortTiles(hand);
  } else {
    hand.sortTiles();
  }

  const { key, hand14List } = calculateAgariKey(hand);

  const agariHandInfo = agariData.get(key);
  if (!agariHandInfo || !agariHandInfo.length) {
    return null;
  }

  const getTileByIndex = (index: number) => {
    const acronym = tileEnumKeys.filter(
      i => tileEnum[i].id === hand14List[index] && !tileEnum[i].isRedDora
    );
    if (acronym.length !== 1) {
      throw new Error(`牌的id范围必须为0-33, ${hand14List[index]}`);
    }
    return Tile.create(acronym[0]);
  };

  const parseAgariData = (agariHandInfo: number) => {
    const jantouTile = getTileByIndex((agariHandInfo >> 6) & 0xf);

    const koutsuNum = agariHandInfo & 0x7;
    const koutsuTiles = new Array<Tile>(koutsuNum);
    for (let i = 0; i < koutsuTiles.length; i++) {
      koutsuTiles[i] = getTileByIndex((agariHandInfo >> (10 + i * 4)) & 0xf);
    }

    const shuntsuFirstTiles = new Array<Tile>((agariHandInfo >> 3) & 0x7);
    for (let i = 0; i < shuntsuFirstTiles.length; i++) {
      shuntsuFirstTiles[i] = getTileByIndex(
        (agariHandInfo >> (10 + (i + koutsuNum) * 4)) & 0xf
      );
    }

    return new AgariDataInfo(
      jantouTile,
      koutsuTiles,
      shuntsuFirstTiles,
      !!(agariHandInfo & (1 << 26)),
      !!(agariHandInfo & (1 << 27)),
      !!(agariHandInfo & (1 << 28)),
      !!(agariHandInfo & (1 << 29)),
      !!(agariHandInfo & (1 << 30))
    );
  };

  return agariHandInfo.map(i => parseAgariData(i));
};
