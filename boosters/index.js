import BoosterPack from "./BoosterPack.js";
import ConsistentPack from "./ConsistentPack.js";
import FairPack from "./FairPack.js";
import itemsBase from "../itemsBase.js";
import { BoosterPacks } from "../types.js";
const Packs = {
    [BoosterPacks.SIMPLE]: BoosterPack,
    [BoosterPacks.CONSISTENT]: ConsistentPack,
    [BoosterPacks.FAIR]: FairPack
};
const getBoosterPack = (type = BoosterPacks.SIMPLE) => new Packs[type](itemsBase);
export default getBoosterPack;
