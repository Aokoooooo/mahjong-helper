import orderBy from "lodash/orderBy";
import { Hand, Suggest, suggest, Tile, CheckYakuReturenType } from "../../src";
import { sortDiscardFn } from "../../src/service/suggest";
import { Player } from "../../src/modal/player";

describe("service-suggest", () => {
  test("input params can't be null", () => {
    expect(suggest).toThrow("输入不可为空");
  });
  test("suggest work well", () => {
    const codes: ICodes = {
      "-1": [
        { key: "234444m22p123s666z", value: null },
        { key: "11sf123m 456m 123p 456p", value: null },
        { key: "12344sf123m 456m 123p", value: null },
        { key: "11155mf1111p 111z 222z", value: null }
      ],
      "0": [
        {
          key: "45sf123m 456m 123s 456s",
          value: [
            { key: Tile.create("s4"), value: 2 },
            { key: Tile.create("s5"), value: 2 }
          ]
        },
        {
          key: "12pf111p 123m 456m 789m",
          value: [{ key: Tile.create("p1"), value: 3 }]
        },
        { key: "35zf333z 555z 123p 456p", value: [] }
      ],
      "1": [
        {
          key: "123357m6678p2256s",
          value: [
            { key: Tile.create("m3"), value: 12 },
            { key: Tile.create("m7"), value: 12 },
            { key: Tile.create("p6"), value: 16 }
          ]
        },
        {
          key: "36s116zf123p 456p 789p",
          value: [
            { key: Tile.create("s3"), value: 24 },
            { key: Tile.create("s6"), value: 24 },
            { key: Tile.create("z6"), value: 32 }
          ]
        },
        {
          key: "22346zf333z 444z 7777z",
          value: [
            { key: Tile.create("z3"), value: 5 },
            { key: Tile.create("z4"), value: 5 },
            { key: Tile.create("z6"), value: 2 }
          ]
        },
        {
          key: "44m58s6zf123s 456s 789s",
          value: [
            { key: Tile.create("s5"), value: 16 },
            { key: Tile.create("s8"), value: 19 },
            { key: Tile.create("z6"), value: 21 }
          ]
        }
      ],
      "2": [
        {
          key: "444m147p14sf123s 123m",
          value: [
            { key: Tile.create("p1"), value: 49 },
            { key: Tile.create("p4"), value: 49 },
            { key: Tile.create("p7"), value: 41 },
            { key: Tile.create("s1"), value: 50 },
            { key: Tile.create("s4"), value: 41 }
          ]
        },
        {
          key: "123s467z15pf123m 456m",
          value: [
            { key: Tile.create("p1"), value: 28 },
            { key: Tile.create("p5"), value: 20 },
            { key: Tile.create("z4"), value: 32 },
            { key: Tile.create("z6"), value: 32 },
            { key: Tile.create("z7"), value: 32 }
          ]
        }
      ],
      "3": [
        {
          key: "147m147p11sf123s 456s",
          value: [
            {
              key: Tile.create("m1"),
              value: 64
            },
            {
              key: Tile.create("m4"),
              value: 64
            },
            {
              key: Tile.create("m7"),
              value: 56
            },
            {
              key: Tile.create("p1"),
              value: 64
            },
            {
              key: Tile.create("p4"),
              value: 64
            },
            {
              key: Tile.create("p7"),
              value: 56
            }
          ]
        },
        {
          key: "1223456z1pf111z 111p",
          value: [
            { key: Tile.create("p1"), value: 14 },
            { key: Tile.create("z1"), value: 22 },
            { key: Tile.create("z3"), value: 19 },
            { key: Tile.create("z4"), value: 19 },
            { key: Tile.create("z5"), value: 19 },
            { key: Tile.create("z6"), value: 19 }
          ]
        },
        {
          key: "111m17p147s114zf2222s",
          value: [
            { key: Tile.create("p1"), value: 53 },
            { key: Tile.create("p7"), value: 45 },
            { key: Tile.create("s1"), value: 61 },
            { key: Tile.create("s4"), value: 61 },
            { key: Tile.create("s7"), value: 53 },
            { key: Tile.create("z4"), value: 61 }
          ]
        },
        {
          key: "347m147p145s11zf777z",
          value: [
            { key: Tile.create("m7"), value: 58 },
            { key: Tile.create("p1"), value: 70 },
            { key: Tile.create("p4"), value: 70 },
            { key: Tile.create("p7"), value: 62 },
            { key: Tile.create("s1"), value: 66 }
          ]
        }
      ]
      // "4": [
      //   "147m147p14s",
      //   "1234567z1p",
      //   "127m147p147s11z",
      //   "347m147p147s11z",
      //   "146m147p147s11z"
      // ],
      // "5": [
      //   "147m147p147s11z",
      //   "258m228p12345z",
      //   "458m258p12345z",
      //   "248m258p12345z",
      //   "128m258p12345z",
      //   "1238m258p2234567z"
      // ],
      // "6": ["147m147p147s14z", "258m258p12345z", "1238m258p1234567z"],
      // "7": ["117m147p147s12345z", "145m147p147s12345z", "146m147p147s12345z"],
      // "8": ["147m147p147s12345z", "1234567z259m259p6s"]
    };
    Object.keys(codes).forEach(xiangTing => {
      codes[xiangTing].forEach(i => {
        const result = suggest(
          Player.create(Hand.fromCode(i.key), {
            roundWindTile: Tile.create("z1"),
            selfWindTile: Tile.create("z2")
          })
        );
        expect(reformatResult(result)).toEqual(
          i.value ? sortReformatedCodeItem(i.value) : i.value
        );
      });
    });
  });
});

const reformatResult = (suggests: Suggest[] | CheckYakuReturenType) => {
  return Array.isArray(suggests)
    ? suggests.map(
        (i): IReformatedCodeItem => {
          return {
            key: i.discard,
            value: i.count
          };
        }
      )
    : suggests;
};

const sortReformatedCodeItem = (items: IReformatedCodeItem[]) => {
  return orderBy(items, ["value", v => sortDiscardFn(v.key)], ["desc", "desc"]);
};

interface ICodes {
  [key: string]: ICodeItem[];
}

interface ICodeItem {
  key: string;
  value: IReformatedCodeItem[] | null;
}

interface IReformatedCodeItem {
  key: Tile;
  value: number;
}
