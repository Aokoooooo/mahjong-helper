import { Hand } from "../../src";
import { getTileByCodeAndAcronym } from "../service/parse.test";

describe("modal-hand", () => {
  test("code should not be blank", () => {
    expect(Hand.fromCode).toThrow("输入不可为空");
    expect(() => Hand.fromCode("")).toThrow("输入不可为空");
  });
  test("formCode work well", () => {
    const code = "12345678999mf7777z";
    const hand = Hand.fromCode(code);
    const r = getTileByCodeAndAcronym("m", "12345678999", "z", "7777", [3]);
    expect(hand.fuluTiles).toEqual(r.fuluTiles);
    expect(hand.handTiles).toEqual(r.handTiles);
  });
  test("toCode work well", () => {
    const code = "12345678999mf7777z";
    const hand = Hand.fromCode(code);
    expect(hand.toCode()).toEqual(code);
  });
  test("sort hand work well", () => {
    const code = "12345678999mf7777z";
    const sortedHand = Hand.fromCode(code);

    const r = getTileByCodeAndAcronym("m", "21453699897", "z", "7777", [3]);
    const hand = new Hand(r.handTiles, r.fuluTiles);
    hand.sortHand();
    expect(hand).toEqual(sortedHand);
  });
});
