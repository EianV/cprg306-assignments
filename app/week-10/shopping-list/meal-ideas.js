"use client";
import { useState, useEffect } from "react";

async function fetchMealIdeas(ingredient) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
    );
    const data = await response.json();
    return data.meals || [];
  } catch (error) {
    console.error("Error fetching meal ideas:", error);
    return [];
  }
}

export default function MealIdeas({ ingredient }) {
  const [meals, setMeals] = useState([]);

  const loadMealIdeas = async () => {
    if (ingredient) {
      const mealData = await fetchMealIdeas(ingredient);
      setMeals(mealData);
    } else {
      setMeals([]);
    }
  };

  useEffect(() => {
    loadMealIdeas();
  }, [ingredient]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Meal Ideas</h2>
      {ingredient ? (
        <p className="mb-4">Meal ideas with {ingredient}:</p>
      ) : (
        <p className="mb-4">Select an item to see meal ideas</p>
      )}
      
      {meals.length > 0 ? (
        <ul className="space-y-2">
          {meals.map((meal) => (
            <li
              key={meal.idMeal}
              className="p-2 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-12 h-12 rounded-md object-cover"
                />
                <span className="font-medium">{meal.strMeal}</span>
              </div>
            </li>
          ))}
        </ul>
      ) : ingredient ? (
        <p>No meal ideas found for {ingredient}</p>
      ) : null}
    </div>
  );
}