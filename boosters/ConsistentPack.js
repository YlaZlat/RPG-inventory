import { ItemType } from "../types.js";
import BoosterPack from "./BoosterPack.js";
class ConsistentPack extends BoosterPack {
    open(rarity) {
        let boosterItems = super.open(rarity);
        return this.avoidМatching(boosterItems);
    }
    avoidМatching(arr) {
        const checkArr = arr.slice();
        for (let i = 0; i < checkArr.length; i++) {
            while (this.isTypeMaches(checkArr[i], checkArr)) {
                const newType = checkArr[i].type % (Object.keys(ItemType).length / 2) + 1;
                checkArr[i] = this.itemsBase.getSample(1, checkArr[i].rarity, newType)[0];
            }
        }
        return checkArr;
    }
    isTypeMaches(item, arr) {
        const allowedMatches = 2;
        const checkType = item.type;
        const sameTypeGroup = arr.slice().filter(item => item.type === checkType);
        if (sameTypeGroup.length > allowedMatches)
            return true;
        return false;
    }
}
export default ConsistentPack;
