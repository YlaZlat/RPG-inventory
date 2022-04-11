
import sample from "../sample.js";
import { BoosterRarity, FairPackHistoryStructuredStorage, IBoosterPack, IItemsBase, ItemData, IPlayer} from "../types.js";
import ConsistentPack from "./ConsistentPack.js";

class FairPack extends ConsistentPack implements IBoosterPack {
  static historyBase: FairPackHistoryStructuredStorage = {};

  static isHistoryAffect(rarity: BoosterRarity, playerName: string, itemsBase: IItemsBase): boolean {
    if (!this.historyBase[playerName] || !this.historyBase[playerName][rarity] || this.historyBase[playerName][rarity].isCompleted) return false; // если история еще не начала началась или уже кончидась
    const history = this.historyBase[playerName][rarity];
    const maxHistotyNumber: number = 24;
    const remainingPacks = maxHistotyNumber - history.number;
    const remainingItems = itemsBase.count(rarity) - history.items.size;
    if (remainingItems === 0) {
      this.historyBase[playerName][rarity].isCompleted = true;
      return false;
    }
    if (remainingPacks > remainingItems) return false;
    return true;
  }

  static resetHistory(playerName: string, rarity?: BoosterRarity): void {
    if (!this.historyBase[playerName]) return;
    if (!rarity) this.historyBase[playerName] = {};
    if (this.historyBase[playerName][rarity]) return;
    this.historyBase[playerName][rarity] = { isCompleted: false, number: 0, items: new Set() };
  }

  static addHistory(playerName: string, rarity: BoosterRarity, itemName: string): void {
    if (!this.historyBase[playerName]) this.historyBase[playerName] = {};
    if (!this.historyBase[playerName][rarity]) this.historyBase[playerName][rarity] = { isCompleted: false, number: 0, items: new Set() };
    this.historyBase[playerName][rarity].items.add(itemName);
  }

  open(rarity: BoosterRarity, player?: IPlayer): ItemData[] {
    if (!player) throw new Error("For fair packs player is required");
    let boosterItems = super.open(rarity);
    if (FairPack.isHistoryAffect(rarity, player.name, this.itemsBase)) {
      const remainingItems: ItemData[] = this.itemsBase.get(rarity).filter(({ name }) => !FairPack.historyBase[player.name][rarity].items.has(name));
      boosterItems = boosterItems.splice(0, 1, sample(remainingItems, 1)[0]);
    }
    for (let i = 0; i < boosterItems.length; i++) {
      if (rarity === boosterItems[i].rarity){
        FairPack.addHistory(player.name, rarity, boosterItems[i].name);
      }
    }
    FairPack.historyBase[player.name][rarity].number ++;
    return boosterItems;
  }
}

export default FairPack;
