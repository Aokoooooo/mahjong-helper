import { tileEnum, tileEnumKeys, TileEnumKeyType } from "../enum/tile";

export class Tile {
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
