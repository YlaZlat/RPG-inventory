import sample from "../sample.js";
import ConsistentPack from "./ConsistentPack.js";
class FairPack extends ConsistentPack {
    static isHistoryAffect(rarity, playerName, itemsBase) {
        if (!this.historyBase[playerName] || !this.historyBase[playerName][rarity] || this.historyBase[playerName][rarity].isCompleted)
            return false; // если история еще не начала началась или уже кончидась
        const history = this.historyBase[playerName][rarity];
        const maxHistotyNumber = 24;
        const remainingPacks = maxHistotyNumber - history.number;
        const remainingItems = itemsBase.count(rarity) - history.items.size;
        if (remainingItems === 0) {
            this.historyBase[playerName][rarity].isCompleted = true;
        }
        if (remainingPacks > remainingItems)
            return false;
        return true;
    }
    static resetHistory(playerName, rarity) {
        if (!this.historyBase[playerName])
            return;
        if (!rarity)
            this.historyBase[playerName] = {};
        if (this.historyBase[playerName][rarity])
            return;
        this.historyBase[playerName][rarity] = { isCompleted: false, number: 0, items: new Set() };
    }
    static addHistory(playerName, rarity, itemName) {
        if (!this.historyBase[playerName])
            this.historyBase[playerName] = {};
        if (!this.historyBase[playerName][rarity])
            this.historyBase[playerName][rarity] = { isCompleted: false, number: 0, items: new Set() };
        this.historyBase[playerName][rarity].items.add(itemName);
    }
    open(rarity, player) {
        if (!player)
            throw new Error("For fair packs player is required");
        let boosterItems = super.open(rarity);
        if (FairPack.isHistoryAffect(rarity, player.name, this.itemsBase)) {
            const remainingItems = this.itemsBase.get(rarity).filter(({ name }) => !FairPack.historyBase[player.name][rarity].items.has(name));
            boosterItems = boosterItems.splice(0, 1, sample(remainingItems, 1)[0]);
        }
        for (let i = 0; i < boosterItems.length; i++) {
            if (rarity === boosterItems[i].rarity) {
                FairPack.addHistory(player.name, rarity, boosterItems[i].name);
            }
        }
        FairPack.historyBase[player.name][rarity].number++;
        return boosterItems;
    }
}
FairPack.historyBase = {};
export default FairPack;
