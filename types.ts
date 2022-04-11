export enum ItemType {
  WEAPON = 1,
  HELMET = 2,
  ARMOR = 3,
  SHIELD = 4
}

export enum ItemRarity {
  COMMON = 1,
  UNCOMMON = 2,
  RARE = 3,
  LEGENDARY = 4,
}

export enum BoosterPacks {
  SIMPLE = "Simple",
  CONSISTENT = "Consistent",
  FAIR = "Fair"
}

export interface ItemData {
  name: string;
  rarity: ItemRarity;
  type: ItemType;
}

export interface IItemsBase {
  items: StructuredStorage;
  add(data: ItemData): void;
  get(rarity: ItemRarity, type?: ItemType): ItemData[];
  getSample(size: number, rarity: ItemRarity, type?: ItemType): ItemData[];
  count(rarity: ItemRarity, type?: ItemType): number;
}

export type StructuredStorage = {
  [rarity: string]: {
    [type: string]: ItemData[];
  };
};

export interface IPlayer {
  name: string;
  inventory: ItemData[]; 
  openBoosterPacks(amount: number, type: BoosterPacks, rarity: BoosterRarity);
}

export type BoosterRarity = ItemRarity.UNCOMMON | ItemRarity.RARE | ItemRarity.LEGENDARY;

export interface IBoosterPack {
  itemsBase: IItemsBase;
  open(rarity: BoosterRarity, player?: IPlayer): ItemData[]
}

export interface FairPackHistoryStructuredStorage {
  [player: string]: {
    [rarity: string]: {
      isCompleted: boolean,  
      number: number, 
      items: Set<string>
    }
  }
}
