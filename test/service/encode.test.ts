import { encode, parse } from "../../src";

describe("service-encode", () => {
  test("input params can't be null", () => {
    expect(encode).toThrow("入参不可为null");
  });
  test("encode work well", () => {
    const tileCodes = [
      "123456789m",
      "123456789p",
      "123456789s",
      "1234567z",
      "13579m",
      "13579p",
      "13579s",
      "1357z",
      "1479m",
      "1479p",
      "1479s",
      "147z",
      "1249m1249p1249s1247z",
      "11m13p",
      "111m13p",
      "1111m22p11z"
    ];
    const result = tileCodes.map(i => parse(i)).map(i => encode(i.handTiles));
    const resultShouldBe = [
      "111111111111111113",
      "111111111111111113",
      "111111111111111113",
      "13131313131313",
      "1212121213",
      "1212121213",
      "1212121213",
      "13131313",
      "13131213",
      "13131213",
      "13131213",
      "131313",
      "11121313111213131112131313131313",
      "231213",
      "331213",
      "432323"
    ];
    expect(result).toEqual(resultShouldBe);
  });
});
