type TileEnumType = Record<
  string,
  { id: number; name: string; isRedDora?: boolean }
>;
/**
 * 牌型枚举
 */
export const tileEnum: TileEnumType = {
  m0: { id: 0x05, name: "五", isRedDora: true },
  m1: { id: 0x01, name: "一" },
  m2: { id: 0x02, name: "二" },
  m3: { id: 0x03, name: "三" },
  m4: { id: 0x04, name: "四" },
  m5: { id: 0x05, name: "五" },
  m6: { id: 0x06, name: "六" },
  m7: { id: 0x07, name: "七" },
  m8: { id: 0x08, name: "八" },
  m9: { id: 0x09, name: "九" },

  p0: { id: 0x15, name: "⑤", isRedDora: true },
  p1: { id: 0x11, name: "①" },
  p2: { id: 0x12, name: "②" },
  p3: { id: 0x13, name: "③" },
  p4: { id: 0x14, name: "④" },
  p5: { id: 0x15, name: "⑤" },
  p6: { id: 0x16, name: "⑥" },
  p7: { id: 0x17, name: "⑦" },
  p8: { id: 0x18, name: "⑧" },
  p9: { id: 0x19, name: "⑨" },

  s0: { id: 0x25, name: "5", isRedDora: true },
  s1: { id: 0x21, name: "1" },
  s2: { id: 0x22, name: "2" },
  s3: { id: 0x23, name: "3" },
  s4: { id: 0x24, name: "4" },
  s5: { id: 0x25, name: "5" },
  s6: { id: 0x26, name: "6" },
  s7: { id: 0x27, name: "7" },
  s8: { id: 0x28, name: "8" },
  s9: { id: 0x29, name: "9" },

  z1: { id: 0x31, name: "东" },
  z2: { id: 0x32, name: "南" },
  z3: { id: 0x33, name: "西" },
  z4: { id: 0x34, name: "北" },
  z5: { id: 0x35, name: "白" },
  z6: { id: 0x36, name: "发" },
  z7: { id: 0x37, name: "中" }
};

/**
 * 牌型缩写数组
 */
export const tileEnumKeys = Object.keys(tileEnum) as TileEnumKeyType[];
/**
 * 牌型值数组
 */
export const tileEnumValues = Object.values(tileEnum);

/**
 * 牌型缩写类型
 */
export type TileEnumKeyType = keyof typeof tileEnum;
/**
 * 牌型值类型
 */
export type TileEnumValueType = typeof tileEnum[TileEnumKeyType];
