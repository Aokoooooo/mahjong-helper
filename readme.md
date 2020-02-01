## mahjong-helper

### 简介

这个项目是用来辅助自己进行日麻练习的,程序可以分析当前手牌的向听数,以及不同切牌选择之间的进张期望.

### API

1. 读取手牌: `parse(code:string)=> { handTiles : Tile[], fuluTiles : Tile[] }`
   将手牌通过简码的形式转化为对象.万筒索字的简码后缀分别为 m,p,s,z. 比如 1m 代表一万,456p 代表 456 筒.1234567z 分别代表东西南北白发中.

2. 压缩手牌,获取特征码: `encode(Tile[]) => string`
   将手牌对象压缩为字符串以便于进一步分析.需注意压缩得到的字符串无法通过逆推还原为原有手牌.

3. 分析向听数: `calculateShanten(encodedStr:string) => numer`
   根据特征码分析当前手牌的向听数.向听数的意思为最快还需多少有效进张才可听牌,其中向听数最大为 8,0 代表听牌,-1 代表荣和.

4. 给出切牌建议: `suggest(hands: Tile[]) => null | Suggest[]`
   根据当前手牌给出出牌建议,建议的给出逻辑是贪心计算当前局面下的最大进张数,即两面搭子优于边张欠张优于单张.返回 null 说明已经荣和.

5. 工具函数
   - `isWan(tile:Tile) => boolean`
   - `isSuo(tile:Tile) => boolean`
   - `isTong(tile:Tile) => boolean`
   - `isFeng(tile:Tile) => boolean`
   - `isSanyuan(tile:Tile) => boolean`
   - `isZi(tile:Tile) => boolean`
   - `isValidTileTypeAcronym(acronym:string) => boolean`
   - `isSameType(tile1: Tile, tile2: Tile) => boolean`
   - `isTilesValid(handTiles:Tile[], fuluTiles:Tile[]) => boolean`
   - `sortTiles(tiles: Tile[]) => Tile[]`
   - `sortSuggest(suggests:Suggest[]) => Suggest[]`
