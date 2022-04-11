import { BoosterRarity, IBoosterPack, ItemType, ItemData } from "../types.js";
import BoosterPack from "./BoosterPack.js";

class ConsistentPack extends BoosterPack implements IBoosterPack {
  open(rarity: BoosterRarity): ItemData[] {
    let boosterItems = super.open(rarity);
    return this.avoidМatching(boosterItems);
  }
   
  protected avoidМatching(arr: ItemData[]): ItemData[] {
    const checkArr = arr.slice();
    for (let i = 0; i < checkArr.length; i++) {
      while (this.isTypeMaches(checkArr[i], checkArr)) {
        const newType = checkArr[i].type % (Object.keys(ItemType).length / 2) + 1;
        checkArr[i] = this.itemsBase.getSample(1, checkArr[i].rarity, newType)[0];
      }
    }
    return checkArr;
  }

  protected isTypeMaches(item: ItemData, arr: ItemData[]): boolean {
    const allowedMatches = 2;
    const checkType = item.type;
    const sameTypeGroup = arr.slice().filter(item => item.type === checkType);
    if (sameTypeGroup.length > allowedMatches) return true;
    return false;
  }
}

export default ConsistentPack;
