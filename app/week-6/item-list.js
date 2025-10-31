"use client";

import Item from "./item";
import { useState } from "react";
import data from "./items.json";
export default function ItemList() {
  const [sortBy, setSortBy] = useState("name");

  const sortedItems = [...data].sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "category") {
      return a.category.localeCompare(b.category);
    }
    return 0;
  });

  return (
    <div>
      <div className="flex justify-center gap-3 mb-5">
        <button
          onClick={() => setSortBy("name")}
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${
            sortBy === "name"
              ? "bg-teal-500 text-white"
              : "bg-gray-600 text-white"
          }`}
        >Sort by Name</button>

        <button
          onClick={() => setSortBy("category")}
          className={`px-4 py-2 rounded-md font-semibold transition-colors ${
            sortBy === "category"
              ? "bg-teal-500 text-white"
              : "bg-gray-600 text-white"
          }`}
        >Sort by Category</button>
      </div>

      <ul className="max-w-md mx-auto">
        {sortedItems.map((item) => (
          <Item
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            category={item.category}
          />
        ))}
      </ul>
    </div>
  );
}