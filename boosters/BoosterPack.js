import { getItemsRaritites } from "./getItemsRaritites.js";
class BoosterPack {
    constructor(itemsBase) {
        this.itemsBase = itemsBase;
    }
    open(rarity, playerName) {
        const bumped = getItemsRaritites(rarity);
        return bumped.map(newRarity => this.itemsBase.getSample(1, newRarity)).flat();
    }
}
export default BoosterPack;
