export type Team = 'OV-3' | 'OV-14' | 'OV-38' | 'OV-13';

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

export interface Frituur {
  "Business Name": string;
  Postcode?: number;
  Rating?: number;
  Latitued?: number;
  Provincie?: string;
  Category?: string;
  "Address/ Zip code/ City/ Country"?: string;
  Website?: string;
  Email?: string;
  "Unnamed: 8"?: string;
  "Open & Close Time"?: string;
  Longitued?: string;
  "Instagram link"?: string;
  "Facebook Link"?: string;
  "Linkedin Link"?: string;
  Straat?: string;
  Gemeente?: string;
  Land?: string;
  Number?: string;
  Review?: string;
  PhoneNumber?: string;
}

export interface TeamSelection {
  id: string;
  team: string;
  business_name: string;
  selected_at: string;
}
