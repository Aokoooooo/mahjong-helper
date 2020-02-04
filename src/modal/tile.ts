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
    return new Tile(
      tileEnum[acronym].id,
      tileEnum[acronym].name,
      acronym,
      tileEnum[acronym].isRedDora
    );
  };

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
}
