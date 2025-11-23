"use client";

import { useState } from "react";
import { useAuth } from "../_utils/use-auth";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user, loading, logout } = useAuth();

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-gray-900 p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl text-white mb-4">Access Denied</p>
          <p className="text-white">Please log in to view the shopping list.</p>
        </div>
      </main>
    );
  }

  const handleAddItem = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const handleItemSelect = (item) => {
    const cleanedName = item.name
      .split(",")[0]
      .trim()
      .replace(/[\u{1F600}-\u{1F6FF}]/gu, "")
      .trim();
    setSelectedItemName(cleanedName);
  };

  return (
    <main className="min-h-screen bg-gray-900 p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Shopping List</h1>
        <div className="flex items-center gap-4">
          <span className="text-white">Hello, {user.displayName}</span>
          <button 
            onClick={logout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

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