
export type Team = 'OV-3' | 'OV-14' | 'OV-38' | 'OV-40';

export interface Snack {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  team: Team;
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fats: number; // grams
  fiber: number; // grams
  ingredients: string[];
  allergens?: string[];
  preparationTime?: number; // minutes
  rating?: number; // 1-5
  price?: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
}

export interface NutritionInfo {
  protein: number;
  carbs: number;
  fats: number;
  fiber: number;
}
