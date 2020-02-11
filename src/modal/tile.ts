import { tileEnum, TileEnumKeyType, tileEnumKeys } from "../enum/tile";

/**
 * 牌
 */
export class Tile {
  /**
   * 根据id创建牌
   * @param id 牌的id
   * @param isRedDora 是否为红dora
   */
  public static create(id: number, isRedDora?: boolean): Tile;
  /**
   * 根据缩写创建牌
   * @param acronym 牌的缩写
   */
  public static create(acronym: TileEnumKeyType): Tile;
  public static create(
    acronym: TileEnumKeyType | number,
    isRedDora: boolean = false
  ) {
    if (typeof acronym === "string") {
      return new Tile(
        tileEnum[acronym].id,
        tileEnum[acronym].name,
        acronym,
        tileEnum[acronym].isRedDora
      );
    }
    const keys = tileEnumKeys.filter(
      i => tileEnum[i].id === acronym && tileEnum[i].isRedDora === isRedDora
    );
    if (keys.length !== 1) {
      throw new Error(`错误的id:${acronym}`);
    }
    return new Tile(
      tileEnum[keys[0]].id,
      tileEnum[keys[0]].name,
      keys[0],
      tileEnum[keys[0]].isRedDora
    );
  }

  public readonly id: number;
  public readonly name: string;
  public readonly acronym: TileEnumKeyType;
  public readonly isRedDora: boolean;

  constructor(
    id: number,
    name: string,
    acronym: TileEnumKeyType,
    isRedDora: boolean = false
  ) {
    this.id = id;
    this.name = name;
    this.acronym = acronym;
    this.isRedDora = isRedDora;
  }

  public clone() {
    return Tile.create(this.acronym);
  }
}
