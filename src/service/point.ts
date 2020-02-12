/**
 * 计算基础点数
 * @param han 番
 * @param fu 符
 * @param yakumanTimes 役满倍数
 */
export const calculateBasePoint = (
  han: number,
  fu: number,
  yakumanTimes: number
) => {
  // 各种倍役满
  if (yakumanTimes) {
    return 8000 * yakumanTimes;
  }
  // 累计役满
  if (han >= 13) {
    return 8000;
  }
  // 三倍满
  if (han >= 11) {
    return 6000;
  }
  // 倍满
  if (han >= 8) {
    return 4000;
  }
  // 跳满
  if (han >= 6) {
    return 3000;
  }
  // 满贯
  if (han === 5) {
    return 2000;
  }
  // 算符
  const basicPoint = fu * Math.pow(2, 2 + han);
  // 是否已经满贯
  return basicPoint > 2000 ? 2000 : basicPoint;
};

/**
 * 计算荣和点数
 * @param han 番
 * @param fu 符
 * @param yakumanTimes 役满倍数
 */
export const calculateRonPoint = (
  han: number,
  fu: number,
  yakumanTimes: number
) => {
  const basicPoint = calculateBasePoint(han, fu, yakumanTimes);
  return {
    child: pointRoundUp100(basicPoint * 4),
    parent: pointRoundUp100(basicPoint * 6)
  };
};

/**
 * 计算被自摸时的支付点数
 * @param han 番
 * @param fu 符
 * @param yakumanTimes 役满倍数
 */
export const calculateTsumoPoint = (
  han: number,
  fu: number,
  yakumanTimes: number
) => {
  const basicPoint = calculateBasePoint(han, fu, yakumanTimes);
  const point = {
    child: pointRoundUp100(basicPoint),
    parent: pointRoundUp100(basicPoint * 2)
  };
  return {
    ...point,
    childGet: 2 * point.child + point.parent,
    parentGet: 3 * point.parent
  };
};

/**
 * 计算当前手牌对应的和牌点数,包含自摸,被自摸,荣和,是否为亲家,各种结果
 * @param han 番
 * @param fu 符
 * @param yakumanTimes 役满倍数
 */
export const calculatePoint = (
  han: number,
  fu: number,
  yakumanTimes: number
) => {
  const tsumo = calculateTsumoPoint(han, fu, yakumanTimes);
  const ron = calculateRonPoint(han, fu, yakumanTimes);
  return { tsumo, ron };
};

/**
 * 点数向上取整,最小单位为100
 * @param point
 */
export const pointRoundUp100 = (point: number) => {
  return point === 0 ? 0 : (Math.floor((point - 1) / 100) + 1) * 100;
};
