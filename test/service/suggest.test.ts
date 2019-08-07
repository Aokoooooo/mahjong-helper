import { orderBy } from "lodash";
import { suggest } from "../../src/service/suggest";
import { Hand } from "../../src/modal/hand";
import { Tile } from "../../src/modal/tile";
import { Suggest } from "../../src/modal/suggest";

describe("service-suggest", () => {
  test("input params can't be null", () => {
    expect(suggest).toThrow("输入不可为空");
  });
  test("suggest work well", () => {
    const codes: ICodes = {
      "-1": [
        { key: "234444m22p123s666z", value: "荣和" },
        { key: "11sf123456m123456p", value: "荣和" },
        { key: "12344sf123456m123p", value: "荣和" },
        { key: "11155mf1111p111222z", value: "荣和" }
      ],
      "0": [
        {
          key: "45sf123456m123456s",
          value: [
            { key: Tile.create("s4"), value: 2 },
            { key: Tile.create("s5"), value: 2 }
          ]
        },
        {
          key: "12pf111p123456789m",
          value: [{ key: Tile.create("p1"), value: 3 }]
        },
        { key: "35zf333555z123456p", value: [] }
      ],
      "1": [
        {
          key: "36s116zf123456789p",
          value: [
            { key: Tile.create("s3"), value: 24 },
            { key: Tile.create("s6"), value: 24 },
            { key: Tile.create("z6"), value: 32 }
          ]
        },
        {
          key: "22346zf3334447777z",
          value: [
            { key: Tile.create("z3"), value: 5 },
            { key: Tile.create("z4"), value: 5 },
            { key: Tile.create("z6"), value: 2 }
          ]
        },
        {
          key: "44m58s6zf123456789s",
          value: [
            { key: Tile.create("s5"), value: 16 },
            { key: Tile.create("s8"), value: 19 },
            { key: Tile.create("z6"), value: 21 }
          ]
        }
      ],
      "2": [
        {
          key: "444m147p14sf123s123m",
          value: [
            { key: Tile.create("p1"), value: 49 },
            { key: Tile.create("p4"), value: 49 },
            { key: Tile.create("p7"), value: 41 },
            { key: Tile.create("s1"), value: 50 },
            { key: Tile.create("s4"), value: 41 }
          ]
        },
        {
          key: "123s467z15pf123456m",
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
          key: "147m147p11sf123456s",
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
          key: "1223456z1pf111z111p",
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
          key: "347m147p145s11zf258p",
          value: [
            { key: Tile.create("m7"), value: 55 },
            { key: Tile.create("p1"), value: 67 },
            { key: Tile.create("p4"), value: 67 },
            { key: Tile.create("p7"), value: 60 },
            { key: Tile.create("s1"), value: 63 }
          ]
        }
      ]
      //   "4": [
      //     "147m147p14s",
      //     "1234567z1p",
      //     "127m147p147s11z",
      //     "347m147p147s11z",
      //     "146m147p147s11z"
      //   ],
      //   "5": [
      //     "147m147p147s11z",
      //     "258m228p12345z",
      //     "458m258p12345z",
      //     "248m258p12345z",
      //     "128m258p12345z",
      //     "1238m258p2234567z"
      //   ],
      //   "6": ["147m147p147s14z", "258m258p12345z", "1238m258p1234567z"],
      //   "7": ["117m147p147s12345z", "145m147p147s12345z", "146m147p147s12345z"],
      //   "8": ["147m147p147s12345z", "1234567z259m259p6s"]
    };
    Object.keys(codes).forEach(xiangTing => {
      codes[xiangTing].forEach(i => {
        const result = suggest(Hand.fromCode(i.key));
        if (typeof result === "string") {
          expect(result).toEqual(i.value);
        } else {
          expect(reformatResult(result)).toEqual(i.value);
        }
      });
    });
  });
});

const reformatResult = (suggests: Suggest[]) => {
  return orderBy(suggests, ["discard.id"]).map(
    (i): IReformatedCodeItem => {
      return {
        key: i.discard,
        value: i.count
      };
    }
  );
};

const printSuggests = (code: string, showDetails: boolean = false): void => {
  const suggests = suggest(Hand.fromCode(code));
  if (typeof suggests === "string") {
    console.log(suggests);
  } else {
    suggests.forEach(i => {
      console.log(showDetails ? i : [i.discard.acronym, i.count]);
    });
  }
};

interface ICodes {
  [key: string]: ICodeItem[];
}

interface ICodeItem {
  key: string;
  value: string | IReformatedCodeItem[];
}

interface IReformatedCodeItem {
  key: Tile;
  value: number;
}
