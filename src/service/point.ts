/**
 * 计算基础点数
 * @param han 番
 * @param fu 符
 * @param yakuManTimes 役满倍数
 */
export const calculateBasePoint = (
  han: number,
  fu: number,
  yakuManTimes: number
) => {
  // 各种倍役满
  if (yakuManTimes) {
    return 8000 * yakuManTimes;
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
  const basicPoint = fu * (1 << (2 + han));
  // 是否已经满贯
  return basicPoint > 2000 ? 2000 : basicPoint;
};

/**
 * 计算荣和点数
 * @param han 番
 * @param fu 符
 * @param yakuManTimes 役满倍数
 * @param isParent 是否为亲家
 */
export const calculateRonPoint = (
  han: number,
  fu: number,
  yakuManTimes: number,
  isParent?: boolean
) => {
  const basicPoint = calculateBasePoint(han, fu, yakuManTimes);
  return isParent
    ? pointRoundUp100(basicPoint * 6)
    : pointRoundUp100(basicPoint * 4);
};

/**
 * 计算被自摸时的支付点数
 * @param han 番
 * @param fu 符
 * @param yakuManTimes 役满倍数
 */
export const calculateSumoPayPoint = (
  han: number,
  fu: number,
  yakuManTimes: number
) => {
  const basicPoint = calculateBasePoint(han, fu, yakuManTimes);
  return {
    child: pointRoundUp100(basicPoint),
    parent: pointRoundUp100(basicPoint * 2)
  };
};

/**
 * 点数向上取整,最小单位为100
 * @param point
 */
export const pointRoundUp100 = (point: number) => {
  return point === 0 ? 0 : (Math.floor((point - 1) / 100) + 1) * 100;
};
