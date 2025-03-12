
import { Snack, Team } from "../types";

// These are mock snacks until we integrate with Supabase
export const mockSnacks: Snack[] = [
  {
    id: "1",
    name: "Protein Power Bites",
    description: "Delicious chickpea-based bites packed with protein and flavor.",
    imageUrl: "https://images.unsplash.com/photo-1546069901-d5bfd2cbfb1f?q=80&w=1000",
    team: "OV-3",
    calories: 220,
    protein: 15,
    carbs: 18,
    fats: 12,
    fiber: 5,
    ingredients: ["Chickpeas", "Quinoa", "Flaxseed", "Mixed herbs", "Olive oil"],
    allergens: ["Nuts"],
    preparationTime: 15,
    rating: 4.5,
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    id: "2",
    name: "Crunchy Lentil Fritters",
    description: "Crispy on the outside, soft on the inside lentil fritters.",
    imageUrl: "https://images.unsplash.com/photo-1569489042712-62d1ad8f7055?q=80&w=1000",
    team: "OV-14",
    calories: 180,
    protein: 12,
    carbs: 20,
    fats: 8,
    fiber: 6,
    ingredients: ["Red lentils", "Onion", "Garlic", "Cumin", "Rice flour"],
    preparationTime: 25,
    rating: 4.2,
    isVegetarian: true,
    isVegan: true
  },
  {
    id: "3",
    name: "Tempeh Nuggets",
    description: "Savory tempeh nuggets with a crispy herb coating.",
    imageUrl: "https://images.unsplash.com/photo-1615937657715-bc7b4b7962c1?q=80&w=1000",
    team: "OV-38",
    calories: 240,
    protein: 18,
    carbs: 15,
    fats: 14,
    fiber: 4,
    ingredients: ["Tempeh", "Whole wheat breadcrumbs", "Nutritional yeast", "Paprika", "Thyme"],
    allergens: ["Soy"],
    preparationTime: 20,
    rating: 4.7,
    isVegetarian: true,
    isVegan: true
  },
  {
    id: "4",
    name: "Bean & Cheese Poppers",
    description: "Bite-sized bean and cheese poppers with a spicy kick.",
    imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000",
    team: "OV-13",
    calories: 210,
    protein: 14,
    carbs: 22,
    fats: 10,
    fiber: 7,
    ingredients: ["Black beans", "Cheddar cheese", "Bell peppers", "Jalapeños", "Corn flour"],
    allergens: ["Milk"],
    preparationTime: 18,
    rating: 4.3,
    isVegetarian: true
  },
  {
    id: "5",
    name: "Tofu Crunch Sticks",
    description: "Extra firm tofu sticks with a crunchy sesame coating.",
    imageUrl: "https://images.unsplash.com/photo-1606787366850-de6330128a16?q=80&w=1000",
    team: "OV-3",
    calories: 190,
    protein: 16,
    carbs: 14,
    fats: 11,
    fiber: 3,
    ingredients: ["Tofu", "Sesame seeds", "Panko breadcrumbs", "Soy sauce", "Ginger"],
    allergens: ["Soy", "Sesame"],
    preparationTime: 22,
    rating: 4.1,
    isVegetarian: true,
    isVegan: true
  },
  {
    id: "6",
    name: "Edamame Falafel",
    description: "A fusion snack combining edamame and traditional falafel spices.",
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000",
    team: "OV-14",
    calories: 205,
    protein: 17,
    carbs: 19,
    fats: 9,
    fiber: 8,
    ingredients: ["Edamame", "Chickpeas", "Parsley", "Cumin", "Coriander"],
    allergens: ["Soy"],
    preparationTime: 30,
    rating: 4.6,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true
  },
  {
    id: "7",
    name: "Cottage Cheese Puffs",
    description: "Light and airy cottage cheese puffs with herbs.",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000",
    team: "OV-38",
    calories: 160,
    protein: 14,
    carbs: 12,
    fats: 8,
    fiber: 2,
    ingredients: ["Cottage cheese", "Eggs", "Oat flour", "Dill", "Chives"],
    allergens: ["Milk", "Eggs"],
    preparationTime: 15,
    rating: 4.0,
    isVegetarian: true,
    isGlutenFree: true
  },
  {
    id: "8",
    name: "Pea Protein Crisps",
    description: "Crunchy pea protein crisps with a touch of sea salt.",
    imageUrl: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=1000",
    team: "OV-13",
    calories: 150,
    protein: 15,
    carbs: 16,
    fats: 6,
    fiber: 5,
    ingredients: ["Pea protein", "Rice flour", "Flaxseeds", "Sea salt", "Olive oil"],
    preparationTime: 20,
    rating: 4.4,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true
  }
];

export const getSnacksByTeam = (team: Team): Snack[] => {
  return mockSnacks.filter(snack => snack.team === team);
};

export const getSnackById = (id: string): Snack | undefined => {
  return mockSnacks.find(snack => snack.id === id);
};
