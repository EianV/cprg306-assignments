"use client";

import Link from "next/link";
import ItemList from "./item-list";
import NewItem from "./new-item";
import MealIdeas from "./meal-ideas";
import itemsData from "./items.json";
import { useState } from "react";
import { useUserAuth } from "../_utils/auth-context";

export default function Page() {
  const [items, setItems] = useState(itemsData);
  const [selectedItemName, setSelectedItemName] = useState("");
  const { user, firebaseSignOut } = useUserAuth();

  // If not logged in, show message
  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <p className="text-2xl text-white mb-4">Access Denied</p>
          <p className="text-white">Please log in to view the shopping list.</p>
          <Link 
            href="/week-9"
            className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go to Login
          </Link>
        </div>
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

  const handleLogout = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Shopping List</h1>
        <div className="flex items-center gap-4">
          <span className="text-white">Welcome, {user.displayName}</span>
          <button 
            onClick={handleLogout}
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