import { ItemRarity } from "../types.js";

const bump = (value: number, max: number): number => { // принимает текущую и максимальную редкость и с долей вероятности повышает редкость
  const luck = Math.random();
  if (luck < 0.9) return value;
  if (luck < 0.99) return Math.min(value + 1, max); 
  if (luck < 0.999) return Math.min(value + 2, max);
  if (luck < 0.9999) return Math.min(value + 3, max);
};

export const getItemsRaritites = (rarity: ItemRarity): ItemRarity[] => { 
  const maxRaritry = ItemRarity.LEGENDARY;
  return [ 
    bump(rarity, maxRaritry),
    bump(rarity, maxRaritry),
    bump(rarity - 1, maxRaritry),
    bump(rarity - 1, maxRaritry),
    bump(rarity - 1, maxRaritry)
  ];
};
