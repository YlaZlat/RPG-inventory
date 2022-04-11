import { BoosterRarity, IBoosterPack, IItemsBase, ItemData } from "../types.js";
import { getItemsRaritites } from "./getItemsRaritites.js";

class BoosterPack implements IBoosterPack {

  constructor(public itemsBase: IItemsBase) {}

  open(rarity: BoosterRarity, playerName?): ItemData[] { 
    const bumped = getItemsRaritites(rarity); 
    return bumped.map(newRarity => this.itemsBase.getSample(1, newRarity)).flat(); 
  }
}

export default BoosterPack;
