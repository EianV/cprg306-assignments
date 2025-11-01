"use client";
import { useState } from "react";

export default function NewItem({ onAddItem }) {
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Produce");

  const categoryOptions = [
    "Produce",
    "Dairy",
    "Bakery",
    "Meat",
    "Frozen Foods",
    "Canned Goods",
    "Dry Goods",
    "Beverages",
    "Snacks",
    "Household",
    "Other",
  ];

  const increment = () => {
    if (quantity < 20) {
      setQuantity(quantity + 1);
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const item = {
      id: Math.random() * 100000000000000000,
      name: name,
      quantity: quantity,
      category: category,
    };
    console.log("Item submitted:", item);
    onAddItem(item);
    setName("");
    setCategory("Produce");
    setQuantity(1);
  };

  return (
    <div className="flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-6 p-8 border-4 border-black w-[1000px] shadow-md"
      >
        <h1 className="text-lg font-semibold">Web Dev Assignment 8</h1>

        <div className="w-full">
          <input
            type="text"
            id="name"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="w-full">
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={decrement}
            disabled={quantity === 1}
            className={`px-3 py-3 rounded-full text-white ${
              quantity === 1
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            -
          </button>

          <span className="text-xl font-bold">{quantity}</span>

          <button
            type="button"
            onClick={increment}
            disabled={quantity === 20}
            className={`px-3 py-3 rounded-full text-white ${
              quantity === 20
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            +
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}