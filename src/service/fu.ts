export const calculateFu = (encodedStr: string) => {
  // 七对子
  if (false) {
    return 25;
  }
  //   let fu = 20;
};

/**
 * 符数向上取整,最小单位为10
 * @param fu 符
 */
export const fuRoundUp10 = (fu: number) => {
  return (Math.floor((fu - 1) / 10) + 1) * 10;
};
