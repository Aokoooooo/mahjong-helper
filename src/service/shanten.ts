export const MAX_SHAN_TEN = 8;

/**
 * 根据特征码计算当前手牌向听数
 * 计算公式为: shanten = 2(requiredMianZi - mianZiNum) - subMianZiNum - hasPair;
 * @param encodedStr 压缩后的特征码
 */
export const calculateShanten = (encodedStr: string): number => {
  if (!encodedStr || encodedStr.trim() === "") {
    throw new Error("输入不可为空");
  }
  encodedStr = encodedStr.trim();
  const tiles = convertCodeToIntArray(encodedStr);
  // 剩余手牌数
  let leftTiles = 0;
  for (let i = 0; i < tiles.length; i += 2) {
    leftTiles += tiles[i];
  }
  let requiredMianZi = leftTiles - 2;
  if (requiredMianZi % 3 !== 0) {
    throw new Error(`手牌数量必须为3n+2,(${encodedStr})`);
  }
  // 理论需完成面子数
  requiredMianZi /= 3;

  return Math.min(
    MAX_SHAN_TEN,
    calculateBaseShanten(tiles, requiredMianZi, leftTiles),
    calculateChiitoiShanten(tiles, leftTiles)
  );
};

/**
 * 计算七对子向听数.七对子向听数 = 6-对子数+max(0,7-种类数)
 * 若无法构成这两种牌型择返回最大向听数:8
 * @param tiles 简码拆分后整型数组
 * @param leftTiles 剩余手牌数量
 */
const calculateChiitoiShanten = (tiles: number[], leftTiles: number) => {
  if (leftTiles !== 14) {
    return MAX_SHAN_TEN;
  }
  let pairNum = 0;
  const kindNum = tiles.length / 2;
  for (let i = 0; i < tiles.length; i += 2) {
    pairNum += Math.floor(tiles[i] / 2);
  }
  return 6 - pairNum + Math.max(0, 7 - kindNum);
};

/**
 * 排除七对子,国士无双,计算向听数
 * @param tiles 简码拆分后整型数组
 * @param requiredMianZi 需完成的面子数量
 * @param leftTiles 剩余手牌数量
 */
const calculateBaseShanten = (
  tiles: number[],
  requiredMianZi: number,
  leftTiles: number
): number => {
  let shanten = MAX_SHAN_TEN;
  for (let i = 0; i < tiles.length; i += 2) {
    if (tiles[i] >= 2) {
      tiles[i] -= 2;
      // 先取雀头,然后取面子
      shanten = Math.min(
        shanten,
        getMianZi(tiles, requiredMianZi, true, 0, leftTiles - 2)
      );
      tiles[i] += 2;
    }
  }
  // 不取雀头,直接取面子
  shanten = Math.min(
    shanten,
    getMianZi(tiles, requiredMianZi, false, 0, leftTiles)
  );
  return shanten;
};

/**
 * 取面子
 * @param tiles 简码拆分后整型数组
 * @param requiredMianZi 需完成的面子数量
 * @param hasPair 是否已有雀头
 * @param mianZiNum 面子数量
 * @param leftTiles 剩余手牌数量
 */
const getMianZi = (
  tiles: number[],
  requiredMianZi: number,
  hasPair: boolean,
  mianZiNum: number,
  leftTiles: number
): number => {
  let shanten = MAX_SHAN_TEN;
  for (let i = 0; i < tiles.length; i += 2) {
    // 取刻子
    if (tiles[i] >= 3) {
      tiles[i] -= 3;
      shanten = Math.min(
        shanten,
        getMianZi(tiles, requiredMianZi, hasPair, mianZiNum + 1, leftTiles - 3)
      );
      tiles[i] += 3;
    }
    // 取顺子
    if (i + 5 < tiles.length) {
      const isValidDistances = tiles[i + 1] === 1 && tiles[i + 3] === 1;
      const isValidAmount =
        tiles[i] >= 1 && tiles[i + 2] >= 1 && tiles[i + 4] >= 1;
      if (isValidAmount && isValidDistances) {
        tiles[i]--;
        tiles[i + 2]--;
        tiles[i + 4]--;
        shanten = Math.min(
          shanten,
          getMianZi(
            tiles,
            requiredMianZi,
            hasPair,
            mianZiNum + 1,
            leftTiles - 3
          )
        );
        tiles[i]++;
        tiles[i + 2]++;
        tiles[i + 4]++;
      }
    }
  }

  // 取光之后,寻找差一张的面子
  shanten = Math.min(
    shanten,
    getSubMianZi(tiles, requiredMianZi, hasPair, mianZiNum, 0, leftTiles)
  );
  return shanten;
};

/**
 * 取差一张的面子
 * @param tiles 简码拆分后整型数组
 * @param requiredMianZi 需完成的面子数量
 * @param hasPair 是否已有雀头
 * @param mianZiNum 面子数量
 * @param subNum 差一张的面子数量
 * @param leftTiles 剩余手牌数量
 */
const getSubMianZi = (
  tiles: number[],
  requiredMianZi: number,
  hasPair: boolean,
  mianZiNum: number,
  subNum: number,
  leftTiles: number
): number => {
  if (mianZiNum + subNum > requiredMianZi) {
    return MAX_SHAN_TEN;
  }
  let shanten = MAX_SHAN_TEN;
  for (let i = 0; i < tiles.length; i += 2) {
    // 2张相同
    if (tiles[i] >= 2) {
      tiles[i] -= 2;
      shanten = Math.min(
        shanten,
        getSubMianZi(
          tiles,
          requiredMianZi,
          hasPair,
          mianZiNum,
          subNum + 1,
          leftTiles - 2
        )
      );
      tiles[i] += 2;
    }
    // 不是末尾
    if (i + 3 < tiles.length) {
      const isValidDistance = tiles[i + 1] !== 3;
      const isValidAmount = tiles[i] >= 1 && tiles[i + 2] >= 1;
      //  边张,欠张,两面搭子
      if (isValidAmount && isValidDistance) {
        tiles[i]--;
        tiles[i + 2]--;
        shanten = Math.min(
          shanten,
          getSubMianZi(
            tiles,
            requiredMianZi,
            hasPair,
            mianZiNum,
            subNum + 1,
            leftTiles - 2
          )
        );
        tiles[i]++;
        tiles[i + 2]++;
      }
    }
  }

  const pair = hasPair ? 1 : 0;
  shanten = Math.min(shanten, (requiredMianZi - mianZiNum) * 2 - subNum - pair);
  return shanten;
};

/**
 * 将特征码拆分为整型数组
 * @param encodedStr 压缩后的特征码
 */
const convertCodeToIntArray = (encodedStr: string): number[] => {
  if (encodedStr.length % 2 !== 0) {
    throw new Error(`输入值长度必须为偶数,(${encodedStr})`);
  }
  if (!/^[1-4]+$/.test(encodedStr)) {
    throw new Error(`错误的入参 ${encodedStr},入参的每一位应为0-4`);
  }
  const array: number[] = [];
  for (const char of encodedStr) {
    const i = Number(char);
    array.push(i);
  }
  return array;
};
