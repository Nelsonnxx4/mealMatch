import { sampleFoods } from "@/data/foodData";
import { Food } from "@/types/foodType";

export interface FoodFilters {
  country?: string;
  budget?: string;
  mealType?: string;
}

/**
 * Get foods based on filter criteria
 */
export const getFilteredFoods = (filters: FoodFilters): Food[] => {
  let filtered = [...sampleFoods];

  if (filters.country) {
    filtered = filtered.filter(
      (food) => food.country.toLowerCase() === filters.country?.toLowerCase()
    );
  }

  if (filters.budget) {
    filtered = filtered.filter(
      (food) => food.budget.toLowerCase() === filters.budget?.toLowerCase()
    );
  }

  // Filter by meal type
  if (filters.mealType) {
    filtered = filtered.filter(
      (food) => food.meal.toLowerCase() === filters.mealType?.toLowerCase()
    );
  }

  return filtered;
};

/**
 * Get a random food from filtered results
 */
export const getRandomFood = (filters: FoodFilters): Food | null => {
  const filtered = getFilteredFoods(filters);

  if (filtered.length === 0) return null;

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};

/**
 * Get foods by price range
 */
export const getFoodsByPriceRange = (
  minPrice: number,
  maxPrice: number,
  country?: string,
  mealType?: string
): Food[] => {
  let filtered = [...sampleFoods];

  // Filter by price range
  filtered = filtered.filter(
    (food) => food.price >= minPrice && food.price <= maxPrice
  );

  // Additional filters
  if (country) {
    filtered = filtered.filter(
      (food) => food.country.toLowerCase() === country.toLowerCase()
    );
  }

  if (mealType) {
    filtered = filtered.filter(
      (food) => food.meal.toLowerCase() === mealType.toLowerCase()
    );
  }

  return filtered;
};

/**
 * Convert budget tier name to price range
 */
export const getBudgetPriceRange = (
  budgetTier: string
): { min: number; max: number } | null => {
  const budgetMap: Record<string, { min: number; max: number }> = {
    sapa: { min: 500, max: 2000 },
    guidance: { min: 2000, max: 8000 },
    baller: { min: 8000, max: 15000 },
  };

  return budgetMap[budgetTier.toLowerCase()] || null;
};
