import getBoosterPack from "./boosters/index.js";
class Player {
    constructor(name) {
        this.name = name;
        this.inventory = [];
    }
    openBoosterPacks(amount, type, rarity) {
        for (let i = 0; i < amount; i++) {
            const newItems = getBoosterPack(type).open(rarity, this);
            this.inventory = this.inventory.concat(newItems);
        }
    }
}
export default Player;
