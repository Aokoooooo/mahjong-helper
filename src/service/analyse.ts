export const MAX_XIANG_TING = 8;

// xiangTing = 2(requiredMianZi - mianZiNum) - subMianZiNum - hasPair;
export const analyse = (code: string): number => {
  if (!code || code.trim() === "") {
    throw new Error("输入不可为空");
  }
  code = code.trim();
  const tiles = convertCodeToIntArray(code);
  // 剩余手牌数
  let leftTiles = 0;
  for (let i = 0; i < tiles.length; i += 2) {
    leftTiles += tiles[i];
  }
  let requiredMianZi = leftTiles - 2;
  if (requiredMianZi % 3 !== 0) {
    throw new Error(`手牌数量必须为3n+2,(${code})`);
  }
  // 理论需完成面子数
  requiredMianZi /= 3;
  return Math.min(MAX_XIANG_TING, getPair(tiles, requiredMianZi, leftTiles));
};

const getPair = (
  tiles: number[],
  requiredMianZi: number,
  leftTiles: number
): number => {
  let xiangTing = MAX_XIANG_TING;
  for (let i = 0; i < tiles.length; i += 2) {
    if (tiles[i] >= 2) {
      tiles[i] -= 2;
      // 先取雀头,然后取面子
      xiangTing = Math.min(
        xiangTing,
        getMianZi(tiles, requiredMianZi, true, 0, leftTiles - 2)
      );
      tiles[i] += 2;
    }
  }
  // 不取雀头,直接取面子
  xiangTing = Math.min(
    xiangTing,
    getMianZi(tiles, requiredMianZi, false, 0, leftTiles)
  );
  return xiangTing;
};

const getMianZi = (
  tiles: number[],
  requiredMianZi: number,
  hasPair: boolean,
  mianZiNum: number,
  leftTiles: number
): number => {
  let xiangTing = MAX_XIANG_TING;
  for (let i = 0; i < tiles.length; i += 2) {
    // 取刻子
    if (tiles[i] >= 3) {
      tiles[i] -= 3;
      xiangTing = Math.min(
        xiangTing,
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
        xiangTing = Math.min(
          xiangTing,
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
  xiangTing = Math.min(
    xiangTing,
    getSubMianZi(tiles, requiredMianZi, hasPair, mianZiNum, 0, leftTiles)
  );
  return xiangTing;
};

const getSubMianZi = (
  tiles: number[],
  requiredMianZi: number,
  hasPair: boolean,
  mianZiNum: number,
  subNum: number,
  leftTiles: number
): number => {
  if (mianZiNum + subNum > requiredMianZi) {
    return MAX_XIANG_TING;
  }
  let xiangTing = MAX_XIANG_TING;
  for (let i = 0; i < tiles.length; i += 2) {
    // 2张相同
    if (tiles[i] >= 2) {
      tiles[i] -= 2;
      xiangTing = Math.min(
        xiangTing,
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
        xiangTing = Math.min(
          xiangTing,
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
  xiangTing = Math.min(
    xiangTing,
    (requiredMianZi - mianZiNum) * 2 - subNum - pair
  );
  return xiangTing;
};

const convertCodeToIntArray = (code: string): number[] => {
  if (code.length % 2 !== 0) {
    throw new Error(`输入值长度必须为偶数,(${code})`);
  }
  if (!/^[1-4]+$/.test(code)) {
    throw new Error(`错误的入参 ${code},入参的每一位应为0-4`);
  }
  const array: number[] = [];
  for (const char of code) {
    const i = Number(char);
    array.push(i);
  }
  return array;
};
