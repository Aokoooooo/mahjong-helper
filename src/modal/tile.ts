import { tileEnum, TileEnumKeyType } from "../enum/tile";

/**
 * 牌
 */
export class Tile {
  /**
   * 根据缩写创建牌
   * @param acronym 牌的缩写
   */
  public static create = (acronym: TileEnumKeyType) => {
    return new Tile(tileEnum[acronym].id, tileEnum[acronym].name, acronym);
  };

  public readonly id: number;
  public readonly name: string;
  public readonly acronym: TileEnumKeyType;

  constructor(id: number, name: string, acronym: TileEnumKeyType) {
    this.id = id;
    this.name = name;
    this.acronym = acronym;
  }
}
