import sample from "./sample.js";
import { ItemRarity, ItemType } from "./types.js";
class Item {
    constructor(data) {
        this.name = data.name;
        this.rarity = data.rarity;
        this.type = data.type;
    }
}
class ItemsBase {
    constructor() {
        this.items = {};
        for (const rarity of ItemsBase.ITEMS_RARITIES) {
            this.items[rarity] = {};
            for (const type of ItemsBase.ITEMS_TYPES) {
                this.items[rarity][type] = [];
            }
        }
    }
    add(item) {
        this.items[item.rarity][item.type].push(item);
    }
    get(rarity, type) {
        const items = this.find(rarity, type);
        return items.map(data => new Item(data));
    }
    getSample(size, rarity, type) {
        const items = this.find(rarity, type);
        return sample(items, size).map(data => new Item(data));
    }
    count(rarity, type) {
        const items = this.find(rarity, type);
        return items.length;
    }
    find(rarity, type) {
        const byRarity = this.items[rarity];
        const items = type ? byRarity[type] : Object.values(byRarity).flat();
        return items;
    }
}
ItemsBase.ITEMS_RARITIES = [ItemRarity.COMMON, ItemRarity.UNCOMMON, ItemRarity.RARE, ItemRarity.LEGENDARY];
ItemsBase.ITEMS_TYPES = [ItemType.ARMOR, ItemType.HELMET, ItemType.SHIELD, ItemType.WEAPON];
const data = [
    { name: "Обычное оружие 1", rarity: ItemRarity.COMMON, type: ItemType.WEAPON },
    { name: "Обычное оружие 2", rarity: ItemRarity.COMMON, type: ItemType.WEAPON },
    { name: "Обычный шлем 1", rarity: ItemRarity.COMMON, type: ItemType.HELMET },
    { name: "Обычный шлем 2", rarity: ItemRarity.COMMON, type: ItemType.HELMET },
    { name: "Обычная броня 1", rarity: ItemRarity.COMMON, type: ItemType.ARMOR },
    { name: "Обычная броня 2", rarity: ItemRarity.COMMON, type: ItemType.ARMOR },
    { name: "Обычный щит 1", rarity: ItemRarity.COMMON, type: ItemType.SHIELD },
    { name: "Обычный щит 2", rarity: ItemRarity.COMMON, type: ItemType.SHIELD },
    { name: "Необычное оружие 1", rarity: ItemRarity.UNCOMMON, type: ItemType.WEAPON },
    { name: "Необычное оружие 2", rarity: ItemRarity.UNCOMMON, type: ItemType.WEAPON },
    { name: "Необычный шлем 1", rarity: ItemRarity.UNCOMMON, type: ItemType.HELMET },
    { name: "Необычный шлем 2", rarity: ItemRarity.UNCOMMON, type: ItemType.HELMET },
    { name: "Необычная броня 1", rarity: ItemRarity.UNCOMMON, type: ItemType.ARMOR },
    { name: "Необычная броня 2", rarity: ItemRarity.UNCOMMON, type: ItemType.ARMOR },
    { name: "Необычный щит 1", rarity: ItemRarity.UNCOMMON, type: ItemType.SHIELD },
    { name: "Необычный щит 2", rarity: ItemRarity.UNCOMMON, type: ItemType.SHIELD },
    { name: "Редкое оружие 1", rarity: ItemRarity.RARE, type: ItemType.WEAPON },
    { name: "Редкое оружие 2", rarity: ItemRarity.RARE, type: ItemType.WEAPON },
    { name: "Редкий шлем 1", rarity: ItemRarity.RARE, type: ItemType.HELMET },
    { name: "Редкий шлем 2", rarity: ItemRarity.RARE, type: ItemType.HELMET },
    { name: "Редкая броня 1", rarity: ItemRarity.RARE, type: ItemType.ARMOR },
    { name: "Редкая броня 2", rarity: ItemRarity.RARE, type: ItemType.ARMOR },
    { name: "Редкий щит 1", rarity: ItemRarity.RARE, type: ItemType.SHIELD },
    { name: "Редкий щит 2", rarity: ItemRarity.RARE, type: ItemType.SHIELD },
    { name: "Легендарное оружие 1", rarity: ItemRarity.LEGENDARY, type: ItemType.WEAPON },
    { name: "Легендарное оружие 2", rarity: ItemRarity.LEGENDARY, type: ItemType.WEAPON },
    { name: "Легендарний шлем 1", rarity: ItemRarity.LEGENDARY, type: ItemType.HELMET },
    { name: "Легендарний шлем 2", rarity: ItemRarity.LEGENDARY, type: ItemType.HELMET },
    { name: "Легендарная броня 1", rarity: ItemRarity.LEGENDARY, type: ItemType.ARMOR },
    { name: "Легендарная броня 2", rarity: ItemRarity.LEGENDARY, type: ItemType.ARMOR },
    { name: "Легендарний щит 1", rarity: ItemRarity.LEGENDARY, type: ItemType.SHIELD },
    { name: "Легендарний щит 2", rarity: ItemRarity.LEGENDARY, type: ItemType.SHIELD },
];
const itemsBase = new ItemsBase();
data.forEach((item) => itemsBase.add(item));
export default itemsBase;
