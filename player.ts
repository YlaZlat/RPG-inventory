import getBoosterPack from "./boosters/index.js";
import { IPlayer, BoosterRarity, ItemData, BoosterPacks} from "./types.js";

class Player implements IPlayer {
  inventory: Array<ItemData> = [];

  constructor(public name: string) {}

  openBoosterPacks(amount: number, type: BoosterPacks, rarity: BoosterRarity): void {
    for (let i = 0; i < amount; i++) {
      const newItems = getBoosterPack(type).open(rarity, this);
      this.inventory = this.inventory.concat(newItems);
    }
  }
}

export default Player;

