"use client";

import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");

  const { user } = useUserAuth();

  // If not logged in shopping list won't show
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-white">You must be logged in to view this page.</p>
      </main>
    );
  }

  
  const handleAddItem = (newItem) => {
    setItems((prevArray) => [...prevArray, newItem]);
  };

  const handleItemSelect = (item) => {
    let cleanedName = item.name
      .split(",")[0]
      .trim()
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, "")
      .trim();

    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen bg-black-100 p-8">
      <h1 className="text-6xl text-center font-bold mb-8">Shopping List</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <NewItem onAddItem={handleAddItem} />
          <ItemList itemsArray={items} onItemSelect={handleItemSelect} />
        </div>

        <div className="flex-1">
          <MealIdeas ingredient={selectedItemName} />
        </div>
      </div>
    </main>
  );
}
