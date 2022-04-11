import { ItemRarity, BoosterPacks } from "./types.js";
import Player from "./player.js";
import getBoosterPack from "./boosters/index.js";
import FairPack from "./boosters/FairPack.js";
//этот модуль содержит основные примеры вызова функций, предусмотренных тестовым заданием
const commonBuster1 = getBoosterPack(BoosterPacks.SIMPLE);
const consistentBuster1 = getBoosterPack(BoosterPacks.CONSISTENT);
const fairBuster1 = getBoosterPack(BoosterPacks.FAIR);
console.log("Simple booster with UNCOMMON rarity:");
console.log(commonBuster1.open(ItemRarity.UNCOMMON));
console.log("Consisten booster with RARE rarity:");
console.log(consistentBuster1.open(ItemRarity.RARE));
const player1 = new Player("Olga");
console.log("Fair booster with LEGENDARY rarity:");
console.log(fairBuster1.open(ItemRarity.LEGENDARY, player1));
const player2 = new Player("Dima");
// открыть 24 FAIR бустрера редкости RARE игороком2
player2.openBoosterPacks(24, BoosterPacks.FAIR, ItemRarity.RARE);
console.log("After opening 24 FAIR boosters, the player has collected a complete collection of booster rarity: \ [player][raryty].items");
console.log(FairPack.historyBase);
console.log("Player inventory after opening 24 FAIR boosters with RARE rarity:");
console.log(player2.inventory);
